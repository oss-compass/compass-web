import React, { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { useDatasetFuzzySearchQuery } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import { GrClose } from 'react-icons/gr';
import { useThrottle } from 'ahooks';
import { useTranslation, Trans } from 'react-i18next';
import { Button, Input, Modal } from '@oss-compass/ui';
import LinkA from '@common/components/LinkA';
import {
  formFiledState,
  actions,
  LEVEL_SEPARATOR,
  useSelectedCount,
} from '../state';
import { formState } from '../../state';
import RepoCard from './RepoCard';
import Content from './Content';

const ModalSelect = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const formSnapshot = useSnapshot(formState);
  const [search, setSearch] = useState('');
  const throttleSearch = useThrottle(search, { wait: 700 });

  useEffect(() => {
    if (open) {
      // reset filed
      formFiledState.selected = {};
      formState.dataSet.forEach((item) => {
        const { label, firstIdent, secondIdent } = item;
        actions.onBackFill({
          label,
          levelFirst: firstIdent,
          levelSecond: secondIdent,
        });
      });
    }
  }, [formSnapshot.dataSet, open]);

  const { isLoading, data: searchData } = useDatasetFuzzySearchQuery(
    gqlClient,
    {
      keyword: throttleSearch,
    },
    { enabled: Boolean(throttleSearch) }
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
  const count = useSelectedCount();

  const modalContent = () => {
    if (!throttleSearch) {
      return (
        <>
          <div className="text-secondary mb-2 text-sm">
            {t('lab:dataset_desc')}
            {/* {t('lab:cant_find_a_suitable_dataset')}
            <Trans
              i18nKey="contact_us"
              ns="common"
              components={{
                s: <LinkA href={'/docs/community/'} />,
              }}
            /> */}
          </div>
          <div className="flex h-[405px]">
            <Content />
          </div>
        </>
      );
    }

    if (isLoading) {
      return (
        <div className="text-secondary w-full text-center ">
          {t('common:loading_more')}
        </div>
      );
    }
    const repos = searchData?.datasetFuzzySearch || [];
    const len = repos.length;

    if (len === 0) {
      return (
        <div className="text-secondary w-full text-center ">
          {/* {t('common:no_data')} */}
          {/* <div> */}
          {/* {t('lab:cant_find_a_suitable_dataset')} */}
          <Trans
            i18nKey="cant_find_a_suitable_dataset"
            ns="lab"
            components={{
              s: <LinkA href={'/submit-your-project'} />,
            }}
          />
          {/* </div> */}
        </div>
      );
    }

    return (
      <div className="thin-scrollbar flex-1 overflow-auto ">
        <div className="grid grid-cols-3 gap-4 pr-2 md:grid-cols-1">
          {repos?.map?.((item) => {
            return (
              <RepoCard
                key={item.label}
                label={item.label}
                firstIdent={item.firstIdent}
                secondIdent={item.secondIdent}
                onSelect={() => {
                  actions.onSelect({
                    label: item.label,
                    levelFirst: item.firstIdent,
                    levelSecond: item.secondIdent,
                  });
                }}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Modal open={open} onClose={() => onClose()}>
      <div className="relative h-[700px] w-[900px] border-2 border-black bg-white shadow outline-0 md:w-full">
        <div
          className="absolute top-10 right-10 cursor-pointer p-2 "
          onClick={() => {
            onClose();
          }}
        >
          <GrClose />
        </div>

        <div className="px-10 pt-8 md:px-2">
          <div className="mb-3 text-2xl font-medium">
            {t('lab:add_dataset')}
          </div>
          <div className="mb-4 text-sm">
            {t('lab:selected_count', { value: count })}
          </div>
          <Input
            value={search}
            placeholder={t('lab:search_dataset_placeholder')}
            className="mb-2 border-2"
            onChange={(v) => {
              setSearch(v);
            }}
          />

          <div className="flex h-[440px] flex-col">{modalContent()}</div>

          <div className="border-silver absolute left-0 right-0 bottom-0 flex h-20 items-center justify-end border-t bg-white px-9 text-sm">
            {/* <div>
              {t('lab:cant_find_a_suitable_dataset')}
              <Trans
                i18nKey="contact_us"
                ns="common"
                components={{
                  s: <LinkA href={'/docs/community/'} />,
                }}
              />
            </div> */}
            <div>
              <Button
                disabled={count > 10}
                className="min-w-[100px]"
                onClick={() => {
                  handleSave();
                }}
              >
                {count > 10
                  ? t('lab:select_over_tips')
                  : t('common:btn.confirm')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSelect;
