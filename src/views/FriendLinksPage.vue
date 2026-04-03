<template>
  <section class="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
    <div class="rounded-md border border-slate-300 bg-white p-8 dark:border-slate-700 dark:bg-slate-900 sm:p-10">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">友情链接</p>
      <h1 class="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">欢迎互换友链</h1>
      <p class="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">欢迎加入与我们互换友链，在开服方面一起讨论学习，成为友商，共同进步。</p>
    </div>

    <div class="mt-12 grid gap-6 md:grid-cols-2">
      <a
        v-for="link in friendLinksContent"
        :key="link.name"
        :href="link.href"
        target="_blank"
        rel="noreferrer"
        class="group rounded-md border border-slate-300 bg-white p-8 text-center transition hover:border-emerald-500 dark:border-slate-700 dark:bg-slate-900"
      >
        <img :src="link.avatar" :alt="link.name" class="mx-auto h-24 w-24 rounded-full border border-slate-200 object-cover dark:border-slate-700" />
        <h2 class="mt-5 text-2xl font-bold tracking-tight">{{ link.name }}</h2>
        <ul class="mt-4 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
          <li v-for="intro in link.intro" :key="intro">{{ intro }}</li>
        </ul>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { friendLinksContent } from '@/content/siteContent'
</script>
