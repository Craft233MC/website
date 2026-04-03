import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

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
      const upstream = await fetch(`https://api.mcsrvstat.us/3/${encodeURIComponent(address)}`)
      if (!upstream.ok) {
        res.statusCode = 502
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(JSON.stringify({ error: 'Bad Gateway' }))
        return
      }

      const payload = await upstream.json()
      res.statusCode = 200
      res.setHeader('Cache-Control', 'no-store')
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(payload))
    } catch {
      res.statusCode = 502
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify({ error: 'Bad Gateway' }))
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
