import React from 'react';

/**
 * 详情页骨架屏 - 加载中状态
 */
const DetailSkeleton: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9f9]">
      {/* 顶部导航骨架 */}
      <div className="border-b bg-white px-6 py-4">
        <div className="animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-6 w-32 rounded bg-slate-200"></div>
              <div className="h-5 w-20 rounded bg-slate-200"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-20 rounded bg-slate-200"></div>
              <div className="h-8 w-20 rounded bg-slate-200"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* 左侧侧边栏骨架 */}
        <div className="w-64 border-r bg-white p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-5 w-24 rounded bg-slate-200"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-4 w-4 rounded bg-slate-200"></div>
                <div className="h-4 flex-1 rounded bg-slate-200"></div>
              </div>
            ))}
            <div className="mt-6 h-5 w-24 rounded bg-slate-200"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-4 w-4 rounded bg-slate-200"></div>
                <div className="h-4 flex-1 rounded bg-slate-200"></div>
              </div>
            ))}
          </div>
        </div>

        {/* 主内容区骨架 */}
        <div className="flex-1 p-6">
          <div className="animate-pulse">
            {/* 图表区域骨架 */}
            <div className="grid grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded border bg-white p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="h-5 w-32 rounded bg-slate-200"></div>
                    <div className="h-5 w-16 rounded bg-slate-200"></div>
                  </div>
                  <div className="h-48 rounded bg-slate-200"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
