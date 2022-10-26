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
      softwareArtifactRepository: [{ value: '' }],
      governanceRepository: [{ value: '' }],
    },
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<CreateFields> = async (data) => {
    const { projectName, softwareArtifactRepository, governanceRepository } =
      data;
    const repoUrls = softwareArtifactRepository
      .map((item) => item.value.trim())
      .filter(Boolean);
    const comRepoUrls = governanceRepository
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
          { type: 'governance-projects', repoList: comRepoUrls },
        ],
        projectName,
      });
    }
  };

  return (
    <>
      <div className="mx-auto w-[1000px] md:w-full">
        <div className="w-[560px] pb-10 pt-10 md:w-full md:px-4">
          <Auth providers={providers} />
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputFieldArray
                label="Software Artifact Repository"
                name="softwareArtifactRepository"
                placeholder="eg: https://github.com/oss-compass/compass-web-service"
                registerOptions={{
                  required: 'this is required',
                  pattern: {
                    value: getUrlReg(provider!),
                    message: `must be a ${provider} repo url`,
                  },
                }}
              />
              <InputFieldArray
                label="Governance Repository"
                name="governanceRepository"
                placeholder="eg: https://github.com/oss-compass/community"
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
                className={classnames(
                  'daisy-btn h-12 w-32 rounded-none bg-black text-white',
                  {
                    ['daisy-loading']: isRepoTaskLoading || loadingProject,
                  }
                )}
              >
                Submit
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
