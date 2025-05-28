import React, { PropsWithChildren, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import OverviewSummary from './OverviewSummary';
import UserPortrayal from './UserPortrayal';
import RepoDataView from './RepoDataView';
import PeopleDataView from './PeopleDataView';
import CodeIssueView from './CodeIssueView';
import { Topic } from '@modules/developer/components/SideBar/config';
import { CiUser } from 'react-icons/ci';

const Charts = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1
        className={
          'group relative z-20 mb-8 flex text-3xl font-semibold md:px-4 md:text-3xl'
        }
      >
        <CiUser className="mt-2 mr-2 h-[21px] w-[21px] flex-shrink-0" />
        WHOAMI
        <a href={`#${Topic.Overview}`}>
          <span className="group-hover:text-primary invisible ml-2 cursor-pointer group-hover:visible">
            #
          </span>
        </a>
      </h1>
      <UserPortrayal />
      <OverviewSummary />
      <RepoDataView />
      <PeopleDataView />
      <CodeIssueView />
      {/* <TopicTitle
        icon={<NicheCreationIcon className="mt-2 mr-2 h-[21px] w-[21px]" />}
        id={Topic.NicheCreation}
      >
        Code
      </TopicTitle> */}
    </>
  );
};

export default Charts;
