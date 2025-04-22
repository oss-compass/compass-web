import React, { useMemo } from 'react';
import { Button, Popover } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useAcceptTpcSoftwareGraduationMutation } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import toast from 'react-hot-toast';
import {
  useGetReportData,
  ReportStore,
  ReportEvent,
} from '@modules/oh/DataView/HatchingTreatment/Graduate/Report/ReportPage/store/useReportStore';
import { Dropdown } from 'antd';
import { useUserInfo } from '@modules/auth/useUserInfo';
import { useGetAllRisk } from '@modules/oh/DataView/HatchingTreatment/Graduate/EvaluationInfo/store/useRiskStore';
import { useGetTargetSoftwareData } from '@modules/oh/store/useTargetSoftwareStore';
import HasOhRole from '@modules/oh/components/HasOhRole';
import useHasOhRole from '@modules/oh/hooks/useHasOhRole';

const CheckApprove = ({ selectionId }) => {
  const { hasOhRole } = useHasOhRole();
  const { currentUser } = useUserInfo();
  const userId = currentUser?.id;
  const {
    commentCommitterPermission,
    commentSigLeadPermission,
    commentCompliancePermission,
    commentLegalPermission,
    commentState,
  } = useGetReportData();
  const { targetSoftware, metricItemScoreList } = useGetTargetSoftwareData();
  const { metricClarificationState } = useGetAllRisk(targetSoftware?.shortCode);
  const userState = commentState?.filter((z) => z.userId === userId);

  const canApprove = useMemo(() => {
    const checkClarification = (clarificationState, dimension) => {
      if (!clarificationState) {
        return true;
      }
      //查找当前用户是否通过澄清
      let userState = clarificationState.filter(
        (s) => s.userId === userId && s.state === 1
      );
      if (userState.length > 0) {
        return false;
      }
      return true;
    };
    if (metricItemScoreList?.length > 0) {
      let notMetricList = [];
      let clarificationList = metricItemScoreList.filter((m) => {
        return (
          m.维度 !== '合法合规' &&
          m.score !== 10 &&
          m.score !== null &&
          m.score !== -1 &&
          m.score !== -2
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
  }, [metricItemScoreList, metricClarificationState, userId]);

  const canReject = useMemo(() => {
    if (metricItemScoreList?.length > 0) {
      let clarificationList = metricItemScoreList.filter((m) => {
        return (
          m.score !== 10 && m.score !== null && m.score !== -1 && m.score !== -2
        );
      });
      return clarificationList?.some((metric) => {
        let clarificationState = metricClarificationState?.[metric.key];
        return clarificationState?.some(
          (s) => s.userId === userId && s.state === -1
        );
      });
    }
    return false;
  }, [metricItemScoreList, metricClarificationState, userId]);

  const canLegalApprove = useMemo(() => {
    const checkClarification = (clarificationState, dimension) => {
      if (!clarificationState) {
        return true;
      }
      //查找当前用户是否通过澄清
      let userState = clarificationState.filter(
        (s) => s.userId === userId && s.state === 1
      );
      if (userState.length > 0) {
        return false;
      }
      return true;
    };
    if (metricItemScoreList?.length > 0) {
      let notMetricList = [];
      let clarificationList = metricItemScoreList.filter((m) => {
        return (
          m.维度 === '合法合规' &&
          m.score !== 10 &&
          m.score !== null &&
          m.score !== -1 &&
          m.score !== -2
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
  }, [metricItemScoreList, metricClarificationState, userId]);

  const mutation = useAcceptTpcSoftwareGraduationMutation(gqlClient);
  const handleApprove = (memberType, state) => {
    mutation.mutate(
      {
        graduationId: selectionId,
        memberType,
        state,
      },
      {
        onSuccess: (res) => {
          if (res.acceptTpcSoftwareGraduation.status === 'true') {
            ReportStore.event$?.emit(ReportEvent.REFRESH);
            toast.success(`${state === 0 ? '取消' : '操作'}成功`);
          } else {
            toast.error(res.acceptTpcSoftwareGraduation.message);
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
            {state && <CheckCircleOutlined />}
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
    if (!canReject) {
      return [
        {
          key: '1',
          label: '需要至少拒绝一项指标风险澄清才可以驳回申请',
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
            {state && <CheckCircleOutlined />}
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
      <div className="oh text-base font-semibold">报告评审：</div>
      {hasOhRole ? (
        <>
          <Popover>
            <Dropdown
              menu={{ items: approveitems }}
              placement="bottom"
              // arrow={{ pointAtCenter: true }}
            >
              <Button
                className="flex items-center !rounded-none"
                type="primary"
              >
                <CheckOutlined />
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
              <Button
                onClick={() => {}}
                className="flex items-center !rounded-none"
                type="primary"
              >
                <CloseOutlined />
                驳回
              </Button>
            </Dropdown>
          </Popover>
        </>
      ) : (
        <HasOhRole>
          <div className="flex gap-2">
            <Button className="flex items-center !rounded-none" type="primary">
              <CheckOutlined />
              通过
            </Button>
            <Button
              onClick={() => {}}
              className="flex items-center !rounded-none"
              type="primary"
            >
              <CloseOutlined />
              驳回
            </Button>
          </div>
        </HasOhRole>
      )}
    </div>
  );
};

export default CheckApprove;
