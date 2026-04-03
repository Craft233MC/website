<template>
  <section class="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
    <div class="rounded-[2rem] border border-white/60 bg-white/75 p-8 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70 sm:p-10">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">历史存档下载</p>
      <h1 class="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">在此获取往期周目的完整存档文件</h1>
    </div>

    <div class="mt-14 space-y-8 lg:mt-20">
      <article
        v-for="(archive, index) in archiveContent"
        :key="archive.title"
        class="grid gap-6 overflow-hidden rounded-[2rem] border border-white/60 bg-white/75 shadow-soft backdrop-blur-xl lg:grid-cols-2 dark:border-slate-800 dark:bg-slate-950/70"
      >
        <img :src="archive.image" :alt="archive.title" class="h-72 w-full object-cover lg:h-full" />
        <div class="flex flex-col justify-center p-7 sm:p-8">
          <p class="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Archive {{ index + 1 }}</p>
          <h2 class="mt-2 text-3xl font-bold tracking-tight">{{ archive.title }}</h2>
          <p class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{{ archive.description }}</p>
          <p class="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">{{ archive.dateRange }}</p>
          <a
            :href="archive.downloadUrl"
            target="_blank"
            rel="noreferrer"
            class="mt-6 inline-flex w-fit items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-emerald-400"
          >
            立即下载
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { archiveContent } from '@/content/siteContent'
</script>
