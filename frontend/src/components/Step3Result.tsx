import { useState } from 'react';
import type { AnalysisResult } from '../types';

interface Step3ResultProps {
  result: AnalysisResult;
  onReset: () => void;
}

export default function Step3Result({ result, onReset }: Step3ResultProps) {
  const [expandedLocations, setExpandedLocations] = useState<number[]>([]);

  const toggleLocation = (index: number) => {
    if (expandedLocations.includes(index)) {
      setExpandedLocations(expandedLocations.filter(i => i !== index));
    } else {
      setExpandedLocations([...expandedLocations, index]);
    }
  };

  return (
    <div className="space-y-6">
      {/* 执行摘要 */}
      <div className="card bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <h2 className="text-3xl font-bold mb-4">执行摘要</h2>
        <p className="text-lg mb-2">
          基于您的项目特征，我们推荐 <span className="font-bold text-2xl">{result.executiveSummary.recommendedLocation}</span> 作为最佳创业目的地。
        </p>
        <div className="mt-4">
          <span className="text-sm opacity-90">匹配度：</span>
          <span className="text-2xl font-bold ml-2">{result.executiveSummary.matchScore}%</span>
        </div>
      </div>

      {/* 项目特征画像 */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">项目特征画像</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-gray-600">技术成熟度：</span>
            <span className="font-semibold ml-2">{result.projectProfile.techMaturity}/10</span>
          </div>
          <div>
            <span className="text-gray-600">资金需求：</span>
            <span className="font-semibold ml-2">{result.projectProfile.fundingNeeds}</span>
          </div>
          <div>
            <span className="text-gray-600">团队规模：</span>
            <span className="font-semibold ml-2">{result.projectProfile.teamSize}</span>
          </div>
          <div className="md:col-span-2">
            <span className="text-gray-600">核心优势：</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {result.projectProfile.coreAdvantages.map((advantage, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {advantage}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 推荐地点详情 */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">推荐地点详情</h2>
        <div className="space-y-4">
          {result.recommendedLocations.map((location, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleLocation(index)}
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{location.name}</h3>
                  <p className="text-sm text-gray-600">匹配度：{location.matchScore}%</p>
                </div>
                <button className="text-blue-600">
                  {expandedLocations.includes(index) ? '收起' : '展开'}
                </button>
              </div>
              {expandedLocations.includes(index) && (
                <div className="mt-4 space-y-4 pt-4 border-t">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">优势政策：</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {location.policies.map((policy, i) => (
                        <li key={i}>{policy}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">适合原因：</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {location.reasons.map((reason, i) => (
                        <li key={i}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">其他优势：</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {location.advantages.map((advantage, i) => (
                        <li key={i}>{advantage}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 具体行动清单 */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">具体行动清单</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">第一阶段（0-3个月）</h3>
            <div className="space-y-2">
              {result.actionPlan.phase1.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-800">{item.action}</p>
                    <p className="text-sm text-gray-500">负责人：{item.responsible}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">第二阶段（3-6个月）</h3>
            <div className="space-y-2">
              {result.actionPlan.phase2.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-800">{item.action}</p>
                    <p className="text-sm text-gray-500">负责人：{item.responsible}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 资源对接 */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">资源对接</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">推荐孵化器：</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {result.resources.incubators.map((incubator, i) => (
                <li key={i}>{incubator}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">政策申请通道：</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {result.resources.policyChannels.map((channel, i) => (
                <li key={i}>{channel}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">人才招聘渠道：</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {result.resources.talentChannels.map((channel, i) => (
                <li key={i}>{channel}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 风险提示 */}
      <div className="card bg-yellow-50 border-yellow-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">风险提示</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">主要风险：</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {result.risks.map((risk, i) => (
                <li key={i}>{risk}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">应对建议：</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {result.riskMitigation.map((mitigation, i) => (
                <li key={i}>{mitigation}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 重新分析按钮 */}
      <div className="flex justify-center">
        <button onClick={onReset} className="btn-secondary text-lg px-8 py-3">
          重新分析
        </button>
      </div>
    </div>
  );
}

