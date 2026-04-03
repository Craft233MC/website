import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import * as net from 'node:net'

// Minecraft 协议辅助函数
const writeVarInt = (value: number): Buffer => {
  const bytes: number[] = []
  let num = value
  while ((num & 0xffffff80) !== 0) {
    bytes.push((num & 0x7f) | 0x80)
    num >>>= 7
  }
  bytes.push(num & 0x7f)
  return Buffer.from(bytes)
}

const writeString = (text: string): Buffer => {
  const utf8 = Buffer.from(text, 'utf-8')
  return Buffer.concat([writeVarInt(utf8.length), utf8])
}

const writeUshort = (value: number): Buffer => {
  const buf = Buffer.alloc(2)
  buf.writeUInt16BE(value, 0)
  return buf
}

const readVarInt = (buffer: Buffer, offset: number): [number, number] => {
  let result = 0
  let shift = 0
  let idx = offset
  while (true) {
    if (idx >= buffer.length) throw new Error('VarInt is too big')
    const byte = buffer[idx++]
    result |= (byte & 0x7f) << shift
    if ((byte & 0x80) === 0) break
    shift += 7
  }
  return [result, idx]
}

const readString = (buffer: Buffer, offset: number): [string, number] => {
  const [length, nextOffset] = readVarInt(buffer, offset)
  const str = buffer.toString('utf-8', nextOffset, nextOffset + length)
  return [str, nextOffset + length]
}

const queryMinecraftServer = (host: string, port: number = 25565): Promise<any> => {
  return new Promise((resolve, reject) => {
    const socket = net.createConnection(port, host)
    let data = Buffer.alloc(0)
    let parsed = false
    const timeout = setTimeout(() => {
      socket.destroy()
      reject(new Error('Connection timeout'))
    }, 5000)

    socket.on('connect', () => {
      try {
        // Create handshake packet
        const serverHost = writeString(host)
        const serverPort = writeUshort(port)
        const nextState = writeVarInt(1) // 1 = status

        const handshakePacket = Buffer.concat([
          writeVarInt(0), // packet ID
          writeVarInt(758), // protocol version (latest)
          serverHost,
          serverPort,
          nextState,
        ])

        const handshakeLength = writeVarInt(handshakePacket.length)
        socket.write(Buffer.concat([handshakeLength, handshakePacket]))

        // Send status request packet
        const statusRequest = Buffer.concat([
          writeVarInt(1), // packet length (fixed at 1)
          writeVarInt(0), // packet ID
        ])
        socket.write(statusRequest)
      } catch (err) {
        socket.destroy()
        reject(err)
      }
    })

    socket.on('data', (chunk: Buffer) => {
      data = Buffer.concat([data, chunk])

      // Try to parse as soon as we have enough data
      if (!parsed && data.length > 0) {
        try {
          const [packetLength, offset1] = readVarInt(data, 0)
          // Check if we have received the complete packet
          if (data.length >= offset1 + packetLength) {
            parsed = true
            clearTimeout(timeout)
            parseAndResolve()
          }
        } catch (e) {
          // Wait for more data
        }
      }
    })

    const parseAndResolve = () => {
      try {
        // Parse response
        const [_, offset1] = readVarInt(data, 0) // packet length
        const [packetId, offset2] = readVarInt(data, offset1) // packet ID

        if (packetId !== 0) {
          throw new Error('Invalid packet ID')
        }

        const [jsonStr] = readString(data, offset2)
        const status = JSON.parse(jsonStr)

        socket.destroy()
        resolve({
          online: true,
          players: {
            online: status.players?.online ?? 0,
            max: status.players?.max ?? 0,
            sample: status.players?.sample ?? [],
          },
          version: {
            name: status.version?.name ?? 'Unknown',
            protocol: status.version?.protocol ?? 0,
          },
          description: status.description,
          favicon: status.favicon,
          ...status,
        })
      } catch (err) {
        socket.destroy()
        reject(err)
      }
    }

    socket.on('end', () => {
      // Server closed the connection
      if (!parsed) {
        clearTimeout(timeout)
        parseAndResolve()
      }
    })

    socket.on('error', (err) => {
      clearTimeout(timeout)
      socket.destroy()
      reject(err)
    })

    socket.on('timeout', () => {
      socket.destroy()
      clearTimeout(timeout)
      reject(new Error('Socket timeout'))
    })
  })
}

const createServerStatusMiddleware = (address: string) => {
  const hitMap = new Map<string, number[]>()
  const WINDOW_MS = 10_000
  const MAX_HITS_PER_WINDOW = 20

  const isAllowedOrigin = (origin: string, host: string) => {
    return origin === `http://${host}` || origin === `https://${host}`
  }

  const isAllowedReferer = (referer: string, host: string) => {
    try {
      const refererHost = new URL(referer).host
      return refererHost === host
    } catch {
      return false
    }
  }

  return async (req: any, res: any, next: () => void) => {
    if (req.url !== '/api/minecraft-status') {
      next()
      return
    }

    if (req.method !== 'GET') {
      res.statusCode = 405
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify({ error: 'Method Not Allowed' }))
      return
    }

    const host = String(req.headers.host ?? '')
    const origin = String(req.headers.origin ?? '')
    const referer = String(req.headers.referer ?? '')
    const fetchSite = String(req.headers['sec-fetch-site'] ?? '')

    const sameOriginByHeader = (origin && isAllowedOrigin(origin, host)) || (referer && isAllowedReferer(referer, host))
    const sameOriginByFetchSite = fetchSite === 'same-origin' || fetchSite === 'same-site'

    if (!sameOriginByHeader && !sameOriginByFetchSite) {
      res.statusCode = 403
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify({ error: 'Forbidden' }))
      return
    }

    const remoteAddress = String(req.socket?.remoteAddress ?? 'unknown')
    const now = Date.now()
    const hits = (hitMap.get(remoteAddress) ?? []).filter((ts) => now - ts < WINDOW_MS)

    if (hits.length >= MAX_HITS_PER_WINDOW) {
      res.statusCode = 429
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify({ error: 'Too Many Requests' }))
      return
    }

    hits.push(now)
    hitMap.set(remoteAddress, hits)

    try {
      const payload = await queryMinecraftServer(address)
      res.statusCode = 200
      res.setHeader('Cache-Control', 'no-store')
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(payload))
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      res.statusCode = 503
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify({ 
        online: false,
        error: err.message,
      }))
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const serverAddress = env.VITE_MC_SERVER_ADDRESS?.trim() || 'mc.craft233.top'
  const serverStatusMiddleware = createServerStatusMiddleware(serverAddress)

  return {
    plugins: [
      vue(),
      {
        name: 'local-minecraft-status-api',
        configureServer(server) {
          server.middlewares.use(serverStatusMiddleware)
        },
        configurePreviewServer(server) {
          server.middlewares.use(serverStatusMiddleware)
        },
      },
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
