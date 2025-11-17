# 快速启动指南

## 前置要求

- Node.js 18+ 
- npm 或 yarn
- DeepSeek API密钥（从 https://platform.deepseek.com 获取）

## 5分钟快速开始

### 步骤1：安装依赖

打开两个终端窗口：

**终端1 - 后端**
```bash
cd backend
npm install
```

**终端2 - 前端**
```bash
cd frontend
npm install
```

### 步骤2：配置后端环境变量

在 `backend` 目录下创建 `.env` 文件：

```bash
cd backend
cp .env.example .env
```

编辑 `.env` 文件，填入你的DeepSeek API密钥：

```env
DEEPSEEK_API_KEY=sk-your-actual-api-key-here
```

其他配置保持默认即可。

### 步骤3：启动服务

**终端1 - 启动后端**
```bash
cd backend
npm run dev
```

看到以下输出表示成功：
```
🚀 服务器运行在 http://localhost:3000
📡 API地址: http://localhost:3000/api
🔗 CORS允许来源: http://localhost:5173
```

**终端2 - 启动前端**
```bash
cd frontend
npm run dev
```

看到以下输出表示成功：
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 步骤4：访问应用

打开浏览器访问：http://localhost:5173

## 测试流程

1. **填写表单**：填写所有必填字段
   - 基本信息（姓名、联系方式）
   - 项目核心指标（使用滑块选择1-10分）
   - 关键选择（选择AI领域、创业阶段等）
   - 地区偏好（勾选并设置重要性）
   - 政策需求优先级（选择1-7）
   - 时间规划（预计启动时间和首年目标）

2. **提交分析**：点击"提交分析"按钮

3. **等待分析**：等待30-60秒（DeepSeek API处理时间）

4. **查看结果**：查看AI推荐的分析报告

## 常见问题

### Q: 后端启动失败，提示端口被占用
A: 修改 `backend/.env` 中的 `PORT=3000` 为其他端口，如 `PORT=3001`

### Q: 前端无法连接到后端
A: 检查：
1. 后端是否正常运行
2. `backend/.env` 中的 `CORS_ORIGIN` 是否设置为 `http://localhost:5173`
3. 浏览器控制台是否有CORS错误

### Q: DeepSeek API调用失败
A: 检查：
1. API密钥是否正确
2. API密钥是否有足够余额
3. 网络连接是否正常

### Q: 分析结果格式不正确
A: DeepSeek API可能返回非标准JSON，代码已包含容错处理。如果仍有问题，检查后端控制台的错误日志。

## 下一步

- 查看 `README.md` 了解详细文档
- 根据需要修改UI样式和Prompt模板

