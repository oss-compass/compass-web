import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Alert, Button, Spin } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { compassApiFetch } from '@modules/intelligent-analysis/UserJourney/rawData/apiClient';

type CannEmbedUrlResponse = {
  embed_url: string;
  expires_in_hours: number;
};

const REFRESH_INTERVAL_MS = 90 * 60 * 1000;

/** 通过后端签发短期 Token 后加载第三方 CANN 工具链评估报告。 */
const CiEmbeddedReport: React.FC = () => {
  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['cann-embed-report-url'],
    queryFn: () =>
      compassApiFetch<CannEmbedUrlResponse>('/embed/cann-report-url'),
    staleTime: REFRESH_INTERVAL_MS,
    refetchInterval: REFRESH_INTERVAL_MS,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[800px] items-center justify-center rounded-xl bg-white">
        <Spin tip="正在加载工具链评估报告..." size="large" />
      </div>
    );
  }

  if (!data?.embed_url) {
    const isNotConfigured =
      error instanceof Error && error.message.includes('503');
    return (
      <div className="flex min-h-[420px] items-start justify-center rounded-xl bg-white px-6 pt-20">
        <Alert
          className="w-full max-w-2xl"
          type="error"
          showIcon
          message={
            isNotConfigured
              ? '工具链评估报告尚未配置'
              : '工具链评估报告加载失败'
          }
          description={
            isNotConfigured
              ? '请先在后端环境变量中配置 CANN_EMBED_API_KEY。'
              : '暂时无法从报告平台获取访问凭证，请稍后重试。'
          }
          action={
            <Button
              size="small"
              icon={<ReloadOutlined />}
              loading={isFetching}
              onClick={() => void refetch()}
            >
              重试
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <iframe
        key={data.embed_url}
        title="CANN 工具链体验评估报告"
        src={data.embed_url}
        className="block h-[900px] w-full border-0"
        allowFullScreen
      />
    </div>
  );
};

export default CiEmbeddedReport;
