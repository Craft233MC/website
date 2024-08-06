<template>
  <UiButton variant="outline" size="icon" @click="toggleDark" v-wave>
    <Icon name="lucide:sun-moon" class="h-4 w-4" />
  </UiButton>
</template>

<script setup lang="ts">
const colorMode = useColorMode()


// 切换模式
const setColorMode = () => {


  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// 判断是否支持 startViewTransition API
const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

// 切换动画
async function toggleDark({

  clientX: x, clientY: y }: MouseEvent) {


  const isDark = colorMode.preference === 'dark'

  if (!enableTransitions()) {


    setColorMode()
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  await document.startViewTransition(async () => {


    setColorMode()
    await nextTick()
  }).ready

  document.documentElement.animate(
    {

      clipPath: !isDark ? clipPath.reverse() : clipPath
    },
    {


      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${!isDark ? 'old' : 'new'}(root)`
    }
  )
}
</script>

<style>
::view-transition-old(root),
::view-transition-new(root) {


  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {


  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {


  z-index: 9999;
}
</style>