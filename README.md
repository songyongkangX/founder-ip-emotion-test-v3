# 创始人 IP 情绪风格测评

零依赖静态网页，打开 `index.html` 即可使用。

在线访问：<https://songyongkangX.github.io/founder-ip-emotion-test-v3/>

## 功能

- 33 道测评题（含 2 道可选八字题），自动累计怒、喜、哀、惧、爱、恶、欲七类情绪分数
- 自动生成主情绪、辅助情绪与可直接执行的视频拍摄方案
- 按结果提供首条视频脚本、5 类选题方向、视觉与听觉风格、辅助情绪用法和付费障碍应对策略
- 完成测评后自动在当前浏览器存档，再次打开时直接恢复上次结果
- 答题过程中逐题保存进度，关闭后可从上次题目继续
- 结果页提供快速目录与表达信号强度提示
- 使用 html2canvas 导出适合手机查看的 1080×1440 精华结果卡，并保留 SVG 兜底方案
- 支持移动端布局

如果需要本地预览，可在项目目录运行任意静态服务器，例如：

```bash
python3 -m http.server 4173
```

然后打开 `http://localhost:4173`。

## 分享链接

外部结果链接支持通过 URL 参数直接打开结果页：

```text
https://songyongkangX.github.io/founder-ip-emotion-test-v3/?answers=x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x
```

答案会编码在 URL 中，数据只保存在链接里，不会上传到服务器。将本文件夹部署到 GitHub Pages、Netlify、Vercel 静态托管或自己的域名后，访问带有 ?answers=... 的链接即可直接打开结果页。
