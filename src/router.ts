import { createRouter, createWebHistory } from 'vue-router'
import routeDefinitions from '@/config/routes.json'
import { applySeo } from '@/utils/seo'

const componentMap = {
  HomePage: () => import('@/views/HomePage.vue'),
  AboutPage: () => import('@/views/AboutPage.vue'),
  JoinPage: () => import('@/views/JoinPage.vue'),
  MapsPage: () => import('@/views/MapsPage.vue'),
  CallbackPage: () => import('@/views/CallbackPage.vue'),
  RulesPage: () => import('@/views/RulesPage.vue'),
  ArchivePage: () => import('@/views/ArchivePage.vue'),
  ContributePage: () => import('@/views/ContributePage.vue'),
  SponsorsPage: () => import('@/views/SponsorsPage.vue'),
  FriendLinksPage: () => import('@/views/FriendLinksPage.vue'),
  NotFoundPage: () => import('@/views/NotFoundPage.vue'),
} as const

const router = createRouter({
  history: createWebHistory(),
  routes: routeDefinitions.map((route) => ({
    path: route.path,
    name: route.name,
    component: componentMap[route.component as keyof typeof componentMap],
    meta: { title: route.title, noIndex: route.noIndex ?? false },
  })),
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const routeKey = typeof to.name === 'string' ? to.name : 'home'
  applySeo(routeKey as Parameters<typeof applySeo>[0])
})

export default router
