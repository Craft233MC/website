<template>
  <section class="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
    <div class="p-2 sm:p-0">
      <h1 class="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">在此获取往期周目的完整存档文件</h1>
    </div>

    <div class="mt-14 space-y-12 lg:mt-20">
      <article
        v-for="(archive, index) in archiveContent"
        :key="archive.title"
        class="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
      >
        <img :src="archive.image" :alt="archive.title" class="h-72 w-full rounded-md object-cover lg:h-full" :class="index % 2 === 1 ? 'lg:order-2' : ''" />
        <div class="flex flex-col justify-center" :class="index % 2 === 1 ? 'lg:order-1' : ''">
          <h2 class="mt-2 text-3xl font-bold tracking-tight">{{ archive.title }}</h2>
          <p class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{{ archive.description }}</p>
          <p class="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">{{ archive.dateRange }}</p>
          <a
            :href="archive.downloadUrl"
            target="_blank"
            rel="noreferrer"
            class="mt-6 inline-flex w-fit items-center justify-center gap-1.5 rounded-md border border-emerald-600 bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            立即下载
            <Icon icon="ri:external-link-line" class="h-4 w-4 opacity-90" />
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { archiveContent } from '@/content/siteContent'
</script>
