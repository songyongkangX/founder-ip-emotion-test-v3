# 后台管理系统部署说明

这个项目的网页继续放在 GitHub Pages，不需要重新购买服务器。学员数据、管理员登录和邀请邮件由 Supabase 提供。

## 1. 创建 Supabase 项目

在 Supabase 新建一个项目。项目建好后，在 SQL Editor 中完整执行 `supabase/schema.sql`。

## 2. 配置前端连接

在 Supabase 项目设置的 API 页面复制：

- Project URL
- publishable key（旧项目也可以使用 anon key）

把它们分别填入根目录 `config.js` 的 `supabaseUrl` 和 `supabasePublishableKey`。publishable key 本来就是给浏览器使用的；不要把 secret key 或 service role key 写进任何网页文件。

## 3. 设置登录回跳地址

在 Supabase 的 Authentication → URL Configuration 中设置：

- Site URL：网站正式地址
- Redirect URLs：加入网站的 `/admin/` 地址

例如：`https://example.com/admin/`

## 4. 部署两个安全函数

安装并登录 Supabase CLI 后，在项目根目录运行：

```bash
supabase link --project-ref <你的项目编号>
supabase secrets set ADMIN_BOOTSTRAP_CODE=<首次开通凭证>
supabase secrets set ADMIN_REDIRECT_URL=https://<你的正式网站>/admin/
supabase functions deploy bootstrap-admin
supabase functions deploy invite-admin
```

首次开通凭证只保存在 Supabase 的加密环境变量里，不要提交到 GitHub。Supabase 会自动向函数提供项目 URL 和服务器端密钥。

## 5. 开通首位管理员

访问网站的 `/admin/`，展开“首次开通管理员”，输入邮箱、自设密码和首次开通凭证。成功后首次开通入口会在服务器端自动失效。

以后新增管理员只能由已经登录的管理员在后台点击“邀请管理员”，对方通过邮件链接加入并设置自己的密码。

## 数据权限

- 普通访客只能提交自己的测评，不能读取任何学员数据。
- 有效管理员可以读取、导出和删除测评记录。
- service role key 只存在于 Supabase 函数环境，不会暴露到 GitHub Pages。
- 学员开始答题前必须确认资料用于本次测评与后续服务。
