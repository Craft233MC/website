# Craft233 Vue Remake Guide

## 目标
- 使用 Vue 3 + Tailwind CSS 重制 Craft233 站点。
- 仅使用 Vue 生态与 Tailwind，不引入 Nuxt、React、Svelte 等其他前端框架。
- 页面结构按 Vue 原生组件 + 路由方式拆分，不再做成单页堆叠式页面。
- 当前重制版本定位为 V2，版本号以 2 开头。

## 技术栈
- Vue 3
- Vue Router 4
- Vite
- Tailwind CSS

## 路由页面
- `/` 首页
- `/join` 加入服务器
- `/rules` 规则区
- `/archive` 历史存档下载
- `/contribute` 贡献
- `/sponsors` 赞助者们
- `/friendlinks` 友情链接

## 内容组织
所有站点文案、链接、卡片数据、团队信息、赞助者列表与友链信息都集中在：

- [src/content/siteContent.ts](src/content/siteContent.ts)

这是后续 AI 继续理解项目时的首要入口。

## 结构说明
- [src/App.vue](src/App.vue)：根组件，只负责挂载站点外壳和路由视图。
- [src/components/SiteShell.vue](src/components/SiteShell.vue)：全站公共壳，包含顶部导航、移动端菜单、主题切换和页脚。
- [src/router.ts](src/router.ts)：路由定义与页面标题更新。
- [src/views/*](src/views)：按页面拆分的独立路由视图（Vue 常见目录约定）。
- [src/styles/main.css](src/styles/main.css)：全局样式、字体和主题变量。

## 资源策略
- 优先复用原站点的直链静态资源。
- 首页、存档、加入页面使用的图片均直接指向原站或文档站的公开资源。
- 头像、Logo、存档封面都保持外链引用，避免重复存储。

## 备注
- 页面标题由路由元信息统一管理。
- 深色 / 浅色主题由本地状态控制，并写入 localStorage。
- 当前实现是一个标准的 Vue SPA，便于后续继续拆分组件或接入更多页面。

## 开发规范
- commit log 使用声明式写法，并保持语义清晰（推荐 Conventional Commits 形式，如 `feat: ...`、`fix: ...`、`chore: ...`）。
