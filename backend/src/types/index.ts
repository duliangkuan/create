// 表单数据类型（与前端保持一致）
export interface CoreMetrics {
  techMaturity: number;
  marketDemand: number;
  teamCompleteness: number;
  fundingAdequacy: number;
  techBarrier: number;
}

export interface KeyChoices {
  aiField: string;
  startupStage: string;
  fundingScale: string;
  teamSize: string;
}

export interface RegionPreference {
  region: string;
  selected: boolean;
  importance: number;
}

export interface PolicyPriorities {
  taxIncentive: number;
  governmentSubsidy: number;
  talentVisa: number;
  incubatorSupport: number;
  dataCompliance: number;
  ipProtection: number;
  rdCooperation: number;
}

export interface TimePlanning {
  expectedStartTime: number;
  firstYearGoal: string;
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

