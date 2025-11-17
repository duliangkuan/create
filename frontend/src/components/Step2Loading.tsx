export default function Step2Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">正在分析中...</h2>
        <p className="text-gray-600">AI正在为您分析最佳创业方案</p>
        <p className="text-sm text-gray-500">预计等待时间：30-60秒</p>
      </div>
      <div className="w-full max-w-md space-y-2">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>
        <p className="text-xs text-gray-500 text-center">正在调用DeepSeek AI模型进行分析</p>
      </div>
    </div>
  );
}

