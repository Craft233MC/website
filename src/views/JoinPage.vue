<template>
  <section class="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
    <div class="p-2 sm:p-0">
      <h1 class="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{{ joinContent.title }}</h1>
      <p class="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">{{ joinContent.summary }}</p>

      <div class="mt-8 space-y-4">
        <div
          v-for="server in joinContent.servers"
          :key="server.name"
          class="p-5"
        >
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p class="text-sm text-slate-500 dark:text-slate-400">服务器地址</p>
              <p class="mt-1 text-xl font-semibold">{{ server.name }}</p>
            </div>
            <span class="rounded-md px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-300">{{ statusText }}</span>
          </div>

          <div class="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <p>地址：<span class="font-medium text-slate-900 dark:text-slate-100">{{ server.address }}</span></p>
            <p>类型：<span class="font-medium text-slate-900 dark:text-slate-100">{{ server.kind }}</span></p>
            <p>检测结果：<span class="font-medium text-slate-900 dark:text-slate-100">{{ statusDetail }}</span></p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-16 space-y-12 lg:mt-24">
      <article
        v-for="(step, index) in joinContent.steps"
        :key="step.title"
        class="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
      >
        <img :src="step.image" :alt="step.title" class="h-64 w-full rounded-md object-cover" :class="index % 2 === 1 ? 'lg:order-2' : ''" />
        <div :class="index % 2 === 1 ? 'lg:order-1' : ''">
          <h2 class="mt-2 text-2xl font-bold tracking-tight">{{ step.title }}</h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">第 {{ index + 1 }} 步</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
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
