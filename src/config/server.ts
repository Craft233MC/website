import siteConfig from './site.config.json'
import { joinContent } from '../content/siteContent'

const contentServerAddress = joinContent.servers[0]?.address?.trim() ?? ''

export const serverAddress = contentServerAddress

type StatusApiConfig = {
	url: string
	params: Record<string, string>
	responsePaths: {
		online: string
		playersOnline: string
		playersMax: string
	}
	onlineStringValue: string
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const toStringRecord = (value: unknown): Record<string, string> => {
	if (!isRecord(value)) return {}

	return Object.entries(value).reduce<Record<string, string>>((acc, [key, raw]) => {
		if (raw === null || raw === undefined) return acc

		const next = String(raw).trim()
		if (!next) return acc

		acc[key] = next
		return acc
	}, {})
}

const rawStatusApi: Record<string, unknown> = isRecord(siteConfig.minecraftStatusApi) ? siteConfig.minecraftStatusApi : {}
const configuredParams = toStringRecord(rawStatusApi.params)
const configuredResponsePaths = toStringRecord(rawStatusApi.responsePaths)

const resolveParamReference = (value: string) => {
	if (value === '$serverAddress') {
		return serverAddress
	}

	return value
}

const resolvedParams = Object.entries(configuredParams).reduce<Record<string, string>>((acc, [key, value]) => {
	acc[key] = resolveParamReference(value)
	return acc
}, {})

export const minecraftStatusApiConfig: StatusApiConfig = {
	url: String(rawStatusApi.url ?? '').trim(),
	params: resolvedParams,
	responsePaths: {
		online: String(configuredResponsePaths.online ?? ''),
		playersOnline: String(configuredResponsePaths.playersOnline ?? ''),
		playersMax: String(configuredResponsePaths.playersMax ?? ''),
	},
	onlineStringValue: String(rawStatusApi.onlineStringValue ?? '').trim(),
}
