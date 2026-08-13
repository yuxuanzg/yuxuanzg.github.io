# 诸葛宇轩 学术主页

清华大学物理系本科生 · 研究方向：非厄米物理、量子开放系统与拓扑物态 · 基于 GitHub Pages 的纯静态学术主页。

## 一、整体流程（概览）

```
本地搭建 → 内容填充 → 本地预览 → 推送到 GitHub → 启用 GitHub Pages → 上线访问
```

| 步骤 | 说明 |
| --- | --- |
| 1. 本地搭建 | 纯 HTML/CSS/JS 静态站点，无需安装任何构建工具 |
| 2. 内容填充 | 替换占位信息：头像、简介、教育、项目、博客 |
| 3. 本地预览 | 用浏览器打开，或用本地服务器预览效果 |
| 4. 推送 GitHub | 创建仓库并 `git push` |
| 5. 启用 Pages | 仓库 Settings → Pages → 选择分支 `main` |
| 6. 上线访问 | 访问 `https://yuxuanzg.github.io` |

## 二、文件结构

```
webpage/
├── index.html              # 首页（Hero / 关于 / 研究 / 教育 / 项目 / 博客 / 联系）
├── projects.html           # 项目经历页
├── blog/
│   ├── index.html          # 博客列表页
│   └── posts/              # 文章目录（每篇一个 html）
│       ├── hello-world.html
│       └── non-hermitian-notes.html
├── css/style.css           # 全部样式（彩色现代风）
├── js/main.js              # 交互（导航高亮 / 滚动动画 / 回到顶部）
├── assets/
│   ├── avatar.svg          # 卡通狐狸头像（可替换为你的照片）
│   └── favicon.svg         # 站点图标
├── study-foundation/       # 本地文献参考（.gitignore 排除，不随站点发布）
└── README.md
```

## 三、本地预览

方式一（最简单）：直接双击 `index.html` 用浏览器打开。

方式二（推荐，路径更真实）：在项目根目录启动本地服务器：

```bash
# Python 3
python -m http.server 8000
# 或 Node.js
npx serve .
```

然后访问 `http://localhost:8000`。

## 四、内容替换指南

| 内容 | 修改位置 |
| --- | --- |
| 头像 | 用 `assets/avatar.jpg/png` 替换，并把 `index.html` 中 `<img class="avatar" src="assets/avatar.svg">` 改为你的文件名 |
| 姓名 / 简介 | `index.html` 中 Hero 区域与「关于我」区块 |
| 研究方向 | `index.html` 的「研究方向」区块 |
| 教育经历 | `index.html` 的「教育经历」时间线 |
| 项目 | `index.html` 与 `projects.html` 的项目卡片 |
| 联系方式 | `index.html` 的「联系我」区块 |
| 博客 | 复制 `blog/posts/` 下的示例文章改内容，再到 `blog/index.html` 列表添加链接 |
| 站点标题 / 描述 | 每个 `<head>` 中的 `<title>` 与 `<meta name="description">` |

## 五、部署到 GitHub Pages

### 5.1 创建 GitHub 仓库

登录 GitHub，新建仓库，仓库名必须是你的用户名：

```
yuxuanzg.github.io
```

> 这样部署后域名就是 `https://yuxuanzg.github.io`（个人主页站点）。

### 5.2 本地初始化并推送

> 本机 Git 安装在 `C:\Program Files\Git\bin\git.exe`（不在 PATH 中），
> 因此**最简单的做法是双击项目根目录下的 `deploy.bat`**，它会自动完成远程仓库配置与推送。

也可以手动执行（命令行中 `git` 请换成完整路径
`"C:\Program Files\Git\bin\git.exe"`）：

```bash
git init
git add .
git commit -m "初始化学术主页"
git branch -M main
git remote add origin https://github.com/yuxuanzg/yuxuanzg.github.io.git
git push -u origin main
```

> 首次推送会弹出 GitHub 登录窗口（或要求输入用户名 + Personal Access Token）。

### 5.3 启用 GitHub Pages

1. 打开仓库页面 → **Settings**
2. 左侧找到 **Pages**
3. **Source** 选择 `Deploy from a branch`，分支选 `main`，目录选 `/ (root)`
4. 点击 **Save**
5. 等待 1–2 分钟，访问 `https://yuxuanzg.github.io` 即可看到你的主页

> 之后每次更新内容，只需 `git add . && git commit -m "更新" && git push`，
> GitHub 会自动重新部署。

## 六、可选：自定义域名

1. 购买域名（如阿里云/Cloudflare），添加 CNAME 记录指向 `yuxuanzg.github.io`
2. 在仓库 Settings → Pages → Custom domain 中填入你的域名并保存
3. 在项目根目录创建 `CNAME` 文件（内容为你的域名），随代码一起推送

## 七、常见问题

- **页面打不开？** 检查仓库名是否为 `用户名.github.io`，且 Pages 设置已保存，等待 1–2 分钟。
- **头像不显示？** 确认 `assets/` 中的文件名与 `index.html` 中 `src` 一致（注意大小写）。
- **改了内容没生效？** 推送后需要等 GitHub 自动部署完成（1–2 分钟），强制刷新浏览器（Ctrl+F5）。
- **想在本地用其他端口？** `python -m http.server 端口号`，如 `8001`。
