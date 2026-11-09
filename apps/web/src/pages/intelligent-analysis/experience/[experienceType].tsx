import React from 'react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import ExperienceReportRoute from '@modules/intelligent-analysis/DeveloperExperience/ExperienceReportRoute';
import {
  isExperienceType,
  EXPERIENCE_MODULES,
  type ExperienceType,
} from '@modules/intelligent-analysis/DeveloperExperience/experienceModules';

type ExperienceReportPageProps = {
  experienceType: ExperienceType;
};

const getSingleParam = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export const getStaticPaths: GetStaticPaths = async ({ locales }) => ({
  paths: EXPERIENCE_MODULES.flatMap(({ type }) =>
    (locales ?? ['en']).map((locale) => ({
      params: { experienceType: type },
      locale,
    }))
  ),
  fallback: false,
});

export const getStaticProps: GetStaticProps<
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
