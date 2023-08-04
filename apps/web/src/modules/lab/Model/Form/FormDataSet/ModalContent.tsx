import React from 'react';
import { useSnapshot } from 'valtio';
import { useDataSetListQuery } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import { GrClose } from 'react-icons/gr';
import { Button, Input, Modal } from '@oss-compass/ui';
import { actions, formFiledState, LEVEL_SEPARATOR } from './state';
import { formState } from '../state';
import RepoCard from './RepoCard';
import CategoryMenu from './CategoryMenu';

const ModalContent = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const snapshot = useSnapshot(formFiledState);
  const { data, isLoading } = useDataSetListQuery(
    gqlClient,
    {},
    { staleTime: 5 * 60 * 1000 }
  );

  const isMenuSelect =
    Boolean(snapshot.levelFirst) && Boolean(snapshot.levelSecond);

  const { data: repoList, isLoading: repoListLoading } = useDataSetListQuery(
    gqlClient,
    { firstIdent: snapshot.levelFirst, secondIdent: snapshot.levelSecond },
    {
      enabled: isMenuSelect,
      staleTime: 5 * 60 * 1000,
    }
  );

  const handleSave = () => {
    const keys = Object.keys(formFiledState.selected);
    formState.dataSet = keys.reduce((acc, cur) => {
      const [first, second] = cur.split(LEVEL_SEPARATOR);
      const labels = formFiledState.selected[cur];
      const items = labels.map((i) => ({
        label: i,
        level: 'repo',
        firstIdent: first,
        secondIdent: second,
      }));
      return acc.concat(items);
    }, []);

    // close modal
    onClose();
  };

  return (
    <Modal open={open} onClose={() => onClose()}>
      <div className="relative h-[700px] w-[900px] border-2 border-black bg-white shadow outline-0">
        <div
          className="absolute top-10 right-10 cursor-pointer p-2 "
          onClick={() => {
            onClose();
          }}
        >
          <GrClose />
        </div>

        <div className="px-10 pt-8">
          <div className="mb-3 text-2xl font-medium">Add Dataset</div>
          <div className="mb-4 text-sm">Select up to 10 projects</div>
          <Input placeholder="search..." className="mb-4 border-2" />

          <div className="flex h-[440px]">
            <div className="thin-scrollbar overflow-auto">
              <div className="border-silver flex flex-col border-l border-r border-t ">
                {data?.datasetOverview?.map((item) => {
                  return <CategoryMenu key={item} ident={item} />;
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
                    <div className="grid grid-cols-2 gap-4">
                      {repoList?.datasetOverview?.map((repo) => {
                        return (
                          <RepoCard
                            key={repo}
                            label={repo}
                            onSelect={(label) => {
                              actions.onSelect(label);
                            }}
                          />
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-secondary pt-20 text-center">
                  点击左侧菜单，选择分类
                </div>
              )}
            </div>
          </div>

          <div className="border-silver absolute left-0 right-0 bottom-0 flex h-20 items-center justify-between border-t bg-white px-9">
            <div>
              找不到合适的数据集？点此通过社区
              <span className="text-primary mr-2">联系我们</span>
            </div>
            <div>
              <Button
                onClick={() => {
                  handleSave();
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalContent;
