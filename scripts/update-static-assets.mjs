import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SitemapStream, streamToPromise } from 'sitemap'

const scriptsDir = fileURLToPath(new URL('.', import.meta.url))
const rootDir = path.resolve(scriptsDir, '..')
const publicDir = path.join(rootDir, 'public')
const fontsDir = path.join(publicDir, 'fonts')
const faviconPath = path.join(publicDir, 'favicon.png')
const legacyFaviconPath = path.join(publicDir, 'favicon.ico')
const robotsPath = path.join(publicDir, 'robots.txt')
const sitemapPath = path.join(publicDir, 'sitemap.xml')
const fontPath = path.join(fontsDir, 'InterVariable.woff2')
const fontSource = 'https://rsms.me/inter/font-files/InterVariable.woff2'
const siteConfigPath = path.join(rootDir, 'src', 'config', 'site.config.json')
const routeConfigPath = path.join(rootDir, 'src', 'config', 'routes.json')

let faviconSource = ''
let basePath = '/'
let siteUrl = ''
let routeDefinitions = []

try {
  const siteConfig = JSON.parse(await fs.readFile(siteConfigPath, 'utf8'))
  faviconSource = typeof siteConfig.faviconSource === 'string' ? siteConfig.faviconSource.trim() : ''
  basePath = typeof siteConfig.basePath === 'string' ? siteConfig.basePath.trim() || '/' : '/'
  siteUrl = typeof siteConfig.siteUrl === 'string' ? siteConfig.siteUrl.trim() : ''
} catch {
  faviconSource = ''
}

try {
  const routeConfig = JSON.parse(await fs.readFile(routeConfigPath, 'utf8'))
  if (Array.isArray(routeConfig)) {
    routeDefinitions = routeConfig.filter((route) => route && typeof route.path === 'string' && typeof route.name === 'string')
  }
} catch {
  routeDefinitions = []
}

const normalizeBasePath = (value) => {
  if (!value || value === '/') {
    return ''
  }

  return value.startsWith('/') ? value.replace(/\/$/, '') : `/${value.replace(/\/$/, '')}`
}

const joinPath = (prefix, pathname) => {
  if (!pathname.startsWith('/')) {
    pathname = `/${pathname}`
  }

  if (!prefix) {
    return pathname
  }

  return `${prefix}${pathname}`.replace(/\/+/g, '/')
}

const normalizeSiteUrl = (value) => {
  return value.replace(/\/$/, '')
}

await fs.mkdir(fontsDir, { recursive: true })
await fs.mkdir(publicDir, { recursive: true })

await fs.rm(legacyFaviconPath, { force: true })

const fontResponse = await fetch(fontSource)

if (!fontResponse.ok) {
  throw new Error(`Failed to fetch font source: ${fontResponse.status} ${fontResponse.statusText}`)
}

if (faviconSource) {
  try {
    const faviconResponse = await fetch(faviconSource)
    if (faviconResponse.ok) {
      const faviconPng = Buffer.from(await faviconResponse.arrayBuffer())
      await fs.writeFile(faviconPath, faviconPng)
      console.log(`favicon written to ${faviconPath}`)
    }
  } catch {
    // Ignore favicon download/build failures.
  }
}

const fontBuffer = Buffer.from(await fontResponse.arrayBuffer())
await fs.writeFile(fontPath, fontBuffer)

console.log(`font written to ${fontPath}`)

const noIndexRoutes = routeDefinitions.filter((route) => route.noIndex && typeof route.robotsPath === 'string')

const robotsLines = [
  'User-agent: *',
  ...noIndexRoutes.map((route) => `Disallow: ${joinPath(normalizeBasePath(basePath), route.robotsPath.trim())}`),
  '',
]

await fs.writeFile(robotsPath, robotsLines.join('\n'), 'utf8')

console.log(`robots written to ${robotsPath}`)

if (!siteUrl) {
  throw new Error('siteUrl is required in src/config/site.config.json')
}

const sitemap = new SitemapStream({
  hostname: normalizeSiteUrl(siteUrl),
})

for (const route of routeDefinitions) {
  if (route.noIndex) {
    continue
  }

  sitemap.write({ url: joinPath(normalizeBasePath(basePath), route.path), changefreq: 'weekly', priority: route.path === '/' ? 1 : 0.8 })
}

sitemap.end()

const sitemapXml = await streamToPromise(sitemap)
await fs.writeFile(sitemapPath, sitemapXml)

console.log(`sitemap written to ${sitemapPath}`)
