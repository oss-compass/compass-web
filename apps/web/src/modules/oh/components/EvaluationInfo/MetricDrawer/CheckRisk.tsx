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
          label: '您不是该软件的 Committer 或 TPC Leader，暂无权限操作',
        },
      ];
    } else {
      let res = [];
      const leaderState = Boolean(
        userState?.find((z) => z.memberType === 1 && z.state === 1)
      );
      const committerState = Boolean(
        userState?.find((z) => z.memberType === 0 && z.state === 1)
      );
      if (clarificationSigLeadPermission) {
        res.push({
          label: committerState ? (
            <div className="cursor-not-allowed text-[#d9d9d9]">
              以 TPC Leader 赞同
            </div>
          ) : (
            <a
              onClick={() => {
                handleApprove(1, Number(!leaderState));
              }}
            >
              以 TPC Leader 赞同
              <span className="ml-2 text-[#3a5bef]">
                {leaderState && <CheckCircleOutlined rev={undefined} />}
              </span>
            </a>
          ),
          key: '1',
        });
      }
      if (clarificationCommitterPermission) {
        res.push({
          label: leaderState ? (
            <div className="cursor-not-allowed text-[#d9d9d9]">
              以 Committer 赞同
            </div>
          ) : (
            <a
              onClick={() => {
                handleApprove(0, Number(!committerState));
              }}
            >
              以 Committer 赞同
              <span className="ml-2 text-[#3a5bef]">
                {committerState && <CheckCircleOutlined rev={undefined} />}
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
          label: '您不是该软件的 Committer 或 TPC Leader，暂无权限操作',
        },
      ];
    } else {
      let res = [];
      const leaderState = Boolean(
        userState?.find((z) => z.memberType === 1 && z.state === -1)
      );
      const committerState = Boolean(
        userState?.find((z) => z.memberType === 0 && z.state === -1)
      );
      if (clarificationSigLeadPermission) {
        res.push({
          label: committerState ? (
            <div className="cursor-not-allowed text-[#d9d9d9]">
              以 TPC Leader 拒绝
            </div>
          ) : (
            <a
              onClick={() => {
                handleApprove(1, leaderState ? 0 : -1);
              }}
            >
              以 TPC Leader 拒绝
              <span className="ml-2 text-[#3a5bef]">
                {leaderState && <CheckCircleOutlined rev={undefined} />}
              </span>
            </a>
          ),
          key: '1',
        });
      }
      if (clarificationCommitterPermission) {
        res.push({
          label: leaderState ? (
            <div className="cursor-not-allowed text-[#d9d9d9]">
              以 Committer 拒绝
            </div>
          ) : (
            <a
              onClick={() => {
                handleApprove(0, committerState ? 0 : -1);
              }}
            >
              以 Committer 拒绝
              <span className="ml-2 text-[#3a5bef]">
                {committerState && <CheckCircleOutlined rev={undefined} />}
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
            <Dropdown menu={{ items: approveitems }} placement="bottom">
              <Button
                className="flex items-center !rounded-none"
                type="primary"
              >
                <CheckOutlined rev={undefined} />
                赞同
              </Button>
            </Dropdown>
          </Popover>
          <Popover>
            <Dropdown menu={{ items: rejectitems }} placement="bottom">
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
