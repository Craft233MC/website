<template>
    <NuxtLayout>
        <UiContainer class="py-16 text-center lg:py-24">
            <slot name="title">
                <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">规则区</h2>
            </slot>
            <slot name="description">
                <div class="flex w-full justify-center px-10">
                    <div class="space-y-2 ">
                        <span class="text-lg text-muted-foreground lg:text-xl">了解服务器内规则以更好地在服务器中游玩</span>
                    </div>
                </div>
            </slot>
        </UiContainer>
        <p v-html="serverRules" class="text-lg text-muted-foreground lg:text-xl
        px-10"> </p>
    </NuxtLayout>
</template>

<script setup lang="ts">
const serverRules = `
1. 关于偷盗，未使用服务器内相关保护插件如Residance, QuickShop等阻止访问的插件进行保护则不受偷盗管束。如果为使用了Residance领地插件包围了建筑物的大部分且由于资金原因没有扩展，则不在领地内的小部分依然受保护。<br>
<br>2. 关于建筑物破坏，若被恶意使用引雷或岩浆破坏且建筑物已具有一定规模，可要求服务器管理员查找相关证据并惩罚一段时间封禁，若反复作案或毁坏建筑物规模巨大，造成损失过于严重，将封禁<br>
<br>3. 关于作弊。服务器允许使用生存辅助类mod提升游玩体验，部分作弊端的辅助功能是允许的。但若出现影响他人游玩体验或被他人举报，仍将给予不同程度封禁惩罚<br>
<br>4. 矿透是不允许的<br>
<br>5. 关于言行，服务器及交流群禁止讨论任何违反国家法律的话题及言行，包括但不限于政治，暴力血腥，色情内容，虚拟货币，传播社会谣言，违反将给予禁言或封禁<br>
<br>6. 关于广告，禁止在服务器内及群内发布砍一刀或助力等推广，也不允许发布其他服务器的推广，特别是机器人推广。<br>
<br>7. 平等交流，禁止出现学历，性别，民族，地域等歧视，违者将被禁言严重者封禁<br>
<br>8. 话题不限制，虽然是MC的东西，但是服务器及交流群内并不限制讨论话题，包括游戏邀请或技术讨论等都是不受限制的<br>
<br>9. 关于交易，游戏内可以通过服务器内货币咕咕点在服务器商店出售或购买物品，如果有不包含的物品禁止向管理员提出购买请求。若有二手商品交易请自行辨别及是否使用"咸鱼"等交易平台，Craft233不负责交易担保<br>
<br>10. 虚拟物品现金交易，禁止以现金交易游戏内货币或物品，如咕咕点，钻石等物资<br>
<br>11. 公开监督，若Craft233管理人员出现言语辱骂，人身威胁，私自收受钱财等情况，请私信Neokoni或邮箱me@neokoni.ink提交材料举报<br>
`;
</script>