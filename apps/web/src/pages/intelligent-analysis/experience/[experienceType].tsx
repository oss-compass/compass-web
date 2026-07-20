import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import ExperienceReportRoute from '@modules/intelligent-analysis/DeveloperExperience/ExperienceReportRoute';
import {
  isExperienceType,
  type ExperienceType,
} from '@modules/intelligent-analysis/DeveloperExperience/experienceModules';

type ExperienceReportPageProps = {
  experienceType: ExperienceType;
};

const getSingleParam = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export const getServerSideProps: GetServerSideProps<
  ExperienceReportPageProps
> = async ({ params }) => {
  const experienceType = getSingleParam(params?.experienceType);
  if (!isExperienceType(experienceType)) {
    return { notFound: true };
  }

  return { props: { experienceType } };
};

const ExperienceReportPage: NextPage<ExperienceReportPageProps> = ({
  experienceType,
}) => <ExperienceReportRoute experienceType={experienceType} />;

export default ExperienceReportPage;
