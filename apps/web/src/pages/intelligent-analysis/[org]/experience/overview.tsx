import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import ExperienceOverview from '@modules/intelligent-analysis/DeveloperExperience/Overview';

type OrgExperienceOverviewPageProps = {
  org: string;
};

const getSingleParam = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export const getServerSideProps: GetServerSideProps<
  OrgExperienceOverviewPageProps
> = async ({ params }) => {
  const org = getSingleParam(params?.org)?.trim();
  if (!org) {
    return { notFound: true };
  }

  return { props: { org } };
};

const OrgExperienceOverviewPage: NextPage<OrgExperienceOverviewPageProps> = ({
  org,
}) => <ExperienceOverview org={org} />;

export default OrgExperienceOverviewPage;
