<template>
  <section class="mx-auto flex min-h-[70vh] w-full max-w-4xl items-center px-4 py-20 sm:px-6 lg:px-8">
    <div class="w-full rounded-[2rem] border border-white/60 bg-white/75 p-10 text-center shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70 sm:p-14">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">404</p>
      <h1 class="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">页面不见了</h1>
      <p class="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">哎呀，我这是在哪儿？页面不见了。我得找到回去的路。</p>
      <RouterLink
        to="/"
        class="mt-8 inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-emerald-400"
      >
        回到首页
      </RouterLink>
    </div>
  </section>
</template>
