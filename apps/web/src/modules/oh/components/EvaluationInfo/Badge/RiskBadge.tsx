import React, { useMemo } from 'react';
import { Badge, Popover } from 'antd';
import { useGetRisk } from '@modules/oh/store/useRiskStore';
import {
  CloseOutlined,
  CheckOutlined,
  ExclamationOutlined,
  ClockCircleOutlined,
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
      mertic.是否必须澄清 === '是' &&
      mertic.指标名称 !== '专利风险' &&
      mertic.指标名称 !== '采用度分析' &&
      mertic.score !== 10
    );
  }, [mertic]);

  // let BadgeContent = null;
  // if (!metricState || metricState?.length === 0) {
  //   if (count > 0) {
  //     BadgeContent = (
  //       <Popover content={'需要确认风险澄清！'}>
  //         <Badge
  //           title=""
  //           count={count}
  //           size="small"
  //           style={{
  //             backgroundColor: 'red',
  //           }}
  //         >
  //           <TbMessage2 className="text-xl" />
  //         </Badge>
  //       </Popover>
  //     );
  //   } else {
  //     if (needClarification) {
  //       BadgeContent = (
  //         <Popover content={'该项指标需要进行风险澄清！'}>
  //           <Badge
  //             count={
  //               <div className="flex h-[14px] w-[14px] items-center justify-center rounded-full">
  //                 <ExclamationOutlined
  //                   rev={undefined}
  //                   className="rounded-full text-xs text-white"
  //                 />
  //               </div>
  //             }
  //             size="small"
  //             style={{
  //               backgroundColor: 'red',
  //             }}
  //           >
  //             <TbMessage2 className="text-xl" />
  //           </Badge>
  //         </Popover>
  //       );
  //     } else {
  //       BadgeContent = <TbMessage2 className="text-xl" />;
  //     }
  //   }
  // }

  // if (metricState?.length > 0) {
  //   let content = '';
  //   const leaderState = metricState.filter((item) => item.memberType === 1);
  //   const commiterState = metricState.filter((item) => item.memberType === 0);
  //   const legalState = metricState.filter((item) => item.memberType === 2);
  //   const complianceState = metricState.filter((item) => item.memberType === 3);

  //   if (hasReject) {
  //     content = '需要重新澄清！';
  //     const leaderApprove = leaderState
  //       .filter((item) => item.state === -1)
  //       ?.map((item) => item?.user?.name);
  //     leaderApprove.length > 0 &&
  //       (content += `${
  //         leaderApprove.length
  //       }名 TPC Leader 已拒绝风险澄清：${leaderApprove.join(',')};\n`);

  //     const commiterApprove = commiterState
  //       .filter((item) => item.state === -1)
  //       ?.map((item) => item?.user?.name);
  //     commiterApprove.length > 0 &&
  //       (content += `${
  //         commiterApprove.length
  //       }名 Commiter 已拒绝风险澄清：${commiterApprove.join(',')}`);

  //     const legalApprove = legalState
  //       .filter((item) => item.state === -1)
  //       ?.map((item) => item?.user?.name);
  //     legalApprove.length > 0 &&
  //       (content += `${
  //         legalApprove.length
  //       }名法务专家已拒绝风险澄清：${legalApprove.join(',')}`);

  //     const complianceApprove = complianceState
  //       .filter((item) => item.state === -1)
  //       ?.map((item) => item?.user?.name);
  //     complianceApprove.length > 0 &&
  //       (content += `${
  //         complianceApprove.length
  //       }名合规专家已拒绝风险澄清：${complianceApprove.join(',')}`);
  //     BadgeContent = (
  //       <Popover content={content}>
  //         <Badge
  //           count={
  //             <div className="flex h-[14px] w-[14px] items-center justify-center rounded-full">
  //               <CloseOutlined
  //                 rev={undefined}
  //                 className="rounded-full text-xs text-white"
  //               />
  //             </div>
  //           }
  //           title=""
  //           size="small"
  //           style={{
  //             backgroundColor: '#ff0000',
  //           }}
  //         >
  //           <TbMessage2 className="text-xl" />
  //         </Badge>
  //       </Popover>
  //     );
  //   } else {
  //     if (dimension === '合法合规') {
  //       // const leaderState = metricState.filter((item) => item.memberType === 1);
  //       const legalApprove = legalState
  //         .filter((item) => item.state === 1)
  //         ?.map((item) => item?.user?.name);
  //       legalApprove.length > 0 &&
  //         (content += `${
  //           legalApprove.length
  //         }名法务专家已赞同风险澄清：${legalApprove.join(',')}；\n`);
  //       // const commiterState = metricState.filter((item) => item.memberType === 0);
  //       const complianceApprove = complianceState
  //         .filter((item) => item.state === 1)
  //         ?.map((item) => item?.user?.name);
  //       complianceApprove.length > 0 &&
  //         (content += `${
  //           complianceApprove.length
  //         }名合规专家已赞同风险澄清：${complianceApprove.join(',')}；`);

  //       if (legalApprove.length > 0 && complianceApprove.length > 0) {
  //         BadgeContent = (
  //           <Popover content={content}>
  //             <Badge
  //               count={
  //                 <div className="flex h-[14px] w-[14px] items-center justify-center rounded-full">
  //                   <CheckOutlined
  //                     rev={undefined}
  //                     className="rounded-full text-xs text-white"
  //                   />
  //                 </div>
  //               }
  //               title=""
  //               size="small"
  //               style={{
  //                 backgroundColor: '#52c41a',
  //               }}
  //             >
  //               <TbMessage2 className="text-xl" />
  //             </Badge>
  //           </Popover>
  //         );
  //       } else {
  //         legalApprove.length > 0
  //           ? (content += `还需至少一名合规专家赞同风险澄清`)
  //           : (content += `还需至少一名法务专家赞同风险澄清`);
  //         BadgeContent = (
  //           <Popover content={content}>
  //             <Badge
  //               count={
  //                 // approveCount
  //                 <div className="flex h-[14px] w-[14px] items-center justify-center rounded-full">
  //                   <BsFillClockFill className="rounded-full text-sm text-[red]" />
  //                 </div>
  //               }
  //               title=""
  //               size="small"
  //               style={{
  //                 backgroundColor: '#fff',
  //               }}
  //             >
  //               <TbMessage2 className="text-xl" />
  //             </Badge>
  //           </Popover>
  //         );
  //       }
  //     } else {
  //       // const leaderState = metricState.filter((item) => item.memberType === 1);
  //       const leaderApprove = leaderState
  //         .filter((item) => item.state === 1)
  //         ?.map((item) => item?.user?.name);
  //       leaderApprove.length > 0 &&
  //         (content += `${
  //           leaderApprove.length
  //         }名 TPC Leader 已赞同风险澄清：${leaderApprove.join(',')}；\n`);
  //       // const commiterState = metricState.filter((item) => item.memberType === 0);
  //       const commiterApprove = commiterState
  //         .filter((item) => item.state === 1)
  //         ?.map((item) => item?.user?.name);
  //       commiterApprove.length > 0 &&
  //         (content += `${
  //           commiterApprove.length
  //         }名 Commiter 已赞同风险澄清：${commiterApprove.join(',')}；`);
  //       if (leaderApprove.length > 0 && commiterApprove.length > 0) {
  //         BadgeContent = (
  //           <Popover content={content}>
  //             <Badge
  //               count={
  //                 <div className="flex h-[14px] w-[14px] items-center justify-center rounded-full">
  //                   <CheckOutlined
  //                     rev={undefined}
  //                     className="rounded-full text-xs text-white"
  //                   />
  //                 </div>
  //               }
  //               title=""
  //               size="small"
  //               style={{
  //                 backgroundColor: '#52c41a',
  //               }}
  //             >
  //               <TbMessage2 className="text-xl" />
  //             </Badge>
  //           </Popover>
  //         );
  //       } else {
  //         leaderApprove.length > 0
  //           ? (content += `还需至少一名 Commiter 赞同风险澄清`)
  //           : (content += `还需至少一名 TPC Leader 赞同风险澄清`);
  //         BadgeContent = (
  //           <Popover content={content}>
  //             <Badge
  //               count={
  //                 // approveCount
  //                 <div className="flex h-[14px] w-[14px] items-center justify-center rounded-full">
  //                   <BsFillClockFill className="rounded-full text-sm text-[red]" />
  //                 </div>
  //               }
  //               title=""
  //               size="small"
  //               style={{
  //                 backgroundColor: '#fff',
  //               }}
  //             >
  //               <TbMessage2 className="text-xl" />
  //             </Badge>
  //           </Popover>
  //         );
  //       }
  //     }
  //   }
  // }
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
      ? `${approved.length}名 ${roleName} 已赞同风险澄清：${approved.join(
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

  if (!metricState || metricState.length === 0) {
    if (count > 0) {
      BadgeContent = createBadge('需要确认风险澄清！', 'red', null, count);
    } else if (needClarification) {
      BadgeContent = createBadge(
        '该项指标需要进行风险澄清！',
        'red',
        <ExclamationOutlined
          rev={undefined}
          className="rounded-full text-xs text-white"
        />
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
      content += getRejectDetails(commiterState, 'Commiter');
      content += getRejectDetails(legalState, '法务专家');
      content += getRejectDetails(complianceState, '合规专家');

      BadgeContent = createBadge(
        content,
        '#ff0000',
        <CloseOutlined
          rev={undefined}
          className="rounded-full text-xs text-white"
        />
      );
    } else {
      if (dimension === '合法合规') {
        content += getApprovalDetails(legalState, '法务专家');
        content += getApprovalDetails(complianceState, '合规专家');

        if (legalState.length > 0 && complianceState.length > 0) {
          BadgeContent = createBadge(
            content,
            '#52c41a',
            <CheckOutlined
              rev={undefined}
              className="rounded-full text-xs text-white"
            />
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
        content += getApprovalDetails(commiterState, 'Commiter');

        if (leaderState.length > 0 && commiterState.length > 0) {
          BadgeContent = createBadge(
            content,
            '#52c41a',
            <CheckOutlined
              rev={undefined}
              className="rounded-full text-xs text-white"
            />
          );
        } else {
          content +=
            leaderState.length > 0
              ? `还需至少一名 Commiter 赞同风险澄清`
              : `还需至少一名 TPC Leader 赞同风险澄清`;
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
      {BadgeContent}
    </div>
  );
};

export default RiskBadge;
