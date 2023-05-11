import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import client from '@graphql/client';
import { useCreateRepoTaskMutation } from '@graphql/generated';
import Modal from '@common/components/Modal';
import SelectLike from '@common/components/SelectLike';
import Input from '@common/components/Input';
import Button from '@common/components/Button';
import Message from '@modules/submitProject/Misc/Message';
import { useSnapshot } from 'valtio';
import { userInfoStore } from '@modules/auth/UserInfoStore';
import { fillHttps } from '@common/utils';
import SwitchToCommunity from './SwitchToCommunity';
import RepoSelect from '../RepoSelect';
import { getUrlReg } from '../Misc';

const FormSingleRepo = () => {
  const { t } = useTranslation();
  const { user } = useSnapshot(userInfoStore);
  const provider = user?.provider || 'github';

  const [formType, setFormType] = useState<'select' | 'input'>('input');
  const [repoSelectVisible, setRepoSelectVisible] = useState(false);
  const [selectVal, setSelectVal] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<{ url: string }>();
  const inputVal = watch('url');

  const { isLoading, isError, mutate, data } = useCreateRepoTaskMutation(
    client,
    {
      onSuccess() {
        reset();
        setSelectVal('');
      },
    }
  );
  const statusFailed = data?.createRepoTask?.status === 'false';
  const createMessage = data?.createRepoTask?.message || '';
  const createPrUrl = data?.createRepoTask?.prUrl;
  const reportUrl = data?.createRepoTask?.reportUrl;

  const onSubmit: SubmitHandler<{ url?: string }> = (data) => {
    const common = { origin: provider };
    const urls = [data.url, selectVal].map(fillHttps).filter(Boolean);
    mutate({ ...common, repoUrls: urls });
  };

  const providerName =
    provider === 'github'
      ? t('common:community.github')
      : t('common:community.gitee');

  return (
    <>
      <div className="flex w-full  md:flex-col md:px-6">
        <div className="flex-1">
          <h3 className="mb-6 text-[28px] font-medium">
            {t('submit_project:single_repository')}
          </h3>

          <div className="mb-4 flex w-[560px] items-center justify-between md:w-full">
            <label className=" block text-xl font-medium">
              {formType === 'select'
                ? t('submit_project:select_your_own_repository_on', {
                    providerName: providerName,
                  })
                : t('submit_project:type_the_address_of_any_repository')}
            </label>
            <div
              className="flex cursor-pointer items-center justify-end text-sm text-primary"
              onClick={() => {
                setFormType((pre) => {
                  if (pre === 'select') return 'input';
                  if (pre === 'input') return 'select';
                  return 'input';
                });

                //  reset form
                reset();
                setSelectVal('');
              }}
            >
              {formType === 'select'
                ? t('submit_project:manually_enter_repository_url')
                : t('submit_project:choose_a_repository', {
                    providerName: providerName,
                  })}
            </div>
          </div>

          <div className="mb-10 w-[560px] md:w-full">
            {formType === 'select' ? (
              <SelectLike
                value={selectVal}
                onChange={(v) => {
                  setSelectVal(v);
                }}
                className="w-full"
                placeholder={
                  t('submit_project:pick_your_own_repository_on', {
                    providerName: providerName,
                  }) as string
                }
                onClick={() => setRepoSelectVisible(true)}
              />
            ) : (
              <Input
                className="w-full"
                placeholder={
                  t('submit_project:type_address_of', {
                    providerName: providerName,
                  }) as string
                }
                error={Boolean(errors?.url?.message)}
                {...register('url', {
                  required: false,
                  pattern: {
                    value: getUrlReg(provider!),
                    message: t('submit_project:please_enter_a_valid', {
                      provider: provider,
                    }),
                  },
                })}
              />
            )}

            {errors?.url?.message && (
              <p className="p-1 text-red-500 ">
                {errors?.url.message} ( {t('submit_project:eg')}:
                <span className="mx-2 font-semibold">
                  {provider}.com/xxx/xxx
                </span>
                )
              </p>
            )}
          </div>

          <Button
            type="button"
            loading={isLoading}
            disabled={!Boolean(selectVal || inputVal)}
            className="min-w-[130px] bg-black"
            onClick={() => {
              if (formType === 'input') {
                handleSubmit(onSubmit)();
              }
              if (formType === 'select') {
                onSubmit({});
              }
            }}
          >
            {t('submit_project:submit')}
          </Button>

          <Message
            show={Boolean(data)}
            isError={isError || statusFailed}
            message={createMessage}
            prUrl={createPrUrl}
            reportUrl={reportUrl}
          />
        </div>

        <SwitchToCommunity />
      </div>

      <Modal
        visible={repoSelectVisible}
        bodyClass={
          'w-[640px] md:w-full h-[600px] bg-white border-2 border-black drop-shadow-2xl'
        }
        onClose={() => {
          setRepoSelectVisible(false);
        }}
      >
        <RepoSelect
          onConfirm={(val) => {
            setSelectVal(val);
            setRepoSelectVisible(false);
          }}
        />
      </Modal>
    </>
  );
};

export default FormSingleRepo;
