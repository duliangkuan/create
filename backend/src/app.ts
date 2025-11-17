import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import analysisRoutes from './routes/analysis';

// 加载环境变量（确保从backend目录加载.env文件）
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// 验证关键环境变量
if (!process.env.DEEPSEEK_API_KEY) {
  console.error('❌ 错误：DEEPSEEK_API_KEY 未设置！');
  console.error('请检查 backend/.env 文件是否存在并包含 DEEPSEEK_API_KEY');
}

const app = express();
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// 中间件
// Vercel 环境下允许所有来源，本地开发使用配置的来源
const allowedOrigin = process.env.VERCEL === '1' 
  ? '*' 
  : CORS_ORIGIN;

app.use(cors({
  origin: allowedOrigin === '*' ? true : allowedOrigin,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 健康检查
app.get('/api/health', (req, res) => {
  const hasApiKey = !!process.env.DEEPSEEK_API_KEY;
  res.json({ 
    status: 'ok', 
    message: '服务运行正常',
    apiConfigured: hasApiKey,
    apiKeyPrefix: hasApiKey ? process.env.DEEPSEEK_API_KEY?.substring(0, 10) + '...' : '未配置'
  });
});

// 分析路由
app.use('/api/analysis', analysisRoutes);

// 404处理
app.use((req, res) => {
  res.status(404).json({ success: false, error: '接口不存在' });
});

// 错误处理中间件
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('服务器错误：', err);
  res.status(500).json({
    success: false,
    error: '服务器内部错误',
  });
});

// 启动服务器（仅用于本地开发）
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
    console.log(`📡 API地址: http://localhost:${PORT}/api`);
    console.log(`🔗 CORS允许来源: ${CORS_ORIGIN}`);
  });
}

// 导出 handler 用于 Vercel serverless
export default app;

