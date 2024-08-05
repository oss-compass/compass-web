import React, { useMemo } from 'react';
import { Button, Popover } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useAcceptTpcSoftwareSelectionMutation } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import toast from 'react-hot-toast';
import {
  useGetReportData,
  ReportStore,
  ReportEvent,
} from '@modules/oh/components/Report/ReportPage/store/useReportStore';
import { Dropdown } from 'antd';
import { useUserInfo } from '@modules/auth/useUserInfo';
import { useGetAllRisk } from '@modules/oh/store/useRiskStore';
import { useGetTargetSoftwareData } from '@modules/oh/store/useTargetSoftwareStore';

const CheckApprove = ({ selectionId }) => {
  const { currentUser } = useUserInfo();
  const {
    commentCommitterPermission,
    commentSigLeadPermission,
    commentCompliancePermission,
    commentLegalPermission,
    commentState,
  } = useGetReportData();
  console.log(
    commentCommitterPermission,
    commentSigLeadPermission,
    commentCompliancePermission,
    commentLegalPermission
  );
  const { targetSoftware, metricItemScoreList } = useGetTargetSoftwareData();
  const { metricClarificationState } = useGetAllRisk(targetSoftware?.shortCode);
  const canApprove = useMemo(() => {
    const checkClarification = (clarificationState, dimension) => {
      if (
        !clarificationState ||
        clarificationState.find((s) => s.state === -1)
      ) {
        return true;
      }
      if (dimension === '合法合规') {
        let complianceState = clarificationState.filter(
          (s) => s.memberType === 3
        );
        let legalState = clarificationState.filter((s) => s.memberType === 2);
        if (legalState.length > 0 && complianceState.length > 0) {
          //至少一名法务专家和一名合规专家都通过
          return false;
        }
      } else {
        let leaderState = clarificationState.filter((s) => s.memberType === 1);
        let commiterState = clarificationState.filter(
          (s) => s.memberType === 0
        );
        if (leaderState.length > 0 && commiterState.length > 0) {
          //至少一名 commiter 和一名 Leader 都通过
          return false;
        }
      }
      return true;
    };
    if (metricItemScoreList?.length > 0) {
      let notMetricList = [];
      let clarificationList = metricItemScoreList.filter((m) => {
        return (
          m.是否必须澄清 === '是' &&
          m.维度 !== '合法合规' &&
          m.指标名称 !== '采用度分析' &&
          m.score !== 10
        );
      });
      clarificationList.forEach((metric) => {
        let clarificationState = metricClarificationState?.[metric.key];
        if (checkClarification(clarificationState, metric.维度)) {
          notMetricList.push(metric.指标名称);
        }
      });
      return notMetricList;
    }
    return []; //未获取指标数据
  }, [metricItemScoreList, metricClarificationState]);

  const canLegalApprove = useMemo(() => {
    const checkClarification = (clarificationState, dimension) => {
      if (
        !clarificationState ||
        clarificationState.find((s) => s.state === -1)
      ) {
        return true;
      }
      if (dimension === '合法合规') {
        let complianceState = clarificationState.filter(
          (s) => s.memberType === 3
        );
        let legalState = clarificationState.filter((s) => s.memberType === 2);
        if (legalState.length > 0 && complianceState.length > 0) {
          //至少一名法务专家和一名合规专家都通过
          return false;
        }
      } else {
        let leaderState = clarificationState.filter((s) => s.memberType === 1);
        let commiterState = clarificationState.filter(
          (s) => s.memberType === 0
        );
        if (leaderState.length > 0 && commiterState.length > 0) {
          //至少一名 commiter 和一名 Leader 都通过
          return false;
        }
      }
      return true;
    };
    if (metricItemScoreList?.length > 0) {
      let notMetricList = [];
      let clarificationList = metricItemScoreList.filter((m) => {
        return (
          m.是否必须澄清 === '是' &&
          m.指标名称 !== '专利风险' &&
          m.维度 === '合法合规' &&
          m.score !== 10
        );
      });
      clarificationList.forEach((metric) => {
        let clarificationState = metricClarificationState?.[metric.key];
        if (checkClarification(clarificationState, metric.维度)) {
          notMetricList.push(metric.指标名称);
        }
      });
      return notMetricList;
    }
    return [];
  }, [metricItemScoreList, metricClarificationState]);
  const mutation = useAcceptTpcSoftwareSelectionMutation(gqlClient);
  const userState = commentState?.filter((z) => z.userId === currentUser.id);
  const handleApprove = (memberType, state) => {
    mutation.mutate(
      {
        selectionId,
        memberType,
        state,
      },
      {
        onSuccess: (res) => {
          if (res.acceptTpcSoftwareSelection.status === 'true') {
            ReportStore.event$?.emit(ReportEvent.REFRESH);
            toast.success(`${state === 0 ? '取消' : '操作'}成功`);
          } else {
            toast.error(res.acceptTpcSoftwareSelection.message);
          }
        },
      }
    );
  };
  const getApproveItems = () => {
    if (!hasCommentPermissions()) {
      return [
        {
          key: '1',
          label:
            '您不是该软件的 Committer 或 TPC Leader 或法务合规专家，暂无权限审批',
        },
      ];
    }
    if (commentCompliancePermission) {
      if (canLegalApprove.length > 0 || canApprove.length > 0) {
        return [
          {
            key: '0',
            label: `目标选型软件报告中存在指标风险澄清未闭环：${[
              ...canLegalApprove,
              ...canApprove,
            ]?.join('、')}`,
          },
        ];
      }
    } else if (commentLegalPermission) {
      if (canLegalApprove.length > 0) {
        return [
          {
            key: '0',
            label: `目标选型软件报告中存在指标风险澄清未闭环：${canLegalApprove.join(
              '、'
            )}`,
          },
        ];
      }
    } else if (commentCommitterPermission || commentSigLeadPermission) {
      if (canApprove.length > 0) {
        return [
          {
            key: '0',
            label: `目标选型软件报告中存在指标风险澄清未闭环：${canApprove.join(
              '、'
            )}`,
          },
        ];
      }
    }
    return getApprovalOptions();
  };
  const hasCommentPermissions = () => {
    return (
      commentCommitterPermission ||
      commentSigLeadPermission ||
      commentCompliancePermission ||
      commentLegalPermission
    );
  };

  const getApprovalOptions = () => {
    const res = [];
    const leaderState = isUserStateValid(1);
    const committerState = isUserStateValid(0);
    const legalState = isUserStateValid(2);
    const complianceState = isUserStateValid(3);

    if (commentSigLeadPermission) {
      res.push(createApprovalOption(1, leaderState, '以 TPC Leader 通过'));
    }
    if (commentCommitterPermission) {
      res.push(createApprovalOption(0, committerState, '以 Committer 通过'));
    }
    if (commentLegalPermission) {
      res.push(createApprovalOption(2, legalState, '以法务专家通过'));
    }
    if (commentCompliancePermission) {
      res.push(createApprovalOption(3, complianceState, '以合规专家通过'));
    }

    return res;
  };

  const isUserStateValid = (memberType) => {
    return Boolean(
      userState?.find((z) => z.memberType === memberType && z.state === 1)
    );
  };

  const createApprovalOption = (type, state, label) => {
    return {
      label: (
        <a onClick={() => handleApprove(type, Number(!state))}>
          {label}
          <span className="ml-2 text-[#3a5bef]">
            {state && <CheckCircleOutlined rev={undefined} />}
          </span>
        </a>
      ),
      key: String(type + 1),
    };
  };

  const getRejectItems = () => {
    if (!hasCommentPermissions()) {
      return [
        {
          key: '1',
          label:
            '您不是该软件的 Committer 或 TPC Leader 或法务合规专家，暂无权限审批',
        },
      ];
    }
    return getRejectionOptions();
  };

  const getRejectionOptions = () => {
    const res = [];
    const leaderState = isUserStateState(-1, 1);
    const committerState = isUserStateState(-1, 0);
    const legalState = isUserStateState(-1, 2);
    const complianceState = isUserStateState(-1, 3);

    if (commentSigLeadPermission) {
      res.push(createRejectionOption(1, leaderState, '以 TPC Leader 驳回'));
    }
    if (commentCommitterPermission) {
      res.push(createRejectionOption(0, committerState, '以 Committer 驳回'));
    }
    if (commentLegalPermission) {
      res.push(createRejectionOption(2, legalState, '以法务专家驳回'));
    }
    if (commentCompliancePermission) {
      res.push(createRejectionOption(3, complianceState, '以合规专家驳回'));
    }

    return res;
  };

  const isUserStateState = (state, memberType) => {
    return Boolean(
      userState?.find((z) => z.memberType === memberType && z.state === state)
    );
  };

  const createRejectionOption = (type, state, label) => {
    return {
      label: (
        <a onClick={() => handleApprove(type, state ? 0 : -1)}>
          {label}
          <span className="ml-2 text-[#3a5bef]">
            {state && <CheckCircleOutlined rev={undefined} />}
          </span>
        </a>
      ),
      key: String(type + 1),
    };
  };

  const approveitems = getApproveItems();
  const rejectitems = getRejectItems();

  return (
    <div className="oh mb-4 flex items-center gap-2">
      <div className="oh text-base font-semibold">评审意见：</div>
      <Popover>
        <Dropdown
          menu={{ items: approveitems }}
          placement="bottom"
          // arrow={{ pointAtCenter: true }}
        >
          <Button className="flex items-center !rounded-none" type="primary">
            <CheckOutlined rev={undefined} />
            通过
          </Button>
        </Dropdown>
      </Popover>
      <Popover>
        <Dropdown
          menu={{ items: rejectitems }}
          placement="bottom"
          // arrow={{ pointAtCenter: true }}
        >
          <Button className="flex items-center !rounded-none" type="primary">
            <CloseOutlined rev={undefined} />
            驳回
          </Button>
        </Dropdown>
      </Popover>
    </div>
  );
};

export default CheckApprove;
