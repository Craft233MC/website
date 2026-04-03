<template>
  <section class="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
    <div class="grid gap-10 lg:min-h-[24rem] lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
      <div>
        <h1 class="max-w-3xl text-3xl font-bold leading-[1.2] tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">了解服务器内规则以更好地游玩</h1>
        <p class="mt-7 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg lg:text-xl">
          服务器规则优先保障整体氛围与基础秩序，以下内容为当前完整版本。请在游玩前完整阅读。
        </p>
      </div>

      <div class="rounded-xl border border-slate-200/80 px-6 py-5 dark:border-slate-800/80">
        <p class="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">规则概览</p>
        <p class="mt-4 text-xl font-semibold text-slate-900 dark:text-slate-100">共 {{ rulesContent.length }} 条</p>
        <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">重点围绕公平游玩、正常交流与交易安全，违规行为将按严重程度处理。</p>
      </div>
    </div>

    <ol class="mt-16 space-y-4 border-t border-slate-200 pt-10 dark:border-slate-800 lg:mt-20 lg:pt-12">
      <li
        v-for="(rule, index) in rulesContent"
        :key="index"
        class="grid gap-4 rounded-lg border border-slate-200/80 px-4 py-4 dark:border-slate-800/80 sm:grid-cols-[3rem_1fr] sm:items-start sm:px-5"
      >
        <div class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
          {{ index + 1 }}
        </div>
        <p class="text-base leading-8 text-slate-700 dark:text-slate-200">{{ rule }}</p>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import { rulesContent } from '@/content/siteContent'
</script>
