<template>
  <section class="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
    <div class="grid gap-10 lg:min-h-[24rem] lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
      <div>
        <p class="text-sm font-semibold tracking-[0.24em] text-rose-500 uppercase">Error 404</p>
        <h1 class="mt-4 max-w-3xl text-3xl font-bold leading-[1.2] tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
          你访问的页面不存在
        </h1>
        <p class="mt-7 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg lg:text-xl">
          链接可能已失效，或页面已被移动。你可以返回首页继续浏览，或者前往加入页面查看服务器信息。
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <RouterLink
            to="/"
            class="inline-flex items-center justify-center rounded-md border border-emerald-600 bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            返回首页
          </RouterLink>
          <RouterLink
            to="/join"
            class="inline-flex items-center justify-center rounded-md border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:text-emerald-700 dark:border-slate-700 dark:text-slate-200 dark:hover:text-emerald-400"
          >
            前往加入
          </RouterLink>
        </div>
      </div>

      <div class="rounded-xl border border-slate-200/80 px-6 py-6 dark:border-slate-800/80">
        <p class="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">可能的原因</p>
        <ul class="mt-4 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          <li>• 访问地址输入有误</li>
          <li>• 页面路径已调整</li>
          <li>• 外部链接引用了旧地址</li>
        </ul>
      </div>
    </div>
  </section>
</template>
