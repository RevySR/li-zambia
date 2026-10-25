# 李酋长 · 铜带省就职档案

使用 **Vue 3、TypeScript、Vite** 重构的单页站点。保留原页面的响应式布局、深浅色模式、部长/酋长切换、双时区时钟、加冕动画与音效、印章和 20 秒技能演练。

## 本地开发

需要 Node.js 22.12 或更高版本。

```bash
npm install
npm run dev
```

开发服务器默认位于 `http://localhost:5173`。

```bash
npm run typecheck  # Vue + TypeScript 类型检查
npm run build      # 类型检查并生成 dist/
npm run preview    # 本地预览生产构建
```

## 浏览器验收

先保持开发服务器运行，再执行：

```bash
npm run test:browser
```

脚本会真实操作桌面及移动端页面，检查模式切换、进度保存、加冕控制、印章和技能演练，并在 `/tmp/li-zambia-check` 生成截图。脚本优先使用 `/usr/bin/chromium`，也可指定浏览器：

```bash
CHROMIUM_PATH=/path/to/chromium npm run test:browser
```

可用 `BASE_URL` 和 `SCREENSHOT_DIR` 覆盖测试地址与截图目录。

## 静态托管

`npm run build` 会生成完全静态的 `dist/` 目录，可部署到任意静态网站托管服务。正式站点使用 `https://li-zambia.rv64gc.org/`。

`public/404.html`、图片、robots 和 sitemap 会一并复制到构建产物。

## 目录

```text
src/
├── components/          # 页面区块与交互组件
├── composables/         # 加冕状态、动画与合成音效
├── data/content.ts      # 仓库、纲领、仪程等静态数据
├── App.vue
├── main.ts
└── style.css
public/                  # Pages 静态资源与响应头配置
scripts/browser-smoke.mjs
```

> 当前 `vue-tsc` 与 TypeScript 7 的内部入口不兼容，因此 TypeScript 固定为 5.9；升级工具链前应先确认 `vue-tsc` 的兼容版本。
