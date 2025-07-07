<template>
    <NuxtLayout>
        <UiContainer class="py-16 text-center lg:py-24">
            <slot name="title">
                <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">赞助者们</h2>
            </slot>
            <slot name="description">
                <div class="flex w-full justify-center">
                    <div class="space-y-2">
                        <p class="text-lg text-muted-foreground lg:text-xl">感谢各位对Craft233的信任, 并给予Craft233资金上的支持.</p>
                        <p class="text-lg text-muted-foreground lg:text-xl">在此, 查看已捐赠人员列表及留言!</p>
                    </div>
                </div>

            </slot>
        </UiContainer>

        <div class="flex justify-center">
            <UiTable class="table-max-width">
                <UiTableHeader>
                    <UiTableRow class="hover:bg-transparent">
                        <UiTableHead>捐赠者</UiTableHead>
                        <UiTableHead>留言</UiTableHead>
                        <UiTableHead class="text-right">金额/价值</UiTableHead>
                    </UiTableRow>
                </UiTableHeader>
                <UiTableBody>
                    <UiTableRow v-for="item in sponors">
                        <UiTableCell>
                            <div class="flex items-center gap-3">
                                <UiAvatar class="size-10" :src="getAvatar(item.qqNum)" :alt="item.name" />
                                <div class="font-medium">{{ item.name }}</div>
                            </div>
                        </UiTableCell>
                        <UiTableCell>{{ item.message }}</UiTableCell>
                        <UiTableCell class="text-right">{{ item.value }}</UiTableCell>
                    </UiTableRow>
                </UiTableBody>
            </UiTable>
        </div>
        <p class="mt-4 text-center text-sm text-muted-foreground">按首次捐赠时间排序</p>
        <p class="mt-4 text-center text-sm text-muted-foreground">相关内容请查看
            <NuxtLink to="contribute" class="text-primary">贡献</NuxtLink>
            页</p>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import '~/assets/css/global.css'

const sponors = [
    {
        name: "MRCI",
        qqNum: 3259266411,
        message: "私はロリコンですか?",
        value: 10
    },
    {
        name: "233laoliu",
        qqNum: 2117015126,
        message: "可千万别成商业服啊",
        value: "31.44+50(花火推广)"
    },
    {
        name: "gjyyds",
        qqNum: 2712878343,
        message: "eee",
        value: 30
    },
    {
        name: "SuMaple",
        qqNum: 652657854,
        message: "希望我们服能越来越好啊！！！",
        value: 50
    },
    {
        name: "CREATORKARIMO",
        qqNum: "unknown",
        message: "阿巴",
        value: 5
    },
    {
        name: "Ygbs",
        qqNum: 2300861061,
        message: "Ygbs here",
        value: 10
    },
    {
        name: "floodluo",
        qqNum: 1782531643,
        message: "我很爱这个服务器希望他能一直有",
        value: 5
    },
    {
        name: "Lee",
        qqNum: 3886321682,
        message: "加油，希望越来越好。",
        value: 5
    }
]

function getAvatar(qqNum: number) {
    return "https://q1.qlogo.cn/g?b=qq&nk=" +  qqNum + "&s=640"
}

// 页面标题
useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `` : 'Craft233 - 赞助者们';
    }
})
</script>
