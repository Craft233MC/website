const DEFAULT_SERVER_ADDRESS = 'mc.craft233.top'

const configuredAddress = import.meta.env.VITE_MC_SERVER_ADDRESS?.trim() ?? ''

export const serverAddress = configuredAddress || DEFAULT_SERVER_ADDRESS
