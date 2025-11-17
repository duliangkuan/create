# GitHub 和 Vercel 部署快速指南

## ✅ 已完成的工作

1. ✅ Git 仓库已初始化
2. ✅ 代码已提交到本地仓库
3. ✅ Vercel 配置文件已创建
4. ✅ 后端代码已适配 Vercel serverless 环境

## 📤 第一步：上传到 GitHub

### 1. 在 GitHub 上创建新仓库

1. 访问 https://github.com 并登录
2. 点击右上角的 **"+"** → **"New repository"**
3. 填写信息：
   - **Repository name**: `startup-analysis` (或您喜欢的名称)
   - **Description**: `AI创业方案推荐网站`
   - 选择 **Public** 或 **Private**
   - ⚠️ **不要**勾选 "Initialize this repository with a README"
4. 点击 **"Create repository"**

### 2. 连接本地仓库到 GitHub

在项目根目录运行以下命令（将 `YOUR_USERNAME` 替换为您的 GitHub 用户名）：

```bash
git remote add origin https://github.com/YOUR_USERNAME/startup-analysis.git
git branch -M main
git push -u origin main
```

**示例**：
```bash
git remote add origin https://github.com/zhangsan/startup-analysis.git
git branch -M main
git push -u origin main
```

如果提示输入用户名和密码，请使用 GitHub Personal Access Token（不是密码）。

## 🚀 第二步：部署到 Vercel

### 1. 登录 Vercel

1. 访问 https://vercel.com
2. 点击 **"Sign Up"** 或 **"Log In"**
3. 选择 **"Continue with GitHub"**（推荐，可以直接导入仓库）

### 2. 导入项目

1. 在 Vercel 仪表板中，点击 **"Add New..."** → **"Project"**
2. 在 "Import Git Repository" 中找到您刚创建的仓库
3. 点击 **"Import"**

### 3. 配置项目

#### 项目设置（Vercel 会自动检测，但请确认）

- **Framework Preset**: `Vite` ✅
- **Root Directory**: `./` (根目录) ✅
- **Build Command**: `cd frontend && npm install && npm run build` ✅
- **Output Directory**: `frontend/dist` ✅
- **Install Command**: `cd frontend && npm install` ✅

#### 环境变量（重要！）

点击 **"Environment Variables"**，添加以下变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `DEEPSEEK_API_KEY` | `你的DeepSeek_API密钥` | **必需** - 您的 DeepSeek API 密钥 |
| `DEEPSEEK_API_URL` | `https://api.deepseek.com/v1/chat/completions` | DeepSeek API 地址 |
| `NODE_ENV` | `production` | 生产环境标识 |
| `VERCEL` | `1` | 告诉应用运行在 Vercel 环境 |

**如何获取 DeepSeek API 密钥**：
1. 访问 https://platform.deepseek.com
2. 注册/登录账号
3. 在 API Keys 页面创建新的 API 密钥
4. 复制密钥并粘贴到 Vercel 环境变量中

### 4. 部署

1. 点击 **"Deploy"** 按钮
2. 等待构建完成（通常 2-5 分钟）
3. 部署成功后，Vercel 会提供一个 URL，例如：`https://startup-analysis.vercel.app`

### 5. 验证部署

1. 访问部署的 URL
2. 测试健康检查：`https://your-project.vercel.app/api/health`
3. 应该看到 JSON 响应：`{"status":"ok","message":"服务运行正常",...}`

## 🔄 自动部署

配置完成后，每次您推送到 GitHub 的 `main` 分支时，Vercel 会自动重新部署。

## ❓ 常见问题

### Q: 推送代码时提示需要认证？

**A**: GitHub 已不再支持密码认证，需要使用 Personal Access Token：

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 点击 "Generate new token (classic)"
3. 选择权限：`repo`（完整仓库访问权限）
4. 生成后复制 token
5. 推送时，用户名输入您的 GitHub 用户名，密码输入 token

### Q: API 路由返回 404？

**A**: 检查以下几点：
1. 确保 `api/[...path].ts` 文件存在
2. 检查 Vercel 函数日志（项目 → Functions 标签）
3. 确保环境变量 `VERCEL=1` 已设置

### Q: 构建失败？

**A**: 
1. 查看构建日志中的错误信息
2. 确保所有环境变量都已正确设置
3. 检查 Node.js 版本（Vercel 默认使用 18.x）

### Q: CORS 错误？

**A**: 后端代码已配置为在 Vercel 环境下允许所有来源。如果仍有问题：
1. 确保 `VERCEL=1` 环境变量已设置
2. 重新部署项目

## 📝 下一步

部署成功后，您可以：
- 在 Vercel 仪表板中查看实时日志
- 配置自定义域名
- 设置环境变量（开发/预览/生产环境）
- 查看部署历史和回滚

## 🆘 需要帮助？

- Vercel 文档：https://vercel.com/docs
- GitHub 文档：https://docs.github.com
- 查看项目中的 `DEPLOYMENT.md` 获取更详细的部署说明

