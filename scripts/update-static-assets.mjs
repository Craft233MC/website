import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pngToIco from 'png-to-ico'

const scriptsDir = fileURLToPath(new URL('.', import.meta.url))
const rootDir = path.resolve(scriptsDir, '..')
const publicDir = path.join(rootDir, 'public')
const fontsDir = path.join(publicDir, 'fonts')
const faviconPath = path.join(publicDir, 'favicon.ico')
const fontPath = path.join(fontsDir, 'InterVariable.woff2')

const faviconSource = 'https://res.neokoni.ink/craft233/img/craft233_logo_64.png'
const fontSource = 'https://rsms.me/inter/font-files/InterVariable.woff2'

await fs.mkdir(fontsDir, { recursive: true })

const [faviconResponse, fontResponse] = await Promise.all([
  fetch(faviconSource),
  fetch(fontSource),
])

if (!faviconResponse.ok) {
  throw new Error(`Failed to fetch favicon source: ${faviconResponse.status} ${faviconResponse.statusText}`)
}

if (!fontResponse.ok) {
  throw new Error(`Failed to fetch font source: ${fontResponse.status} ${fontResponse.statusText}`)
}

const faviconPng = Buffer.from(await faviconResponse.arrayBuffer())
const faviconIco = await pngToIco(faviconPng)
await fs.writeFile(faviconPath, faviconIco)

const fontBuffer = Buffer.from(await fontResponse.arrayBuffer())
await fs.writeFile(fontPath, fontBuffer)

console.log(`favicon written to ${faviconPath}`)
console.log(`font written to ${fontPath}`)
