import React, { useState } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import {
  useBetaMetricOverviewQuery,
  BetaMetricOverviewQuery,
} from '@graphql/generated';
import client from '@graphql/client';
import Loading from './Loading';
import RepoCard from './RepoCard';
import { useTranslation } from 'next-i18next';
import { getLabCompareAnalyzeLink } from '@common/utils';
import Compare from '../assets/compare.svg';

type Repo = {
  path?: string | null | undefined;
  origin: string;
  name?: string | null | undefined;
  type: string;
};

const ModelTrends: React.FC<{
  id: number;
}> = ({ id }) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { isLoading, data } = useBetaMetricOverviewQuery(client, {
    id: id,
  });
  const [type, setType] = useState('');
  const [compareList, setCompareList] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState(false);

  const trends = [
    {
      name: 'tensorflow',
      path: 'tensorflow/tensorflow',
      origin: 'https://github.com/tensorflow/tensorflow',
      type: 'Deep Learning Frameworks',
    },
    {
      name: 'pytorch',
      path: 'pytorch/pytorch',
      origin: 'https://github.com/pytorch/pytorch',
      type: 'Deep Learning Frameworks',
    },
    {
      name: 'mindspore',
      path: 'mindspore/mindspore',
      origin: 'https://gitee.com/mindspore/mindspore',
      type: 'Deep Learning Frameworks',
    },
    {
      name: 'Paddle',
      path: 'PaddlePaddle/Paddle',
      origin: 'https://github.com/PaddlePaddle/Paddle',
      type: 'Deep Learning Frameworks',
    },
    {
      name: 'onnx',
      path: 'onnx/onnx',
      origin: 'https://github.com/onnx/onnx',
      type: 'Deep Learning Frameworks',
    },
    {
      name: 'kubernetes',
      path: 'kubernetes/kubernetes',
      origin: 'https://github.com/kubernetes/kubernetes',
      type: 'Container Technology',
    },
    {
      name: 'podman',
      path: 'containers/podman',
      origin: 'https://github.com/containers/podman',
      type: 'Container Technology',
    },
    {
      name: 'minikube',
      path: 'kubernetes/minikube',
      origin: 'https://github.com/kubernetes/minikube',
      type: 'Container Technology',
    },
    {
      name: 'rancher',
      path: 'rancher/rancher',
      origin: 'https://github.com/rancher/rancher',
      type: 'Container Technology',
    },
    {
      name: 'moby',
      path: 'moby/moby',
      origin: 'https://github.com/moby/moby',
      type: 'Container Technology',
    },
  ];
  if (isLoading) {
    return <Loading />;
  }
  const repoType: string[] = [];
  trends.forEach((item) => {
    !repoType.includes(item.type) && repoType.push(item.type);
  });
  const handleClick = (e: string) => {
    if (e === type) {
      setType('');
      setCompareMode(false);
    } else {
      setType(e);
      setCompareList([]);
    }
  };

  return (
    <>
      <div className="my-6 flex w-full">
        <div className="mr-3 flex h-5 w-[80px] items-center text-sm font-medium">
          <img
            className="mr-2 mb-0.5 inline-block align-text-top"
            src="/images/lab/datasets.png"
            alt=""
          />
          {t('lab:datasets')}
        </div>
        {repoType.map((i) => {
          return (
            <div
              key={i}
              className={classnames(
                'mr-2 flex h-5 cursor-pointer rounded-full border bg-[#F1F1F1] px-2.5 text-xs text-[#585858]',
                { 'text-[#2563eb]': type === i }
              )}
              onClick={() => handleClick(i)}
            >
              {i}
            </div>
          );
        })}
      </div>
      <div className="flex h-6 text-sm font-medium">
        <span>
          {trends?.filter((i) => (type ? i.type === type : true)).length}{' '}
          projects in datasets are using this model
        </span>
        <div>
          {compareMode ? (
            <div className="flex text-xs">
              {/* <div className="text-sm leading-8 text-gray-400">
                {t('collection:please_select_two_or_more_repositories_below')}
              </div> */}
              <div
                onClick={() => {
                  setCompareMode(false);
                }}
                className="ml-5 h-6 cursor-pointer border border-gray-500 px-2 py-1 text-center text-xs text-black "
              >
                {t('collection:cancel')}
              </div>
              <div
                onClick={async () => {
                  if (compareList.length > 1) {
                    await router.push(
                      getLabCompareAnalyzeLink(compareList, 'repo')
                    );
                  }
                }}
                className={classnames(
                  'ml-5 h-6 cursor-pointer border-0 border-gray-500 bg-blue-600 px-2 py-1 text-center text-xs text-gray-50',
                  { 'bg-gray-300': compareList.length < 2 }
                )}
              >
                {t('collection:compare')}
              </div>
            </div>
          ) : (
            type && (
              <div
                onClick={() => {
                  setCompareMode(true);
                }}
                className="ml-4 h-6 w-36 flex-none cursor-pointer border border-gray-500 text-center text-xs font-semibold leading-6"
              >
                <div className="mr-2 inline-block align-text-bottom">
                  <Compare />
                </div>

                {t('lab:pick_for_compare')}
              </div>
            )
          )}
        </div>
      </div>
      <div className="flex w-full flex-wrap content-evenly gap-3 pb-12 pt-2">
        {trends
          ?.filter((i) => (type ? i.type === type : true))
          .map((i) => {
            return (
              <RepoCard
                repo={i}
                key={i.path}
                compareMode={compareMode}
                onSelectChange={(checked, label) => {
                  if (checked) {
                    setCompareList((pre) => [...pre, label]);
                  } else {
                    setCompareList((pre) => {
                      pre.splice(pre.indexOf(label), 1);
                      return [...pre];
                    });
                  }
                }}
              />
            );
          })}
      </div>
    </>
  );
};

export default ModelTrends;
