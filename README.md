# Craft233 Website

Craft233 Server Official website

## Tech Stack

- Vue 3
- TypeScript
- Vite
- Vue Router
- Tailwind CSS
- Iconify

## Configuration

Most user-editable content is stored outside of components:

- [src/content/siteContent.ts](src/content/siteContent.ts) — site copy, navigation, footer links, page content, and SEO content sources
- [src/config/site.config.json](src/config/site.config.json) — site URL, base path, favicon source, theme color, and Minecraft status API settings
- [src/config/routes.json](src/config/routes.json) — router path definitions plus no-index flags used by sitemap and robots generation
- [src/config/theme.ts](src/config/theme.ts) — accent palette values used by the site theme
- [src/config/server.ts](src/config/server.ts) — Minecraft status API runtime config (reuses server address from `joinContent`)
- [src/utils/seo.ts](src/utils/seo.ts) — runtime SEO metadata mapping

`site.config.json` also supports callback app mapping:

```json
{
	"callbackAppLinks": {
		"rhythmlink": "https://github.com/neokoni/rhythmlink"
	}
}
```

- Keys are case-insensitive app names used by `/callback?app=...`.
- Keys are also used as the displayed app name when matched.
- When app name is mapped, callback page app label in the title will be rendered as an external link.

`site.config.json` also supports server map links:

```json
{
	"serverMapLinks": {
		"main": "https://map.craft233.top/",
		"oneblock": "https://map.craft233.top/oneblock/"
	}
}
```

- Keys are case-sensitive map IDs used by the map page.
- Values are the final map addresses opened in a new page.
- Map titles and descriptions are kept in [src/content/siteContent.ts](src/content/siteContent.ts).

SEO blacklist rules are kept in [src/config/routes.json](src/config/routes.json) and are used in two places:

- Runtime `robots` meta tags for pages that should not be indexed.
- Build-time robots and sitemap files are generated after `vite build` into [dist/](dist/), using the shared route config.

The current blacklist is stored in [src/config/routes.json](src/config/routes.json) and includes the callback page and the 404 fallback page.

The favicon is downloaded during the build step from the configured remote URL and written into [dist/](dist/).

The font is kept locally in [public/fonts/InterVariable.woff2](public/fonts/InterVariable.woff2) and copied into [dist/](dist/) by Vite.

Generated build artifacts are not committed to the repository.

When changing public-facing text, links, or branding, prefer updating these files instead of editing components directly.

## Development

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Minecraft Status API Configuration

The status widget now uses an external HTTP API only.

Edit [src/config/site.config.json](src/config/site.config.json):

```json
{
	"minecraftStatusApi": {
		"url": "https://motd.minebbs.com/api/status",
		"params": {
			"ip": "$serverAddress",
			"stype": "je",
			"srv": "true"
		},
		"responsePaths": {
			"online": "status",
			"playersOnline": "players.online",
			"playersMax": "players.max"
		},
		"onlineStringValue": "online"
	}
}
```

- `url`: external API endpoint.
- `params`: query parameter map. `ip` can use string reference `"$serverAddress"` (`serverAddress` comes from [src/config/server.ts](src/config/server.ts), which reuses `joinContent.servers[0].address` from [src/content/siteContent.ts](src/content/siteContent.ts)).
- API config is read only from [src/config/site.config.json](src/config/site.config.json): no environment variable override, and no fallback defaults are injected in `server.ts`.
- `responsePaths`: dot-path mapping for key fields (`online`, `playersOnline`, `playersMax`).
- `onlineStringValue`: when `online` path resolves to a string, it is compared with this value (case-insensitive).

Online value parsing behavior:

- Boolean: use directly (`true` / `false`).
- Number: `> 1` => online, `< 1` => offline, `= 1` => online.
- String: first try `"true"` / `"false"`, otherwise compare with `onlineStringValue`.

## AI Development Guide

If you are an AI coding assistant working on this project:

1. Keep content and configuration in the dedicated files listed above.
2. Avoid hardcoding site copy inside Vue components unless it is purely presentational.
3. Make small, focused changes and keep layout/style adjustments minimal.
4. Run a production build after edits to verify the site still compiles.
5. Prefer updating existing configuration files before creating new ones.

## Notes

- The application updates document metadata at runtime.
- `index.html` only keeps minimal fallback markup.
- The server status widget is powered by a configurable external status API.
