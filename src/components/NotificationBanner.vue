<template>
  <Transition name="notification">
    <div
      v-if="visible"
      class="notification-banner fixed right-4 top-4 z-[55] w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-yellow-300 bg-yellow-50 px-5 py-4 shadow-lg dark:border-yellow-600/50 dark:bg-yellow-900/30 sm:right-12 sm:top-12"
    >
      <div class="flex items-start gap-3">
        <div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-200 text-yellow-700 dark:bg-yellow-700/40 dark:text-yellow-300">
          <svg viewBox="0 0 24 24" class="h-5 w-5 fill-none stroke-current stroke-2">
            <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          </svg>
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-semibold text-yellow-800 dark:text-yellow-200">注意</p>
          <p class="mt-1 text-sm leading-relaxed text-yellow-700 dark:text-yellow-300/90">
            Craft233第三周目定于2026.6.21关闭，相关存档将在几日内公开
          </p>
        </div>
        <button
          type="button"
          class="close-btn relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-yellow-600 transition hover:bg-yellow-200 hover:text-yellow-800 dark:text-yellow-400 dark:hover:bg-yellow-800/40 dark:hover:text-yellow-200"
          aria-label="关闭通知"
          @click="dismiss"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4 fill-none stroke-current stroke-2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          <svg class="countdown-ring absolute inset-0 h-full w-full" viewBox="0 0 32 32">
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-dasharray="87.96"
              stroke-dashoffset="0"
              stroke-linecap="round"
              transform="rotate(-90 16 16)"
              class="text-yellow-500 dark:text-yellow-400"
            />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const visible = ref(false)
const timers: number[] = []

const dismiss = () => {
  visible.value = false
  timers.forEach((t) => window.clearTimeout(t))
  timers.length = 0
}

onMounted(() => {
  // Show after a small delay so the entrance animation is visible
  timers.push(
    window.setTimeout(() => {
      visible.value = true
    }, 600),
  )

  // Auto-close 10 seconds after it appears (10.6s total from mount)
  timers.push(
    window.setTimeout(() => {
      visible.value = false
    }, 10600),
  )
})

onUnmounted(() => {
  timers.forEach((t) => window.clearTimeout(t))
})
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateY(-1rem);
}

.notification-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}

.countdown-ring circle {
  animation: countdown-ring 10s linear forwards;
}

@keyframes countdown-ring {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: 87.96;
  }
}
</style>
