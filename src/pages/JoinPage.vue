<template>
  <section class="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
    <div class="rounded-[2rem] border border-white/60 bg-white/75 p-8 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70 sm:p-10">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">加入服务器</p>
      <h1 class="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{{ joinContent.title }}</h1>
      <p class="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">{{ joinContent.summary }}</p>

      <div class="mt-8 grid gap-4 lg:grid-cols-2">
        <div
          v-for="server in joinContent.servers"
          :key="server.name"
          class="rounded-3xl border border-slate-200 bg-white/90 p-5 dark:border-slate-800 dark:bg-slate-900/80"
        >
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p class="text-sm text-slate-500 dark:text-slate-400">服务器地址</p>
              <p class="mt-1 text-xl font-semibold">{{ server.name }}</p>
            </div>
            <span class="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">{{ statusText }}</span>
          </div>

          <div class="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <p>地址：<span class="font-medium text-slate-900 dark:text-slate-100">{{ server.address }}</span></p>
            <p>类型：<span class="font-medium text-slate-900 dark:text-slate-100">{{ server.kind }}</span></p>
            <p>检测结果：<span class="font-medium text-slate-900 dark:text-slate-100">{{ statusDetail }}</span></p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-16 grid gap-8 lg:mt-24 lg:grid-cols-3">
      <article
        v-for="(step, index) in joinContent.steps"
        :key="step.title"
        class="overflow-hidden rounded-[2rem] border border-white/60 bg-white/75 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70"
      >
        <img :src="step.image" :alt="step.title" class="h-56 w-full object-cover" />
        <div class="p-6">
          <p class="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Step {{ index + 1 }}</p>
          <h2 class="mt-2 text-2xl font-bold tracking-tight">{{ step.title }}</h2>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { joinContent } from '@/content/siteContent'

const statusText = ref('获取中')
const statusDetail = ref('正在检测服务器状态...')
const online = ref<boolean | null>(null)

const buildApiUrl = (address: string) => `https://api.mcsrvstat.us/3/${address}`

onMounted(async () => {
  const server = joinContent.servers[0]
  try {
    const response = await fetch(buildApiUrl(server.apiAddress))
    const data = await response.json()
    online.value = Boolean(data?.online)
    const players = Number(data?.players?.online ?? 0)
    if (online.value) {
      statusText.value = '在线'
      statusDetail.value = `${players} 人在线 · ${data?.version ?? '未知版本'}`
    } else {
      statusText.value = '离线'
      statusDetail.value = '当前未检测到在线服务'
    }
  } catch {
    online.value = null
    statusText.value = '失败'
    statusDetail.value = '无法获取服务器状态'
  }
})
</script>
