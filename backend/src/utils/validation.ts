import { z } from 'zod';
import type { FormData } from '../types';

// 表单数据验证Schema
const coreMetricsSchema = z.object({
  techMaturity: z.number().min(1).max(10),
  marketDemand: z.number().min(1).max(10),
  teamCompleteness: z.number().min(1).max(10),
  fundingAdequacy: z.number().min(1).max(10),
  techBarrier: z.number().min(1).max(10),
});

const keyChoicesSchema = z.object({
  aiField: z.string().min(1, '请选择AI技术领域'),
  startupStage: z.string().min(1, '请选择创业阶段'),
  fundingScale: z.string().min(1, '请选择资金需求规模'),
  teamSize: z.string().min(1, '请选择团队规模需求'),
});

const regionPreferenceSchema = z.object({
  region: z.string(),
  selected: z.boolean(),
  importance: z.number().min(1).max(5),
});

const policyPrioritiesSchema = z.object({
  taxIncentive: z.number().min(1).max(7),
  governmentSubsidy: z.number().min(1).max(7),
  talentVisa: z.number().min(1).max(7),
  incubatorSupport: z.number().min(1).max(7),
  dataCompliance: z.number().min(1).max(7),
  ipProtection: z.number().min(1).max(7),
  rdCooperation: z.number().min(1).max(7),
});

const timePlanningSchema = z.object({
  expectedStartTime: z.number().min(1),
  firstYearGoal: z.string().min(1, '请输入首年目标'),
});

export const formDataSchema = z.object({
  name: z.string().min(1, '请输入姓名或项目名'),
  contact: z.string().min(1, '请输入联系方式'),
  coreMetrics: coreMetricsSchema,
  keyChoices: keyChoicesSchema,
  regionPreferences: z.array(regionPreferenceSchema),
  specificCityPreference: z.string(),
  policyPriorities: policyPrioritiesSchema,
  timePlanning: timePlanningSchema,
});

export function validateFormData(data: unknown): { success: true; data: FormData } | { success: false; error: string } {
  try {
    const validated = formDataSchema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return {
        success: false,
        error: firstError?.message || '数据验证失败',
      };
    }
    return {
      success: false,
      error: '数据验证失败',
    };
  }
}

