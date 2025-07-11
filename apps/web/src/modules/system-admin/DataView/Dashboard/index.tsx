import React from 'react';
import { Space } from 'antd';
import classnames from 'classnames';
import StatsCards from './StatsCards';
import Service from './Service';
import { DateProvider } from './contexts/DateContext';
import NavDatePicker from './components/NavDatePicker';

const Dashboard: React.FC = () => {
  return (
    <DateProvider>
      <div className="min-h-screen bg-gray-50">
        {/* 顶部导航栏 - 参考 NavBar 设计 */}
        <nav
          className={classnames(
            'flex h-14 items-center justify-between border-b bg-white px-6 shadow-sm',
            'md:h-12 md:px-4'
          )}
        >
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-gray-800 md:text-base">
              监控总览
            </h1>
          </div>
          <div className="flex items-center text-gray-600">
            <NavDatePicker />
          </div>
        </nav>

        {/* 主要内容区域 */}
        <div className="space-y-6 py-6">
          {/* 统计卡片 - 不受日期筛选影响 */}
          <StatsCards />

          {/* 其他组件 - 受日期筛选影响 */}
          <Service />
        </div>
      </div>
    </DateProvider>
  );
};

export default Dashboard;
