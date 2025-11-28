import React, { useMemo } from 'react';
import { Button, Popover } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useAcceptTpcSoftwareReportMetricClarificationMutation } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import toast from 'react-hot-toast';
import {
  RiskStore,
  riskEvent,
  useGetRisk,
} from '@modules/oh/DataView/HatchingTreatment/Graduate/EvaluationInfo/store/useRiskStore';
import { Dropdown } from 'antd';
import { useUserInfo } from '@modules/auth/useUserInfo';
import HasOhRole from '@modules/oh/components/HasOhRole';
import useHasOhRole from '@modules/oh/hooks/useHasOhRole';

const CheckRisk = ({ report, metricName, dimension }) => {
  const {
    shortCode,
    clarificationSigLeadPermission,
    clarificationCompliancePermission,
    clarificationLegalPermission,
    clarificationCommunityCollaborationWgPermission,
  } = report;
  const { hasOhRole } = useHasOhRole();
  const { currentUser } = useUserInfo();
  const { count, metricState } = useGetRisk(shortCode, metricName);
  const mutation =
    useAcceptTpcSoftwareReportMetricClarificationMutation(gqlClient);
  const userState = metricState?.filter((z) => z.userId === currentUser?.id);
  const handleApprove = (memberType, state) => {
    mutation.mutate(
      {
        shortCode,
        metricName,
        memberType,
        state,
        reportType: 1,
      },
      {
        onSuccess: () => {
          RiskStore.event$[shortCode]?.emit(riskEvent.REFRESH);
          toast.success(`${state === 0 ? '取消' : '操作'}成功`);
        },
      }
    );
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
  const getApprovalOptions = (dimension = '') => {
    const res = [];
    const leaderState = isUserStateValid(1);
    const legalState = isUserStateValid(2);
    const complianceState = isUserStateValid(3);
    const cmmunityWgState = isUserStateValid(5);

    // 如果是回合上游指标，只有开源能力代表可以审批
    if (metricName === 'ecologyCodeUpstream') {
      if (clarificationCommunityCollaborationWgPermission) {
        res.push(
          createApprovalOption(5, cmmunityWgState, '以开源能力代表赞同')
        );
      }
      return res;
    }

    if (clarificationSigLeadPermission && !dimension) {
      res.push(createApprovalOption(1, leaderState, '以 SIG Lead 赞同'));
    }
    if (clarificationLegalPermission && dimension) {
      res.push(createApprovalOption(2, legalState, '以法务代表赞同'));
    }
    if (clarificationCompliancePermission) {
      res.push(createApprovalOption(3, complianceState, '以合规代表赞同'));
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
  const getRejectionOptions = (dimension = '') => {
    const res = [];
    const leaderState = isUserStateState(-1, 1);
    const legalState = isUserStateState(-1, 2);
    const complianceState = isUserStateState(-1, 3);
    const cmmunityWgState = isUserStateState(-1, 5);

    // 如果是回合上游指标，只有开源能力代表可以拒绝
    if (metricName === 'ecologyCodeUpstream') {
      if (clarificationCommunityCollaborationWgPermission) {
        res.push(
          createRejectionOption(5, cmmunityWgState, '以开源能力代表驳回')
        );
      }
      return res;
    }

    if (clarificationSigLeadPermission && !dimension) {
      res.push(createRejectionOption(1, leaderState, '以 SIG Lead 拒绝'));
    }
    if (clarificationLegalPermission && dimension) {
      res.push(createRejectionOption(2, legalState, '以法务代表拒绝'));
    }
    if (clarificationCompliancePermission) {
      res.push(createRejectionOption(3, complianceState, '以合规代表拒绝'));
    }
    return res;
  };
  const getApproveItems = () => {
    if (dimension === '合法合规') {
      if (!clarificationCompliancePermission && !clarificationLegalPermission) {
        return [
          {
            key: '1',
            label: '您不是该软件的法务代表或合规代表，暂无权限操作',
          },
        ];
      } else {
        return getApprovalOptions(dimension);
      }
    } else {
      // 如果是回合上游指标
      if (metricName === 'ecologyCodeUpstream') {
        if (!clarificationCommunityCollaborationWgPermission) {
          return [
            {
              key: '1',
              label: '您不是该软件的开源能力代表，暂无权限操作',
            },
          ];
        } else {
          return getApprovalOptions();
        }
      }
      // 其他指标
      if (
        !clarificationSigLeadPermission &&
        !clarificationCompliancePermission
      ) {
        return [
          {
            key: '1',
            label: '您不是该软件的 SIG Lead 或合规代表，暂无权限操作',
          },
        ];
      } else {
        return getApprovalOptions();
      }
    }
  };
  const getRejectItems = () => {
    if (dimension === '合法合规') {
      if (!clarificationCompliancePermission && !clarificationLegalPermission) {
        return [
          {
            key: '1',
            label: '您不是该软件的法务代表或合规代表，暂无权限操作',
          },
        ];
      } else {
        return getRejectionOptions(dimension);
      }
    } else {
      // 如果是回合上游指标
      if (metricName === 'ecologyCodeUpstream') {
        if (!clarificationCommunityCollaborationWgPermission) {
          return [
            {
              key: '1',
              label: '您不是该软件的开源能力代表，暂无权限操作',
            },
          ];
        } else {
          return getRejectionOptions();
        }
      }
      // 其他指标
      if (
        !clarificationSigLeadPermission &&
        !clarificationCompliancePermission
      ) {
        return [
          {
            key: '1',
            label: '您不是该软件的 TPC Lead，暂无权限操作',
          },
        ];
      } else {
        return getRejectionOptions();
      }
    }
  };
  const approveitems = getApproveItems();
  const rejectitems = getRejectItems();

  return (
    <>
      {count > 0 && (
        <div className="oh flex gap-2">
          {hasOhRole ? (
            <>
              <Popover>
                <Dropdown
                  overlayStyle={{ zIndex: 9999 }}
                  menu={{ items: approveitems }}
                  placement="bottom"
                >
                  <Button
                    className="flex items-center !rounded-none"
                    type="primary"
                  >
                    <CheckOutlined />
                    赞同
                  </Button>
                </Dropdown>
              </Popover>
              <Popover>
                <Dropdown
                  overlayStyle={{ zIndex: 9999 }}
                  menu={{ items: rejectitems }}
                  placement="bottom"
                >
                  <Button
                    className="flex items-center !rounded-none"
                    type="primary"
                  >
                    <CloseOutlined />
                    拒绝
                  </Button>
                </Dropdown>
              </Popover>
            </>
          ) : (
            <HasOhRole>
              <div className="flex gap-2">
                <Button
                  className="flex items-center !rounded-none"
                  type="primary"
                >
                  <CheckOutlined />
                  赞同
                </Button>
                <Button
                  onClick={() => {}}
                  className="flex items-center !rounded-none"
                  type="primary"
                >
                  <CloseOutlined />
                  拒绝
                </Button>
              </div>
            </HasOhRole>
          )}
        </div>
      )}
    </>
  );
};

export default CheckRisk;
