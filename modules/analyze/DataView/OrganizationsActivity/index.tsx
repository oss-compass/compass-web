import React from 'react';
import SectionTitle from '@modules/analyze/Misc/SectionTitle';
import { Section } from '@modules/analyze/Misc/SideBar/config';

import OrganizationsActivityOverview from '../Overview/OrganizationsActivity';

import ContributorCount from './ContributorCount';
import CommitFrequency from './CommitFrequency';
import OrgCount from './OrgCount';
import ContributionLast from './ContributionLast';

const OrganizationsActivity = () => {
  return (
    <>
      <SectionTitle id={Section.OrganizationsActivity}>
        Organizations Activity
      </SectionTitle>

      <div className="mb-4">
        <OrganizationsActivityOverview />
      </div>

      <div className="mb-4 grid min-w-0 grid-cols-2 gap-4  md:grid-cols-1">
        <ContributorCount />
        <CommitFrequency />
        <OrgCount />
        <ContributionLast />
      </div>
    </>
  );
};

export default OrganizationsActivity;
