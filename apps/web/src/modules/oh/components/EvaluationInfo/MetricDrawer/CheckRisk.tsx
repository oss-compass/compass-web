import React, { useMemo } from 'react';
import { Button, Popover } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useAcceptTpcSoftwareReportMetricClarificationMutation } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import toast from 'react-hot-toast';
import {
  RiskStore,
  riskEvent,
  useGetRisk,
} from '@modules/oh/store/useRiskStore';
import { Dropdown } from 'antd';
import { useUserInfo } from '@modules/auth/useUserInfo';

const CheckRisk = ({ report, metricName }) => {
  const {
    shortCode,
    clarificationCommitterPermission,
    clarificationSigLeadPermission,
  } = report;
  const { currentUser } = useUserInfo();
  const { count, metricState } = useGetRisk(shortCode, metricName);
  const mutation =
    useAcceptTpcSoftwareReportMetricClarificationMutation(gqlClient);
  const userState = metricState?.filter((z) => z.userId === currentUser.id);
  const handleApprove = (memberType, state) => {
    mutation.mutate(
      {
        shortCode,
        metricName,
        memberType,
        state,
      },
      {
        onSuccess: () => {
          RiskStore.event$[shortCode]?.emit(riskEvent.REFRESH);
          toast.success(`${state === 0 ? '取消' : '操作'}成功`);
        },
      }
    );
  };
  const getApproveItems = () => {
    if (!clarificationCommitterPermission && !clarificationSigLeadPermission) {
      return [
        {
          key: '1',
          label: '您不是该软件的 Committer 或 SIG Leader，暂无权限操作',
        },
      ];
    } else {
      let res = [];
      if (clarificationSigLeadPermission) {
        const state = Boolean(
          userState?.find((z) => z.memberType === 1 && z.state === 1)
        );
        res.push({
          label: (
            <a
              onClick={() => {
                handleApprove(1, Number(!state));
              }}
            >
              以 SIG Leader 赞同
              <span className="ml-2 text-[#3a5bef]">
                {state && <CheckCircleOutlined rev={undefined} />}
              </span>
            </a>
          ),
          key: '1',
        });
      }
      if (clarificationCommitterPermission) {
        const state = Boolean(
          userState?.find((z) => z.memberType === 0 && z.state === 1)
        );
        res.push({
          label: (
            <a
              onClick={() => {
                handleApprove(0, Number(!state));
              }}
            >
              以 Committer 赞同
              <span className="ml-2 text-[#3a5bef]">
                {state && <CheckCircleOutlined rev={undefined} />}
              </span>
            </a>
          ),
          key: '2',
        });
      }
      return res;
    }
  };
  const getRejectItems = () => {
    if (!clarificationCommitterPermission && !clarificationSigLeadPermission) {
      return [
        {
          key: '1',
          label: '您不是该软件的 Committer 或 SIG Leader，暂无权限操作',
        },
      ];
    } else {
      let res = [];
      if (clarificationSigLeadPermission) {
        const state = Boolean(
          userState?.find((z) => z.memberType === 1 && z.state === -1)
        );
        res.push({
          label: (
            <a
              onClick={() => {
                handleApprove(1, state ? 0 : -1);
              }}
            >
              以 SIG Leader 拒绝
              <span className="ml-2 text-[#3a5bef]">
                {state && <CheckCircleOutlined rev={undefined} />}
              </span>
            </a>
          ),
          key: '1',
        });
      }
      if (clarificationCommitterPermission) {
        const state = Boolean(
          userState?.find((z) => z.memberType === 0 && z.state === -1)
        );
        res.push({
          label: (
            <a
              onClick={() => {
                handleApprove(0, state ? 0 : -1);
              }}
            >
              以 Committer 拒绝
              <span className="ml-2 text-[#3a5bef]">
                {state && <CheckCircleOutlined rev={undefined} />}
              </span>
            </a>
          ),
          key: '2',
        });
      }
      return res;
    }
  };
  const approveitems = getApproveItems();
  const rejectitems = getRejectItems();

  return (
    <>
      {count > 0 && (
        <div className="oh flex gap-2">
          <Popover>
            <Dropdown
              menu={{ items: approveitems }}
              placement="bottom"
              // arrow={{ pointAtCenter: true }}
            >
              <Button
                className="flex items-center !rounded-none"
                type="primary"
                // onClick={() => {
                //   mutation.mutate(
                //     {
                //       shortCode,
                //       metricName,
                //     },
                //     {
                //       onSuccess: () => {
                //         RiskStore.event$[shortCode]?.emit(riskEvent.REFRESH);
                //         toast.success('确认成功');
                //       },
                //     }
                //   );
                // }}
              >
                <CheckOutlined rev={undefined} />
                赞同
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
                className="flex items-center !rounded-none"
                type="primary"
              >
                <CloseOutlined rev={undefined} />
                拒绝
              </Button>
            </Dropdown>
          </Popover>
        </div>
      )}
    </>
  );
};

export default CheckRisk;
