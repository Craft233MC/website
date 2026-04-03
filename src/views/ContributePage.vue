<template>
  <section class="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
    <div class="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
      <div class="rounded-md border border-slate-300 bg-white p-8 dark:border-slate-700 dark:bg-slate-900 sm:p-10">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">欢迎</p>
        <h1 class="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">为我们的服务器作出贡献</h1>
        <p class="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">您可以在自己的能力范围内在某些方面帮助我们，为大家带来更好的体验。选择您擅长的部分，开始吧！</p>
      </div>

      <div class="space-y-6">
        <article
          v-for="item in contributeContent"
          :key="item.title"
          class="rounded-md border border-slate-300 bg-white p-7 dark:border-slate-700 dark:bg-slate-900"
        >
          <h2 class="text-2xl font-bold tracking-tight">{{ item.title }}</h2>
          <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{{ item.description }}</p>
          <a
            :href="item.href"
            target="_blank"
            rel="noreferrer"
            class="mt-5 inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            {{ item.button }}
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { contributeContent } from '@/content/siteContent'
</script>
