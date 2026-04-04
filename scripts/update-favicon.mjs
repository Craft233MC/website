import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pngToIco from 'png-to-ico'

const scriptsDir = fileURLToPath(new URL('.', import.meta.url))
const rootDir = path.resolve(scriptsDir, '..')
const publicDir = path.join(rootDir, 'public')
const faviconPath = path.join(publicDir, 'favicon.ico')
const sourceUrl = 'https://res.neokoni.ink/craft233/img/craft233_logo_64.png'

const runWithRetryAndIgnore = async (taskName, task) => {
  try {
    await task()
  } catch (firstError) {
    console.warn(`[favicon] ${taskName} failed on first attempt: ${firstError instanceof Error ? firstError.message : String(firstError)}`)
    console.warn(`[favicon] Retrying ${taskName} once...`)

    try {
      await task()
    } catch (secondError) {
      console.warn(`[favicon] ${taskName} failed again and will be ignored: ${secondError instanceof Error ? secondError.message : String(secondError)}`)
    }
  }
}

await fs.mkdir(publicDir, { recursive: true })

await runWithRetryAndIgnore('favicon generation', async () => {
  const response = await fetch(sourceUrl)
  if (!response.ok) {
    throw new Error(`Failed to fetch favicon source: ${response.status} ${response.statusText}`)
  }

  const pngBuffer = Buffer.from(await response.arrayBuffer())
  const icoBuffer = await pngToIco(pngBuffer)
  await fs.writeFile(faviconPath, icoBuffer)

  console.log(`favicon written to ${faviconPath}`)
})
