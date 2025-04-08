import React, { useRef, useMemo } from 'react';
import ContributorContribution from './ContributorContribution';
import ContributorOrganizations from './ContributorOrganizations';

const ContributionCount: React.FC<{
  label: string;
  level: string;
  beginDate: Date;
  endDate: Date;
  commonFilterOpts: any[];
}> = ({ label, level, beginDate, endDate, commonFilterOpts }) => {
  return (
    <div className="flex h-full lg:flex-col">
      <ContributorContribution
        label={label}
        level={level}
        beginDate={beginDate}
        endDate={endDate}
        commonFilterOpts={commonFilterOpts}
      />
      <ContributorOrganizations
        label={label}
        level={level}
        beginDate={beginDate}
        endDate={endDate}
        commonFilterOpts={commonFilterOpts}
      />
    </div>
  );
};
export default ContributionCount;
