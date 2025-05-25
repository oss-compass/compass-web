import React, { useState } from 'react';

interface ReportsSectionProps {
  onBack: () => void;
}

interface Report {
  id: string;
  title: string;
  date: string;
  softwareCount: number;
  type: string;
}

const ReportsSection: React.FC<ReportsSectionProps> = ({ onBack }) => {
  const [reports] = useState<Report[]>([
    {
      id: '1',
      title: '分布式数据库中间件评估报告',
      date: '2024-01-15',
      softwareCount: 5,
      type: '评估报告',
    },
    {
      id: '2',
      title: 'Java微服务框架推荐报告',
      date: '2024-01-10',
      softwareCount: 8,
      type: '推荐报告',
    },
    {
      id: '3',
      title: 'Kafka相似软件对比报告',
      date: '2024-01-08',
      softwareCount: 3,
      type: '对比报告',
    },
  ]);

  const handleViewReport = (reportId: string) => {
    console.log('查看报告:', reportId);
  };

  const handleCompareReport = (reportId: string) => {
    console.log('对比报告:', reportId);
  };

  if (reports.length === 0) {
    return (
      <div className="mx-auto max-w-6xl py-4 px-4">
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-2 text-blue-500 hover:underline"
        >
          <i className="fas fa-arrow-left"></i> 返回首页
        </button>

        <div className="rounded-lg bg-white py-12 text-center shadow-sm">
          <div className="mb-4 text-6xl text-gray-300">
            <i className="fas fa-file-alt"></i>
          </div>
          <div className="mb-6 text-gray-500">暂无报告记录</div>
          <button
            onClick={onBack}
            className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
          >
            开始创建报告
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl py-4 px-4">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-500 hover:underline"
        >
          <i className="fas fa-arrow-left"></i> 返回首页
        </button>
        <h2 className="text-2xl font-bold text-gray-800">我的报告</h2>
        <div></div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <div
            key={report.id}
            className="rounded-lg border-t-4 border-blue-500 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-2 text-sm text-gray-500">{report.date}</div>
            <h3 className="mb-4 text-lg font-semibold">{report.title}</h3>
            <div className="mb-4 flex justify-between text-sm text-gray-600">
              <span>软件数量: {report.softwareCount}</span>
              <span>{report.type}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleViewReport(report.id)}
                className="rounded bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600"
              >
                查看
              </button>
              <button
                onClick={() => handleCompareReport(report.id)}
                className="rounded bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200"
              >
                对比
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsSection;
