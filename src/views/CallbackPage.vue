<template>
  <section class="mx-auto flex min-h-[calc(100vh-16rem)] w-full max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
    <div class="w-full max-w-2xl rounded-xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/80 sm:p-8">
      <template v-if="errorMessage">
        <p class="text-sm font-semibold tracking-[0.2em] text-rose-500 uppercase">授权错误</p>
        <h1 class="mt-4 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">无效的回调参数</h1>
        <p class="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{{ errorMessage }}</p>
      </template>

      <template v-else>
        <p class="text-sm font-semibold tracking-[0.2em] text-emerald-600 uppercase dark:text-emerald-400">授权完成</p>
        <h1 class="mt-4 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
          您已完成对
          <a
            v-if="displayAppName && appLink"
            :href="appLink"
            target="_blank"
            rel="noreferrer"
            class="text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
          >
            {{ displayAppName }}
          </a>
          <span v-else>
            {{ displayAppName || '该应用' }}
          </span>
          的授权
        </h1>
        <p class="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
          复制以下命令并在服务器执行即可。
        </p>

        <div class="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/60">
          <p class="break-all font-mono text-sm leading-7 text-slate-800 dark:text-slate-200">{{ commandToShow }}</p>
        </div>

        <div class="mt-5">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md border border-emerald-600 bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
            @click="copyCommand"
          >
            {{ copyButtonText }}
          </button>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import siteConfig from '@/config/site.config.json'

type CallbackAppLinks = Record<string, string>

const callbackUrl = new URL(window.location.href)
const hasAnyParams = callbackUrl.searchParams.toString().length > 0

const commandParam = callbackUrl.searchParams.get('command')?.trim() ?? ''
const codeParam = callbackUrl.searchParams.get('code')?.trim() ?? ''
const appName = callbackUrl.searchParams.get('app')?.trim() ?? ''

const normalizedCommand = commandParam.replace(/^\/+/, '')
const commandToShow = `/${normalizedCommand} ${codeParam}`.trim()

const errorMessage = computed(() => {
  if (!hasAnyParams) {
    return '回调页面未检测到任何参数。'
  }

  if (!commandParam || !codeParam) {
    return '缺少必要参数：command 与 code 必须同时提供。'
  }

  return ''
})

const appLinks = (siteConfig.callbackAppLinks ?? {}) as CallbackAppLinks
const matchedAppEntry = computed(() => {
  if (!appName) {
    return null
  }

  const normalizedAppName = appName.toLowerCase()
  const matched = Object.entries(appLinks).find(([configuredName]) => configuredName.toLowerCase() === normalizedAppName)

  if (!matched) {
    return null
  }

  return {
    name: matched[0],
    link: matched[1],
  }
})

const displayAppName = computed(() => matchedAppEntry.value?.name ?? appName)
const appLink = computed(() => {
  return matchedAppEntry.value?.link ?? ''
})

const copyButtonText = ref('一键复制')
let copyFeedbackTimer: number | null = null

const copyCommand = async () => {
  if (errorMessage.value) {
    return
  }

  let success = false

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(commandToShow)
      success = true
    }
  } catch {
    success = false
  }

  if (!success) {
    try {
      const textarea = document.createElement('textarea')
      textarea.value = commandToShow
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
  }

  copyButtonText.value = success ? '已复制' : '复制失败'

  if (copyFeedbackTimer !== null) {
    window.clearTimeout(copyFeedbackTimer)
  }

  copyFeedbackTimer = window.setTimeout(() => {
    copyButtonText.value = '一键复制'
    copyFeedbackTimer = null
  }, 1600)
}

onBeforeUnmount(() => {
  if (copyFeedbackTimer !== null) {
    window.clearTimeout(copyFeedbackTimer)
  }
})
</script>
