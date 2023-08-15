import React from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useLabModelVersionReportDetailQuery } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import StickyNav from '@common/components/Header/StickyNav';
import NavDatePicker from '@modules/analyze/components/NavBar/NavDatePicker';

const AnalyzeChartNav = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const modelId = Number(router.query.model);
  const versionId = Number(router.query.version);
  const shortCode = router.query.shortCode as string;

  return (
    <StickyNav className="top-0">
      <nav
        className={classnames(
          'flex h-14 items-center justify-between border-b border-t bg-white px-6',
          'md:h-12 md:px-4'
        )}
      >
        <div></div>
        <div className="flex items-center text-[#585858]">
          <NavDatePicker />
        </div>
      </nav>
    </StickyNav>
  );
};

export default AnalyzeChartNav;
