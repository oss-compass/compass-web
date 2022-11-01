import React, { PropsWithChildren, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCreateRepoTaskMutation } from '@graphql/generated';
import client from '@graphql/client';
import { useSession } from 'next-auth/react';
import Modal from '@common/components/Modal';
import SelectLike from '@modules/submitProject/Form/SelectLike';
import Input from '@modules/submitProject/Form/Input';
import Button from '../Form/Button';
import SwitchToCommunity from './SwitchToCommunity';
import RepoSelect from '../RepoSelect';
import { getUrlReg } from '../Misc';
import Message from '@modules/submitProject/Misc/Message';
import { fillHttps } from '@common/utils';

const FormSingleRepo = () => {
  const { data: session } = useSession();
  const provider = session?.provider || 'github';

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

  const createStatus = data?.createRepoTask?.status;
  const createMessage = data?.createRepoTask?.message || '';
  const createUrl = data?.createRepoTask?.prUrl;

  const onSubmit: SubmitHandler<{ url: string }> = (data) => {
    const common = {
      username: session!.user!.login as string,
      token: session!.accessToken as string,
      origin: session!.provider as string,
    };

    const urls = [data.url, selectVal].map(fillHttps).filter(Boolean);
    mutate({ ...common, repoUrls: urls });
  };

  return (
    <>
      <div className="flex w-full  md:flex-col md:px-6">
        <div className="flex-1">
          <h3 className="mb-6 text-[28px] font-medium">Single repository</h3>
          <label className="mb-4 block text-xl font-medium">
            Select your own repository on GitHub
          </label>
          <SelectLike
            value={selectVal}
            onChange={(v) => {
              setSelectVal(v);
            }}
            className="w-[560px] md:w-full"
            placeholder="Pick your own repository on GitHub"
            onClick={() => setRepoSelectVisible(true)}
          />

          <p className="mt-4 mb-4 text-sm">
            Or type the address of any repository
          </p>

          <form
            onSubmit={handleSubmit(onSubmit, (v) => {
              console.log(v);
            })}
          >
            <div className={'mb-10'}>
              <Input
                className="w-[560px] md:w-full"
                placeholder={`Type address of ${provider} repository`}
                error={Boolean(errors?.url?.message)}
                {...register('url', {
                  required: false,
                  pattern: {
                    value: getUrlReg(provider!),
                    message: `please enter a valid ${provider} url`,
                  },
                })}
              />
              {errors?.url?.message && (
                <p className="p-1 text-red-500 ">
                  {errors?.url.message} ( eg:
                  <span className="mx-2 font-semibold">
                    {provider}.com/xxx/xxx
                  </span>
                  )
                </p>
              )}
            </div>
            <Button
              type="submit"
              loading={isLoading}
              disabled={!Boolean(selectVal || inputVal)}
              className="min-w-[130px] bg-black"
            >
              Submit
            </Button>

            <Message
              show={Boolean(data)}
              isError={isError}
              message={createMessage}
              status={createStatus}
              url={createUrl}
            />
          </form>
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
