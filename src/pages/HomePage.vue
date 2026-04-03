<template>
  <section class="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
    <div class="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
      <div class="order-2 lg:order-1">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">{{ homeContent.hero.eyebrow }}</p>
        <h1 class="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
          {{ homeContent.hero.title }}
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">
          {{ homeContent.hero.subtitle }}
        </p>

        <div class="mt-8 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
          <div class="rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            当前在线：<span class="font-semibold text-emerald-600 dark:text-emerald-400">{{ serverStateLabel }}</span>
          </div>
          <div class="rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            服务器状态：<span class="font-semibold" :class="online ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'">{{ online ? '在线' : '获取中' }}</span>
          </div>
        </div>

        <div class="mt-8 flex flex-wrap gap-3">
          <RouterLink
            v-for="action in homeContent.hero.actions"
            :key="action.label"
            :to="'to' in action ? action.to : '/'"
            v-if="'to' in action"
            class="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-soft transition hover:-translate-y-0.5"
            :class="action.variant === 'primary' ? 'bg-emerald-500 text-white hover:bg-emerald-400' : 'border border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'"
          >
            {{ action.label }}
          </RouterLink>
          <a
            v-for="action in homeContent.hero.actions"
            v-else
            :key="action.label"
            :href="action.href"
            target="_blank"
            rel="noreferrer"
            class="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-soft transition hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            {{ action.label }}
          </a>
        </div>
      </div>

      <div class="order-1 lg:order-2">
        <div class="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 p-5 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70 sm:p-8">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_45%)]"></div>
          <div class="relative flex items-center justify-center rounded-[1.75rem] border border-slate-200/70 bg-white/90 p-8 dark:border-slate-800 dark:bg-slate-900/80">
            <img :src="homeContent.hero.image" :alt="homeContent.hero.eyebrow + ' logo'" class="h-[14rem] w-auto sm:h-[18rem]" />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-20 grid gap-8 lg:mt-28 lg:grid-cols-2">
      <article
        v-for="item in homeContent.spotlights"
        :key="item.title"
        class="overflow-hidden rounded-[2rem] border border-white/60 bg-white/75 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70"
      >
        <img :src="item.image" :alt="item.title" class="h-64 w-full object-cover" />
        <div class="p-7 sm:p-8">
          <h2 class="text-2xl font-bold tracking-tight">{{ item.title }}</h2>
          <p class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">{{ item.description }}</p>
        </div>
      </article>
    </div>

    <section class="mt-20 lg:mt-28">
      <div class="max-w-2xl">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">特色</p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">我们的特色</h2>
      </div>

      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="feature in homeContent.features"
          :key="feature.title"
          class="rounded-3xl border border-white/60 bg-white/75 p-6 shadow-soft backdrop-blur-xl transition hover:-translate-y-1 hover:border-emerald-200 dark:border-slate-800 dark:bg-slate-950/70 dark:hover:border-emerald-700"
        >
          <div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-lg font-bold text-emerald-600 dark:text-emerald-400">✦</div>
          <h3 class="mt-5 text-lg font-semibold">{{ feature.title }}</h3>
          <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <section class="mt-20 lg:mt-28">
      <div class="text-center">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">团队</p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{{ homeContent.teamTitle }}</h2>
        <p class="mt-4 text-slate-600 dark:text-slate-300">{{ homeContent.teamDescription }}</p>
      </div>

      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        <article
          v-for="member in homeContent.team"
          :key="member.name"
          class="rounded-[2rem] border border-white/60 bg-white/75 p-8 text-center shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70"
        >
          <img :src="member.avatar" :alt="member.name" class="mx-auto h-24 w-24 rounded-full border border-slate-200 object-cover shadow-md dark:border-slate-700" />
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
              class="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:text-emerald-600 dark:border-slate-800 dark:text-slate-200 dark:hover:border-emerald-700 dark:hover:text-emerald-400"
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
