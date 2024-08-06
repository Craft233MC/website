<template>
    <NuxtLayout>
    <UiContainer class="flex flex-col gap-x-16 py-16 lg:flex-row lg:py-24">
        <div class="w-full pb-16 lg:w-1/2 lg:pb-0">
            <UiContainer class="text-center lg:text-left">
                <p class="font-semibold text-primary">{{ pretitle }}</p>
                <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">{{ title }}</h2>
                <p class="mx-auto max-w-[800px] text-lg text-muted-foreground lg:text-xl">{{ description }}</p>
            </UiContainer>
        </div>

        <ul class="flex w-full flex-col gap-8 lg:w-1/2">
            <li v-for="t in type" class="border-t pt-6">
                <div class="flex items-center">
                    <p class="text-lg font-semibold" v-html="t.title" />
                </div>
                <p class="mt-2 text-muted-foreground" v-html="t.description" />
                <ul class="mt-5 flex flex-wrap items-center gap-5">
                </ul>
                <NuxtLink :to="t.link" target="_blank">
                    <UiButton :class="t.class" v-bind:variant="t.variant" v-wave><Icon class="h-4 w-4" :name="t.icon" /> {{ t.btm_text }}</UiButton>
                </NuxtLink>
            </li>
        </ul>
    </UiContainer>
    </NuxtLayout>
</template>

<script lang="ts" setup>
const pretitle = "欢迎!";
const title = "为我们的服务器作出贡献";
const description = "您可以在自己的能力范围内在某些方面帮助我们，为大家带来更好的体验。选择您擅长的部分，开始吧！";


const type = [
    {
        title: "改进网页与文档",
        description: "欢迎在GitHub上帮助我们改进文档与网站！",
        link: "https://github.com/Craft233MC",
        icon: "lucide:github",
        btm_text: "GitHub",
        class: "bg-black color-white",
    },
    {
        title: "帮助改进服务端",
        description: "部分子服务器的配置文件是公开的，您可以在此帮助我们更改服务端，提出issue,pr等。",
        link: "https://gitcode.com/Craft233MC",
        icon: "lucide:git-pull-request-create-arrow",
        btm_text: "GitCode",
        class: "",
        variant: "destructive",
    },
    {
        title: "帮助其他玩家",
        description: "欢迎加入我们的交流群，帮助解决其他玩家的困惑，我们欢迎大家回答问题或提供支持。",
        link: "http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=QofGtNhyZdlU0kVZtr81sGxVDMzKGkkt&authKey=59dPS936wuYm%2Bg4qHFkMdo8IYTcdD6Jp8Q9kBb2Mmv8i7APEm0Ms2373ztiW97wE&noverify=0&group_code=830277457",
        icon: "lucide:message-square-text",
        btm_text: "QQ群聊",
        class: "",
    },
    {
        title: "提供资金上的支持",
        description: "Craft233 使用爱发电来管理各种日常开支，其中大部分与基础设施有关。",
        link: "https://afdian.com/a/craft233/",
        icon: "lucide:hand-heart",
        btm_text: "爱发电",
        class: "",
    },
];

useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `` : '贡献 | Craft233';
    }
})
</script>
