<template>
  <section class="mx-auto w-full max-w-5xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
    <div class="rounded-md border border-slate-300 bg-white p-8 dark:border-slate-700 dark:bg-slate-900 sm:p-10">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">规则区</p>
      <h1 class="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">了解服务器内规则以更好地游玩</h1>
      <p class="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">服务器规则会优先保障整体氛围与基础秩序，以下内容是当前的完整规则。</p>
    </div>

    <div class="mt-12 space-y-4">
      <article
        v-for="(rule, index) in rulesContent"
        :key="index"
        class="rounded-md border border-slate-300 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
      >
        <p class="text-sm font-semibold text-emerald-600 dark:text-emerald-400">No. {{ index + 1 }}</p>
        <p class="mt-3 text-base leading-8 text-slate-700 dark:text-slate-200">{{ rule }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { rulesContent } from '@/content/siteContent'
</script>
