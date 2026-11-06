import React from 'react';
import { Segmented, Typography } from 'antd';

/** 总览的仓库对比卡外观与页签统一，仓库数据和业务操作由各模块提供。 */
const OverviewRepoComparison: React.FC<{
  view: 'team' | 'repo';
  onViewChange: (view: 'team' | 'repo') => void;
  actions?: React.ReactNode;
  children: React.ReactNode;
}> = ({ view, onViewChange, actions, children }) => (
  <>
    <Typography.Title level={4} className="oj-section-title">
      各仓库对比
    </Typography.Title>
    <div className="section-card">
      <div className="tab-bar progress-toolbar-row">
        <Segmented
          className="overview-segmented"
          value={view}
          onChange={(value) => onViewChange(value as 'team' | 'repo')}
          options={[
            { label: '责任团队', value: 'team' },
            { label: '仓库', value: 'repo' },
          ]}
        />
        {actions}
      </div>
      {children}
    </div>
  </>
);
export default OverviewRepoComparison;
