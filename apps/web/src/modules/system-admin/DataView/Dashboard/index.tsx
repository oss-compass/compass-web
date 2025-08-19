import React from 'react';
import { Space } from 'antd';
import classnames from 'classnames';
import StatsCards from './StatsCards';
import Service from './Service';
import { DateProvider, useDateContext } from './contexts/DateContext';
import CommonDateRangePicker, {
  DateRangeType,
} from '@common/components/DateRangePicker';

const DashboardContent: React.FC = () => {
  const { dateState, updateDateRange } = useDateContext();
  const { range } = dateState;

  // 获取当前选中的日期范围类型
  const getCurrentDateRange = (): DateRangeType => {
    if (typeof range === 'string' && range.includes(' ~ ')) {
      return 'custom';
    }
    // 直接使用 range 作为 DateRangeType，如果不匹配则默认为 '1M'
    const validRanges: DateRangeType[] = [
      '1M',
      '3M',
      '6M',
      '1Y',
      '3Y',
      '5Y',
      'Since 2000',
    ];
    return validRanges.includes(range as DateRangeType)
      ? (range as DateRangeType)
      : '1M';
  };

  const handleDateRangeChange = (
    dateRange: DateRangeType,
    customDates?: { start: string; end: string }
  ) => {
    if (dateRange === 'custom' && customDates) {
      // 处理自定义日期
      const customRange = `${customDates.start} ~ ${customDates.end}`;
      updateDateRange(
        customRange,
        new Date(customDates.start),
        new Date(customDates.end)
      );
    } else {
      // 处理预设日期范围，直接使用 dateRange
      updateDateRange(dateRange);
    }
  };

  return (
    <div className="m-6 min-h-screen bg-gray-50">
      <nav
        className={classnames(
          'sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-white px-6 shadow-sm',
          'md:h-12 md:px-4'
        )}
      >
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-gray-800 md:text-base">
            监控总览
          </h1>
        </div>
        <div className="flex items-center text-gray-600">
          <CommonDateRangePicker
            value={getCurrentDateRange()}
            onChange={handleDateRangeChange}
            showCustom={true}
          />
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
  );
};

const Dashboard: React.FC = () => {
  return (
    <DateProvider>
      <DashboardContent />
    </DateProvider>
  );
};

export default Dashboard;
