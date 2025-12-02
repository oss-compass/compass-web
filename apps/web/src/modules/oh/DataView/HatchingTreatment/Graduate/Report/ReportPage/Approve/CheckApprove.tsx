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
    commentSigLeadPermission,
    commentCompliancePermission,
    commentLegalPermission,
    commentCommunityCollaborationWgPermission,
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
          m.key !== 'ecologyCodeUpstream' &&
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

  const canCommunityWgApprove = useMemo(() => {
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
          m.key === 'ecologyCodeUpstream' &&
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
          label: '您不是该软件的 SIG Lead 或法务合规代表，暂无权限审批',
        },
      ];
    }

    // 返回所有权限的审批选项，包括禁用状态的
    return getAllApprovalOptionsWithStatus();
  };
  const hasCommentPermissions = () => {
    return (
      commentSigLeadPermission ||
      commentCompliancePermission ||
      commentLegalPermission ||
      commentCommunityCollaborationWgPermission
    );
  };

  const getAllApprovalOptionsWithStatus = () => {
    const res = [];
    const leaderState = isUserStateValid(1);
    const legalState = isUserStateValid(2);
    const complianceState = isUserStateValid(3);
    const cmmunityWgState = isUserStateValid(5);

    // SIG Lead 权限：只需要一般指标闭环
    if (commentSigLeadPermission) {
      const blockedMetrics = canApprove.length > 0 ? canApprove : null;
      res.push(
        createApprovalOption(1, leaderState, '以 SIG Lead 通过', blockedMetrics)
      );
    }

    // 法务代表权限：只需要法务指标闭环
    if (commentLegalPermission) {
      const blockedMetrics =
        canLegalApprove.length > 0 ? canLegalApprove : null;
      res.push(
        createApprovalOption(2, legalState, '以法务代表通过', blockedMetrics)
      );
    }

    // 合规代表权限：需要法务和一般指标都闭环
    if (commentCompliancePermission) {
      const allMetrics = [...canLegalApprove, ...canApprove];
      const blockedMetrics = allMetrics.length > 0 ? allMetrics : null;
      res.push(
        createApprovalOption(
          3,
          complianceState,
          '以合规代表通过',
          blockedMetrics
        )
      );
    }

    // 开源能力代表权限：只需要 ecologyCodeUpstream 闭环
    if (commentCommunityCollaborationWgPermission) {
      const blockedMetrics =
        canCommunityWgApprove.length > 0 ? canCommunityWgApprove : null;
      res.push(
        createApprovalOption(
          5,
          cmmunityWgState,
          '以开源能力代表通过',
          blockedMetrics
        )
      );
    }

    return res;
  };

  const isUserStateValid = (memberType) => {
    return Boolean(
      userState?.find((z) => z.memberType === memberType && z.state === 1)
    );
  };

  const createApprovalOption = (type, state, label, blockedMetrics = null) => {
    const isBlocked = blockedMetrics && blockedMetrics.length > 0;
    const displayLabel = isBlocked
      ? `${label}（未闭环：${blockedMetrics.join('、')}）`
      : label;

    return {
      label: (
        <a
          onClick={() => !isBlocked && handleApprove(type, Number(!state))}
          style={{
            cursor: isBlocked ? 'not-allowed' : 'pointer',
            opacity: isBlocked ? 0.5 : 1,
            color: isBlocked ? 'rgba(0, 0, 0, 0.9)' : undefined,
          }}
        >
          {displayLabel}
          {!isBlocked && (
            <span className="ml-2 text-[#3a5bef]">
              {state && <CheckCircleOutlined />}
            </span>
          )}
        </a>
      ),
      key: String(type + 1),
      disabled: isBlocked,
    };
  };

  const getRejectItems = () => {
    if (!hasCommentPermissions()) {
      return [
        {
          key: '1',
          label: '您不是该软件的 SIG Lead 或法务合规代表，暂无权限审批',
        },
      ];
    }
    // 返回所有权限的驳回选项，包括禁用状态的
    return getRejectionOptions();
  };

  const getRejectionOptions = () => {
    const res = [];
    const leaderState = isUserStateState(-1, 1);
    const legalState = isUserStateState(-1, 2);
    const complianceState = isUserStateState(-1, 3);
    const cmmunityWgState = isUserStateState(-1, 5);

    if (commentSigLeadPermission) {
      res.push(
        createRejectionOption(1, leaderState, '以 SIG Lead 驳回', canReject)
      );
    }
    if (commentLegalPermission) {
      res.push(
        createRejectionOption(2, legalState, '以法务代表驳回', canReject)
      );
    }
    if (commentCompliancePermission) {
      res.push(
        createRejectionOption(3, complianceState, '以合规代表驳回', canReject)
      );
    }
    if (commentCommunityCollaborationWgPermission) {
      res.push(
        createRejectionOption(
          5,
          cmmunityWgState,
          '以开源能力代表驳回',
          canReject
        )
      );
    }
    return res;
  };

  const isUserStateState = (state, memberType) => {
    return Boolean(
      userState?.find((z) => z.memberType === memberType && z.state === state)
    );
  };

  const createRejectionOption = (type, state, label, isRejectable = true) => {
    const isBlocked = !isRejectable;
    const displayLabel = isBlocked
      ? `${label}（需要至少拒绝一项指标风险澄清）`
      : label;

    return {
      label: (
        <a
          onClick={() => !isBlocked && handleApprove(type, state ? 0 : -1)}
          style={{
            cursor: isBlocked ? 'not-allowed' : 'pointer',
            opacity: isBlocked ? 0.5 : 1,
            color: isBlocked ? 'rgba(0, 0, 0, 0.9)' : undefined,
          }}
        >
          {displayLabel}
          {!isBlocked && (
            <span className="ml-2 text-[#3a5bef]">
              {state && <CheckCircleOutlined />}
            </span>
          )}
        </a>
      ),
      key: String(type + 1),
      disabled: isBlocked,
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
