import {
  aboutContent,
  archiveContent,
  contributeContent,
  friendLinksContent,
  homeContent,
  joinContent,
  pages,
  rulesContent,
  siteBrand,
  serverMapContent,
  sponsorsContent,
} from '@/content/siteContent'
import routeDefinitions from '@/config/routes.json'
import siteConfig from '@/config/site.config.json'

export const siteOrigin = siteConfig.siteUrl
export const siteBasePath = siteConfig.basePath === '/dev' ? '/dev' : ''
export const siteFavicon = '/favicon.png'

export type SeoInfo = {
  title: string
  description: string
  overview: string
  canonical: string
  image: string
  robots?: string
}

type RouteKey = keyof typeof pages | 'not-found'

const routeLookup = new Map(routeDefinitions.map((route) => [route.name, route]))

const noIndexPaths = new Set(
  routeDefinitions.filter((route) => route.noIndex).map((route) => route.path),
)

const routePaths: Record<RouteKey, string | null> = {
  home: routeLookup.get('home')?.path ?? '/',
  about: routeLookup.get('about')?.path ?? '/about',
  join: routeLookup.get('join')?.path ?? '/join',
  maps: routeLookup.get('maps')?.path ?? '/maps',
  callback: routeLookup.get('callback')?.path ?? '/callback',
  rules: routeLookup.get('rules')?.path ?? '/rules',
  archive: routeLookup.get('archive')?.path ?? '/archive',
  contribute: routeLookup.get('contribute')?.path ?? '/contribute',
  sponsors: routeLookup.get('sponsors')?.path ?? '/sponsors',
  friendlinks: routeLookup.get('friendlinks')?.path ?? '/friendlinks',
  'not-found': routeLookup.get('not-found')?.path ?? null,
}

const compact = (values: string[], limit = 3) => values.filter(Boolean).slice(0, limit).join('、')

const shortText = (value: string, length = 120) => {
  const text = value.replace(/\s+/g, ' ').trim()
  return text.length > length ? `${text.slice(0, length).trimEnd()}…` : text
}

const seoMap: Record<RouteKey, SeoInfo> = {
  home: {
    title: `Craft233 - ${pages.home.title}`,
    description: shortText(`${siteBrand.description}${homeContent.hero.subtitle}${homeContent.spotlights[0]?.description ?? ''}`, 160),
    overview: compact([...homeContent.spotlights.map((item) => item.title), homeContent.teamTitle]),
    canonical: `${siteOrigin}${siteBasePath}/`,
    image: homeContent.hero.image,
  },
  about: {
    title: `Craft233 - ${pages.about.title}`,
    description: shortText(`${aboutContent.subtitle}${aboutContent.paragraphs.join('')}`, 160),
    overview: compact(aboutContent.timeline.map((item) => item.title)),
    canonical: `${siteOrigin}${siteBasePath}/about`,
    image: homeContent.hero.image,
  },
  join: {
    title: `Craft233 - ${pages.join.title}`,
    description: shortText(`${joinContent.summary}${joinContent.servers.map((s) => `${s.name} ${s.address}`).join('、')}${joinContent.steps.map((step) => step.title).join('、')}`, 160),
    overview: compact(joinContent.steps.map((step) => step.title)),
    canonical: `${siteOrigin}${siteBasePath}/join`,
    image: joinContent.steps[0]?.image ?? homeContent.hero.image,
  },
  maps: {
    title: `Craft233 - ${pages.maps.title}`,
    description: shortText(`${serverMapContent.summary}${serverMapContent.items.map((item) => `${item.title}${item.description ?? ''}`).join('；')}`, 160),
    overview: compact(serverMapContent.items.map((item) => item.title)),
    canonical: `${siteOrigin}${siteBasePath}/maps`,
    image: homeContent.hero.image,
  },
  callback: {
    title: `Craft233 - ${pages.callback.title}`,
    description: '第三方应用授权回调页面，用于生成服务器端执行命令。',
    overview: 'OAuth callback',
    canonical: `${siteOrigin}${siteBasePath}/callback`,
    image: homeContent.hero.image,
    robots: 'noindex, nofollow',
  },
  rules: {
    title: `Craft233 - ${pages.rules.title}`,
    description: shortText(rulesContent.slice(0, 3).join('；'), 160),
    overview: compact([rulesContent[0] ?? '', rulesContent[1] ?? '', rulesContent[2] ?? '']),
    canonical: `${siteOrigin}${siteBasePath}/rules`,
    image: homeContent.hero.image,
  },
  archive: {
    title: `Craft233 - ${pages.archive.title}`,
    description: shortText(archiveContent.map((item) => `${item.title}${item.dateRange}${item.description}`).join('；'), 160),
    overview: compact(archiveContent.map((item) => item.title)),
    canonical: `${siteOrigin}${siteBasePath}/archive`,
    image: archiveContent[0]?.image ?? homeContent.hero.image,
  },
  contribute: {
    title: `Craft233 - ${pages.contribute.title}`,
    description: shortText(contributeContent.map((item) => `${item.title}${item.description}`).join('；'), 160),
    overview: compact(contributeContent.map((item) => item.title)),
    canonical: `${siteOrigin}${siteBasePath}/contribute`,
    image: homeContent.hero.image,
  },
  sponsors: {
    title: `Craft233 - ${pages.sponsors.title}`,
    description: shortText(`感谢各位对 Craft233 的信任。${sponsorsContent.map((item) => `${item.name}${item.message}`).join('；')}`, 160),
    overview: compact(sponsorsContent.map((item) => item.name)),
    canonical: `${siteOrigin}${siteBasePath}/sponsors`,
    image: homeContent.hero.image,
  },
  friendlinks: {
    title: `Craft233 - ${pages.friendlinks.title}`,
    description: shortText(`欢迎加入与我们互换友链。${friendLinksContent.map((item) => `${item.name}${item.intro.join('，')}`).join('；')}`, 160),
    overview: compact(friendLinksContent.map((item) => item.name)),
    canonical: `${siteOrigin}${siteBasePath}/friendlinks`,
    image: homeContent.hero.image,
  },
  'not-found': {
    title: 'Craft233 - 页面不存在',
    description: '页面没有找到，请返回首页继续浏览 Craft233。',
    overview: '404 页面',
    canonical: `${siteOrigin}${siteBasePath}/`,
    image: homeContent.hero.image,
  },
}

