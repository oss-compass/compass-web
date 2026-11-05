import React from 'react';
import { Alert, Button, Empty, Spin } from 'antd';

const CiDataState: React.FC<{
  loading?: boolean;
  error?: unknown;
  onRetry?: () => void;
  emptyText?: string;
}> = ({ loading, error, onRetry, emptyText = '暂无 CI 报告数据' }) => (
  <div
    className="flex min-h-[240px] items-center justify-center p-6"
    role="status"
  >
    {loading ? (
      <Spin tip="报告加载中..." />
    ) : error ? (
      <Alert
        type="error"
        showIcon
        message="CI 报告加载失败"
        description="暂时无法读取报告数据，请重试。"
        action={<Button onClick={onRetry}>重试</Button>}
      />
    ) : (
      <Empty description={emptyText} />
    )}
  </div>
);

export default CiDataState;
