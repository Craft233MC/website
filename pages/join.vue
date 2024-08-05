<template>
    <NuxtLayout>
        <UiContainer class="py-16 text-center lg:py-24">
            <slot name="title">
                <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">{{ obj.title }}</h2>
            </slot>
            <slot name="description">
                <div class="flex w-full justify-center">
                    <div class="space-y-2">
                        <UiSkeleton class="h-4 w-max-900" id="skelet1" />
                        <span id="desc"></span>
                        <UiSkeleton class="h-4 w-max-900" id="skelet2" />
                        <UiSkeleton class="h-4 w-max-900" id="skelet3" />
                    </div>
                </div>

            </slot>
        </UiContainer>
        <UiContainer>

            <template v-for="(s, i) in step" :key="i">
                <section
                    class="mt-12 grid grid-cols-1 items-center gap-10 lg:mt-24 lg:h-[280px] lg:grid-cols-2 lg:gap-20">
                    <div :class="[i % 2 == 0 ? 'lg:order-none' : 'lg:order-1']">
                        <div class="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Icon v-bind:name="s.icon" class="h-5 w-5 text-primary" />
                        </div>
                        <h3 class="mb-2 text-2xl font-semibold lg:mb-4 lg:text-3xl" v-html="s.title" />
                        <p class="text-muted-foreground lg:text-lg" v-html="s.description" />

                    </div>
                    <!-- eslint-disable-next-line vue/html-self-closing -->
                    <img :src="s.imageUrl" :alt="s.title"
                        class="h-[180px] w-full rounded-lg object-cover shadow-sm lg:h-[320px]" />
                </section>
            </template>
        </UiContainer>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import '~/assets/css/global.css'
import axios from 'axios';
import { reactive } from 'vue';
import Description from '~/components/Ui/Alert/Description.vue';

// 获取玩家数
async function getServerState(): Promise<string> {
    const infoVelocity = await axios.get('https://api.mcsrvstat.us/3/mc.craft233.top');
    const playersNumVelocity = infoVelocity.data.players.online;
    const playersVelocity: number = playersNumVelocity as number;
    var players = playersVelocity; //所有子服的玩家数

    const info = await axios.get('https://api.mcsrvstat.us/3/mc.craft233.top');
    var status = info.data.online; // 获取在线状态
    if (status == "true") {// 判断在线状态
        var serverStatus = '<p class="text-lg text-muted-foreground lg:text-xl" style="color:red;">离线&nbsp</p>';
        var online = 'false';
    } else {
        var serverStatus = '<p class="text-lg text-muted-foreground lg:text-xl text-primary">在线</p>';
        var online = 'true';
    }
    //获取各子服版本
    const infoOases = await axios.get('https://api.mcsrvstat.us/3/mc.craft233.top:10002');
    const infoLogin = await axios.get('https://api.mcsrvstat.us/3/mc.craft233.top:10001');

    //汇集输出结果，用于填充于p
    if (online == 'true') {
        var sStatus = '<p class="text-lg text-muted-foreground lg:text-xl">当前服务器状态：' + serverStatus + '<p class=" text-lg text-muted-foreground lg:text-xl">' + "在线人数：" + players + "&nbsp|&nbsp" + "服务端版本：" + "登陆服：" + infoLogin.data.version + "&nbsp|&nbspOases：" + infoOases.data.version + "</p>";
    } else {
        var sStatus = '<p class=" text-lg text-muted-foreground lg:text-xl">当前服务器状态：' + serverStatus;
    }
    return sStatus
}
const obj = reactive({
    title: '加入服务器',
})

onMounted(async () => {
    var asd = await getServerState()
    document.getElementById("desc").innerHTML = asd
    if (document.getElementById("desc").innerHTML !== "") {
        var skelet1 = document.getElementById("skelet1")
        skelet1?.parentNode?.removeChild(skelet1)
        var skelet2 = document.getElementById("skelet2")
        skelet2?.parentNode?.removeChild(skelet2)
        var skelet3 = document.getElementById("skelet3")
        skelet3?.parentNode?.removeChild(skelet3)
    }

})

const step = [
    {
        title: "进入游戏菜单",
        icon: "tabler:circle-number-1",
        description:
            "",
        imageUrl:
            "/assets/join/1.png",
        points: [
            { text: "Leverage automation to move fast" },
            { text: "Always give customers a human to chat to" },
            { text: "Automate customer support and close leads faster" },
        ],
    },
    {
        title: "点击添加服务器",
        icon: "tabler:circle-number-2",
        description:
            "",
        imageUrl:
            "/assets/join/2.png",
        points: [
            { text: "Keep your customers in the loop with live chat" },
            { text: "Embed help articles right on your website" },
            { text: "Customers never have to leave the page to find an answer" },
        ],
    },
    {
        title: "填入信息并保存",
        icon: "tabler:circle-number-3",
        description: ``,
        imageUrl:
            "/assets/join/3.png",
        points: [
            { text: "Filter, export, and drilldown on the data quickly" },
            { text: "Save, schedule, and automate reports to your inbox" },
            { text: "Connect the tools you already use with 100+ integrations" },
        ],
    },
];


// 页面标题
useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `` : '加入服务器 | Craft233';
    }
})
</script>