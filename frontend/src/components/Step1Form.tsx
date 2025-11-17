import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import type { FormData, RegionPreference } from '../types';

interface Step1FormProps {
  onSubmit: (data: FormData) => void;
}

const AI_FIELDS = [
  '自然语言处理',
  '计算机视觉',
  '机器学习平台',
  '机器人/自动化',
  '行业AI应用',
  '其他',
];

const STARTUP_STAGES = [
  '概念验证',
  '原型开发',
  '产品测试',
  '商业推广',
  '规模化增长',
];

const FUNDING_SCALES = [
  '< 10万美元',
  '10-50万美元',
  '50-200万美元',
  '200-1000万美元',
  '> 1000万美元',
];

const TEAM_SIZES = [
  '1-5人',
  '6-15人',
  '16-50人',
  '51-200人',
  '200+人',
];

const REGIONS = ['北美(美/加)', '欧洲(英/德/法等)', '亚洲(中/日/新等)', '其他地区'];

const POLICY_TYPES = [
  { key: 'taxIncentive', label: '税收优惠' },
  { key: 'governmentSubsidy', label: '政府补贴' },
  { key: 'talentVisa', label: '人才签证' },
  { key: 'incubatorSupport', label: '孵化器支持' },
  { key: 'dataCompliance', label: '数据合规指导' },
  { key: 'ipProtection', label: '知识产权保护' },
  { key: 'rdCooperation', label: '研发合作机会' },
];

