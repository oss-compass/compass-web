import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import ExperienceOverview from '@modules/intelligent-analysis/DeveloperExperience/Overview';

// 只预生成页面外壳；模块、仓库和看板数据仍按访问 URL 在浏览器读取。
export const getStaticProps: GetStaticProps = async () => ({ props: {} });

const ExperienceOverviewPage: NextPage = () => <ExperienceOverview />;

export default ExperienceOverviewPage;
