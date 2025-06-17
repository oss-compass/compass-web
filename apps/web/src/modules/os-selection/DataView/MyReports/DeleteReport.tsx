import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useUserInfo } from '@modules/auth/useUserInfo';
import { Popover } from 'antd';
import { useDeleteThirdSoftwareReportMutation } from '@oss-compass/graphql'; // 假设这个 hook 存在
import client from '@common/gqlClient';
import { toast } from 'react-hot-toast';

interface DeleteReportProps {
  report: any;
  deleteSuccess?: () => void;
}

const DeleteReport: React.FC<DeleteReportProps> = ({
  report,
  deleteSuccess,
}) => {
  const { currentUser } = useUserInfo();
  const mutation = useDeleteThirdSoftwareReportMutation(client, {
    onSuccess(data) {
      // 检查 data.deleteThirdSoftwareReport 是否存在以及 errors 字段
      if (
        data.deleteThirdSoftwareReport &&
        (!data.deleteThirdSoftwareReport.errors ||
          data.deleteThirdSoftwareReport.errors.length === 0)
      ) {
        toast.success(data.deleteThirdSoftwareReport.message || '删除成功');
        if (deleteSuccess) {
          deleteSuccess();
        }
      } else {
        // 如果有 errors 数组，取第一个错误信息，否则使用顶层 message，或者默认错误
        const errorMessage =
          data.deleteThirdSoftwareReport?.errors?.[0]?.message ||
          data.deleteThirdSoftwareReport?.message ||
          '删除失败';
        toast.error(errorMessage);
      }
    },
    onError(error: any) {
      toast.error(error?.message || '删除操作失败，请稍后重试');
    },
  });

  // 如果用户未登录或用户ID与报告创建者ID不匹配，则不显示删除按钮
  if (!currentUser || currentUser?.id !== report.userId) {
    return null;
  }

  return (
    <Popover content={'删除报告'}>
      <DeleteOutlined
        className="cursor-pointer text-red-500 hover:text-red-700"
        onClick={() => {
          // 弹出确认框会更好，但暂时按最简实现
          mutation.mutate({
            report_id: report.id, // 根据 GraphQL schema，变量名是 report_id
          });
        }}
      />
    </Popover>
  );
};

export default DeleteReport;
