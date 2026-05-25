import React from 'react';
import { Typography } from 'antd';
import ExperienceScoreRulePanel from '../components/ExperienceScoreRulePanel';

const { Title } = Typography;

const ExperienceScoreRuleQASection: React.FC = () => {
  return (
    <>
      <Title level={4} className="oj-section-title">
        QA
      </Title>
      <div className="section-card">
        <div className="text-sm font-semibold text-slate-900">
          综合体验评分如何计算？
        </div>
        <div className="mt-4">
          <ExperienceScoreRulePanel />
        </div>
      </div>
    </>
  );
};

export default ExperienceScoreRuleQASection;
