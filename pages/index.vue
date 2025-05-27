<template>
  <NuxtLayout>
    <UiContainer class="relative flex flex-col items-center justify-center gap-y-12 py-10 lg:h-[720px] lg:flex-row ">
      <img src="https://res.neokoni.ink/craft233/img/craft233_logo.svg" alt="Server image"
        :title="`Craft233 Server image`" class="h-[200px] object-cover md:w-[600px] lg:h-full" />
      <div class="flex h-full items-center justify-center">
        <div>
          <h3 class="text-3xl font-semibold lg:text-5xl ">
            Craft233
          </h3>
          <h2 class="mt-8 flex flex-col text-2xl text-muted-foreground">全新出发，让简化带来原生态的生存体验。在尝试中找到尽可能优的生存体验。与玩家一起，携手出发。</h2>
          <div class="grid mt-8 md:flex w-full shrink-0 flex-col-reverse gap-3 md:mt-12 lg:w-auto lg:flex-row">
            <UiButton size="lg" class="w-full shrink-0 whitespace-nowrap md:w-auto" to="join" v-wave>加入</UiButton>
            <a href="https://docs.craft233.top" target="_blank">
              <UiButton size="lg" class="w-full lg:w-auto" variant="outline">文档站
                <Icon name="lucide:external-link" class="h-4 w-4" />
              </UiButton>
            </a>
            <UiButton size="lg" class="w-full shrink-0 whitespace-nowrap md:w-auto" to="rules" variant="outline" v-wave>规则</UiButton>
          </div>
        </div>
      </div>
      <!-- eslint-disable-next-line vue/html-self-closing -->

    </UiContainer>
    <UiContainer>
      <template v-for="(f, i) in features" :key="i">
        <section class="mt-12 grid grid-cols-1 items-center gap-10 lg:mt-20 lg:h-[450px] lg:grid-cols-2 lg:gap-20">
          <div :class="[i % 2 == 0 ? 'lg:order-none' : 'lg:order-1']">
            <h3 class="mb-2 text-2xl font-semibold lg:mb-4 lg:text-3xl" v-html="f.title" />
            <p class="text-muted-foreground lg:text-lg" v-html="f.description" />
          </div>
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <img :src="f.imageUrl" :alt="f.title"
            class="h-[250px] w-full rounded-lg object-cover shadow-sm lg:h-[330px]" />
        </section>
      </template>
    </UiContainer>
    <UiContainer class="py-16 lg:py-24">
      <h2 class="mb-4 mt-3 text-center text-3xl font-semibold lg:mb-5 lg:text-4xl">
        我们的特色
      </h2>
      <!-- <p class="mx-auto max-w-[760px] text-center text-lg text-muted-foreground lg:text-xl">
      Powerful, self-serve product and growth analytics to help you convert, engage, and retain more
      users. Trusted by over 4,000 startups.
    </p> -->

      <div class="grid grid-cols-1 gap-y-10 py-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:gap-y-16 lg:py-16">
        <template v-for="(f1, i1) in features1" :key="i1">
          <div class="group flex flex-col items-center justify-center">
            <div class="flex h-12 w-12 items-center justify-center rounded-md border">
              <Icon :name="f1.icon" class="h-5 w-5 transition-colors group-hover:text-primary lg:h-6 lg:w-6" />
            </div>
            <h3 class="mt-4 text-balance text-center text-lg font-semibold lg:mt-5 lg:text-xl" v-html="f1.title" />
            <p class="mt-1 max-w-[400px] text-balance text-center text-muted-foreground lg:mt-2"
              v-html="f1.description" />
          </div>
        </template>
      </div>
    </UiContainer>

    <UiContainer class="">
      <UiContainer class="py-16 text-center lg:py-24">
        <slot name="title">
          <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">{{ title }}</h2>
        </slot>
        <slot name="description">
          <p class="mx-auto max-w-[768px] text-lg text-muted-foreground lg:text-xl">
            {{ description }}
          </p>
        </slot>
      </UiContainer>


      <section class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-12">
        <template v-for="m in members">
          <div class="flex flex-col items-center w-max-1250">
            <UiAvatar class="mb-5 h-24 w-24 ring-1 ring-ring/20" :src="m.avatar" />
            <p class="text-lg font-semibold" v-html="m.name" />
            <p class="" v-html="m.position" />
            <ul class="mt-2 text-muted-foreground">
              <li v-for="intro in m.introduce" v-html="intro" />
            </ul>
            <div class="mt-2 flex items-center gap-3">
              <NuxtLink v-for="links in m.contact" :to="links.link" target="_blank">
                <Icon :name="links.icon" class="h-5 w-5 text-muted-foreground" />
              </NuxtLink>
            </div>
          </div>
        </template>
      </section>
    </UiContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import axios from 'axios';
