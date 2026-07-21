import React, { type ReactNode } from 'react';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

/**
 * 标题旁的说明图标：默认隐藏副标题描述，改用信息图标，鼠标移入后以 Tooltip 展示。
 * 交互与外观对齐报告总览指标卡片（如总体体验分卡片旁的图标）。
 */
const HintIcon: React.FC<{ title: ReactNode; className?: string }> = ({
  title,
  className = '',
}) => (
  <Tooltip title={title}>
    <InfoCircleOutlined
      className={`shrink-0 cursor-help text-slate-400 ${className}`}
    />
  </Tooltip>
);

export default HintIcon;
