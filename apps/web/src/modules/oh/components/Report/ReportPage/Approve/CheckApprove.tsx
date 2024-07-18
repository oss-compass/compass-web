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

const CheckApprove = ({ selectionId }) => {
  const { currentUser } = useUserInfo();
  const { commentCommitterPermission, commentSigLeadPermission, commentState } =
    useGetReportData();
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
        onSuccess: () => {
          ReportStore.event$?.emit(ReportEvent.REFRESH);
          toast.success(`${state === 0 ? '取消' : '操作'}成功`);
        },
      }
    );
  };
  const getApproveItems = () => {
    if (!commentCommitterPermission && !commentSigLeadPermission) {
      return [
        {
          key: '1',
          label: '您不是该软件的 Committer 或 SIG Leader，暂无权限审批',
        },
      ];
    } else {
      let res = [];
      if (commentSigLeadPermission) {
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
              以 SIG Leader 通过
              <span className="ml-2 text-[#3a5bef]">
                {state && <CheckCircleOutlined rev={undefined} />}
              </span>
            </a>
          ),
          key: '1',
        });
      }
      if (commentCommitterPermission) {
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
              以 Committer 通过
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
    if (!commentCommitterPermission && !commentSigLeadPermission) {
      return [
        {
          key: '1',
          label: '您不是该软件的 Committer 或 SIG Leader，暂无权限审批',
        },
      ];
    } else {
      let res = [];
      if (commentSigLeadPermission) {
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
              以 SIG Leader 驳回
              <span className="ml-2 text-[#3a5bef]">
                {state && <CheckCircleOutlined rev={undefined} />}
              </span>
            </a>
          ),
          key: '1',
        });
      }
      if (commentCommitterPermission) {
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
              以 Committer 驳回
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
    <div className="oh mb-4 flex items-center gap-2">
      <div className="oh text-base font-semibold">审批意见：</div>
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
