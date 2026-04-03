<template>
  <section class="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
    <div class="p-2 sm:p-0">
      <h1 class="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">欢迎互换友链</h1>
      <p class="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">欢迎加入与我们互换友链，在开服方面一起讨论学习，成为友商，共同进步。</p>
    </div>

    <div class="mt-12 space-y-8">
      <a
        v-for="(link, index) in friendLinksContent"
        :key="link.name"
        :href="link.href"
        target="_blank"
        rel="noreferrer"
        class="group grid items-center gap-6 md:grid-cols-[112px_1fr]"
      >
        <img :src="link.avatar" :alt="link.name" class="mx-auto h-24 w-24 rounded-full object-cover md:mx-0" :class="index % 2 === 1 ? 'md:order-2 md:justify-self-end' : ''" />
        <div :class="index % 2 === 1 ? 'md:order-1 md:text-right' : ''">
          <h2 class="text-2xl font-bold tracking-tight transition group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{{ link.name }}</h2>
          <ul class="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <li v-for="intro in link.intro" :key="intro">{{ intro }}</li>
          </ul>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { friendLinksContent } from '@/content/siteContent'
</script>
