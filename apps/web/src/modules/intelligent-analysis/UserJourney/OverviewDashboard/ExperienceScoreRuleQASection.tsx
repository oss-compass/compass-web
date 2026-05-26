import React, { useState } from 'react';
import { Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import ExperienceScoreRulePanel from '../components/ExperienceScoreRulePanel';

const { Title } = Typography;

const ExperienceScoreRuleQASection: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Title level={4} className="oj-section-title">
        QA
      </Title>
      <div className="section-card oj-qa-section">
        <div
          className="oj-qa-question-row"
          onClick={() => setExpanded((v) => !v)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setExpanded((v) => !v);
          }}
        >
          <RightOutlined
            className={`oj-qa-expand-icon${expanded ? ' is-expanded' : ''}`}
          />
          <span className="oj-qa-q-label">Q</span>
          <span className="oj-qa-question">综合体验评分如何计算？</span>
        </div>

        {expanded && (
          <div className="oj-qa-answer">
            <div className="oj-qa-a-label-row">
              <span className="oj-qa-a-label">A</span>
            </div>
            <div className="oj-qa-answer-body">
              <ExperienceScoreRulePanel />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ExperienceScoreRuleQASection;
