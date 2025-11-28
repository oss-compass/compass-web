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
  const getBadgeContent = (leaderState, complianceState) => {
    let requiredApprovals = [];

    if (leaderState.length === 0) {
      requiredApprovals.push('SIG Lead');
    }
    if (complianceState.length === 0) {
      requiredApprovals.push('合规代表');
    }
    let content = `等待${requiredApprovals.join('、 ')}赞同风险澄清`;
    return content;
  };

  let countGreen = createBadge('', '#52c41a', '', count);

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
    const legalState = metricState.filter((item) => item.memberType === 2);
    const complianceState = metricState.filter((item) => item.memberType === 3);
    const communityWgState = metricState.filter(
      (item) => item.memberType === 5
    );

    // 如果是回合上游指标，只需要开源能力代表审批
    if (key === 'ecologyCodeUpstream') {
      const hasCommunityWgReject = communityWgState.some((z) => z.state === -1);

      if (hasCommunityWgReject) {
        content = '需要重新澄清！';
        content += getRejectDetails(communityWgState, '开源能力代表');
        BadgeContent = createBadge(
          content,
          '#ff0000',
          <CloseOutlined className="rounded-full text-xs text-white" />
        );
      } else {
        content += getApprovalDetails(communityWgState, '开源能力代表');

        if (communityWgState.length > 0) {
          BadgeContent = createBadge(
            content,
            '#52c41a',
            <CheckOutlined className="rounded-full text-xs text-white" />
          );
        } else {
          content += '还需至少一名开源能力代表赞同风险澄清';
          BadgeContent = createBadge(
            content,
            '#fff',
            <BsFillClockFill className="rounded-full text-sm text-[red]" />
          );
        }
      }
      return (
        <div className="flex w-8 flex-shrink-0 items-center justify-center">
          {needClarification ? BadgeContent : countGreen}
        </div>
      );
    }

    if (hasReject) {
      content = '需要重新澄清！';
      content += getRejectDetails(leaderState, 'SIG Lead');
      content += getRejectDetails(legalState, '法务代表');
      content += getRejectDetails(complianceState, '合规代表');

      BadgeContent = createBadge(
        content,
        '#ff0000',
        <CloseOutlined className="rounded-full text-xs text-white" />
      );
    } else {
      if (dimension === '合法合规') {
        content += getApprovalDetails(legalState, '法务代表');
        content += getApprovalDetails(complianceState, '合规代表');

        if (legalState.length > 0 && complianceState.length > 0) {
          BadgeContent = createBadge(
            content,
            '#52c41a',
            <CheckOutlined className="rounded-full text-xs text-white" />
          );
        } else {
          content +=
            legalState.length > 0
              ? `还需至少一名合规代表赞同风险澄清`
              : `还需至少一名法务代表赞同风险澄清`;
          BadgeContent = createBadge(
            content,
            '#fff',
            <BsFillClockFill className="rounded-full text-sm text-[red]" />
          );
        }
      } else {
        content += getApprovalDetails(leaderState, 'SIG Lead');
        content += getApprovalDetails(complianceState, '合规代表');

        if (leaderState.length > 0 && complianceState.length > 0) {
          BadgeContent = createBadge(
            content,
            '#52c41a',
            <CheckOutlined className="rounded-full text-xs text-white" />
          );
        } else {
          content += getBadgeContent(leaderState, complianceState);
          BadgeContent = createBadge(
            content,
            '#fff',
            <BsFillClockFill className="rounded-full text-sm text-[red]" />
          );
        }
      }
    }
  }

  return (
    <div className="flex w-8 flex-shrink-0 items-center justify-center">
      {needClarification ? BadgeContent : countGreen}
    </div>
  );
};

export default RiskBadge;
