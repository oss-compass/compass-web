import React, { useRef, useMemo } from 'react';
import ContributorContribution from './ContributorContribution';
import ContributorOrganizations from './ContributorOrganizations';

const ContributionCount: React.FC<{
  label: string;
  level: string;
  beginDate: Date;
  endDate: Date;
  mileage: string[];
}> = ({ label, level, beginDate, endDate, mileage }) => {
  return (
    <div className="flex h-full lg:flex-col">
      <ContributorContribution
        label={label}
        level={level}
        beginDate={beginDate}
        endDate={endDate}
        mileage={mileage}
      />
      <ContributorOrganizations
        label={label}
        level={level}
        beginDate={beginDate}
        endDate={endDate}
        mileage={mileage}
      />
    </div>
  );
};
export default ContributionCount;
