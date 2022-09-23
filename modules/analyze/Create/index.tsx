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

export const UrlReg = /^https:\/\/(gitee|github)\.com\/.+/i;

const AnalyzeCreate: React.FC<{
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}> = ({ providers }) => {
  const session = useSession();
  const isLogin = Boolean(session?.data);

  const {
    isLoading: isRepoTaskLoading,
    isSuccess: repoTaskSuccess,
    isError: repoTaskError,
    mutate: mutateRepo,
    data: repoTaskData,
  } = useCreateRepoTaskMutation(client);
  const {
    isLoading: loadingProject,
    isSuccess: successProject,
    isError: errorProject,
    mutate: mutateProject,
    data: projectTaskData,
  } = useCreateProjectTaskMutation(client);

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
      username: session!.data!.login as string,
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
    <div className="mx-auto w-[1000px] pt-20">
      {(repoTaskError || errorProject) && <ErrorMessage />}
      {(repoTaskSuccess || successProject) && (
        <SuccessMessage
          url={
            repoTaskData?.createRepoTask?.prUrl! ||
            projectTaskData?.createProjectTask?.prUrl!
          }
        />
      )}

      <br />
      <br />
      <Auth providers={providers} />

      <div className="py-10">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputFieldArray
              label="Software Artifact Projects"
              name="softwareArtifactProjects"
              registerOptions={{
                required: 'This is required',
                pattern: {
                  value: UrlReg,
                  message: `must be a url`,
                },
              }}
            />
            <InputFieldArray
              label="Comminuty Repository"
              name="communityProject"
              registerOptions={{
                pattern: {
                  value: UrlReg,
                  message: `must be a url`,
                },
              }}
            />
            <SelectField
              label="Project Name"
              name="projectName"
              registerOptions={{
                required: 'This is required',
              }}
            />
            <div className="pl-60">
              <button
                className={classnames('btn btn-sm', {
                  loading: isRepoTaskLoading || loadingProject,
                })}
                type="submit"
                disabled={!isLogin}
              >
                {isLogin ? 'submit' : 'please login'}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AnalyzeCreate;
