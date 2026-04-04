<template>
  <section class="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
    <div class="grid gap-10 lg:min-h-[24rem] lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
      <div>
        <h1 class="max-w-3xl text-3xl font-bold leading-[1.2] tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
          {{ joinContent.title }}
        </h1>
        <p class="mt-7 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg lg:text-xl">
          {{ joinContent.summary }}
        </p>
        <div class="mt-6 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 lg:hidden">
          <p>
            服务器地址：<span class="font-semibold text-slate-900 dark:text-slate-100">{{ serverAddress }}</span>
          </p>
          <button
            type="button"
            class="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-700 transition hover:text-emerald-600 dark:border-slate-700 dark:text-slate-200 dark:hover:text-emerald-400"
            :title="copyLabel"
            :aria-label="copyLabel"
            @click="copyServerAddress"
          >
            <Icon v-if="copyLabel === '已复制'" icon="ri:check-line" class="h-4 w-4" />
            <Icon v-else-if="copyLabel === '复制失败'" icon="ri:close-line" class="h-4 w-4" />
            <Icon v-else icon="ri:file-copy-line" class="h-4 w-4" />
          </button>
        </div>

      </div>

      <div class="hidden lg:block">
        <div class="rounded-xl border border-slate-200/80 px-6 py-5 dark:border-slate-800/80">
          <p class="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">服务器状态</p>
          <div class="mt-4 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <p class="text-xl font-semibold text-slate-900 dark:text-slate-100">{{ serverAddress }}</p>
              <button
                type="button"
                class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-700 transition hover:text-emerald-600 dark:border-slate-700 dark:text-slate-200 dark:hover:text-emerald-400"
                :title="copyLabel"
                :aria-label="copyLabel"
                @click="copyServerAddress"
              >
                <Icon v-if="copyLabel === '已复制'" icon="ri:check-line" class="h-4 w-4" />
                <Icon v-else-if="copyLabel === '复制失败'" icon="ri:close-line" class="h-4 w-4" />
                <Icon v-else icon="ri:file-copy-line" class="h-4 w-4" />
              </button>
            </div>
            <span class="rounded-md border border-slate-200 px-2.5 py-1 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200">
              {{ statusText }}
            </span>
          </div>
          <p class="mt-4 text-sm text-slate-600 dark:text-slate-300">{{ statusDetail }}</p>
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
import { Icon } from '@iconify/vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { serverAddress } from '@/config/server'
import { joinContent } from '@/content/siteContent'
import { fetchServerStatus } from '@/utils/serverStatus'

const statusText = ref('获取中')
const statusDetail = ref('正在检测当前在线状态...')
const copyLabel = ref('复制')
let mediaQuery: MediaQueryList | null = null
let copyLabelTimer: number | null = null

const copyServerAddress = async () => {
  let success = false
  try {
    // 使用传统方法确保兼容性
    const textarea = document.createElement('textarea')
    textarea.value = serverAddress
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    textarea.style.pointerEvents = 'none'
    document.body.appendChild(textarea)
    textarea.select()
    success = document.execCommand('copy')
    document.body.removeChild(textarea)
  } catch {
    success = false
  }

  copyLabel.value = success ? '已复制' : '复制失败'

  if (copyLabelTimer !== null) {
    window.clearTimeout(copyLabelTimer)
  }

  copyLabelTimer = window.setTimeout(() => {
    copyLabel.value = '复制'
    copyLabelTimer = null
  }, 1600)
}

const updateByViewport = async () => {
  const isDesktop = mediaQuery?.matches ?? false
  if (!isDesktop) {
    statusText.value = '仅大屏检测'
    statusDetail.value = '移动端不显示实时探测，服务器地址如左侧所示。'
    return
  }

  try {
    const data = await fetchServerStatus()
    if (data.online) {
      statusText.value = '在线'
      statusDetail.value = `${data.playersOnline} 人在线`
    } else {
      statusText.value = '离线'
      statusDetail.value = '当前未检测到在线服务'
    }
  } catch {
    statusText.value = '失败'
    statusDetail.value = '无法获取服务器状态'
  }
}

onMounted(async () => {
  mediaQuery = window.matchMedia('(min-width: 1024px)')
  await updateByViewport()
  mediaQuery.addEventListener('change', updateByViewport)
})

onBeforeUnmount(() => {
  if (copyLabelTimer !== null) {
    window.clearTimeout(copyLabelTimer)
  }
  mediaQuery?.removeEventListener('change', updateByViewport)
})
</script>
