import { createRouter, createWebHistory } from 'vue-router'
import { pages } from '@/content/siteContent'
import { applySeo } from '@/utils/seo'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomePage.vue'), meta: { title: pages.home.title } },
    { path: '/about', name: 'about', component: () => import('@/views/AboutPage.vue'), meta: { title: pages.about.title } },
    { path: '/join', name: 'join', component: () => import('@/views/JoinPage.vue'), meta: { title: pages.join.title } },
    { path: '/maps', name: 'maps', component: () => import('@/views/MapsPage.vue'), meta: { title: pages.maps.title } },
    { path: '/callback', name: 'callback', component: () => import('@/views/CallbackPage.vue'), meta: { title: pages.callback.title } },
    { path: '/rules', name: 'rules', component: () => import('@/views/RulesPage.vue'), meta: { title: pages.rules.title } },
    { path: '/archive', name: 'archive', component: () => import('@/views/ArchivePage.vue'), meta: { title: pages.archive.title } },
    { path: '/contribute', name: 'contribute', component: () => import('@/views/ContributePage.vue'), meta: { title: pages.contribute.title } },
    { path: '/sponsors', name: 'sponsors', component: () => import('@/views/SponsorsPage.vue'), meta: { title: pages.sponsors.title } },
    { path: '/friendlinks', name: 'friendlinks', component: () => import('@/views/FriendLinksPage.vue'), meta: { title: pages.friendlinks.title } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundPage.vue'), meta: { title: '页面不存在' } },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const routeKey = typeof to.name === 'string' ? to.name : 'home'
  applySeo(routeKey as Parameters<typeof applySeo>[0])
})

export default router
