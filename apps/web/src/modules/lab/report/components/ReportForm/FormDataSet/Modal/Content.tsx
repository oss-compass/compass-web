import React, { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { useDataSetListQuery } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import { useTranslation } from 'react-i18next';
import { formFiledState, actions } from '../state';
import RepoCard from './RepoCard';
import CollectionMenu from './CollectionMenu';

const Content = () => {
  const { t } = useTranslation();
  const fieldSnapshot = useSnapshot(formFiledState);

  const isMenuSelect =
    Boolean(fieldSnapshot.levelFirst) && Boolean(fieldSnapshot.levelSecond);

  const { data } = useDataSetListQuery(
    gqlClient,
    {},
    { staleTime: 5 * 60 * 1000 }
  );

  const { data: repoList, isLoading: repoListLoading } = useDataSetListQuery(
    gqlClient,
    {
      firstIdent: fieldSnapshot.levelFirst,
      secondIdent: fieldSnapshot.levelSecond,
    },
    {
      enabled: isMenuSelect,
      staleTime: 5 * 60 * 1000,
    }
  );

  return (
    <>
      <div className="thin-scrollbar overflow-auto pr-1">
        <div className="border-silver flex flex-col border-l border-r border-t ">
          {data?.datasetOverview?.map((item) => {
            return <CollectionMenu key={item} ident={item} />;
          })}
        </div>
      </div>
      <div className="thin-scrollbar flex-1 overflow-auto pl-4">
        {isMenuSelect ? (
          <>
            {repoListLoading ? (
              <div className="animate-pulse p-4">
                <div className="flex-1 space-y-4 ">
                  <div className="h-4 rounded bg-slate-200"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 h-4 rounded bg-slate-200"></div>
                    <div className="col-span-1 h-4 rounded bg-slate-200"></div>
                  </div>
                  <div className="h-4 rounded bg-slate-200"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1 h-4 rounded bg-slate-200"></div>
                    <div className="col-span-2 h-4 rounded bg-slate-200"></div>
                  </div>
                  <div className="h-4 rounded bg-slate-200"></div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 pr-2  md:grid-cols-1">
                {repoList?.datasetOverview?.map((repo) => {
                  return (
                    <RepoCard
                      key={repo}
                      label={repo}
                      firstIdent={fieldSnapshot.levelFirst}
                      secondIdent={fieldSnapshot.levelSecond}
                      onSelect={(label) => {
                        const { levelFirst, levelSecond } = formFiledState;
                        actions.onSelect({
                          label,
                          levelFirst,
                          levelSecond,
                        });
                      }}
                    />
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <div className="text-secondary pt-20 text-center">
            {t('lab:click_on_the_left_menu_and_select_a_category')}
          </div>
        )}
      </div>
    </>
  );
};

export default Content;
