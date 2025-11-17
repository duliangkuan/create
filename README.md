# AI创业方案推荐网站

一个简洁的AI创业方案推荐网站MVP，通过分析创业者提交的量化数据，使用DeepSeek大模型进行分析，输出格式化的创业地点匹配分析报告。

## 功能特点

- ✅ 3步流程式设计：填写表单 → AI分析 → 查看结果
- ✅ 完整的量化表单：包含项目核心指标、关键选择、地区偏好等
- ✅ 拖拽式政策优先级排序：直观的拖拽排序，确保顺序不重复
- ✅ DeepSeek AI集成：智能分析并推荐最佳创业地点
- ✅ 格式化结果展示：执行摘要、推荐地点、行动清单、资源对接、风险提示
- ✅ 无数据库设计：完全无状态，临时处理
- ✅ 响应式设计：支持移动端和桌面端

## 技术栈

### 前端
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Hook Form

### 后端
- Node.js + Express + TypeScript
- DeepSeek API
- Zod（数据验证）

## 快速开始

### 1. 安装依赖

#### 前端
```bash
cd frontend
npm install
```

#### 后端
```bash
cd backend
npm install
```

### 2. 配置环境变量

#### 后端环境变量
复制 `backend/.env.example` 为 `backend/.env`，并填写：

```env
PORT=3000
NODE_ENV=development
DEEPSEEK_API_KEY=your_deepseek_api_key_here
DEEPSEEK_API_URL=https://api.deepseek.com/v1/chat/completions
CORS_ORIGIN=http://localhost:5173
```

#### 前端环境变量（可选）
复制 `frontend/.env.example` 为 `frontend/.env`，如需修改API地址：

```env
VITE_API_BASE_URL=/api
```

### 3. 启动开发服务器

#### 启动后端
```bash
cd backend
npm run dev
```

后端将在 `http://localhost:3000` 运行

#### 启动前端
```bash
cd frontend
npm run dev
```

前端将在 `http://localhost:5173` 运行

### 4. 访问应用

打开浏览器访问 `http://localhost:5173`

## 项目结构

```
.
├── frontend/              # 前端项目
│   ├── src/
│   │   ├── components/   # React组件
│   │   │   ├── Step1Form.tsx      # 步骤1：表单
│   │   │   ├── Step2Loading.tsx   # 步骤2：加载动画
│   │   │   └── Step3Result.tsx     # 步骤3：结果展示
│   │   ├── services/     # API服务
│   │   ├── types/        # TypeScript类型
│   │   └── App.tsx       # 主应用
│   └── package.json
│
├── backend/               # 后端项目
│   ├── src/
│   │   ├── routes/       # 路由
│   │   ├── services/     # 业务逻辑
│   │   │   ├── deepseek.ts    # DeepSeek API调用
│   │   │   └── prompt.ts      # Prompt模板
│   │   ├── utils/        # 工具函数
│   │   └── app.ts        # 应用入口
│   └── package.json
│
└── README.md
```

## API接口

### POST /api/analysis

提交表单数据并获取分析结果

**请求体**：
```json
{
  "name": "张三",
  "contact": "zhang@example.com",
  "coreMetrics": {
    "techMaturity": 7,
    "marketDemand": 8,
    "teamCompleteness": 5,
    "fundingAdequacy": 6,
    "techBarrier": 7
  },
  "keyChoices": {
    "aiField": "自然语言处理",
    "startupStage": "原型开发",
    "fundingScale": "50-200万美元",
    "teamSize": "6-15人"
  },
  "regionPreferences": [
    {"region": "北美(美/加)", "selected": true, "importance": 5}
  ],
  "policyPriorities": {
    "taxIncentive": 1,
    "governmentSubsidy": 2,
    "talentVisa": 3,
    "incubatorSupport": 4,
    "dataCompliance": 5,
    "ipProtection": 6,
    "rdCooperation": 7
  },
  "timePlanning": {
    "expectedStartTime": 6,
    "firstYearGoal": "完成产品MVP并获取100个客户"
  }
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "executiveSummary": {
      "recommendedLocation": "硅谷",
      "matchScore": 92
    },
    "projectProfile": { ... },
    "recommendedLocations": [ ... ],
    "actionPlan": { ... },
    "resources": { ... },
    "risks": [ ... ],
    "riskMitigation": [ ... ]
  }
}
```

## 开发说明

### 前端开发
- 使用 `npm run dev` 启动开发服务器
- 使用 `npm run build` 构建生产版本

### 后端开发
- 使用 `npm run dev` 启动开发服务器（自动重启）
- 使用 `npm run build` 编译TypeScript
- 使用 `npm start` 运行编译后的代码

## 注意事项

1. **DeepSeek API密钥**：需要有效的DeepSeek API密钥才能使用
2. **网络超时**：DeepSeek API响应可能较慢（30-60秒），已设置120秒超时
3. **数据存储**：本MVP版本不存储任何数据，刷新页面会丢失结果
4. **CORS配置**：确保后端CORS_ORIGIN配置正确

## 许可证

MIT

