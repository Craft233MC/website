export type ServerStatus = {
  online: boolean
  playersOnline: number
}

const STATUS_API_PATH = '/api/minecraft-status'

export const fetchServerStatus = async (): Promise<ServerStatus> => {
  const response = await fetch(STATUS_API_PATH, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch server status: ${response.status}`)
  }

  const data = await response.json()
  return {
    online: Boolean(data?.online),
    playersOnline: Number(data?.players?.online ?? 0),
  }
}
