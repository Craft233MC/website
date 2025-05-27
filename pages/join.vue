<template>
    <NuxtLayout>
        <UiContainer class="py-16 text-center lg:py-24">
            <slot name="title">
                <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">{{ obj.title }}</h2>
            </slot>
            <slot name="description">
                <div class="flex w-full justify-center">
                    <div class="space-y-2">
                        <p class="text-lg text-muted-foreground lg:text-xl">显示打开此页面时各服务器的状态</p>
                        <p id="status_text" class="text-lg text-muted-foreground lg:text-xl">获取中</p>
                        
                        <div v-for="s in serverAddressList">
                            <UiSkeleton :id="s.id + '-Skeleton'" class="h-4 w-max-96"/>
                            <p :id="s.id + '-Text'" class="text-lg text-muted-foreground lg:text-xl"></p>
                        </div>
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

// 获取玩家数
async function getServerStatus() {
    // 初始记录值，用于判断是否所有服务器都在线
    let onlineServers = 0
    // 获取用于显示检测状态的元素
    const statusGetterText = document.getElementById("status_text")
    // 使用循环进行获取
    for (let i = 0; i < serverAddressList.length; i++) {
        // api地址
        const apiAddress = "https://api.mcsrvstat.us/3/"
        // 组合为正确的api服务器请求地址
        const serverInfo = await axios.get(apiAddress + await serverAddressList[i].address)
        // 定义初始空时的值
        let serverStatus = "Null"
        let playerNum = "0"
        let serverVer = "Null"
        // 不在线就没必要再转了
        if (serverInfo.data.online == true) {
           try {
             // 获取在线人数
             playerNum = serverInfo.data.players.online
            // 处理服务端类型(Leaves, Fabric, Forge等等)
            if (serverAddressList[i].serverType == "Fabric"){
                serverVer = "Fabric " + serverInfo.data.version
            }
            else{
                serverVer = serverInfo.data.version
            }
            // 在线状态
            serverStatus = "在线"
            onlineServers++ // 服务器在线，记录下来
           } catch (e) {
            serverStatus = "离线"
            playerNum = "0"
            serverVer = "无法获取"
           }
        }else {
            // 离线服务器直接跳过从检测中赋值
            serverStatus = "离线"
            playerNum = "0"
            serverVer = "无法获取"
        }
        // 获取当前检测服务器对应的显示元素
        const skeleton = document.getElementById(serverAddressList[i].id + "-Skeleton")
        const status = document.getElementById(serverAddressList[i].id + "-Text")
        // 更改显示状态
        skeleton?.parentNode?.removeChild(skeleton)
        if (i == 0) {// 这里是检测代理端的，显示出来会不太一样，所以改写文字
            if(status) {status.innerText = serverAddressList[i].name + ": " + serverStatus + " | 总在线人数" + playerNum}
        }else{// 正常的服务器的显示
            if(status) {status.innerText = serverAddressList[i].name + ": " + serverStatus + " | 在线人数" + playerNum + " | 服务器版本:" + serverVer}
        }
    }
    // 更改显示检测状态与结果的文字
    if (onlineServers == 0){// 一直没加过数，无在线
        if (statusGetterText) {statusGetterText.innerText = "坏极了，全部离线！"}
        statusGetterText?.classList.add("text-red-500")
        statusGetterText?.classList.remove("text-muted-foreground")
    }else if (onlineServers == serverAddressList.length){// 数值一样，都在线
        if (statusGetterText) {statusGetterText.innerText = "全部在线！"}
        statusGetterText?.classList.add("text-green-500")
        statusGetterText?.classList.remove("text-muted-foreground")
    }else{ // 数值不一样，有离线
        if (statusGetterText) {statusGetterText.innerText = "有些家伙在睡觉！"}
        statusGetterText?.classList.add("text-yellow-500")
        statusGetterText?.classList.remove("text-muted-foreground")
    }
}


async function getAddressByPort(portNum: number){
    const address = "v4.mc.craft233.top:" + portNum
    return address
}

const serverAddressList = [
    {
        name: "velocity代理",
        address: getAddressByPort(25565),
        id: "velocity",
        serverType: "Velocity"
    },
    {
        name: "Lobby大厅服",
        address: getAddressByPort(41001),
        id: "lobby",
        serverType: "Paper"
    },
    {
        name: "Terra粘液生存服务器",
        address: getAddressByPort(41002),
        id: "Terra",
        serverType: "Luminol"
    },
    {  
        name: "ABlock单方块生存服务器",
        address: getAddressByPort(41003),
        id: "ablock",
        serverType: "Leaves"
    }
]

const obj = reactive({
    title: '加入服务器',
})

onMounted(async () => {
    getServerStatus()
})

const step = [
    {
        title: "进入游戏菜单",
        icon: "tabler:circle-number-1",
        description:
            "",
        imageUrl:
            "https://docs.craft233.top/assets/JavaHomePage.ChXN-PvP.png"
    },
    {
        title: "点击添加服务器",
        icon: "tabler:circle-number-2",
        description:
            "",
        imageUrl:
            "https://docs.craft233.top/assets/javaServerList.ClEIZ0Kn.png",
    },
    {
        title: "填入信息并保存",
        icon: "tabler:circle-number-3",
        description: ``,
        imageUrl:
            "https://docs.craft233.top/assets/javaAddServer.C_XH7osL.png",
    },
];

function getImageNodeByWidth(node: String){
    if (window.innerWidth <= 1024) {
        return "s.peImage"
    } else{
        return "s.jeImage"
    }
}


// 页面标题
useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `` : 'Craft233 - 加入服务器';
    }
})
</script>