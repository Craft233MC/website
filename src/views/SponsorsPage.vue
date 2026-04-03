<template>
  <section class="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
    <div class="grid gap-10 lg:min-h-[24rem] lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
      <div>
        <h1 class="max-w-3xl text-3xl font-bold leading-[1.2] tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">感谢各位对 Craft233 的信任</h1>
        <p class="mt-7 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg lg:text-xl">
          在此查看已捐赠人员列表与留言，名单按首次捐赠时间排序。
        </p>
      </div>

      <div class="rounded-xl border border-slate-200/80 px-6 py-5 dark:border-slate-800/80">
        <p class="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">赞助概览</p>
        <p class="mt-4 text-xl font-semibold text-slate-900 dark:text-slate-100">共 {{ sponsorsContent.length }} 位赞助者</p>
        <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">每一份支持都用于维持服务器与站点运行，感谢长期信任与陪伴。</p>
      </div>
    </div>

    <div class="mt-16 border-t border-slate-200 pt-10 dark:border-slate-800 lg:mt-20 lg:pt-12">
      <div class="hidden overflow-x-auto lg:block">
        <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead>
            <tr>
              <th class="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">捐赠者</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">留言</th>
              <th class="px-6 py-4 text-right text-sm font-semibold text-slate-600 dark:text-slate-300">金额 / 价值</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
            <tr v-for="item in sponsorsContent" :key="item.name" class="hover:bg-slate-50/80 dark:hover:bg-slate-800/20">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img :src="avatarUrl(item.qq)" :alt="item.name" class="h-10 w-10 rounded-full border border-slate-200 object-cover dark:border-slate-700" />
                  <div class="font-medium">{{ item.name }}</div>
                </div>
              </td>
              <td class="px-6 py-4 text-slate-600 dark:text-slate-300">{{ item.message }}</td>
              <td class="px-6 py-4 text-right font-medium text-slate-700 dark:text-slate-200">{{ item.value }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="space-y-4 lg:hidden">
        <article
          v-for="item in sponsorsContent"
          :key="item.name"
          class="rounded-lg border border-slate-200/80 px-4 py-4 dark:border-slate-800/80"
        >
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <img :src="avatarUrl(item.qq)" :alt="item.name" class="h-10 w-10 rounded-full border border-slate-200 object-cover dark:border-slate-700" />
              <div class="font-medium text-slate-900 dark:text-slate-100">{{ item.name }}</div>
            </div>
            <div class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ item.value }}</div>
          </div>
          <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{{ item.message || '暂无留言' }}</p>
        </article>
      </div>
    </div>

    <p class="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">相关内容请查看 贡献 页。</p>
  </section>
</template>

<script setup lang="ts">
import { sponsorsContent } from '@/content/siteContent'

const avatarUrl = (qq: number | string) =>
  `https://q1.qlogo.cn/g?b=qq&nk=${qq}&s=640`
</script>
