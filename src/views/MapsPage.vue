<template>
  <section class="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
    <div class="grid gap-10 lg:min-h-[24rem] lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
      <div>
        <h1 class="max-w-3xl text-3xl font-bold leading-[1.2] tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
          {{ serverMapContent.title }}
        </h1>
        <p class="mt-7 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg lg:text-xl">
          {{ serverMapContent.summary }}
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <RouterLink
            to="/join"
            class="inline-flex items-center justify-center rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:text-emerald-700 dark:border-slate-700 dark:text-slate-200 dark:hover:text-emerald-400"
          >
            返回加入页面
          </RouterLink>
        </div>
      </div>

      <div class="rounded-xl border border-slate-200/80 px-6 py-5 dark:border-slate-800/80">
        <p class="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">地图概览</p>
        <p class="mt-4 text-xl font-semibold text-slate-900 dark:text-slate-100">共 {{ resolvedMaps.length }} 个入口</p>
        <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">点击后会在新页面打开网页地图，适合在游玩时快速查看地形与建筑分布。</p>
      </div>
    </div>

    <div class="mt-16 border-t border-slate-200 pt-10 dark:border-slate-800 lg:mt-20 lg:pt-12">
      <div class="grid gap-6 md:grid-cols-2">
        <article
          v-for="map in resolvedMaps"
          :key="map.key"
          class="flex h-full flex-col justify-between rounded-xl border border-slate-200/80 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/70"
        >
          <div>
            <p class="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">服务器地图</p>
            <h2 class="mt-4 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">{{ map.title }}</h2>
            <p v-if="map.description" class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {{ map.description }}
            </p>
          </div>

          <div class="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p class="break-all text-xs text-slate-500 dark:text-slate-400">
              {{ map.url }}
            </p>
            <a
              :href="map.url"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center justify-center rounded-md border border-emerald-600 bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              打开地图
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import siteConfig from '@/config/site.config.json'
import { serverMapContent } from '@/content/siteContent'

type ServerMapLinks = Record<string, string>

type MapItem = (typeof serverMapContent.items)[number]

const configuredMapLinks = (siteConfig.serverMapLinks ?? {}) as ServerMapLinks

const resolvedMaps = computed(() =>
  serverMapContent.items.map((item) => ({
    ...item,
    url: configuredMapLinks[item.key]?.trim() || item.url,
  })),
)
</script>
