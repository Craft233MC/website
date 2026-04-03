<template>
  <section class="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
    <div class="rounded-md border border-slate-300 bg-white p-8 dark:border-slate-700 dark:bg-slate-900 sm:p-10">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">赞助者们</p>
      <h1 class="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">感谢各位对 Craft233 的信任</h1>
      <p class="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">在此查看已捐赠人员列表及留言。名单按首次捐赠时间排序。</p>
    </div>

    <div class="mt-12 overflow-hidden rounded-md border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead class="bg-slate-50/80 dark:bg-slate-900/70">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">捐赠者</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">留言</th>
              <th class="px-6 py-4 text-right text-sm font-semibold text-slate-600 dark:text-slate-300">金额 / 价值</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
            <tr v-for="item in sponsorsContent" :key="item.name" class="hover:bg-slate-50/80 dark:hover:bg-slate-900/40">
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
    </div>

    <p class="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">相关内容请查看 贡献 页。</p>
  </section>
</template>

<script setup lang="ts">
import { sponsorsContent } from '@/content/siteContent'

const avatarUrl = (qq: number | string) =>
  `https://q1.qlogo.cn/g?b=qq&nk=${qq}&s=640`
</script>