// 在线玩家显示的数据获取部分


onMounted(async () => {
  const response = await axios.get('https://api.mcsrvstat.us/3/mc.craft233.top');
  const playersNum = response.data.players.online;
  const players: number = playersNum as number;
  if (players > 2) {
    var playerInfo = players + "名";
  } else {
    var playerInfo = "";
  }
  document.getElementById('playerdata')!.textContent = playerInfo
})

const features = [
  // {
  //   title: "友好的氛围",
  //   icon: "heroicons:chat-bubble-left-right",
  //   description:
  //     `友善的玩家与管理团队解决您遇到的问题，立即加入，与其他<span id="playerdata"></span>玩家一同创建家园`,
  //   imageUrl:
  //     "/assets/img/index/town.png",
  // },
  {
    title: "原版生存",
    icon: "heroicons:chat-bubble-left-right",
    description:
      `由原版Luminol驱动的原版粘液生存服务器, 在此重新出发! `,
    imageUrl:
      "/assets/img/index/hub.png",
  },
  {
    title: "单方快生存",
    icon: "heroicons:chat-bubble-left-right",
    description:
      `原版经典单方快生存服务器, 由Leaves驱动. 走进空岛的世界, 探索不一样的体验`,
    imageUrl:
      "/assets/img/index/oneblock.png",
  },
];

// 特点部分

const features1 = [
  {
    icon: "lucide:cat",
    title: "基岩版头颅显示",
    description: `对基岩版物品栏内完整的插件头颅物品显示, 背包不再算是Steve头颅`,
  },
  {
    icon: "lucide:cable",
    title: "版本兼容",
    description:
      "支持Java版1.20及之后的版本以及基岩版的最新正式版",
  },
  {
    icon: "lucide:brush-cleaning",
    title: "删繁就简",
    description: "相比于二周目，第三周目删去了臃肿感知不大的插件，返璞归真"
  },
  {
    icon: "lucide:circle-arrow-up",
    title: "滚动更新",
    description: `当插件或模组支持, 我们会追随最新的Minecraft版本`,
  },
  {
    icon: "lucide:leaf",
    title: "线程优化",
    description: "主生存服借助Folia提升资源利用率, 减少卡顿"
  },
  {
    icon: "lucide:cloud-sun",
    title: "原生运行",
    description: "手动修改源码将粘液科技带回Folia平台, 不依靠修改Scheduler服务端, 提升稳定性"
  },
  {
    icon: "lucide:shield-check",
    title: "数据安全",
    description:
      "每日凌晨自动备份数据，保证数据安全",
  },
  {
    icon: "lucide:lock",
    title: "去密码化",
    description: "使用主流账号/外置登陆验证，不再依靠皮肤恢复和进服密码"
  },
  {
    icon: "lucide:terminal",
    title: "开源",
    description: "所有经过修改的插件均开源在GitHub平台"
  },
];

// 团队部分
// 上部分标题
const title = "我们的团队";
const description = "认识一下我们的管理人员";

// 人物信息部分
const members = [
  {
    avatar: "https://q1.qlogo.cn/g?b=qq&nk=3335792980&s=640",
    name: "Neokoni",
    position: "服主, 技术, 开发",
    introduce:
    {
      line1: "每天都在摸鱼的鸽子",
    },
    contact: [
      {
        icon: "lucide:github",
        link: "https://github.com/neokoni",
      },
      {
        icon: "lucide:mail",
        link: "mailto://me@neokoni.ink",
      },
    ],

  },
  {
    avatar: "https://q1.qlogo.cn/g?b=qq&nk=2117015126&s=640",
    name: "233laoliu",
    position: "管理员",
    introduce:
    {
      line1: "这个人很神秘,没有留下任何东西",
    },
    contact: [
      {
        icon: "",
        link: "",
      },
    ],

  },
  {
    avatar: "https://q1.qlogo.cn/g?b=qq&nk=2712878343&s=640",
    name: "gjyyds1",
    position: "管理员,礼包大使",
    introduce:
    {
      line1: "我除会了eee还会eee的",
    },
    contact: [
      {
        icon: "",
        link: "",
      },
    ],

  },
];

// 页面标题
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? '' : 'Craft233 - 三周目启动';
  }
})

</script>
