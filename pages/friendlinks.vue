<template>
    <NuxtLayout>
        <UiContainer class="py-16 text-center lg:py-24">
            <slot name="title">
                <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">友情链接～</h2>
            </slot>
            <slot name="description">
                <div class="flex w-full justify-center ">
                    <div class="space-y-2 ">
                        <span>欢迎加入与我们互换友链，在开服方面一起讨论学习，成为友商，共同进步</span>
                    </div>
                </div>
            </slot>
        </UiContainer>
        <UiContainer class="">

            <!-- 真要手工改的地方了 md:grid-cols-2(有两个及更多link时加入下方class) grid-cols-3(有三个及更多link时加入下方class) -->
            <section class="grid grid-cols-1 gap-10 lg:gap-y-12">
                <template v-for="l in links">

                    <div class="flex flex-col items-center pt-2 pb-2">
                        <a class="flex flex-col items-center p-5 duration-300 rounded-3xl hover:shadow-lg" target="_blank" :href="l.link">
                            <UiAvatar class="mb-5 h-24 w-24 ring-1 ring-ring/20" :src="l.avatar" />
                            <p class="text-lg font-semibold" v-html="l.name" />
                            <ul class="mt-2 text-muted-foreground items-center flex flex-col">
                                <li v-for="intro in l.introduce" v-html="intro" />
                            </ul>
                        </a>
                    </div>
                </template>
            </section>
        </UiContainer>
    </NuxtLayout>
</template>

<script lang="ts" setup>

const links = [
    {
        avatar: "https://bugcraft.org/favicon.svg",
        link: "https://bugcraft.org/",
        name: "BugCraft",
        introduce:
        {
            line1: "There are many bugs to play...",
        },

    },
];


// 页面标题
useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `` : '友情链接 | Craft233';
    }
})
</script>