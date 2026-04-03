<template>
  <div class="min-h-screen text-slate-900 dark:text-slate-100">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg dark:focus:bg-slate-900"
    >
      跳到内容
    </a>

    <header class="sticky top-0 z-50 border-b border-slate-200/80 bg-white/45 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/45">
      <div class="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <RouterLink to="/" class="flex items-center gap-3">
          <img :src="siteBrand.logo" :alt="siteBrand.name + ' logo'" class="h-8 w-auto" />
          <div class="leading-tight">
            <div class="text-sm font-semibold tracking-[0.24em] text-emerald-600 uppercase dark:text-emerald-400">Craft233</div>
            <div class="text-xs text-slate-500 dark:text-slate-400">Minecraft 生存服务器</div>
          </div>
        </RouterLink>

        <nav class="hidden items-center gap-1 lg:flex">
          <template v-for="item in navigation" :key="item.label">
            <RouterLink
              v-if="'to' in item"
              :to="item.to"
              class="nav-link px-2 py-2 text-sm font-medium text-slate-700 dark:text-slate-200"
              active-class="nav-link-active"
            >
              <span class="nav-link-text">{{ item.label }}</span>
            </RouterLink>
            <a
              v-else
              :href="item.href"
              target="_blank"
              rel="noreferrer"
              class="nav-link px-2 py-2 text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              <span class="nav-link-text">{{ item.label }}</span>
            </a>
          </template>
        </nav>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-transparent text-slate-700 transition hover:text-emerald-600 dark:border-slate-800 dark:text-slate-200 dark:hover:text-emerald-300"
            :aria-label="theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'"
            @click="toggleTheme"
          >
            <svg v-if="theme === 'dark'" viewBox="0 0 24 24" class="h-5 w-5 fill-none stroke-current stroke-2">
              <path d="M12 3v2M12 19v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M3 12h2M19 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              <circle cx="12" cy="12" r="4" />
            </svg>
            <svg v-else viewBox="0 0 24 24" class="h-5 w-5 fill-none stroke-current stroke-2">
              <path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9Z" />
            </svg>
          </button>

          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-transparent text-slate-700 transition hover:text-emerald-600 dark:border-slate-800 dark:text-slate-200 dark:hover:text-emerald-300 lg:hidden"
            aria-label="打开菜单"
            @click="menuOpen = true"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5 fill-none stroke-current stroke-2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <Transition name="fade">
      <div v-if="menuOpen" class="fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-sm lg:hidden" @click.self="menuOpen = false">
        <Transition name="mobile-menu" appear>
          <div class="mx-auto mt-3 w-[min(94vw,42rem)] rounded-xl border border-slate-200 bg-white/95 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/95">
          <div class="mb-6 flex items-center justify-between">
            <div>
              <div class="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-400">Craft233</div>
              <div class="text-xs text-slate-500 dark:text-slate-400">站点导航</div>
            </div>
            <button
              type="button"
              class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-200"
              aria-label="关闭菜单"
              @click="menuOpen = false"
            >
              ✕
            </button>
          </div>

          <nav class="flex flex-col gap-2">
            <template v-for="item in navigation" :key="item.label">
              <RouterLink
                v-if="'to' in item"
                :to="item.to"
                class="rounded-md px-4 py-3 text-sm font-medium text-slate-700 transition hover:text-emerald-600 dark:text-slate-200 dark:hover:text-emerald-400"
                active-class="text-emerald-600 dark:text-emerald-400"
                @click="menuOpen = false"
              >
                  {{ item.label }}
              </RouterLink>
              <a
                v-else
                :href="item.href"
                target="_blank"
                rel="noreferrer"
                class="rounded-md px-4 py-3 text-sm font-medium text-slate-700 transition hover:text-emerald-600 dark:text-slate-200 dark:hover:text-emerald-400"
              >
                {{ item.label }}
              </a>
            </template>
          </nav>
          </div>
        </Transition>
      </div>
    </Transition>

    <main id="main-content">
      <slot />
    </main>

    <footer class="mt-24 bg-white/65 backdrop-blur-xl dark:bg-slate-950/65">
      <div class="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          <div>
            <RouterLink to="/" class="flex items-center gap-3">
              <img :src="siteBrand.logo" :alt="siteBrand.name + ' logo'" class="h-9 w-auto" />
              <span class="text-2xl font-semibold tracking-tight">Craft233</span>
            </RouterLink>
            <p class="mt-5 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-400">
              {{ siteBrand.description }}
            </p>
            <ul class="mt-5 space-y-1 text-sm text-slate-500 dark:text-slate-400">
              <li v-for="item in legalNotice" :key="item">{{ item }}</li>
            </ul>
          </div>

          <div v-for="group in footerGroups" :key="group.title">
            <p class="mb-4 text-sm font-semibold text-slate-500 uppercase tracking-[0.18em] dark:text-slate-400">{{ group.title }}</p>
            <ul class="space-y-3">
              <li v-for="link in group.links" :key="link.label">
                <a :href="link.href" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-emerald-600 dark:text-slate-200 dark:hover:text-emerald-400">
                  <Icon :icon="link.icon" class="h-4 w-4" />
                  {{ link.label }}
                  <Icon icon="ri:external-link-line" class="h-4 w-4 opacity-80" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 lg:flex-row lg:items-center lg:justify-between">
          <p>© 2023-{{ currentYear }} Craft233. All rights reserved.</p>
          <div class="flex flex-wrap items-center gap-4">
            <a href="https://icp.gov.moe/?keyword=20232336" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400">
              <Icon icon="ri:shield-check-line" class="h-4 w-4" />萌ICP备20232336号
            </a>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400">
              <Icon icon="ri:file-list-3-line" class="h-4 w-4" />蜀ICP备2024074700号-1
            </a>
            <a href="https://beian.mps.gov.cn/#/query/webSearch?code=51130402000151" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400">
              <Icon icon="ri:government-line" class="h-4 w-4" />川公网安备51130402000151号
            </a>
          </div>
          <div class="flex items-center gap-4 text-slate-600 dark:text-slate-300">
            <a
              v-for="social in footerSocialLinks"
              :key="social.label"
              :href="social.href"
              :aria-label="social.label"
              target="_blank"
              rel="noreferrer"
              class="inline-flex h-9 w-9 items-center justify-center rounded-md transition hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              <Icon :icon="social.icon" class="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { footerGroups, footerSocialLinks, legalNotice, navigation, siteBrand } from '@/content/siteContent'

