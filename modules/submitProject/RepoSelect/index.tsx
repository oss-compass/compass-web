import React, { useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import {
  getOrgRepos,
  getRepos,
  Repos,
} from '@modules/submitProject/api/github';
import { useDebounce } from 'ahooks';
import Input from '@modules/submitProject/Form/Input';
import { CgSpinner } from 'react-icons/cg';
import { defaultPageSize } from '@modules/submitProject/api/constant';
import SelectRepoSource from '@modules/submitProject/Form/SelectRepoSource';
import RepoItem from './RepoItem';
import Loading from './Loading';

const RepoSelect: React.FC<{ onConfirm: (val: string) => void }> = ({
  onConfirm,
}) => {
  const { data: session } = useSession();
  const token = session?.accessToken!;
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

  const { isLoading, isFetching } = useQuery(
    ['getRepos', token, page, { org }],
    () => {
      if (org.user) {
        return getRepos({ token, page });
      }
      return getOrgRepos({ token, page, org: org.login! });
    },
    {
      enabled: Boolean(token),
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

  const showData = useMemo(() => {
    if (debouncedSearch) {
      return repoList?.filter((v) => v.name.includes(debouncedSearch));
    }
    return repoList;
  }, [repoList, debouncedSearch]);

  const noShowData = showData?.length === 0;

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
                  onConfirm(repo.html_url);
                }}
              />
            );
          })}

          {search && noShowData && (
            <div className="py-10 text-center text-gray-400">No Result!</div>
          )}

          {!search && hasMore && (
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
                  <CgSpinner className="mr-1 animate-spin text-xl" /> fetching
                  data...
                </>
              ) : (
                'load more'
              )}
            </div>
          )}

          {!search && !hasMore && (
            <div className="py-5 text-center text-gray-400">No more data!</div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="flex h-full flex-col">
      <div className="px-10 pb-2 pt-6">
        <h3 className="mb-4 text-[28px] font-medium">Select repository</h3>
        <p className="mb-6">Please choose owner and pick your repository</p>
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
              placeholder="Search…"
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
