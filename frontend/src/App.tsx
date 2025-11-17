import { useState } from 'react';
import Step1Form from './components/Step1Form';
import Step2Loading from './components/Step2Loading';
import Step3Result from './components/Step3Result';
import { submitAnalysis } from './services/api';
import type { FormData, AnalysisResult } from './types';

type Step = 1 | 2 | 3;

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (formData: FormData) => {
    setError(null);
    setCurrentStep(2);

    try {
      const response = await submitAnalysis(formData);
      
      if (response.success && response.data) {
        setAnalysisResult(response.data);
        setCurrentStep(3);
      } else {
        setError(response.error || '分析失败，请重试');
        setCurrentStep(1);
      }
    } catch (err) {
      setError('网络错误，请检查网络连接');
      setCurrentStep(1);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">AI创业方案推荐</h1>
          <p className="text-gray-600">通过AI分析，为您推荐最适合的创业地点和方案</p>
        </div>

        {/* 进度条 */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-16 mt-2">
            <span className={`text-sm ${currentStep === 1 ? 'font-semibold text-blue-600' : 'text-gray-500'}`}>
              填写表单
            </span>
            <span className={`text-sm ${currentStep === 2 ? 'font-semibold text-blue-600' : 'text-gray-500'}`}>
              分析中
            </span>
            <span className={`text-sm ${currentStep === 3 ? 'font-semibold text-blue-600' : 'text-gray-500'}`}>
              查看结果
            </span>
          </div>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* 步骤内容 */}
        <div>
          {currentStep === 1 && <Step1Form onSubmit={handleFormSubmit} />}
          {currentStep === 2 && <Step2Loading />}
          {currentStep === 3 && analysisResult && (
            <Step3Result result={analysisResult} onReset={handleReset} />
          )}
        </div>
      </div>
    </div>
  );
}

