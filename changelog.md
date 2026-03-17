# 变更日志 (Changelog)

所有的项目节点及核心开发变更记录如下：

## 初始状态
- 完成 `agent.md` 的创建。
- 完成本地 Git 环境初始化 (`xiaobaiworld` auth)。
- 明确并商定了采用 Next.js 为框架的开发方向及严谨的循环工作流流程。

## 阶段 1：基础设搭建
- **[完成] 1.1 初始化 Next.js 项目**：移除了默认的 Tailwind 配置，应用了 React 19 和最新版的 Next.js (app router)。同时，为了满足无需服务端配置的纯静态托管需求，配置了 `output: 'export'`。
- **[完成] 1.2 设置多语言路径**：基于 Next.js 的 SSG `generateStaticParams` 特性，利用中/英字典 (dictionaries) 成功设置了 `/[lang]/` 的动态路由。完成了 `npm run build` 测试，验证了无需服务端即可生成包含中英多语言的纯静态 html 文件夹 (`/out`)。
- **[完成] 1.3 配置全局 CSS 色彩**：清理了默认模板的样式，在 `globals.css` 中注入了基于自然绿色 (Green 50-900) 和大地色系 (Neutral 50-900) 的全局跨平台 CSS Variables，并设置了核心玻璃态 (Glassmorphism) 工具类。

## 阶段 2：核心 UI 与组件开发
- **[完成] 2.1 全站主导航栏与语言切换器**：在 `src/components/layout/Navbar.tsx` 实现了一个响应式的顶栏（融合了毛玻璃特效和绿色系主题色），支持 `/[lang]` 层级的路由高亮和自动切换语言，并将其部署到了跨页面共享的 `layout.tsx` 中。
- **[完成] 2.2 主页视觉骨架 (Hero Section)**：对 `app/[lang]/page.tsx` 页面进行了深度视觉改写，背景采用柔和动态的绿色渐变圆圈 (`mix-blend-multiply` 配合 `blur`) 加毛玻璃承载板。同时使用高度语义化的 HTML5 标签 (`<header>`, `<h1>`, `<p>`, `<main>`) 包裹内容，兼顾了顶级的人类视觉浏览体验和大语言模型爬虫抓取效率。
- **[完成] 2.3 全局富媒体页脚 (Footer)**：创建了兼具版权声明和网站核心大纲链接导航的 `Footer.tsx`，将底部的多级链接信息加入双语字典，并附带了语义化微数据。
- **[完成] 2.4 通用数据卡片 (DataCard)**：实现了 `src/components/ui/DataCard.tsx` 悬浮卡片式 UI 组件。该模块对 JSON 数据和 Markdown Frontmatter 完全兼容，并嵌入了主页的精选导读区域 (`Featured Content Area`) 用于验证。

## 规划补充：SEO 与 Google 集成
- 参考同级 `antiinfla` 项目的落地经验，补充了适用于当前双语 Next.js 架构的 SEO 与 Google 集成规划。
- 新增 `docs/seo-and-google-plan.md`，明确了 canonical、`hreflang`、JSON-LD、`robots.txt`、`sitemap.xml`、Search Console 与 GA4 的实施顺序。
- 扩展 `development-plan.md`，将原 Phase 4 细化为可执行 SEO/QA 任务，并新增 Phase 5 用于 Google Search Console 与 GA4 的接入和上线后验证。

## 规划补充：100+ 页面规模化执行
- 重写 `readme.md`，将项目从默认 Next.js 模板说明升级为面向 100+ 双语页面的真实项目说明。
- 新增 `docs/content-scale-plan.md`，明确页面家族、目标页量、分批发布策略、本地 commit 节奏与延后用户输入原则。
- 扩展 `development-plan.md` 的 Phase 3，使其覆盖内容模型、首批发布集、扩容波次与 100+ 页面规模控制。

## 阶段 3：数据模型、批量内容生产与路由整合
- **[完成] 3.1 设立 Markdown/JSON 的静态内容读取方法 (Content parsers)**：新增 `src/lib/content.ts`，完成基于 `gray-matter` 与 `remark` 的双语 Markdown 内容解析、按集合读取、按 slug 查询、关联内容查询与首页精选读取能力。
- **[完成] 3.2 定义适用于 100+ 页面规模的双语内容数据模型**：建立 `content/foods|categories|guides|pages/{en,zh}` 目录结构，并统一 frontmatter 字段（`slug`、`summary`、`translationKey`、`relatedSlugs`、`hero*`、`tags` 等）。
- **[完成] 3.3 实施动态路由渲染双语内容页面**：新增真实路由 `/{lang}/foods`、`/{lang}/foods/[slug]`、`/{lang}/foods/category/[slug]`、`/{lang}/guides`、`/{lang}/guides/[slug]`、`/{lang}/[slug]`，并接入共享内容模板和真实导航链接。
- **[完成] 3.4 建立首批发布集并完成本地 QA**：批量生成 128 个双语内容源文件，对应 96 个食品详情页、16 个分类页、8 个指南页、8 个静态说明页；结合首页、列表页后，本地 `npm run build` 成功导出 137 个静态页面。
- **[备注] 当前状态**：页面内容仍属于第一版结构化草稿，但 100+ 页面级别的真实站点结构、内链路径与可导出路由已经到位，后续可以在不重写路由的前提下持续优化视觉、文案、SEO 和数据质量。

## 阶段 4：SEO / LLM / QA
- **[完成] 4.1 确立正式域名占位、双语 canonical 规则与 alternates 基线**：新增 `src/lib/site.ts` 的站点 URL 配置和绝对 URL 构造方法，并通过 `src/lib/seo.ts` 统一输出 canonical 与双语 alternates。
- **[完成] 4.2 实现布局级与页面级 Metadata**：为首页、foods、food detail、category detail、guides、guide detail、static pages 接入共享 metadata 生成逻辑，补齐 title、description、Open Graph 和 Twitter card 基础字段。
- **[完成] 4.3 JSON-LD 与页面信号增强**：新增 `src/lib/schema.ts` 与 `src/components/seo/JsonLd.tsx`，为首页注入 `WebSite`/`Organization`，为列表页注入 `CollectionPage`，为食品、指南和静态详情页注入 `Article` / `WebPage` / `AboutPage` 结构化数据。
- **[完成] 4.4 生成 `robots.txt` 与 `sitemap.xml`**：新增 `src/app/robots.ts` 和 `src/app/sitemap.ts`，在静态导出模式下成功生成对应文件；本地 `npm run build` 当前可导出 139 个静态资源页面，其中包含 `/robots.txt` 与 `/sitemap.xml`。
- **[备注] 当前状态**：SEO 基线和结构化数据已经可用，但正式生产域名、Google Search Console 与 GA4 仍待下一阶段继续接入。

## 版本里程碑：v0.0.5
- 将 `package.json` 与 `package-lock.json` 版本号统一调整为 `0.0.5`。
- 该版本已具备 100+ 页面规模的双语内容路由、基础视觉结构、metadata、canonical / alternates、JSON-LD、`robots.txt` 与 `sitemap.xml`。
- 本地验证状态：`npm run build` 通过；`npm run lint` 仅剩 1 个非阻塞 warning（`DataCard.tsx` 中使用 `<img>`）。
