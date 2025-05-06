<template>
    <div>
        <header class="z-20 bg-background/80 backdrop-blur fixed w-full max-w-[1280px]">
            <UiContainer class="flex h-16 items-center justify-between lg:h-20">
                <div class="flex items-center gap-10">
                    <NuxtLink to="/" class="flex items-center gap-3">
                        <!-- eslint-disable-next-line vue/html-self-closing -->
                        <img src="https://res.neokoni.ink/craft233/img/craft233_logo.svg" fit="contain"
                            alt="Company Logo" title="Company Logo" class="h-6 object-contain lg:h-8" />
                        <!-- <span class="font-semibold lg:text-lg">Craft233</span> -->
                    </NuxtLink>
                    <UiNavigationMenu as="nav" class="hidden items-center justify-start gap-8 lg:flex">
                        <UiNavigationMenuList class="gap-2">
                            <UiNavigationMenuItem>
                                <UiNavigationMenuLink as-child>
                                    <UiButton to="/" variant="ghost" size="sm">主页</UiButton>
                                </UiNavigationMenuLink>
                            </UiNavigationMenuItem>
                            <UiNavigationMenuItem>
                                <UiNavigationMenuLink as-child>
                                    <a href="https://docs.craft233.top" target="_blank">
                                        <UiButton variant="ghost" size="sm">文档
                                            <Icon name="lucide:external-link" class="h-4 w-4" />
                                        </UiButton>
                                    </a>

                                </UiNavigationMenuLink>
                            </UiNavigationMenuItem>
                            <UiNavigationMenuItem>
                                <UiNavigationMenuLink as-child>
                                    <UiButton to="/archive" variant="ghost" size="sm">存档</UiButton>
                                </UiNavigationMenuLink>
                            </UiNavigationMenuItem>
                            <UiNavigationMenuItem>
                                <UiNavigationMenuLink as-child>
                                    <UiButton to="/contribute" variant="ghost" size="sm">贡献</UiButton>
                                </UiNavigationMenuLink>
                            </UiNavigationMenuItem>
                            <UiNavigationMenuItem>
                                <UiNavigationMenuLink as-child>
                                    <UiButton to="/friendlinks" variant="ghost" size="sm">友情链接</UiButton>
                                </UiNavigationMenuLink>
                            </UiNavigationMenuItem>
                        </UiNavigationMenuList>
                    </UiNavigationMenu>
                </div>
                <div class="lg:hidden">
                    <UiSheet>
                        <ColorMode size="icon-sm"/>
                        <UiSheetTrigger as-child>
                            <UiButton variant="ghost" size="icon-sm">
                                <Icon name="lucide:menu" class="h-5 w-5" />
                            </UiButton>
                            <UiSheetContent class="w-[90%] p-0">
                                <template #content>
                                    <UiSheetTitle class="sr-only" title="Mobile menu" />
                                    <UiSheetDescription class="sr-only" description="Mobile menu" />
                                    <UiSheetX class="z-20" />

                                    <UiScrollArea class="h-full p-5">
                                        <div class="flex flex-col gap-2">
                                            <UiButton variant="ghost" class="justify-start text-base" to="/">主页
                                            </UiButton>
                                            <a href="https://docs.craft233.top" target="_blank">
                                                <UiButton variant="ghost" class="justify-start text-base">文档
                                                    <Icon name="lucide:external-link" class="h-4 w-4" />
                                                </UiButton>
                                            </a>
                                            <UiButton variant="ghost" class="justify-start text-base" to="/archive">存档
                                            </UiButton>
                                            <UiButton variant="ghost" class="justify-start text-base" to="/contribute">贡献
                                            </UiButton>
                                            <UiButton variant="ghost" class="justify-start text-base" to="/friendlinks">友情链接
                                            </UiButton>
                                        </div>
                                    </UiScrollArea>
                                </template>
                            </UiSheetContent>
                        </UiSheetTrigger>
                    </UiSheet>
                </div>
                <UiNavigationMenu as="nav" class="hidden items-center justify-start gap-8 lg:flex">
                    <ColorMode />
                </UiNavigationMenu>
            </UiContainer>
        </header>
        <div class="h-16 lg:h-20"></div>
        <slot />
        <!------------------------ 下面是脚页 ------------------------------>
        <UiContainer as="footer" class="py-16 ">
            <section class="grid grid-cols-2 gap-8 lg:grid-cols-6">
                <div class="col-span-full pb-10 lg:col-span-2">
                    <NuxtLink to="/" class="flex items-center gap-3">
                        <!-- eslint-disable-next-line vue/html-self-closing -->
                        <img src="https://res.neokoni.ink/craft233/img/craft233_logo.svg" fit="contain"
                            alt="Company Logo" title="Company Logo" class="h-7 object-contain lg:h-10" />
                        <span class="text-xl font-semibold">Craft233</span>
                    </NuxtLink>
                    <p class="mt-5 text-muted-foreground">
                        "Minecraft" 以及 "我的世界" 为 Mojang AB. 的商标，<br>"Craft233" 和本网站与 Mojang 以及 Microsoft 没有任何从属关系。<br>"Craft233" 不是 Minecraft 官方的服务器。
                    </p>
                </div>
                <template v-for="n in 1">
                    <div>
                        <p class="mb-4 text-sm text-muted-foreground">交流</p>
                        <ul class="flex flex-col gap-3">
                            <li>
                                <NuxtLink target="_blank" class="font-semibold hover:text-primary"
                                    to="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=QofGtNhyZdlU0kVZtr81sGxVDMzKGkkt&authKey=59dPS936wuYm%2Bg4qHFkMdo8IYTcdD6Jp8Q9kBb2Mmv8i7APEm0Ms2373ztiW97wE&noverify=0&group_code=830277457">
                                    QQ群
                                    <Icon name="lucide:external-link" class="h-4 w-4" />
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </template>
                <template v-for="n in 1">
                    <div>
                        <p class="mb-4 text-sm text-muted-foreground">Craft233</p>
                        <ul class="flex flex-col gap-3">
                            <li>
                                <NuxtLink class="font-semibold hover:text-primary" target="_blank"
                                    to="https://github.com/Craft233MC">Github
                                    <Icon name="lucide:external-link" class="h-4 w-4" />
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink class="font-semibold hover:text-primary" target="_blank"
                                    to="https://space.bilibili.com/3546655496342120">BiliBili
                                    <Icon name="lucide:external-link" class="h-4 w-4" />
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </template>
                <template v-for="n in 1">
                    <div>
                        <p class="mb-4 text-sm text-muted-foreground">宣传贴</p>
                        <ul class="flex flex-col gap-3">
                            <li>
                                <NuxtLink class="font-semibold hover:text-primary" target="_blank"
                                    to="https://www.minebbs.com/threads/1-13-x-1-20-x-craft233-2.19401/">MineBBS
                                    <Icon name="lucide:external-link" class="h-4 w-4" />
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink class="font-semibold hover:text-primary" target="_blank"
                                    to="https://klpbbs.com/thread-135065-1-1.html">苦力怕论坛
                                    <Icon name="lucide:external-link" class="h-4 w-4" />
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </template>
                <template v-for="n in 1">
                    <div>
                        <p class="mb-4 text-sm text-muted-foreground">相关链接</p>
                        <ul class="flex flex-col gap-3">
                            <li>
                                <NuxtLink class="font-semibold hover:text-primary" target="_blank"
                                    to="https://skin.craft233.top/">Craft233 Skin
                                    <Icon name="lucide:external-link" class="h-4 w-4" />
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink class="font-semibold hover:text-primary" target="_blank"
                                    to="https://status.craft233.top/status/craft233">外部监测站
                                    <Icon name="lucide:external-link" class="h-4 w-4" />
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink class="font-semibold hover:text-primary" target="_blank"
                                    to="https://afdian.com/a/neokoni/">爱发电
                                    <Icon name="lucide:external-link" class="h-4 w-4" />
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </template>
            </section>

            <section class="mt-12 flex flex-col justify-between gap-5 border-t pt-8 lg:mt-16 lg:flex-row">
                <p class="text-muted-foreground">
                    &copy; 2023-{{ new Date().getFullYear() }} Craft233. All rights reserved.<br>
                    <a href="https://icp.gov.moe/?keyword=20232336" target="_blank">萌ICP备20232336号</a><br>
                    <a href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备2024074700号-1</a><br>
                    <a href="https://beian.mps.gov.cn/#/query/webSearch?code=51130402000151" target="_blank">川公网安备51130402000151号</a>
                </p>
                <div class="flex items-center gap-2">
                    <Icon name="lucide:github" class="h-7 w-7" />
                    <Icon name="ri:bilibili-line" class="h-7 w-7" />
                </div>
            </section>
        </UiContainer>
    </div>
</template>