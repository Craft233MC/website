import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptsDir = fileURLToPath(new URL('.', import.meta.url))
const rootDir = path.resolve(scriptsDir, '..')
const publicDir = path.join(rootDir, 'public')
const fontsDir = path.join(publicDir, 'fonts')
const faviconPath = path.join(publicDir, 'favicon.png')
const legacyFaviconPath = path.join(publicDir, 'favicon.ico')
const fontPath = path.join(fontsDir, 'InterVariable.woff2')
const fontSource = 'https://rsms.me/inter/font-files/InterVariable.woff2'
const siteConfigPath = path.join(rootDir, 'src', 'config', 'site.config.json')

let faviconSource = ''

try {
  const siteConfig = JSON.parse(await fs.readFile(siteConfigPath, 'utf8'))
  faviconSource = typeof siteConfig.faviconSource === 'string' ? siteConfig.faviconSource.trim() : ''
} catch {
  faviconSource = ''
}

await fs.mkdir(fontsDir, { recursive: true })

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
