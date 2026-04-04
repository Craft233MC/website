import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SitemapStream, streamToPromise } from 'sitemap'

const scriptsDir = fileURLToPath(new URL('.', import.meta.url))
const rootDir = path.resolve(scriptsDir, '..')
const distDir = path.join(rootDir, 'dist')
const faviconPath = path.join(distDir, 'favicon.png')
const robotsPath = path.join(distDir, 'robots.txt')
const sitemapPath = path.join(distDir, 'sitemap.xml')
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

const runWithRetryAndIgnore = async (taskName, task) => {
  try {
    await task()
  } catch (firstError) {
    console.warn(`[static-assets] ${taskName} failed on first attempt: ${firstError instanceof Error ? firstError.message : String(firstError)}`)
    console.warn(`[static-assets] Retrying ${taskName} once...`)

    try {
      await task()
    } catch (secondError) {
      console.warn(
        `[static-assets] ${taskName} failed again and will be ignored: ${secondError instanceof Error ? secondError.message : String(secondError)}`,
      )
    }
  }
}

await fs.mkdir(distDir, { recursive: true })

await runWithRetryAndIgnore('favicon generation', async () => {
  if (!faviconSource) {
    throw new Error('faviconSource is required in src/config/site.config.json')
  }

  const faviconResponse = await fetch(faviconSource)
  if (!faviconResponse.ok) {
    throw new Error(`Failed to fetch favicon source: ${faviconResponse.status} ${faviconResponse.statusText}`)
  }

  const faviconPng = Buffer.from(await faviconResponse.arrayBuffer())
  await fs.writeFile(faviconPath, faviconPng)
  console.log(`favicon written to ${faviconPath}`)
})

await runWithRetryAndIgnore('robots generation', async () => {
  const noIndexRoutes = routeDefinitions.filter((route) => route.noIndex && typeof route.robotsPath === 'string')

  const robotsLines = [
    'User-agent: *',
    ...noIndexRoutes.map((route) => `Disallow: ${joinPath(normalizeBasePath(basePath), route.robotsPath.trim())}`),
    '',
  ]

  await fs.writeFile(robotsPath, robotsLines.join('\n'), 'utf8')
  console.log(`robots written to ${robotsPath}`)
})

await runWithRetryAndIgnore('sitemap generation', async () => {
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
})
