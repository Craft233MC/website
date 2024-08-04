<template>
  <div class="relative flex h-screen items-center">
    <div
      class="absolute h-full w-full bg-[radial-gradient(theme(colors.border)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
    <div class="container relative z-[1] flex flex-col items-center justify-center text-center">
      <h1 class="mb-5 font-bold tracking-tight color-red lg:text-2xl">{{ statusCode }} !</h1>
      <h1 class="text-4xl font-bold tracking-tight lg:text-4xl mb-5">{{ title }}</h1>
      <h1 class="text-1xl font-bold tracking-tight lg:text-1xl text-muted-foreground ">{{ description }}</h1>
      <UiButton class="mt-5" @click="clearError({ redirect: '/' })">Take me home</UiButton>

    </div>

  </div>
</template>

<script lang="ts" setup>
const description = "哎呀，我这是在哪儿？页面不见了😨 我得找到回去的路，但是...，我找不到方向了！";
const props = withDefaults(
  defineProps<{
    error: Object;
    statusCode?: number;
    fatal?: boolean;
    unhandled?: boolean;
    statusMessage?: string;
    message?: string;
    data?: unknown;
    cause?: unknown;
  }>(),
  {
    statusCode: 404,
    fatal: false,
    unhandled: false,
    statusMessage: "",
    message: "无法找到此页面！",
    data: undefined,
    cause: undefined,
  }
);

const title = computed(() => {
  if (!props.message) return "Error";
  return props.message;
});
</script>