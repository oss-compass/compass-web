import React, { useMemo } from 'react';
import { Badge, Popover } from 'antd';
import { useGetRisk } from '@modules/oh/store/useRiskStore';
import { CheckOutlined } from '@ant-design/icons';
import { TbMessage2 } from 'react-icons/tb';

const RiskBadge = ({ shortCode, keyId }) => {
  const { count, metricState } = useGetRisk(shortCode, keyId);
  let BadgeContent = null;
  const hasReject = useMemo(() => {
    return metricState?.some((z) => z.state === -1);
  }, metricState);

  if (metricState?.length > 0 && !hasReject) {
    let content = '';
    const leaderState = metricState.filter((item) => item.memberType === 1);
    const leaderApprove = leaderState
      .filter((item) => item.state === 1)
      ?.map((item) => item?.user?.name);
    leaderApprove.length > 0 &&
      (content += `${
        leaderApprove.length
      }名 SIG Leader 已赞同风险澄清：${leaderApprove.join(',')};\n`);
    const commiterState = metricState.filter((item) => item.memberType === 0);
    const commiterApprove = commiterState
      .filter((item) => item.state === 1)
      ?.map((item) => item?.user?.name);
    commiterApprove.length > 0 &&
      (content += `${
        commiterApprove.length
      }名 Commiter 已赞同风险澄清：${commiterApprove.join(',')}`);
    BadgeContent = (
      <Popover content={content}>
        <Badge
          count={
            <div className="flex h-[14px] w-[14px] items-center justify-center rounded-full">
              <CheckOutlined
                rev={undefined}
                className="rounded-full text-xs text-white"
              />
            </div>
          }
          size="small"
          style={{
            backgroundColor: '#52c41a',
          }}
        >
          <TbMessage2 className="text-xl" />
        </Badge>
      </Popover>
    );
  } else {
    BadgeContent = (
      <Popover content={''}>
        <Badge
          count={count}
          size="small"
          style={{
            backgroundColor: 'red',
          }}
        >
          <TbMessage2 className="text-xl" />
        </Badge>
      </Popover>
    );
  }
  return (
    <div className="flex w-8 flex-shrink-0 items-center justify-center">
      {BadgeContent}
    </div>
  );
};

export default RiskBadge;
