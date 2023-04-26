import React, { useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import {
  defaultPageSize,
  getOrgRepos,
  getRepos,
  Repos,
} from '@modules/submitProject/api';
import { useDebounce } from 'ahooks';
import Input from '@modules/submitProject/Form/Input';
import { CgSpinner } from 'react-icons/cg';
import SelectRepoSource from '@modules/submitProject/Form/SelectRepoSource';
import RepoItem from './RepoItem';
import Loading from './Loading';
import { useTranslation } from 'react-i18next';
import { removeExtname } from '@common/utils';

const RepoSelect: React.FC<{ onConfirm: (val: string) => void }> = ({
  onConfirm,
}) => {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const username = session?.user?.login!;
  const provider = session?.provider!;
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, { wait: 180 });

  const [org, setOrg] = useState({
    login: session?.user.login!,
    avatar_url: session?.user.image!,
    user: true,
  });

  const [repoList, setRepoList] = useState<Repos[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { isLoading, isFetching, isError, error } = useQuery(
    ['getRepos', username, page, { org }],
    () => {
      if (org.user) {
        return getRepos(provider)({ username, page });
      }
      return getOrgRepos(provider)({ username, page, org: org.login! });
    },
    {
      enabled: Boolean(username),
      onSuccess(res) {
        if (res.data) {
          if (res.data.length < defaultPageSize) {
            setHasMore(false);
          }
          setRepoList((pre) => [...pre, ...res.data]);
        }
      },
    }
  );
  const errorMsg =
    // @ts-ignore
    error?.response?.data?.message || t('submit_project:failed_to_fetch_data');

  const showData = useMemo(() => {
    if (debouncedSearch) {
      return repoList?.filter((v) => v.name.includes(debouncedSearch));
    }
    return repoList;
  }, [repoList, debouncedSearch]);

  const noShowData = showData?.length === 0;

  // eslint-disable-next-line complexity
  const getList = () => {
    if (isLoading && noShowData) {
      return <Loading />;
    }

    return (
      <>
        <div className="px-10 pb-10 pt-3">
          {showData?.map((repo) => {
            return (
              <RepoItem
                key={repo.id}
                name={repo.full_name}
                updateAt={repo.updated_at}
                onPick={() => {
                  //  gitee html_url value endWith .git
                  const repoUrl = removeExtname(repo.html_url, '.git');
                  onConfirm(repoUrl);
                }}
              />
            );
          })}

          {search && noShowData && (
            <div className="py-10 text-center text-gray-400">
              {t('submit_project:no_result')}
            </div>
          )}

          {!isError && !search && hasMore && (
            <div
              className="flex cursor-pointer items-center justify-center py-4 text-center text-primary"
              onClick={() => {
                if (!isFetching) {
                  setPage((v) => v + 1);
                }
              }}
            >
              {isFetching ? (
                <>
                  <CgSpinner className="mr-1 animate-spin text-xl" />
                  {t('submit_project:fetching')}
                </>
              ) : (
                t('submit_project:load_more')
              )}
            </div>
          )}

          {!isError && !search && !hasMore && (
            <div className="py-5 text-center text-sm text-gray-300">
              {t('submit_project:no_more_data')}
            </div>
          )}

          {isError && errorMsg && (
            <div className="py-5 text-center text-gray-400">{errorMsg}</div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="flex h-full flex-col">
      <div className="px-10 pb-2 pt-6">
        <h3 className="mb-4 text-[28px] font-medium">
          {t('submit_project:select_repository')}
        </h3>
        <p className="mb-6">
          {t('submit_project:please_choose_owner_and_pick_your_repository')}
        </p>
        <div className="flex justify-between">
          <div className="w-[calc(50%-8px)]">
            <SelectRepoSource
              value={org}
              onChange={(v) => {
                if (v.login !== org.login) {
                  setRepoList([]);
                  setPage(1);
                  setHasMore(true);
                  setOrg(v);
                }
              }}
            />
          </div>
          <div className="w-[calc(50%-8px)]">
            <Input
              className="w-full"
              placeholder={t('submit_project:search') as string}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-auto">{getList()}</div>
    </div>
  );
};

export default RepoSelect;