export default function Step1Form({ onSubmit }: Step1FormProps) {
  // 政策优先级排序状态（初始顺序）
  const [policyOrder, setPolicyOrder] = useState(POLICY_TYPES.map((item) => ({
    ...item,
  })));

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: '',
      contact: '',
      coreMetrics: {
        techMaturity: 5,
        marketDemand: 5,
        teamCompleteness: 5,
        fundingAdequacy: 5,
        techBarrier: 5,
      },
      keyChoices: {
        aiField: '',
        startupStage: '',
        fundingScale: '',
        teamSize: '',
      },
      regionPreferences: REGIONS.map(region => ({
        region,
        selected: false,
        importance: 3,
      })),
      specificCityPreference: '',
      policyPriorities: {
        taxIncentive: 1,
        governmentSubsidy: 2,
        talentVisa: 3,
        incubatorSupport: 4,
        dataCompliance: 5,
        ipProtection: 6,
        rdCooperation: 7,
      },
      timePlanning: {
        expectedStartTime: 6,
        firstYearGoal: '',
      },
    },
  });

  const regionPreferences = watch('regionPreferences') as RegionPreference[];

  // 当政策顺序改变时，更新表单值
  useEffect(() => {
    const priorities: any = {};
    policyOrder.forEach((item, index) => {
      priorities[item.key] = index + 1;
    });
    setValue('policyPriorities', priorities);
  }, [policyOrder, setValue]);

  // 拖拽处理函数
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    if (draggedIndex !== index) {
      const newOrder = [...policyOrder];
      const draggedItem = newOrder[draggedIndex];
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(index, 0, draggedItem);
      setPolicyOrder(newOrder);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleRegionToggle = (index: number) => {
    const newRegions = [...regionPreferences];
    newRegions[index].selected = !newRegions[index].selected;
    setValue('regionPreferences', newRegions);
  };

  const handleImportanceChange = (index: number, importance: number) => {
    const newRegions = [...regionPreferences];
    newRegions[index].importance = importance;
    setValue('regionPreferences', newRegions);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* 基本信息 */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">基本信息</h2>
        <div className="space-y-4">
          <div>
            <label className="label">姓名/项目名</label>
            <input
              type="text"
              {...register('name', { required: '请输入姓名或项目名' })}
              className="input-field"
              placeholder="请输入您的姓名或项目名称"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="label">联系方式</label>
            <input
              type="text"
              {...register('contact', { required: '请输入联系方式' })}
              className="input-field"
              placeholder="邮箱或手机号"
            />
            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
          </div>
        </div>
      </div>

      {/* 项目核心指标 */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">项目核心指标（1-10分评分）</h2>
        <div className="space-y-6">
          {[
            { key: 'techMaturity', label: '技术成熟度', note: '1=概念阶段，10=成熟产品' },
            { key: 'marketDemand', label: '市场需求强度', note: '1=无明确需求，10=强需求' },
            { key: 'teamCompleteness', label: '团队完整性', note: '1=单人创业，10=完整团队' },
            { key: 'fundingAdequacy', label: '资金充足度', note: '1=无资金，10=资金充足' },
            { key: 'techBarrier', label: '技术壁垒高度', note: '1=易复制，10=高壁垒' },
          ].map(({ key, label, note }) => {
            const value = watch(`coreMetrics.${key as keyof FormData['coreMetrics']}`) as number;
            return (
              <div key={key}>
                <div className="flex justify-between items-center mb-2">
                  <label className="label mb-0">{label}</label>
                  <span className="text-lg font-semibold text-blue-600">{value}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  {...register(`coreMetrics.${key as keyof FormData['coreMetrics']}` as any, {
                    valueAsNumber: true,
                  })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <p className="text-sm text-gray-500 mt-1">{note}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 关键选择 */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">关键选择</h2>
        <div className="space-y-6">
          <div>
            <label className="label">AI技术领域</label>
            <select
              {...register('keyChoices.aiField', { required: '请选择AI技术领域' })}
              className="input-field"
            >
              <option value="">请选择</option>
              {AI_FIELDS.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
            {errors.keyChoices?.aiField && (
              <p className="text-red-500 text-sm mt-1">{errors.keyChoices.aiField.message}</p>
            )}
          </div>

          <div>
            <label className="label">创业阶段</label>
            <select
              {...register('keyChoices.startupStage', { required: '请选择创业阶段' })}
              className="input-field"
            >
              <option value="">请选择</option>
              {STARTUP_STAGES.map(stage => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </select>
            {errors.keyChoices?.startupStage && (
              <p className="text-red-500 text-sm mt-1">{errors.keyChoices.startupStage.message}</p>
            )}
          </div>

          <div>
            <label className="label">资金需求规模</label>
            <select
              {...register('keyChoices.fundingScale', { required: '请选择资金需求规模' })}
              className="input-field"
            >
              <option value="">请选择</option>
              {FUNDING_SCALES.map(scale => (
                <option key={scale} value={scale}>{scale}</option>
              ))}
            </select>
            {errors.keyChoices?.fundingScale && (
              <p className="text-red-500 text-sm mt-1">{errors.keyChoices.fundingScale.message}</p>
            )}
          </div>

          <div>
            <label className="label">团队规模需求</label>
            <select
              {...register('keyChoices.teamSize', { required: '请选择团队规模需求' })}
              className="input-field"
            >
              <option value="">请选择</option>
              {TEAM_SIZES.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            {errors.keyChoices?.teamSize && (
              <p className="text-red-500 text-sm mt-1">{errors.keyChoices.teamSize.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* 地区偏好 */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">地区偏好（多选+权重）</h2>
        <div className="space-y-4">
          {regionPreferences.map((region, index) => (
            <div key={region.region} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={region.selected}
                  onChange={() => handleRegionToggle(index)}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <span className="font-medium">{region.region}</span>
              </div>
              {region.selected && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">重要性：</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleImportanceChange(index, star)}
                        className={`text-2xl ${
                          star <= region.importance ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="mt-4">
            <label className="label">具体城市偏好</label>
            <input
              type="text"
              {...register('specificCityPreference')}
              className="input-field"
              placeholder="如：硅谷、北京、新加坡等（可选）"
            />
          </div>
        </div>
      </div>

      {/* 政策需求优先级 */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">政策需求优先级（请拖拽排序 1-7，1为最高）</h2>
        <p className="text-sm text-gray-600 mb-4">💡 提示：拖拽左侧图标可调整优先级顺序</p>
        <div className="space-y-2">
          {policyOrder.map((item, index) => (
            <div
              key={item.key}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-move transition-all ${
                draggedIndex === index
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center space-x-4 flex-1">
                {/* 拖拽图标 */}
                <div className="text-gray-400 hover:text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                </div>
                {/* 优先级序号 */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                {/* 政策名称 */}
                <label className="font-medium text-gray-800 cursor-move flex-1">
                  {item.label}
                </label>
              </div>
              {/* 优先级显示 */}
              <div className="flex-shrink-0 ml-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  优先级 {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">
          ✅ 当前顺序：{policyOrder.map((item, index) => `${index + 1}.${item.label}`).join(' → ')}
        </p>
      </div>

      {/* 时间规划 */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">时间规划</h2>
        <div className="space-y-4">
          <div>
            <label className="label">预计启动时间（月）</label>
            <input
              type="number"
              min="1"
              {...register('timePlanning.expectedStartTime', {
                required: '请输入预计启动时间',
                valueAsNumber: true,
                min: { value: 1, message: '至少1个月' },
              })}
              className="input-field"
              placeholder="如：6"
            />
            {errors.timePlanning?.expectedStartTime && (
              <p className="text-red-500 text-sm mt-1">{errors.timePlanning.expectedStartTime.message}</p>
            )}
          </div>
          <div>
            <label className="label">首年目标</label>
            <textarea
              {...register('timePlanning.firstYearGoal', { required: '请输入首年目标' })}
              className="input-field"
              rows={3}
              placeholder="请描述您的首年目标"
            />
            {errors.timePlanning?.firstYearGoal && (
              <p className="text-red-500 text-sm mt-1">{errors.timePlanning.firstYearGoal.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* 提交按钮 */}
      <div className="flex justify-center">
        <button type="submit" className="btn-primary text-lg px-8 py-3">
          提交分析
        </button>
      </div>
    </form>
  );
}

