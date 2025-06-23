<template>
    <NuxtLayout>
        <UiContainer class="py-16 text-center lg:py-24">
            <slot name="title">
                <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">历史存档下载～</h2>
            </slot>
            <slot name="description">
                <div class="flex w-full justify-center ">
                    <div class="space-y-2 ">
                        <span class="text-lg text-muted-foreground lg:text-xl">在此获取往期周目的完整存档文件</span>
                    </div>
                </div>
            </slot>
            <div class="lg:py-20 py-16"></div>
            <template v-for="(h, i) in history" :key="i">
                <section class="mt-12 grid grid-cols-1 items-center gap-10 lg:h-[280px] lg:grid-cols-2 lg:gap-20">
                    <div :class="[i % 2 == 0 ? 'lg:order-none' : 'lg:order-1']">
                        <NuxtLink :to="h.downloadUrl" target="_blank">
                            <h3 class="mb-2 text-2xl font-semibold lg:mb-4 lg:text-3xl" v-html="h.title" />
                        </NuxtLink>
                        <p class="text-muted-foreground lg:text-lg mb-5" v-html="h.description" />
                        <p class="text-muted-foreground lg:text-lg" v-html="h.data"></p>
                    </div>
                    <!-- eslint-disable-next-line vue/html-self-closing -->
                    <NuxtLink :to="h.downloadUrl" class="shrink-0" target="_blank">
                        <img :src="h.imageUrl" :alt="h.title"
                            class="h-[180px] w-full rounded-lg object-cover shadow-sm lg:h-[320px]" />
                    </NuxtLink>
                </section>
            </template>

        </UiContainer>
    </NuxtLayout>
</template>

<script lang="ts" setup>
const history = [
    {
        title: "第一周目",
        description:
            "Craft233最原始的一个周目，此时我们正在用不知名的配置开服，一切都是未知的，每一次修改都是对开服的学习",
        imageUrl:
            "/assets/img/week1/2023-08-31_00.03.12.png",
        data: "2023.7.10--2024.2.24",
        downloadUrl: "https://www.123912.com/s/81d8Vv-eJGmd",
    },
    {
        title: "第二周目:Cube",
        description:
            "第二周目的生电服存档，因无人感兴趣加入与管理维护降低，在很长之间之前就已是空服。第二周目并未结束，仅Cube",
        imageUrl:
            "/assets/img/week2/cube/cube-screenshot-from-bili.png",
        data: "2024.3.10--2024.8.3",
        downloadUrl: "https://www.123912.com/s/81d8Vv-tJGmd",
    },
    {
        title: "第二周目",
        description:
            "第二周目的非生电服存档",
        imageUrl:
            "/assets/img/week2/town.png",
        data: "2024.3.10--2025.4.2",
        downloadUrl: "https://www.123684.com/s/81d8Vv-iJGmd",
    },
];


// 页面标题
useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `` : 'Craft233 - 获取存档';
    }
})
</script>