const route = useRoute()
const menuOpen = ref(false)
const theme = ref<'light' | 'dark'>('light')
const currentYear = computed(() => new Date().getFullYear())

const applyTheme = () => {
  document.documentElement.classList.toggle('dark', theme.value === 'dark')
  localStorage.setItem('craft233-theme', theme.value)
}

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

onMounted(() => {
  const saved = localStorage.getItem('craft233-theme')
  if (saved === 'light' || saved === 'dark') {
    theme.value = saved
  } else {
    theme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  applyTheme()
})

watch(theme, applyTheme)
watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: transform 0.24s ease, opacity 0.24s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  transform: translateY(-14px);
  opacity: 0;
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.nav-link-text {
  position: relative;
  display: inline-block;
}

.nav-link-text::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 66%;
  height: 2.5px;
  background-color: rgb(5 150 105);
  border-radius: 9999px;
  transform-origin: left;
  transform: scaleX(0);
  transition: transform 0.28s ease;
}

.nav-link:hover .nav-link-text::after {
  transform: scaleX(1);
}

.nav-link:active .nav-link-text::after {
  animation: nav-line-bounce 0.34s ease;
}

.nav-link-active .nav-link-text::after {
  transform: scaleX(1);
}

.nav-link-active {
  color: rgb(5 150 105);
}

.dark .nav-link-active {
  color: rgb(52 211 153);
}

@keyframes nav-line-bounce {
  0% {
    transform: scaleX(1);
  }
  55% {
    transform: scaleX(1.1);
  }
  100% {
    transform: scaleX(1);
  }
}
</style>
