import axios from 'axios';
import type { AnalysisResult } from '../types';

// 在函数中动态读取环境变量，确保每次调用时都能获取最新值
function getApiKey(): string {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    console.error('❌ 错误：DEEPSEEK_API_KEY 未设置！');
    console.error('请检查 backend/.env 文件是否存在并包含 DEEPSEEK_API_KEY');
    throw new Error('DeepSeek API密钥未配置');
  }
  return apiKey;
}

function getApiUrl(): string {
  return process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1/chat/completions';
}

/**
 * 从文本中提取JSON（处理可能的markdown代码块）
 */
function extractJSON(text: string): string {
  // 尝试直接解析
  try {
    JSON.parse(text);
    return text;
  } catch {
    // 如果失败，尝试提取代码块中的JSON
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      return jsonMatch[1].trim();
    }
    
    // 尝试提取大括号包裹的内容
    const braceMatch = text.match(/\{[\s\S]*\}/);
    if (braceMatch) {
      return braceMatch[0];
    }
    
    return text;
  }
}

/**
 * 调用DeepSeek API进行分析
 */
export async function callDeepSeek(prompt: string): Promise<AnalysisResult> {
  const DEEPSEEK_API_KEY = getApiKey();
  const DEEPSEEK_API_URL = getApiUrl();

  try {
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      },
      {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 120000, // 120秒超时
      }
    );

    const content = response.data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('DeepSeek API返回内容为空');
    }

    // 提取JSON
    const jsonText = extractJSON(content);
    
    // 解析JSON
    let result: AnalysisResult;
    try {
      result = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('JSON解析失败，原始内容：', jsonText);
      throw new Error('DeepSeek API返回的JSON格式无效');
    }

    // 验证结果结构
    if (!result.executiveSummary || !result.recommendedLocations || !result.actionPlan) {
      throw new Error('DeepSeek API返回的数据结构不完整');
    }

    return result;
  } catch (error: any) {
    if (error.response) {
      console.error('DeepSeek API错误响应：', error.response.data);
      throw new Error(`DeepSeek API错误：${error.response.data?.error?.message || '未知错误'}`);
    } else if (error.request) {
      throw new Error('无法连接到DeepSeek API，请检查网络');
    } else {
      throw new Error(`请求错误：${error.message}`);
    }
  }
}

