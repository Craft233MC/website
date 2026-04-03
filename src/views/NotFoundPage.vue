<template>
  <section class="mx-auto flex min-h-[70vh] w-full max-w-4xl items-center px-4 py-20 sm:px-6 lg:px-8">
    <div class="w-full rounded-md border border-slate-300 bg-white p-10 text-center dark:border-slate-700 sm:p-14">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">404</p>
      <h1 class="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">页面不见了</h1>
      <p class="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">哎呀，我这是在哪儿？页面不见了。我得找到回去的路。</p>
      <RouterLink
        to="/"
        class="mt-8 inline-flex items-center justify-center rounded-md bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
      >
        回到首页
      </RouterLink>
    </div>
  </section>
</template>
