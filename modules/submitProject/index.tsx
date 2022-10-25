import React from 'react';
import {
  useCreateProjectTaskMutation,
  useCreateRepoTaskMutation,
} from '@graphql/generated';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react/types';
import client from '@graphql/client';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';
import InputFieldArray from './InputFieldArray';
import SelectField from './SelectField';
import Auth from './Auth';
import { CreateFields } from './type';

import style from './index.module.css';

export const getUrlReg = (provider: string) =>
  new RegExp(`^https:\/\/${provider}\.com\/.+\/.+`, 'i');

const Message: React.FC<{
  show: boolean;
  isError: boolean;
  status?: string;
  message?: string;
  url?: string | null;
}> = ({ show, isError, status, message, url }) => {
  if (!show) {
    return null;
  }
  if (isError) {
    return <ErrorMessage />;
  }
  return (
    <SuccessMessage content={message || 'submit success!'} url={url || ''} />
  );
};

const SubmitProject: React.FC<{
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}> = ({ providers }) => {
  const session = useSession();
  const isLogin = Boolean(session?.data);
  const provider = session?.data?.provider || 'github';

  const {
    isLoading: isRepoTaskLoading,
    isError: repoTaskError,
    mutate: mutateRepo,
    data: repoTaskData,
  } = useCreateRepoTaskMutation(client);
  const {
    isLoading: loadingProject,
    isError: errorProject,
    mutate: mutateProject,
    data: projectTaskData,
  } = useCreateProjectTaskMutation(client);

  const repoCreateStatus = repoTaskData?.createRepoTask?.status;
  const repoCreateMessage = repoTaskData?.createRepoTask?.message;
  const repoCreateUrl = repoTaskData?.createRepoTask?.prUrl;

  const projectCreateStatus = projectTaskData?.createProjectTask?.status;
  const projectCreateMessage = projectTaskData?.createProjectTask?.message;
  const projectCreateUrl = projectTaskData?.createProjectTask?.prUrl;

  const methods = useForm<CreateFields>({
    defaultValues: {
      softwareArtifactProjects: [{ value: '' }],
      communityProject: [{ value: '' }],
    },
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<CreateFields> = async (data) => {
    const { projectName, softwareArtifactProjects, communityProject } = data;
    const repoUrls = softwareArtifactProjects
      .map((item) => item.value.trim())
      .filter(Boolean);
    const comRepoUrls = communityProject
      .map((item) => item.value.trim())
      .filter(Boolean);

    const common = {
      username: session!.data!.user!.login as string,
      token: session!.data!.accessToken as string,
      origin: session!.data!.provider as string,
    };

    if (repoUrls.length == 1 && comRepoUrls.length == 0) {
      mutateRepo({
        ...common,
        repoUrl: repoUrls[0],
      });
      return;
    }

    if (repoUrls.length >= 2 || comRepoUrls.length >= 1) {
      mutateProject({
        ...common,
        projectTypes: [
          { type: 'software-artifact-projects', repoList: repoUrls },
          { type: 'community-projects', repoList: comRepoUrls },
        ],
        projectName,
      });
    }
  };

  return (
    <>
      <div
        className={classnames(
          'relative h-40 overflow-hidden bg-[#2c5fea]',
          style.headerBgLine
        )}
      >
        <div
          className={classnames(
            'absolute -top-16  right-10 h-[303px] w-[490px] md:-right-[300px]',
            style.headerBgGraph
          )}
        ></div>
        <div className="relative mx-auto w-[1000px] pt-12 text-5xl font-medium text-white md:w-full md:px-2">
          Enroll your project
        </div>
      </div>
      <div className="mx-auto w-[1000px] md:w-full">
        <div className="w-[560px] pb-10 pt-10 md:w-full md:px-4">
          <Auth providers={providers} />
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputFieldArray
                label="Software Artifact Projects"
                name="softwareArtifactProjects"
                registerOptions={{
                  required: 'this is required',
                  pattern: {
                    value: getUrlReg(provider!),
                    message: `must be a ${provider} repo url`,
                  },
                }}
              />
              <InputFieldArray
                label="Comminuty Repository"
                name="communityProject"
                registerOptions={{
                  pattern: {
                    value: getUrlReg(provider!),
                    message: `must be a ${provider} repo url`,
                  },
                }}
              />
              <SelectField
                label="Project Name"
                name="projectName"
                registerOptions={{
                  required: 'this is required',
                }}
              />
              <button
                type="submit"
                disabled={!isLogin}
                className={classnames(
                  'daisy-btn h-12 w-32 rounded-none bg-black text-white',
                  {
                    ['daisy-loading']: isRepoTaskLoading || loadingProject,
                    ['daisy-btn-disabled']: !isLogin,
                    ['bg-gray-400']: !isLogin,
                  }
                )}
              >
                {isLogin ? 'Submit' : 'Please Login'}
              </button>
            </form>

            <Message
              show={Boolean(repoTaskData || projectTaskData)}
              isError={repoTaskError || errorProject}
              message={repoCreateMessage || projectCreateMessage || ''}
              status={repoCreateStatus || projectCreateStatus}
              url={repoCreateUrl || projectCreateUrl}
            />
          </FormProvider>
        </div>
      </div>
    </>
  );
};

export default SubmitProject;
