<template>
  <section class="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
    <div class="grid gap-10 lg:min-h-[24rem] lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
      <div>
        <h1 class="max-w-3xl text-3xl font-bold leading-[1.2] tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">为我们的服务器作出贡献</h1>
        <p class="mt-7 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg lg:text-xl">
          您可以在自己的能力范围内帮助我们，为所有玩家带来更好的体验。选择您擅长的部分，直接开始。
        </p>
      </div>

      <div class="rounded-xl border border-slate-200/80 px-6 py-5 dark:border-slate-800/80">
        <p class="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">参与方式</p>
        <p class="mt-4 text-xl font-semibold text-slate-900 dark:text-slate-100">{{ contributeContent.length }} 种可参与方向</p>
        <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">根据你的时间和擅长领域自由选择，所有帮助都会被认真看见。</p>
      </div>
    </div>

    <div class="mt-16 border-t border-slate-200 pt-12 dark:border-slate-800 lg:mt-20 lg:pt-14">
      <div class="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="item in contributeContent"
          :key="item.title"
          class="flex h-full flex-col justify-between border-b border-slate-200 pb-8 dark:border-slate-800 md:border-b-0 md:border-r md:pr-8 xl:last:border-r-0"
        >
          <div>
            <h2 class="text-2xl font-bold tracking-tight">{{ item.title }}</h2>
            <p class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{{ item.description }}</p>
          </div>
          <div class="mt-6">
            <a
              :href="item.href"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center justify-center gap-1.5 rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:text-emerald-700 dark:border-slate-700 dark:text-slate-200"
            >
              {{ item.button }}
              <Icon icon="ri:external-link-line" class="h-4 w-4 opacity-80" />
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { contributeContent } from '@/content/siteContent'
</script>
