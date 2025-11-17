import { Router } from 'express';
import { validateFormData } from '../utils/validation';
import { buildPrompt } from '../services/prompt';
import { callDeepSeek } from '../services/deepseek';
import type { ApiResponse } from '../types';

const router = Router();

router.post('/', async (req, res) => {
  try {
    // 验证数据
    const validation = validateFormData(req.body);
    if (!validation.success) {
      const response: ApiResponse = {
        success: false,
        error: validation.error,
      };
      return res.status(400).json(response);
    }

    // 构建Prompt
    const prompt = buildPrompt(validation.data);

    // 调用DeepSeek API
    const result = await callDeepSeek(prompt);

    // 返回结果
    const response: ApiResponse = {
      success: true,
      data: result,
    };

    res.json(response);
  } catch (error: any) {
    console.error('分析错误：', error);
    const response: ApiResponse = {
      success: false,
      error: error.message || '分析失败，请重试',
    };
    res.status(500).json(response);
  }
});

export default router;

