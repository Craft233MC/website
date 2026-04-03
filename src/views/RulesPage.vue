<template>
  <section class="mx-auto w-full max-w-5xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
    <div class="p-2 sm:p-0">
      <h1 class="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">了解服务器内规则以更好地游玩</h1>
      <p class="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">服务器规则会优先保障整体氛围与基础秩序，以下内容是当前的完整规则。</p>
    </div>

    <ol class="mt-12 list-decimal space-y-4 pl-6 text-base leading-8 text-slate-700 marker:font-semibold marker:text-emerald-600 dark:text-slate-200 dark:marker:text-emerald-400">
      <li v-for="(rule, index) in rulesContent" :key="index">{{ rule }}</li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import { rulesContent } from '@/content/siteContent'
</script>
