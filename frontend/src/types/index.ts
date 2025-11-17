// 表单数据类型
export interface CoreMetrics {
  techMaturity: number;        // 技术成熟度 1-10
  marketDemand: number;         // 市场需求强度 1-10
  teamCompleteness: number;     // 团队完整性 1-10
  fundingAdequacy: number;      // 资金充足度 1-10
  techBarrier: number;          // 技术壁垒高度 1-10
}

export interface KeyChoices {
  aiField: string;              // AI技术领域
  startupStage: string;         // 创业阶段
  fundingScale: string;         // 资金需求规模
  teamSize: string;             // 团队规模需求
}

export interface RegionPreference {
  region: string;
  selected: boolean;
  importance: number;           // 1-5星
}

export interface PolicyPriorities {
  taxIncentive: number;         // 1-7优先级
  governmentSubsidy: number;
  talentVisa: number;
  incubatorSupport: number;
  dataCompliance: number;
  ipProtection: number;
  rdCooperation: number;
}

export interface TimePlanning {
  expectedStartTime: number;    // 预计启动时间（月）
  firstYearGoal: string;        // 首年目标
}

export interface FormData {
  name: string;
  contact: string;
  coreMetrics: CoreMetrics;
  keyChoices: KeyChoices;
  regionPreferences: RegionPreference[];
  specificCityPreference: string;
  policyPriorities: PolicyPriorities;
  timePlanning: TimePlanning;
}

// 分析结果类型
export interface ExecutiveSummary {
  recommendedLocation: string;
  matchScore: number;
}

export interface ProjectProfile {
  techMaturity: number;
  fundingNeeds: string;
  teamSize: string;
  coreAdvantages: string[];
}

export interface RecommendedLocation {
  name: string;
  matchScore: number;
  advantages: string[];
  policies: string[];
  reasons: string[];
}

export interface ActionItem {
  action: string;
  responsible: string;
}

export interface ActionPlan {
  phase1: ActionItem[];
  phase2: ActionItem[];
}

export interface Resources {
  incubators: string[];
  policyChannels: string[];
  talentChannels: string[];
}

export interface AnalysisResult {
  executiveSummary: ExecutiveSummary;
  projectProfile: ProjectProfile;
  recommendedLocations: RecommendedLocation[];
  actionPlan: ActionPlan;
  resources: Resources;
  risks: string[];
  riskMitigation: string[];
}

export interface ApiResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}

