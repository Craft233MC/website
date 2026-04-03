<template>
  <section class="mx-auto w-full max-w-5xl px-4 pb-4 pt-10 sm:px-6 lg:px-8 lg:pb-6 lg:pt-14">
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">{{ aboutContent.title }}</h1>
    </div>

    <div class="mt-10 border-t border-slate-200 pt-10 dark:border-slate-800">
      <h2 class="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">服务器历史</h2>
      <div class="mt-5 space-y-4">
        <p
          v-for="text in aboutContent.paragraphs"
          :key="text"
          class="text-base leading-8 text-slate-600 dark:text-slate-300"
        >
          {{ text }}
        </p>
      </div>
    </div>

    <section class="mt-14 border-t border-slate-200 pt-10 dark:border-slate-800">
      <h2 class="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">时间线</h2>
      <ol class="timeline mt-8">
        <li
          v-for="item in reversedTimeline"
          :key="item.date + item.title"
          class="timeline-item"
        >
          <div class="timeline-card rounded-lg px-4 py-3">
            <p class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ item.date }}</p>
            <div>
              <p class="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">{{ item.title }}</p>
              <p class="mt-1.5 text-sm leading-7 text-slate-600 dark:text-slate-300">{{ item.description }}</p>
            </div>
          </div>
        </li>
      </ol>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { aboutContent } from '@/content/siteContent'

const reversedTimeline = computed(() => [...aboutContent.timeline].reverse())
</script>

<style scoped>
.timeline {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0.44rem;
  top: 0.65rem;
  bottom: 0.65rem;
  width: 1px;
  background: rgb(203 213 225 / 0.9);
}

.dark .timeline::before {
  background: rgb(51 65 85 / 0.95);
}

.timeline-item {
  position: relative;
  padding-left: 1.7rem;
}

.timeline-item + .timeline-item {
  margin-top: 0.85rem;
}

.timeline-card {
  width: min(100%, 34rem);
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 0.08rem;
  top: 1rem;
  height: 0.75rem;
  width: 0.75rem;
  border-radius: 9999px;
  border: 2px solid rgb(15 23 42 / 0.2);
  background: rgb(255 255 255);
}

.dark .timeline-item::before {
  border-color: rgb(148 163 184 / 0.5);
  background: rgb(2 6 23);
}
</style>
