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
const seoConfigPath = path.join(rootDir, 'src', 'config', 'seo.config.json')

let faviconSource = ''
let basePath = '/'
let noIndexPaths = ['/callback']

const sitemapRoutes = [
  '/',
  '/about',
  '/join',
  '/maps',
  '/rules',
  '/archive',
  '/contribute',
  '/sponsors',
  '/friendlinks',
]

try {
  const siteConfig = JSON.parse(await fs.readFile(siteConfigPath, 'utf8'))
  faviconSource = typeof siteConfig.faviconSource === 'string' ? siteConfig.faviconSource.trim() : ''
  basePath = typeof siteConfig.basePath === 'string' ? siteConfig.basePath.trim() || '/' : '/'
} catch {
  faviconSource = ''
}

try {
  const seoConfig = JSON.parse(await fs.readFile(seoConfigPath, 'utf8'))
  if (Array.isArray(seoConfig.noIndexPaths)) {
    noIndexPaths = seoConfig.noIndexPaths.filter((value) => typeof value === 'string' && value.trim().length > 0)
  }
} catch {
  // Fall back to the default blacklist.
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

const robotsLines = [
  'User-agent: *',
  ...noIndexPaths.map((pathname) => `Disallow: ${joinPath(normalizeBasePath(basePath), pathname.trim())}`),
  '',
]

await fs.writeFile(robotsPath, robotsLines.join('\n'), 'utf8')

console.log(`robots written to ${robotsPath}`)

const sitemap = new SitemapStream({
  hostname: 'https://www.craft233.top',
})

for (const pathname of sitemapRoutes) {
  if (noIndexPaths.includes(pathname)) {
    continue
  }

  sitemap.write({ url: joinPath(normalizeBasePath(basePath), pathname), changefreq: 'weekly', priority: pathname === '/' ? 1 : 0.8 })
}

sitemap.end()

const sitemapXml = await streamToPromise(sitemap)
await fs.writeFile(sitemapPath, sitemapXml)

console.log(`sitemap written to ${sitemapPath}`)
