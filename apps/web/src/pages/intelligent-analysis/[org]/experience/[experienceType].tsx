import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import ExperienceReportRoute from '@modules/intelligent-analysis/DeveloperExperience/ExperienceReportRoute';
import {
  isExperienceType,
  type ExperienceType,
} from '@modules/intelligent-analysis/DeveloperExperience/experienceModules';

type OrgExperienceReportPageProps = {
  experienceType: ExperienceType;
  org: string;
};

const getSingleParam = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export const getServerSideProps: GetServerSideProps<
  OrgExperienceReportPageProps
> = async ({ params }) => {
  const experienceType = getSingleParam(params?.experienceType);
  const org = getSingleParam(params?.org)?.trim();
  if (!isExperienceType(experienceType) || !org) {
    return { notFound: true };
  }

  return { props: { experienceType, org } };
};

const OrgExperienceReportPage: NextPage<OrgExperienceReportPageProps> = ({
  experienceType,
  org,
}) => <ExperienceReportRoute experienceType={experienceType} org={org} />;

export default OrgExperienceReportPage;
