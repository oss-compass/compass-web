import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import { DatasetCompletionRowStatus } from '@oss-compass/graphql';
import groupBy from 'lodash/groupBy';
import { useTranslation } from 'next-i18next';
import RepoCard from '../../components/RepoCard';
import RepoCompareBar from './RepoCompareBar';
import { getSecondIdentName } from '@common/collectionsI18n';

const DataSetPanel: React.FC<{
  modelId: number;
  versionId: number;
  dataSet: DatasetCompletionRowStatus[];
  fullWidth: boolean;
  reportId: number;
}> = ({ modelId, versionId, dataSet = [], fullWidth, reportId }) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const [compareList, setCompareList] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState(false);
  const [tagList, setTagList] = useState<string[]>([]);

  const { showRepoList, secondIdents } = useMemo(() => {
    const secondIdentCollections = groupBy(dataSet, (item) => {
      return item.secondIdent;
    });
    const idents = Object.keys(secondIdentCollections);

    // collection tag filter
    const showList = dataSet?.filter?.((i) => {
      if (tagList.length > 0) {
        return tagList.includes(i.secondIdent);
      }
      return true;
    });
    return { secondIdents: idents, showRepoList: showList };
  }, [dataSet, tagList]);

  return (
    <>
      <div className="mt-4 flex w-full md:hidden">
        <div className="mr-3 flex h-5 items-center text-sm font-medium">
          <img
            className="mr-2 mb-0.5 inline-block align-text-top"
            src="/images/lab/datasets.png"
            alt=""
          />
          {t('lab:datasets')}
        </div>
        {secondIdents.map((ident) => {
          const active = tagList.includes(ident);
          return (
            <div
              key={ident}
              className={classnames(
                'line-clamp-1 mr-2  flex h-5 cursor-pointer rounded-full border  px-2.5 text-xs ',
                [
                  active
                    ? 'border-primary text-primary bg-white'
                    : 'bg-[#F1F1F1] text-[#585858]',
                ]
              )}
              onClick={() => {
                if (tagList.includes(ident)) {
                  setTagList((pre) => {
                    return pre.filter((p) => p !== ident);
                  });
                } else {
                  setTagList((pre) => [...pre, ident]);
                }
              }}
            >
              {getSecondIdentName(ident, i18n.language)}
            </div>
          );
        })}
      </div>

      <RepoCompareBar
        total={showRepoList.length}
        compareMode={compareMode}
        compareCount={compareList.length}
        onCompareToggle={() => {
          setCompareMode((pre) => !pre);
        }}
        onCompareConfirm={() => {
          const slugs = compareList.join('..');
          router.push(
            `/lab/model/${modelId}/version/${versionId}/analyze/${slugs}`
          );
        }}
        onCompareCancel={() => {
          setCompareMode(false);
          setCompareList([]);
        }}
      />

      <div
        className={classnames('grid gap-4 pt-4 pb-4 md:grid-cols-2', [
          fullWidth ? 'grid-cols-6' : 'grid-cols-4',
        ])}
      >
        {showRepoList.map((repo) => {
          const selected = compareList.indexOf(repo.shortCode) > -1;
          return (
            <RepoCard
              key={repo.label}
              modelId={modelId}
              reportId={reportId}
              versionId={versionId}
              label={repo.label}
              shortCode={repo.shortCode}
              triggerStatus={repo.triggerStatus}
              triggerUpdatedAt={repo.triggerUpdatedAt}
              logoUrl={repo.logoUrl}
              selected={selected}
              compareMode={compareMode}
              onSelectChange={(checked, { label, shortCode }) => {
                if (checked) {
                  setCompareList((pre) => [...pre, shortCode]);
                  return;
                }
                setCompareList((pre) => {
                  return pre.splice(pre.indexOf(shortCode), 1);
                });
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default DataSetPanel;
