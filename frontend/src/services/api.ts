import axios from 'axios';
import type { FormData, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 120秒超时（DeepSeek API可能较慢）
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitAnalysis = async (formData: FormData): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>('/analysis', formData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return {
        success: false,
        error: error.response.data?.error || '服务器错误',
      };
    } else if (error.request) {
      return {
        success: false,
        error: '网络错误，请检查网络连接',
      };
    } else {
      return {
        success: false,
        error: error.message || '未知错误',
      };
    }
  }
};

