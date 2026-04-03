import * as net from 'node:net'
import * as dns from 'node:dns/promises'

// Minecraft 协议辅助函数
const writeVarInt = (value) => {
  const bytes = []
  let num = value
  while ((num & 0xffffff80) !== 0) {
    bytes.push((num & 0x7f) | 0x80)
    num >>>= 7
  }
  bytes.push(num & 0x7f)
  return Buffer.from(bytes)
}

const writeString = (text) => {
  const utf8 = Buffer.from(text, 'utf-8')
  return Buffer.concat([writeVarInt(utf8.length), utf8])
}

const writeUshort = (value) => {
  const buf = Buffer.alloc(2)
  buf.writeUInt16BE(value, 0)
  return buf
}

const readVarInt = (buffer, offset) => {
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

const readString = (buffer, offset) => {
  const [length, nextOffset] = readVarInt(buffer, offset)
  const str = buffer.toString('utf-8', nextOffset, nextOffset + length)
  return [str, nextOffset + length]
}

const resolveSRV = async (host) => {
  try {
    const records = await dns.resolveSrv(`_minecraft._tcp.${host}`)
    if (records.length > 0) {
      const record = records[0]
      console.log(`✓ SRV 记录: ${record.name}:${record.port}`)
      return { host: record.name, port: record.port }
    }
  } catch (err) {
    console.log(`ℹ 未找到 SRV 记录: ${err.message}`)
  }
  return { host, port: 25565 }
}

const queryMinecraftServer = (host, port = 25565) => {
  return new Promise((resolve, reject) => {
    console.log(`\n→ 连接到 ${host}:${port}...`)
    const socket = net.createConnection(port, host)
    let data = Buffer.alloc(0)
    const timeout = setTimeout(() => {
      socket.destroy()
      reject(new Error('连接超时（5秒）'))
    }, 5000)

    socket.on('connect', () => {
      console.log('✓ 已建立 TCP 连接')
      try {
        // 构造握手包
        const handshakePacket = Buffer.concat([
          writeVarInt(0), // Packet ID: Handshake
          writeVarInt(758), // Protocol Version (1.20.4)
          writeString(host),
          writeUshort(port),
          writeVarInt(1), // Next State: Status
        ])

        const handshakeLength = writeVarInt(handshakePacket.length)
        const handshakeFull = Buffer.concat([handshakeLength, handshakePacket])
        console.log(`✓ 发送握手包 (${handshakeFull.length} 字节)`)
        socket.write(handshakeFull)

        // 发送状态请求包
        const statusRequest = Buffer.concat([
          writeVarInt(1), // Packet length
          writeVarInt(0), // Packet ID: Status Request
        ])
        console.log(`✓ 发送状态请求包 (${statusRequest.length} 字节)`)
        socket.write(statusRequest)
      } catch (err) {
        socket.destroy()
        reject(err)
      }
    })

    let parsed = false

    socket.on('data', (chunk) => {
      console.log(`✓ 收到数据 (${chunk.length} 字节)`)
      data = Buffer.concat([data, chunk])

      // 在接收到足够数据后立即尝试解析
      if (!parsed && data.length > 0) {
        try {
          const [packetLength, offset1] = readVarInt(data, 0)
          // 检查是否收到了完整的数据包
          if (data.length >= offset1 + packetLength) {
            parsed = true
            clearTimeout(timeout)
            parseResponse()
          }
        } catch (e) {
          // 继续等待更多数据
        }
      }
    })

    const parseResponse = () => {
      try {
        console.log(`\n→ 解析响应数据...`)
        
        if (data.length === 0) {
          throw new Error('收到空响应')
        }

        console.log(`  原始数据 (前 100 字节): ${data.slice(0, 100).toString('hex')}`)

        // 解析响应
        const [packetLength, offset1] = readVarInt(data, 0)
        console.log(`  数据包长度: ${packetLength} 字节`)

        const [packetId, offset2] = readVarInt(data, offset1)
        console.log(`  数据包 ID: ${packetId}`)

        if (packetId !== 0) {
          throw new Error(`无效的数据包ID: ${packetId}，期望为 0`)
        }

        const [jsonStr, _] = readString(data, offset2)
        console.log(`✓ 解析的 JSON 字符串长度: ${jsonStr.length} 字符`)

        const status = JSON.parse(jsonStr)
        console.log(`\n✓ 状态查询成功！`)
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
        console.log(`服务器: ${status.description?.text || status.description || '(无描述)'}`)
        console.log(`在线人数: ${status.players?.online ?? '未知'}/${status.players?.max ?? '未知'}`)
        console.log(`版本: ${status.version?.name ?? '未知'} (协议: ${status.version?.protocol ?? '未知'})`)
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━`)

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
        console.error(`✗ 解析失败: ${err.message}`)
        socket.destroy()
        reject(err)
      }
    }

    socket.on('end', () => {
      // 服务器关闭了连接
      if (!parsed) {
        clearTimeout(timeout)
        parseResponse()
      }
    })

    socket.on('error', (err) => {
      clearTimeout(timeout)
      console.error(`✗ 连接错误: ${err.message}`)
      socket.destroy()
      reject(err)
    })

    socket.on('timeout', () => {
      socket.destroy()
      clearTimeout(timeout)
      reject(new Error('socket 超时'))
    })
  })
}

// 主测试函数
async function test() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('Minecraft 服务器状态查询测试')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━')

  const targetHost = 'mc.craft233.top'
  
  try {
    // 尝试 SRV 记录解析
    const { host, port } = await resolveSRV(targetHost)
    
    // 查询服务器
    const result = await queryMinecraftServer(host, port)
    console.log('\n✓ 测试通过！API 可用')
    process.exit(0)
  } catch (err) {
    console.error(`\n✗ 测试失败: ${err.message}`)
    process.exit(1)
  }
}

test()
