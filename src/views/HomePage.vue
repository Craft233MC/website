<template>
  <section class="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
    <div class="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
      <div class="order-2 lg:order-1">
        <h1 class="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
          {{ homeContent.hero.title }}
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">
          {{ homeContent.hero.subtitle }}
        </p>

        <div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>当前在线：<span class="font-semibold text-emerald-600 dark:text-emerald-400">{{ serverStateLabel }}</span></span>
          <span>服务器状态：<span class="font-semibold" :class="online ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'">{{ online ? '在线' : '获取中' }}</span></span>
        </div>

        <div class="mt-8 flex flex-wrap gap-3">
          <template v-for="action in homeContent.hero.actions" :key="action.label">
            <RouterLink
              v-if="isInternalAction(action)"
              :to="action.to"
              class="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition"
              :class="action.variant === 'primary' ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'text-slate-700 hover:text-emerald-700 dark:text-slate-200 dark:hover:text-emerald-400'"
            >
              {{ action.label }}
            </RouterLink>
            <a
              v-else
              :href="action.href"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:text-emerald-700 dark:text-slate-200 dark:hover:text-emerald-400"
            >
              {{ action.label }}
            </a>
          </template>
        </div>
      </div>

      <div class="order-1 lg:order-2">
        <img :src="homeContent.hero.image" :alt="homeContent.hero.eyebrow + ' logo'" class="mx-auto h-[14rem] w-auto sm:h-[18rem]" />
      </div>
    </div>

    <div class="mt-20 space-y-16 border-t border-slate-200 pt-16 dark:border-slate-800 lg:mt-28 lg:pt-20">
      <article
        v-for="(item, index) in homeContent.spotlights"
        :key="item.title"
        class="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
      >
        <img
          :src="item.image"
          :alt="item.title"
          class="h-72 w-full rounded-md object-cover"
          :class="index % 2 === 1 ? 'lg:order-2' : ''"
        />
        <div :class="index % 2 === 1 ? 'lg:order-1' : ''">
          <h2 class="text-2xl font-bold tracking-tight">{{ item.title }}</h2>
          <p class="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{{ item.description }}</p>
        </div>
      </article>
    </div>

    <section class="mt-20 lg:mt-28">
      <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">{{ homeContent.teamTitle }}</h2>
      <p class="mt-4 text-slate-600 dark:text-slate-300">{{ homeContent.teamDescription }}</p>

      <div class="mt-10 grid gap-8 border-t border-slate-200 pt-8 dark:border-slate-800 md:grid-cols-2 lg:grid-cols-3">
        <article v-for="member in homeContent.team" :key="member.name" class="grid gap-6 md:grid-cols-[112px_1fr] md:items-start">
          <img :src="member.avatar" :alt="member.name" class="h-24 w-24 rounded-full object-cover md:justify-self-start" />
          <div>
            <h3 class="text-xl font-semibold">{{ member.name }}</h3>
            <p class="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">{{ member.role }}</p>
            <p v-for="line in member.bio" :key="line" class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {{ line }}
            </p>
            <div v-if="member.links.length" class="mt-5 flex flex-wrap items-center gap-3">
              <a
                v-for="link in member.links"
                :key="link.label"
                :href="link.href"
                target="_blank"
                rel="noreferrer"
                class="text-sm font-medium text-slate-700 transition hover:text-emerald-600 dark:text-slate-200 dark:hover:text-emerald-400"
              >
                {{ link.label }}
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { homeContent } from '@/content/siteContent'

const isInternalAction = (
  action: (typeof homeContent.hero.actions)[number],
): action is Extract<(typeof homeContent.hero.actions)[number], { to: string }> => 'to' in action

const online = ref(false)
const playersOnline = ref<number | null>(null)

const serverStateLabel = computed(() => {
  if (playersOnline.value === null) {
    return '获取中'
  }
  return playersOnline.value > 0 ? `${playersOnline.value} 名` : '暂无'
})

onMounted(async () => {
  try {
    const response = await fetch('https://api.mcsrvstat.us/3/mc.craft233.top')
    const data = await response.json()
    online.value = Boolean(data?.online)
    playersOnline.value = Number(data?.players?.online ?? 0)
  } catch {
    online.value = false
    playersOnline.value = 0
  }
})
</script>