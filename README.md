# Feiyang Wang 的个人学术主页

纯静态单页网站，托管在 GitHub Pages 上。布局和视觉风格参照 [huaweilin.net](https://huaweilin.net/)，代码是重新写的。不需要安装或构建任何东西。

## 文件结构

```
index.html            页面内容，日常只改这个文件
assets/css/style.css  样式。颜色、字体、尺寸都在文件开头的 :root 变量里
assets/js/main.js     News 折叠、链接在新标签页打开、手机端时间线高亮、页脚年份
assets/img/           头像，以及可选的机构 logo（logos/ 文件夹）
.nojekyll             让 GitHub Pages 原样发布文件，不经过 Jekyll 处理
```

## 本地预览

```bash
cd ~/Desktop/website
python3 -m http.server 8000
```

然后用浏览器打开 http://localhost:8000 。改完文件刷新页面就能看到变化。

## 上线前要替换的内容

页面里方括号 `[...]` 括起来的文字都是占位，比如 `[Your University]`、`[Paper Title]`。News 和 Talks 里的 `[Paper]`、`[Code]`、`[Slides]`、`[Video]` 是链接文字的固定格式，可以保留。

除此之外还有这几处：

- [ ] `中文名`：顶栏和 `<title>` 里各一处
- [ ] `yourname AT example.com`：换成你想公开的邮箱，或者删掉这一行
- [ ] 所有 `href="#"` 的链接：LinkedIn、Google Scholar、CV、导师主页、论文等
- [ ] 头像（做法见下文）
- [ ] 状态横幅：不需要的话，删掉整个 `<div class="banner">`

检查有没有漏掉，下面两条命令都没有输出就说明替换完了：

```bash
grep -n -E '中文名|example\.com|href="#"' index.html
grep -n -o '\[[^]]*\]' index.html | grep -v -E '\[(Paper|Code|Slides|Video|Poster|Demo|Dataset)\]'
```

## 常见修改

### 加一条 News

在 `<ul class="dated-list" id="news-list">` 里复制任意一行 `<li class="dated-item">…</li>`，粘到最上面，改日期和内容。日期格式用 `Nov 2026`。

默认只显示前 5 条，其余的点 "Show More" 展开。要改显示条数，改 `assets/js/main.js` 开头的 `VISIBLE_COUNT`。

### 加一篇论文

在 `<ul class="pub-list">` 里复制一个 `<li>…</li>`。自己的名字用 `<b>…</b>` 包起来，标题链接填论文地址。

### 加一段经历

在 `<div class="timeline">` 里复制一个 `<article class="tl-item">…</article>`。

想用机构 logo 的话，先新建 `assets/img/logos/` 文件夹，把图片放进去，再把 `<i class="fa-solid fa-building org-icon" …></i>` 换成：

```html
<img class="org-logo" src="assets/img/logos/company.svg" alt="">
```

### 删掉不需要的板块

每个板块都是一段 `<section class="section">…</section>`，整段删掉即可。

### 换头像

1. 把照片存为 `assets/img/avatar.jpg`。最好是正方形，边长 300px 以上。
2. 在 `index.html` 里把 `avatar.svg` 改成 `avatar.jpg`，一共两处：`<head>` 里的 favicon，侧边栏的 `<img class="avatar">`。

`og:image` 已经指向 `avatar.jpg`。别人在微信、Slack、X 等地方分享你的主页链接时，预览图就是这张照片。

### 放 CV

把 PDF 存为 `assets/cv.pdf`，侧边栏 CV 的链接改成 `href="assets/cv.pdf"`。也可以直接填 Google Drive 之类的分享链接。

### 加联系方式

图标来自 [Font Awesome 6](https://fontawesome.com/search?ic=free)。侧边栏联系方式列表上方的注释里有 X (Twitter) 和 ORCID 的写法。

### 改颜色和字体

都在 `assets/css/style.css` 开头的 `:root` 里。

## 发布到 GitHub Pages

- 网站：https://feiyangwang-cs.github.io
- 仓库：https://github.com/feiyangwang-cs/feiyangwang-cs.github.io

本目录就是这个仓库的本地副本，通过 SSH 推送。每次修改完执行：

```bash
git add .
git commit -m "Update news"
git push
```

推送后一两分钟生效。如果页面没有更新，到仓库的 Actions 页面看 "pages build and deployment" 有没有报错，或者到 Settings → Pages 确认来源是 `main` 分支的 `/ (root)` 目录。

## 绑定自己的域名（可选）

1. 在本目录新建一个 `CNAME` 文件，里面只写一行域名，比如 `www.example.com`。
2. 到域名服务商那里加 DNS 记录：`www` 子域名加一条 CNAME，指向 `feiyangwang-cs.github.io`；根域名（`example.com`）要加 A 记录，IP 地址见 [GitHub 文档](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)。
3. 在仓库 Settings → Pages 里填上域名，勾选 "Enforce HTTPS"。

## 致谢

布局和视觉风格参照 [Huawei Lin 的主页](https://huaweilin.net/)。
