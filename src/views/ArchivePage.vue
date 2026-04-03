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
          <button
            type="button"
            class="mt-6 inline-flex w-fit items-center justify-center rounded-md border border-emerald-600 bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
            @click="handleDownload(archive)"
          >
            立即下载
          </button>
        </div>
      </article>
    </div>

    <Transition name="fade">
      <div v-if="downloadDialogOpen" class="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 backdrop-blur-sm p-4" @click.self="closeDownloadDialog">
        <div class="w-[min(88vw,22rem)] rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">选择下载线路</p>
              <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ selectedArchiveTitle }}</p>
            </div>
            <button
              type="button"
              class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-200"
              aria-label="关闭线路选择"
              @click="closeDownloadDialog"
            >
              ✕
            </button>
          </div>

          <div class="mt-5 flex flex-col items-center gap-2.5">
            <a
              v-for="option in downloadDialogOptions"
              :key="option.label"
              :href="option.url"
              target="_blank"
              rel="noreferrer"
              class="inline-flex min-w-[8.5rem] items-center justify-center rounded-md border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:text-emerald-700 dark:border-slate-700 dark:text-slate-200 dark:hover:text-emerald-400"
              @click="closeDownloadDialog"
            >
              {{ option.label }}
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { archiveContent } from '@/content/siteContent'

type ArchiveItem = (typeof archiveContent)[number]

type DownloadOption = {
  label: string
  url: string
}

const downloadDialogOpen = ref(false)
const selectedArchiveTitle = ref('')
const downloadDialogOptions = ref<DownloadOption[]>([])

const normalizedDownloadOptions = (archive: ArchiveItem): DownloadOption[] => {
  return archive.downloadInfos.map((item) => ({
    label: item.title,
    url: item.url,
  }))
}

const closeDownloadDialog = () => {
  downloadDialogOpen.value = false
  selectedArchiveTitle.value = ''
  downloadDialogOptions.value = []
}

const openExternal = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

const handleDownload = (archive: ArchiveItem) => {
  const options = normalizedDownloadOptions(archive)
  if (options.length <= 1) {
    openExternal(options[0].url)
    return
  }

  selectedArchiveTitle.value = archive.title
  downloadDialogOptions.value = options
  downloadDialogOpen.value = true
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
