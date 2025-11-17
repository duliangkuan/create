import type { FormData } from '../types';

export function buildPrompt(formData: FormData): string {
  const selectedRegions = formData.regionPreferences
    .filter(r => r.selected)
    .map(r => `${r.region}(${r.importance}⭐)`)
    .join('、');

  const policyPriorityList = Object.entries(formData.policyPriorities)
    .sort(([, a], [, b]) => a - b)
    .map(([key, priority]) => {
      const labels: Record<string, string> = {
        taxIncentive: '税收优惠',
        governmentSubsidy: '政府补贴',
        talentVisa: '人才签证',
        incubatorSupport: '孵化器支持',
        dataCompliance: '数据合规指导',
        ipProtection: '知识产权保护',
        rdCooperation: '研发合作机会',
      };
      return `${labels[key] || key}(${priority})`;
    })
    .join('、');

  return `你是一位专业的AI创业顾问。请根据以下创业者的项目信息，分析并推荐最适合的创业地点。

## 项目信息
姓名/项目名：${formData.name}
技术成熟度：${formData.coreMetrics.techMaturity}/10
市场需求强度：${formData.coreMetrics.marketDemand}/10
团队完整性：${formData.coreMetrics.teamCompleteness}/10
资金充足度：${formData.coreMetrics.fundingAdequacy}/10
技术壁垒高度：${formData.coreMetrics.techBarrier}/10

AI技术领域：${formData.keyChoices.aiField}
创业阶段：${formData.keyChoices.startupStage}
资金需求规模：${formData.keyChoices.fundingScale}
团队规模需求：${formData.keyChoices.teamSize}

地区偏好：${selectedRegions || '无特定偏好'}
${formData.specificCityPreference ? `具体城市偏好：${formData.specificCityPreference}` : ''}
政策需求优先级（数字越小优先级越高）：${policyPriorityList}
预计启动时间：${formData.timePlanning.expectedStartTime}个月后
首年目标：${formData.timePlanning.firstYearGoal}

## 分析要求
请严格按照以下JSON格式输出分析结果，不要包含任何markdown代码块标记、注释或其他文字，只输出纯JSON：

{
  "executiveSummary": {
    "recommendedLocation": "推荐地点名称（具体城市或地区）",
    "matchScore": 匹配度分数(0-100的整数)
  },
  "projectProfile": {
    "techMaturity": ${formData.coreMetrics.techMaturity},
    "fundingNeeds": "资金需求等级描述（如：中等规模、大规模等）",
    "teamSize": "${formData.keyChoices.teamSize}",
    "coreAdvantages": ["优势1（具体描述）", "优势2（具体描述）", "优势3（具体描述）"]
  },
  "recommendedLocations": [
    {
      "name": "地点名称（具体城市或地区）",
      "matchScore": 匹配度(0-100的整数),
      "advantages": ["优势1", "优势2"],
      "policies": ["具体政策1（如：税收优惠30%）", "具体政策2", "具体政策3"],
      "reasons": ["原因1（详细说明）", "原因2（详细说明）"]
    },
    {
      "name": "备选地点名称",
      "matchScore": 匹配度(0-100的整数),
      "advantages": ["优势1", "优势2"],
      "policies": ["具体政策1", "具体政策2"],
      "reasons": ["原因1", "原因2"]
    }
  ],
  "actionPlan": {
    "phase1": [
      {"action": "具体行动项1（0-3个月）", "responsible": "负责人角色"},
      {"action": "具体行动项2（0-3个月）", "responsible": "负责人角色"},
      {"action": "具体行动项3（0-3个月）", "responsible": "负责人角色"}
    ],
    "phase2": [
      {"action": "具体行动项1（3-6个月）", "responsible": "负责人角色"},
      {"action": "具体行动项2（3-6个月）", "responsible": "负责人角色"},
      {"action": "具体行动项3（3-6个月）", "responsible": "负责人角色"}
    ]
  },
  "resources": {
    "incubators": ["孵化器名称+联系方式（如：Y Combinator - contact@yc.com）"],
    "policyChannels": ["政策申请通道（如：https://example.com/policy）"],
    "talentChannels": ["人才招聘平台（如：LinkedIn、Indeed等）"]
  },
  "risks": ["主要风险1（具体描述）", "主要风险2（具体描述）"],
  "riskMitigation": ["应对建议1（具体措施）", "应对建议2（具体措施）"]
}

请确保：
1. 输出为有效的JSON格式
2. 不要包含任何markdown代码块标记（如\`\`\`json）
3. 所有字符串值都要用双引号
4. 推荐地点要具体到城市或知名地区（如：硅谷、北京、新加坡、伦敦等）
5. 匹配度分数要合理（通常80-95分）
6. 行动项要具体可执行
7. 资源信息要真实可用`;
}

