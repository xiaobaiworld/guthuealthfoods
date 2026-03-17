# Guthu Health Foods Development Plan

## 概述 
本项目采用系统化的分步开发流程，每个阶段严格遵循以下操作规范：
1. 选取当前最高优先级的子任务，写入 `next.md`。
2. 依据 `next.md` 中的描述进行实际的代码开发。
3. 代码完成后进行本地审查和功能测试，确认无误。
4. 将已完成的步骤及结果记录补充进 `changelog.md` 中。
5. 清空 `next.md` 文件。
6. 执行本地的 Git commit。
7. 回到第1步，循环往复直至规划的单点特性彻底完成。
8. 整个大阶段完成后，将代码 Push 到远程的 GitHub 仓库。

---

## 计划阶段与任务列表 (Phases & Tasks)

### 阶段 1：本地架构设计与基础设搭建 (Phase 1: Foundation) - 已完成
- [x] 1.1 初始化 Next.js 项目并整理基础文件结构。
- [x] 1.2 设置多语言路径 (i18n routing: `/en` 和 `/zh`)。
- [x] 1.3 配置全局的基础 CSS 色彩令牌 (Health & Green 主题) 和字体变量。

### 阶段 2：核心 UI 与组件开发 (Phase 2: Core UI Components) - 已完成
- [x] 2.1 开发响应式全站主导航栏 (Navbar) 及语言切换器。
- [x] 2.2 开发兼顾人类阅读体验和 LLM 抓取规范性的主页页面骨架 (Hero Section)。
- [x] 2.3 开发富含结构化数据的全局页脚 (Footer)。
- [x] 2.4 构建通用且高跨度的“数据展示卡片”组件库 (Article / Data Cards)。

### 阶段 3：数据模型、批量内容生产与路由整合 (Phase 3: Content System & Scaled Routing)
- [ ] 3.1 设立 Markdown/JSON 的静态内容读取方法 (Content parsers)。
- [ ] 3.2 定义适用于 100+ 页面规模的双语内容数据模型（foods / categories / guides / pages）。
- [ ] 3.3 实施动态路由渲染双语内容页面。
- [ ] 3.4 建立首批发布集（建议 30 到 40 页）并完成本地 QA。
- [ ] 3.5 按波次扩展到 100+ 页面规模，并保持 sitemap / metadata / 内链同步。

### 阶段 4：SEO 及 LLM 极致优化与核验 (Phase 4: SEO / LLM / QA)
- [ ] 4.1 确立正式域名、双语 canonical 规则与 `hreflang` 映射策略。
- [ ] 4.2 实现布局级与页面级 Metadata（title、description、OpenGraph、alternates）。
- [ ] 4.3 为首页、列表页、详情页注入恰当的 JSON-LD。
- [ ] 4.4 生成 `robots.txt` 与 `sitemap.xml`，并核验收录路径是否准确。
- [ ] 4.5 建立本地 SEO/链接/索引核验清单，审查跨语言排版与页面可读性。

### 阶段 5：Google 接入与发布监测 (Phase 5: Google Integration & Launch Monitoring)
- [ ] 5.1 准备 Google Search Console 所需的域名、DNS 验证与 Sitemap 提交流程。
- [ ] 5.2 接入 Google Analytics 4，采用环境变量控制生产环境启用。
- [ ] 5.3 设计首批低噪音事件：语言切换、内容卡片点击、详情页浏览等。
- [ ] 5.4 在正式部署后验证 GA4 Realtime / DebugView 与 Search Console 覆盖状态。
