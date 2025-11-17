# 部署指南

本指南将帮助您将项目部署到 GitHub 和 Vercel。

## 第一步：上传到 GitHub

### 1. 初始化 Git 仓库（已完成）

项目已经初始化了 Git 仓库。

### 2. 添加所有文件并提交

```bash
git add .
git commit -m "Initial commit: AI创业方案推荐网站"
```

### 3. 在 GitHub 上创建新仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角的 "+" 号，选择 "New repository"
3. 填写仓库信息：
   - Repository name: `startup-analysis` (或您喜欢的名称)
   - Description: `AI创业方案推荐网站`
   - 选择 Public 或 Private
   - **不要**勾选 "Initialize this repository with a README"（因为我们已经有了）
4. 点击 "Create repository"

### 4. 连接本地仓库到 GitHub

GitHub 会显示连接命令，类似这样：

```bash
git remote add origin https://github.com/你的用户名/startup-analysis.git
git branch -M main
git push -u origin main
```

**注意**：将 `你的用户名` 和 `startup-analysis` 替换为您实际的 GitHub 用户名和仓库名。

### 5. 推送代码

```bash
git push -u origin main
```

## 第二步：部署到 Vercel

### 1. 注册/登录 Vercel

1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub 账号登录（推荐，这样可以直接导入 GitHub 仓库）

### 2. 导入项目

1. 在 Vercel 仪表板中，点击 "Add New..." → "Project"
2. 选择您刚创建的 GitHub 仓库
3. 点击 "Import"

### 3. 配置项目设置

Vercel 会自动检测项目配置，但您需要确认以下设置：

#### 项目设置
- **Framework Preset**: Vite（应该自动检测）
- **Root Directory**: `./` (根目录)
- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/dist`
- **Install Command**: `cd frontend && npm install`

#### 环境变量

在 "Environment Variables" 部分，添加以下环境变量：

```
DEEPSEEK_API_KEY=你的DeepSeek_API密钥
DEEPSEEK_API_URL=https://api.deepseek.com/v1/chat/completions
NODE_ENV=production
PORT=3000
VERCEL=1
```

**重要**：
- `DEEPSEEK_API_KEY`: 您的 DeepSeek API 密钥（必需）
- `VERCEL=1`: 告诉应用运行在 Vercel 环境中

### 4. 部署

1. 点击 "Deploy" 按钮
2. 等待构建完成（通常需要 2-5 分钟）
3. 部署完成后，Vercel 会提供一个 URL，例如：`https://your-project.vercel.app`

### 5. 验证部署

1. 访问部署的 URL
2. 测试 API 端点：`https://your-project.vercel.app/api/health`
3. 应该看到健康检查响应

## 常见问题

### API 路由不工作

如果 `/api/*` 路由返回 404：

1. 检查 `api/[...path].ts` 文件是否存在
2. 确保后端代码正确导出了 Express 应用
3. 检查 Vercel 函数日志（在 Vercel 仪表板的 "Functions" 标签）

### 环境变量未生效

1. 确保在 Vercel 项目设置中添加了所有必需的环境变量
2. 重新部署项目（环境变量更改后需要重新部署）
3. 检查变量名是否正确（区分大小写）

### 构建失败

1. 检查构建日志中的错误信息
2. 确保所有依赖都已正确安装
3. 检查 Node.js 版本（Vercel 默认使用 Node.js 18.x）

### CORS 错误

后端代码已经配置为在 Vercel 环境下允许所有来源。如果仍有 CORS 问题：

1. 检查 `backend/src/app.ts` 中的 CORS 配置
2. 确保 `VERCEL=1` 环境变量已设置

## 更新部署

每次推送到 GitHub 的 main 分支时，Vercel 会自动重新部署。

您也可以手动触发部署：
1. 在 Vercel 仪表板中选择项目
2. 点击 "Deployments" 标签
3. 点击 "Redeploy"

## 自定义域名

1. 在 Vercel 项目设置中，进入 "Domains" 部分
2. 添加您的自定义域名
3. 按照提示配置 DNS 记录

## 监控和日志

- **函数日志**: Vercel 仪表板 → 项目 → "Functions" 标签
- **部署日志**: Vercel 仪表板 → 项目 → "Deployments" → 选择部署 → "Build Logs"
- **实时日志**: Vercel CLI 使用 `vercel logs`

## 本地开发

部署后，您仍然可以在本地开发：

```bash
# 启动后端
cd backend
npm run dev

# 启动前端（新终端）
cd frontend
npm run dev
```

本地开发时，前端会通过 Vite 代理连接到本地后端（`http://localhost:3000`）。