const ensureMeta = (selector: string, attrs: Record<string, string>) => {
  const key = Object.entries(attrs)
    .map(([name, value]) => `${name}=${value}`)
    .join('|')
  const existing = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null

  if (existing) {
    Object.entries(attrs).forEach(([name, value]) => existing.setAttribute(name, value))
    return existing
  }

  const el = selector.startsWith('link') ? document.createElement('link') : document.createElement('meta')
  Object.entries(attrs).forEach(([name, value]) => el.setAttribute(name, value))
  document.head.appendChild(el)
  return el
}

const updateLink = (rel: string, href: string, attrs: Record<string, string> = {}) => {
  const selector = `link[rel="${rel}"]`
  const existing = document.head.querySelector(selector) as HTMLLinkElement | null
  if (existing) {
    existing.setAttribute('href', href)
    Object.entries(attrs).forEach(([name, value]) => existing.setAttribute(name, value))
    return existing
  }

  const link = document.createElement('link')
  link.setAttribute('rel', rel)
  link.setAttribute('href', href)
  Object.entries(attrs).forEach(([name, value]) => link.setAttribute(name, value))
  document.head.appendChild(link)
  return link
}

export const applySeo = (routeKey: RouteKey) => {
  const seo = seoMap[routeKey] ?? seoMap.home
  const routePath = routePaths[routeKey]
  const shouldNoIndex = routePath ? noIndexPaths.has(routePath) : false

  document.title = seo.title

  ensureMeta('meta[name="description"]', { name: 'description', content: seo.description })
  ensureMeta('meta[name="overview"]', { name: 'overview', content: seo.overview })
  ensureMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title })
  ensureMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description })
  ensureMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
  ensureMeta('meta[property="og:url"]', { property: 'og:url', content: seo.canonical })
  ensureMeta('meta[property="og:image"]', { property: 'og:image', content: seo.image })
  ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
  ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: seo.title })
  ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.description })
  ensureMeta('meta[name="theme-color"]', { name: 'theme-color', content: siteConfig.themeColor ?? '#10b981' })
  ensureMeta('meta[name="robots"]', { name: 'robots', content: seo.robots ?? (shouldNoIndex ? 'noindex, nofollow' : 'index, follow') })

  updateLink('canonical', seo.canonical)
  updateLink('icon', siteFavicon, { type: 'image/png' })
  updateLink('apple-touch-icon', siteFavicon, { type: 'image/png' })
}
