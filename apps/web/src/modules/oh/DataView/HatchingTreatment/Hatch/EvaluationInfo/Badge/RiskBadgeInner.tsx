import React from 'react';
import { Badge, Popover, Avatar } from 'antd';
import { useGetRisk } from '@modules/oh/store/useRiskStore';

const processMemberState = (metricState, memberType, roleName) => {
  const state = metricState.filter((item) => item.memberType === memberType);
  const approve = state
    .filter((item) => item.state === 1)
    ?.map((item) => item?.user?.name);
  const reject = state
    .filter((item) => item.state === -1)
    ?.map((item) => item?.user?.name);
  const score = state.reduce((acc, cur) => acc + cur.state, 0);

  let content = '';
  if (approve.length > 0) {
    content += `${approve.length}名${roleName}已赞同风险澄清：${approve.join(
      ','
    )}\n`;
  }
  if (reject.length > 0) {
    content += `${reject.length}名${roleName}已拒绝风险澄清：${reject.join(
      ','
    )}`;
  }

  return { state, score, content };
};

const renderBadge = (memberState, avatar, gap = 1) => {
  if (memberState.state.length === 0) return null;

  return (
    <Popover
      content={memberState.content.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {index !== 0 && <br />}
          {line}
        </React.Fragment>
      ))}
    >
      <Badge count={memberState.score} size="small">
        <Avatar
          shape="square"
          style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
          gap={gap}
        >
          {avatar}
        </Avatar>
      </Badge>
    </Popover>
  );
};

const RiskBadgeInner = ({ report, keyId }) => {
  const { shortCode } = report;
  const { count, metricState } = useGetRisk(shortCode, keyId);

  if (!metricState?.length) {
    return (
      <div className="flex flex-shrink-0 items-center justify-center">
        {null}
      </div>
    );
  }

  const leaderState = processMemberState(metricState, 1, 'TPC Leader');
  const commiterState = processMemberState(metricState, 0, 'Commiter');
  const legalState = processMemberState(metricState, 2, '法务专家');
  const complianceState = processMemberState(metricState, 3, '合规专家');
  const cmmunityWgState = processMemberState(
    metricState,
    5,
    'Community Collaboration Wg'
  );

  const BadgeContent = (
    <div className="flex cursor-pointer gap-4">
      {renderBadge(leaderState, 'L', 2)}
      {renderBadge(commiterState, 'C')}
      {renderBadge(legalState, 'LE')}
      {renderBadge(complianceState, 'CE')}
      {renderBadge(cmmunityWgState, 'WG')}
    </div>
  );

  return (
    <div className="flex flex-shrink-0 items-center justify-center">
      {BadgeContent}
    </div>
  );
};
export default RiskBadgeInner;
