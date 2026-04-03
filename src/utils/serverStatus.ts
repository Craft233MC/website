export type ServerStatus = {
  online: boolean
  playersOnline: number
}

const STATUS_API_PATH = '/api/minecraft-status'

export const fetchServerStatus = async (): Promise<ServerStatus> => {
  try {
    const response = await fetch(STATUS_API_PATH, {
      headers: {
        Accept: 'application/json',
      },
    })

    const data = await response.json()

    // Handle both success (200) and offline (503) responses
    if (response.ok || data?.online === false) {
      return {
        online: Boolean(data?.online ?? false),
        playersOnline: Number(data?.players?.online ?? 0),
      }
    }

    throw new Error(`Unexpected response: ${response.status}`)
  } catch (err) {
    // Return offline status if there's any error
    console.error('Server status check failed:', err instanceof Error ? err.message : String(err))
    return {
      online: false,
      playersOnline: 0,
    }
  }
}
