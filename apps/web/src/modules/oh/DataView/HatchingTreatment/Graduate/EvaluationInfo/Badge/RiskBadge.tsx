import React, { useMemo } from 'react';
import { Badge, Popover } from 'antd';
import { useGetRisk } from '@modules/oh/DataView/HatchingTreatment/Graduate/EvaluationInfo/store/useRiskStore';
import {
  CloseOutlined,
  CheckOutlined,
  ExclamationOutlined,
} from '@ant-design/icons';
import { TbMessage2 } from 'react-icons/tb';
import { BsFillClockFill } from 'react-icons/bs';

const RiskBadge = ({ shortCode, mertic }) => {
  const { key, 维度: dimension } = mertic;
  const { count, metricState } = useGetRisk(shortCode, key);
  const hasReject = useMemo(() => {
    return metricState?.some((z) => z.state === -1);
  }, [metricState]);
  const needClarification = useMemo(() => {
    return (
      mertic.score !== null &&
      mertic.score !== 10 &&
      mertic.score !== -1 &&
      mertic.score !== -2
    );
  }, [mertic]);

  let BadgeContent = null;
  const getRejectDetails = (stateArray, roleName) => {
    const rejected = stateArray
      .filter((item) => item.state === -1)
      .map((item) => item.user?.name);
    return rejected.length > 0
      ? `${rejected.length}名 ${roleName} 已拒绝风险澄清：${rejected.join(
          ','
        )};\n`
      : '';
  };

  const getApprovalDetails = (stateArray, roleName) => {
    const approved = stateArray
      .filter((item) => item.state === 1)
      .map((item) => item.user?.name);
    return approved.length > 0
      ? `${approved.length}名${roleName}已赞同风险澄清：${approved.join(
          ','
        )}；\n`
      : '';
  };
  const createBadge = (content, backgroundColor, icon, count = 0) => (
    <Popover content={content}>
      <Badge
        count={
          icon ? (
            <div className="flex h-[14px] w-[14px] items-center justify-center rounded-full">
              {icon}
            </div>
          ) : (
            count
          )
        }
        title=""
        size="small"
        style={{
          backgroundColor,
        }}
      >
        <TbMessage2 className="text-xl" />
      </Badge>
    </Popover>
  );
  const getBadgeContent = (leaderState, commiterState, complianceState) => {
    let requiredApprovals = [];

    if (leaderState.length === 0) {
      requiredApprovals.push('TPC Leader');
    }
    if (commiterState.length === 0) {
      requiredApprovals.push('Committer');
    }
    if (complianceState.length === 0) {
      requiredApprovals.push('合规专家');
    }
    let content = `等待${requiredApprovals.join('、 ')}赞同风险澄清`;
    return content;
    // leaderState.length ===0&&(content+=`还需至少一名 Committer 赞同风险澄清`)
    // commiterState.length ===0&&content+=`还需至少一名 Committer 赞同风险澄清`
    // complianceState.length ===0&&content+=`还需至少一名 Committer 赞同风险澄清`
  };
  if (!metricState || metricState.length === 0) {
    if (count > 0) {
      BadgeContent = createBadge('需要确认风险澄清！', 'red', null, count);
    } else if (needClarification) {
      BadgeContent = createBadge(
        '该项指标需要进行风险澄清！',
        'red',
        <ExclamationOutlined className="rounded-full text-xs text-white" />
      );
    } else {
      BadgeContent = <TbMessage2 className="text-xl" />;
    }
  } else {
    let content = '';
    const leaderState = metricState.filter((item) => item.memberType === 1);
    const commiterState = metricState.filter((item) => item.memberType === 0);
    const legalState = metricState.filter((item) => item.memberType === 2);
    const complianceState = metricState.filter((item) => item.memberType === 3);

    if (hasReject) {
      content = '需要重新澄清！';
      content += getRejectDetails(leaderState, 'TPC Leader');
      content += getRejectDetails(commiterState, 'Committer');
      content += getRejectDetails(legalState, '法务专家');
      content += getRejectDetails(complianceState, '合规专家');

      BadgeContent = createBadge(
        content,
        '#ff0000',
        <CloseOutlined className="rounded-full text-xs text-white" />
      );
    } else {
      if (dimension === '合法合规') {
        content += getApprovalDetails(legalState, '法务专家');
        content += getApprovalDetails(complianceState, '合规专家');

        if (legalState.length > 0 && complianceState.length > 0) {
          BadgeContent = createBadge(
            content,
            '#52c41a',
            <CheckOutlined className="rounded-full text-xs text-white" />
          );
        } else {
          content +=
            legalState.length > 0
              ? `还需至少一名合规专家赞同风险澄清`
              : `还需至少一名法务专家赞同风险澄清`;
          BadgeContent = createBadge(
            content,
            '#fff',
            <BsFillClockFill className="rounded-full text-sm text-[red]" />
          );
        }
      } else {
        content += getApprovalDetails(leaderState, 'TPC Leader');
        content += getApprovalDetails(commiterState, 'Committer');
        content += getApprovalDetails(complianceState, '合规专家');

        if (
          leaderState.length > 0 &&
          commiterState.length > 0 &&
          complianceState.length > 0
        ) {
          BadgeContent = createBadge(
            content,
            '#52c41a',
            <CheckOutlined className="rounded-full text-xs text-white" />
          );
        } else {
          content += getBadgeContent(
            leaderState,
            commiterState,
            complianceState
          );
          BadgeContent = createBadge(
            content,
            '#fff',
            <BsFillClockFill className="rounded-full text-sm text-[red]" />
          );
        }
      }
    }
  }
  let countGreen = createBadge('', '#52c41a', '', count);
  return (
    <div className="flex w-8 flex-shrink-0 items-center justify-center">
      {needClarification ? BadgeContent : countGreen}
    </div>
  );
};

export default RiskBadge;
