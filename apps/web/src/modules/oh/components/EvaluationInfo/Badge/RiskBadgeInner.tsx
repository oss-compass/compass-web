import React from 'react';
import { Badge, Popover, Avatar } from 'antd';
import { useGetRisk } from '@modules/oh/store/useRiskStore';
import { TeamOutlined } from '@ant-design/icons';
import { TbMessage2 } from 'react-icons/tb';

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
      }名 SIG Leader 已赞同风险澄清：${leaderApprove.join(',')};\n`);
    leaderReject.length > 0 &&
      (leaderContent += `${
        leaderReject.length
      }名 SIG Leader 已拒绝风险澄清：${leaderReject.join(',')}`);

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
      </div>
    );
  }
  // else {
  //   BadgeContent = (
  //     <Popover content={''}>
  //       <Badge
  //         count={count}
  //         size="small"
  //         style={{
  //           backgroundColor: 'red',
  //         }}
  //       >
  //         <TbMessage2 className="text-xl" />
  //       </Badge>
  //     </Popover>
  //   );
  // }
  return (
    <div className="flex flex-shrink-0 items-center justify-center">
      {BadgeContent}
    </div>
  );
};

export default RiskBadgeInner;
