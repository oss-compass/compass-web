import React from 'react';
import { Badge, Popover, Avatar } from 'antd';
import { useGetRisk } from '@modules/oh/components/GraduationEvaluationInfo/store/useRiskStore';

const RiskBadgeInner = ({ report, keyId }) => {
  const { shortCode } = report;
  const { count, metricState } = useGetRisk(shortCode, keyId);
  let BadgeContent = null;

  if (metricState?.length > 0) {
    const leaderState = metricState.filter((item) => item.memberType === 1);
    const leaderApprove = leaderState
      .filter((item) => item.state === 1)
      ?.map((item) => item?.user?.name);
    const leaderReject = leaderState
      .filter((item) => item.state === -1)
      ?.map((item) => item?.user?.name);
    const leaderScore = leaderState.reduce((acc, cur) => {
      return acc + cur.state;
    }, 0);
    let leaderContent = '';
    leaderApprove.length > 0 &&
      (leaderContent += `${
        leaderApprove.length
      }名 TPC Leader 已赞同风险澄清：${leaderApprove.join(',')};\n`);
    leaderReject.length > 0 &&
      (leaderContent += `${
        leaderReject.length
      }名 TPC Leader 已拒绝风险澄清：${leaderReject.join(',')}`);

    const commiterState = metricState.filter((item) => item.memberType === 0);
    const commiterApprove = commiterState
      .filter((item) => item.state === 1)
      ?.map((item) => item?.user?.name);
    const commiterReject = commiterState
      .filter((item) => item.state === -1)
      ?.map((item) => item?.user?.name);
    const commiterScore = commiterState.reduce((acc, cur) => {
      return acc + cur.state;
    }, 0);
    let commiterContent = '';
    commiterApprove.length > 0 &&
      (commiterContent += `${
        commiterApprove.length
      }名 Commiter 已赞同风险澄清：${commiterApprove.join(',')}\n`);
    commiterReject.length > 0 &&
      (commiterContent += `${
        commiterReject.length
      }名 Commiter 已拒绝风险澄清：${commiterReject.join(',')}`);

    const legalState = metricState.filter((item) => item.memberType === 2);
    const legalApprove = legalState
      .filter((item) => item.state === 1)
      ?.map((item) => item?.user?.name);
    const legalReject = legalState
      .filter((item) => item.state === -1)
      ?.map((item) => item?.user?.name);
    const legalScore = legalState.reduce((acc, cur) => {
      return acc + cur.state;
    }, 0);
    let legalContent = '';
    legalApprove.length > 0 &&
      (legalContent += `${
        legalApprove.length
      }名法务专家已赞同风险澄清：${legalApprove.join(',')}\n`);
    legalReject.length > 0 &&
      (legalContent += `${
        legalReject.length
      }名法务专家已拒绝风险澄清：${legalReject.join(',')}`);

    const complianceState = metricState.filter((item) => item.memberType === 3);
    const complianceApprove = complianceState
      .filter((item) => item.state === 1)
      ?.map((item) => item?.user?.name);
    const complianceReject = complianceState
      .filter((item) => item.state === -1)
      ?.map((item) => item?.user?.name);
    const complianceScore = complianceState.reduce((acc, cur) => {
      return acc + cur.state;
    }, 0);
    let complianceContent = '';
    complianceApprove.length > 0 &&
      (complianceContent += `${
        complianceApprove.length
      }名合规专家已赞同风险澄清：${complianceApprove.join(',')}\n`);
    complianceReject.length > 0 &&
      (complianceContent += `${
        complianceReject.length
      }名合规专家已拒绝风险澄清：${complianceReject.join(',')}`);

    BadgeContent = (
      <div className="flex cursor-pointer gap-4">
        {leaderState.length > 0 && (
          <Popover
            content={leaderContent.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {index !== 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          >
            <Badge
              count={leaderScore}
              size="small"
              style={
                {
                  // backgroundColor: '#52c41a',
                }
              }
            >
              <Avatar
                shape="square"
                style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
                gap={2}
              >
                {/* {'Leader'} */}
                {'L'}
              </Avatar>
            </Badge>
          </Popover>
        )}
        {commiterState.length > 0 && (
          <Popover
            content={commiterContent.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {index !== 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          >
            <Badge
              count={commiterScore}
              size="small"
              style={
                {
                  // backgroundColor: '#52c41a',
                }
              }
            >
              <Avatar
                shape="square"
                style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
                gap={1}
              >
                {/* {'Commiter'} */}
                {'C'}
              </Avatar>
            </Badge>
          </Popover>
        )}
        {legalState.length > 0 && (
          <Popover
            content={legalContent.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {index !== 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          >
            <Badge
              count={legalScore}
              size="small"
              style={
                {
                  // backgroundColor: '#52c41a',
                }
              }
            >
              <Avatar
                shape="square"
                style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
                gap={1}
              >
                {'LE'}
              </Avatar>
            </Badge>
          </Popover>
        )}
        {complianceState.length > 0 && (
          <Popover
            content={complianceContent.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {index !== 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          >
            <Badge
              count={complianceScore}
              size="small"
              style={
                {
                  // backgroundColor: '#52c41a',
                }
              }
            >
              <Avatar
                shape="square"
                style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
                gap={1}
              >
                {'CE'}
              </Avatar>
            </Badge>
          </Popover>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-shrink-0 items-center justify-center">
      {BadgeContent}
    </div>
  );
};

export default RiskBadgeInner;
