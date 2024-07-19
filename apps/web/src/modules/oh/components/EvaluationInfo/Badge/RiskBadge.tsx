import React, { useMemo } from 'react';
import { Badge, Popover } from 'antd';
import { useGetRisk } from '@modules/oh/store/useRiskStore';
import { CheckOutlined, ExclamationOutlined } from '@ant-design/icons';
import { TbMessage2 } from 'react-icons/tb';

const RiskBadge = ({ shortCode, mertic }) => {
  const { key } = mertic;
  const { count, metricState } = useGetRisk(shortCode, key);
  const hasReject = useMemo(() => {
    return metricState?.some((z) => z.state === -1);
  }, [metricState]);
  const needClarification = useMemo(() => {
    return (
      mertic.是否必须澄清 === '是' &&
      mertic.指标名称 !== '专利风险' &&
      mertic.指标名称 !== '采用度分析' &&
      mertic.score !== 10
    );
  }, [mertic]);

  let BadgeContent = null;
  if (metricState?.length > 0) {
    let content = '';
    const leaderState = metricState.filter((item) => item.memberType === 1);
    const commiterState = metricState.filter((item) => item.memberType === 0);
    if (hasReject) {
      content += '需要重新澄清！';
      const leaderApprove = leaderState
        .filter((item) => item.state === -1)
        ?.map((item) => item?.user?.name);
      leaderApprove.length > 0 &&
        (content += `${
          leaderApprove.length
        }名 TPC Leader 已拒绝风险澄清：${leaderApprove.join(',')};\n`);
      const commiterApprove = commiterState
        .filter((item) => item.state === -1)
        ?.map((item) => item?.user?.name);
      commiterApprove.length > 0 &&
        (content += `${
          commiterApprove.length
        }名 Commiter 已拒绝风险澄清：${commiterApprove.join(',')}`);
      BadgeContent = (
        <Popover content={content}>
          <Badge
            count={
              <div className="flex h-[14px] w-[14px] items-center justify-center rounded-full">
                <ExclamationOutlined
                  rev={undefined}
                  className="rounded-full text-xs text-white"
                />
              </div>
            }
            size="small"
            style={{
              backgroundColor: '#ff0000',
            }}
          >
            <TbMessage2 className="text-xl" />
          </Badge>
        </Popover>
      );
    } else {
      const leaderState = metricState.filter((item) => item.memberType === 1);
      const leaderApprove = leaderState
        .filter((item) => item.state === 1)
        ?.map((item) => item?.user?.name);
      leaderApprove.length > 0 &&
        (content += `${
          leaderApprove.length
        }名 TPC Leader 已赞同风险澄清：${leaderApprove.join(',')};\n`);
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
    }
  } else {
    if (count > 0) {
      BadgeContent = (
        <Popover content={'需要确认风险澄清！'}>
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
    } else {
      if (needClarification) {
        BadgeContent = (
          <Popover content={'该项指标需要进行风险澄清！'}>
            <Badge
              count={
                <div className="flex h-[14px] w-[14px] items-center justify-center rounded-full">
                  <ExclamationOutlined
                    rev={undefined}
                    className="rounded-full text-xs text-white"
                  />
                </div>
              }
              size="small"
              style={{
                backgroundColor: 'red',
              }}
            >
              <TbMessage2 className="text-xl" />
            </Badge>
          </Popover>
        );
      } else {
        BadgeContent = <TbMessage2 className="text-xl" />;
      }
    }
  }
  return (
    <div className="flex w-8 flex-shrink-0 items-center justify-center">
      {BadgeContent}
    </div>
  );
};

export default RiskBadge;
