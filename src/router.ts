import { createRouter, createWebHistory } from 'vue-router'
import { pages } from '@/content/siteContent'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('@/pages/HomePage.vue'), meta: { title: pages.home.title } },
    { path: '/join', name: 'join', component: () => import('@/pages/JoinPage.vue'), meta: { title: pages.join.title } },
    { path: '/rules', name: 'rules', component: () => import('@/pages/RulesPage.vue'), meta: { title: pages.rules.title } },
    { path: '/archive', name: 'archive', component: () => import('@/pages/ArchivePage.vue'), meta: { title: pages.archive.title } },
    { path: '/contribute', name: 'contribute', component: () => import('@/pages/ContributePage.vue'), meta: { title: pages.contribute.title } },
    { path: '/sponsors', name: 'sponsors', component: () => import('@/pages/SponsorsPage.vue'), meta: { title: pages.sponsors.title } },
    { path: '/friendlinks', name: 'friendlinks', component: () => import('@/pages/FriendLinksPage.vue'), meta: { title: pages.friendlinks.title } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/pages/NotFoundPage.vue'), meta: { title: '页面不存在' } },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : ''
  document.title = title ? `Craft233 - ${title}` : 'Craft233'

  const description = 'Craft233，一个休闲养老摸鱼系的 Minecraft 小服务器，欢迎加入我们，同我们一起成长。'
  const meta = document.querySelector('meta[name="description"]')
  if (meta) {
    meta.setAttribute('content', description)
  }
})

export default router
