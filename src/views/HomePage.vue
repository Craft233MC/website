<template>
  <section class="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
    <div class="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
      <div class="order-2 lg:order-1">
        <h1 class="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
          {{ homeContent.hero.title }}
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">
          {{ homeContent.hero.subtitle }}
        </p>

        <div class="mt-8 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
          <div class="rounded-md bg-slate-100 px-4 py-2 dark:bg-slate-800/70">
            当前在线：<span class="font-semibold text-emerald-600 dark:text-emerald-400">{{ serverStateLabel }}</span>
          </div>
          <div class="rounded-md bg-slate-100 px-4 py-2 dark:bg-slate-800/70">
            服务器状态：<span class="font-semibold" :class="online ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'">{{ online ? '在线' : '获取中' }}</span>
          </div>
        </div>

        <div class="mt-8 flex flex-wrap gap-3">
          <template v-for="action in homeContent.hero.actions" :key="action.label">
            <RouterLink
              v-if="isInternalAction(action)"
              :to="action.to"
              class="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition"
              :class="action.variant === 'primary' ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-100 text-slate-700 hover:text-emerald-700 dark:bg-slate-800/70 dark:text-slate-200'"
            >
              {{ action.label }}
            </RouterLink>
            <a
              v-else
              :href="action.href"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center justify-center rounded-md bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:text-emerald-700 dark:bg-slate-800/70 dark:text-slate-200"
            >
              {{ action.label }}
            </a>
          </template>
        </div>
      </div>

      <div class="order-1 lg:order-2">
        <div class="overflow-hidden rounded-md bg-slate-100 p-6 dark:bg-slate-900/60">
          <div class="flex items-center justify-center bg-white p-8 dark:bg-slate-900">
            <img :src="homeContent.hero.image" :alt="homeContent.hero.eyebrow + ' logo'" class="h-[14rem] w-auto sm:h-[18rem]" />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-20 space-y-16 lg:mt-28">
      <article
        v-for="(item, index) in homeContent.spotlights"
        :key="item.title"
        class="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
      >
        <img :src="item.image" :alt="item.title" class="h-72 w-full rounded-md object-cover" :class="index % 2 === 1 ? 'lg:order-2' : ''" />
        <div :class="index % 2 === 1 ? 'lg:order-1' : ''">
          <h2 class="text-2xl font-bold tracking-tight">{{ item.title }}</h2>
          <p class="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{{ item.description }}</p>
        </div>
      </article>
    </div>

    <section class="mt-20 lg:mt-28">
      <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">我们的特色</h2>

      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="feature in homeContent.features"
          :key="feature.title"
          class="bg-slate-100 p-6 dark:bg-slate-900/60"
        >
          <div class="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-emerald-100 text-base font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">✦</div>
          <h3 class="mt-5 text-lg font-semibold">{{ feature.title }}</h3>
          <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <section class="mt-20 lg:mt-28">
      <div class="text-center">
        <h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{{ homeContent.teamTitle }}</h2>
        <p class="mt-4 text-slate-600 dark:text-slate-300">{{ homeContent.teamDescription }}</p>
      </div>

      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        <article
          v-for="member in homeContent.team"
          :key="member.name"
          class="bg-slate-100 p-8 text-center dark:bg-slate-900/60"
        >
          <img :src="member.avatar" :alt="member.name" class="mx-auto h-24 w-24 rounded-full object-cover" />
          <h3 class="mt-5 text-xl font-semibold">{{ member.name }}</h3>
          <p class="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">{{ member.role }}</p>
          <p v-for="line in member.bio" :key="line" class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            {{ line }}
          </p>
          <div v-if="member.links.length" class="mt-5 flex items-center justify-center gap-3">
            <a
              v-for="link in member.links"
              :key="link.label"
              :href="link.href"
              target="_blank"
              rel="noreferrer"
              class="rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:text-emerald-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:text-emerald-400"
            >
              {{ link.label }}
            </a>
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
