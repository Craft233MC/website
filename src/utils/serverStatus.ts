import { minecraftStatusApiConfig } from '@/config/server'

export type ServerStatus = {
  online: boolean
  playersOnline: number
  playersMax: number
}

const parseJsonBody = (rawBody: string) => {
  const trimmed = rawBody.trim()
  if (!trimmed) return null

  try {
    return JSON.parse(trimmed)
  } catch {
    return null
  }
}

const getByPath = (source: unknown, path: string): unknown => {
  const segments = path
    .split('.')
    .map((segment) => segment.trim())
    .filter(Boolean)

  return segments.reduce<unknown>((current, segment) => {
    if (!current || typeof current !== 'object') return undefined
    return (current as Record<string, unknown>)[segment]
  }, source)
}

const parseNumberValue = (value: unknown): number => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

const parseOnlineValue = (value: unknown, onlineStringValue: string): boolean => {
  if (typeof value === 'boolean') return value

  if (typeof value === 'number') {
    if (value > 1) return true
    if (value < 1) return false
    return true
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()
    if (!normalized) return false
    if (normalized === 'true') return true
    if (normalized === 'false') return false
    return normalized === onlineStringValue.trim().toLowerCase()
  }

  return false
}

const buildStatusApiUrl = () => {
  const requestUrl = new URL(minecraftStatusApiConfig.url)

  Object.entries(minecraftStatusApiConfig.params).forEach(([key, value]) => {
    requestUrl.searchParams.set(key, value)
  })

  return requestUrl.toString()
}

export const fetchServerStatus = async (): Promise<ServerStatus> => {
  try {
    const response = await fetch(buildStatusApiUrl(), {
      headers: {
        Accept: 'application/json',
      },
    })

    const rawBody = await response.text()
    const data = parseJsonBody(rawBody)

    if (!data) {
      throw new Error(`Non-JSON response from status API (${response.status})`)
    }

    const onlineRaw = getByPath(data, minecraftStatusApiConfig.responsePaths.online)
    const playersOnlineRaw = getByPath(data, minecraftStatusApiConfig.responsePaths.playersOnline)
    const playersMaxRaw = getByPath(data, minecraftStatusApiConfig.responsePaths.playersMax)

    if (!response.ok && onlineRaw === undefined) {
      throw new Error(`Unexpected response: ${response.status}`)
    }

    return {
      online: parseOnlineValue(onlineRaw, minecraftStatusApiConfig.onlineStringValue),
      playersOnline: parseNumberValue(playersOnlineRaw),
      playersMax: parseNumberValue(playersMaxRaw),
    }
  } catch (err) {
    console.error('Server status check failed:', err instanceof Error ? err.message : String(err))
    return {
      online: false,
      playersOnline: 0,
      playersMax: 0,
    }
  }
}
