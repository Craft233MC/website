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
- [src/config/site.config.json](src/config/site.config.json) — site base path, favicon source, and theme color
- [src/config/theme.ts](src/config/theme.ts) — accent palette values used by the site theme
- [src/config/server.ts](src/config/server.ts) — Minecraft server address used by the status display
- [src/utils/seo.ts](src/utils/seo.ts) — runtime SEO metadata mapping

The favicon is downloaded during the prebuild step from the configured remote URL when available. If the download fails, the build continues and the existing favicon is left unchanged.

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
- The server status endpoint is implemented locally and does not rely on an external status API.
