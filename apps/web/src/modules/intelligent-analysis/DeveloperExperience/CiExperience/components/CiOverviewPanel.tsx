import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Typography } from 'antd';
import type { CiRepoData, CiRepoKey } from '../types';
import CiEmbeddedReport from './CiEmbeddedReport';
import CiOverview from './CiOverview';
import CiViewTabs, { type CiView } from './CiViewTabs';
import useCannEmbedReachability from './useCannEmbedReachability';

type CiOverviewPanelProps = {
  data: Record<CiRepoKey, CiRepoData>;
};

/** 社区工程总览入口：负责内网页签探测及总览/第三方报告切换。 */
const CiOverviewPanel: React.FC<CiOverviewPanelProps> = ({ data }) => {
  const router = useRouter();
  const canAccessCannEmbed = useCannEmbedReachability();
  const activeView = useMemo<CiView>(() => {
    const raw = router.query.ciView;
    const value = Array.isArray(raw) ? raw[0] : raw;
    return value === 'embedded-report' ? 'embedded-report' : 'overview';
  }, [router.query.ciView]);

  const handleViewChange = useCallback(
    (view: CiView) => {
      const nextQuery = { ...router.query };
      if (view === 'overview') {
        delete nextQuery.ciView;
      } else {
        nextQuery.ciView = view;
      }
      void router.replace(
        { pathname: router.pathname, query: nextQuery },
        undefined,
        { shallow: true }
      );
    },
    [router]
  );

  if (!canAccessCannEmbed || activeView === 'overview') {
    return (
      <CiOverview
        data={data}
        headerAction={
          canAccessCannEmbed ? (
            <CiViewTabs active={activeView} onChange={handleViewChange} />
          ) : null
        }
      />
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Typography.Title level={4} className="oj-section-title">
          工具链评估报告
        </Typography.Title>
        <CiViewTabs active={activeView} onChange={handleViewChange} />
      </div>
      <CiEmbeddedReport />
    </>
  );
};

export default CiOverviewPanel;
