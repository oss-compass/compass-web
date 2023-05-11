import React, { useRef, useState } from 'react';
import { useCreateProjectTaskMutation } from '@graphql/generated';
import client from '@graphql/client';
import uniq from 'lodash/uniq';
import { useSnapshot } from 'valtio';
import { useSessionStorage } from 'react-use';
import Select from '@common/components/Select';
import Button from '@common/components/Button';
import SwitchToSingleRepo from './SwitchToSingleRepo';
import SoftwareArtifactRepository from './SoftwareArtifactRepository';
import GovernanceRepository from './GovernanceRepository';
import { fillHttps, getRepoName } from '@common/utils';
import { userInfoStore } from '@modules/auth/UserInfoStore';
import Message from '@modules/submitProject/Misc/Message';
import { useTranslation } from 'react-i18next';

const FormCommunity = () => {
  const { t } = useTranslation();
  const { user } = useSnapshot(userInfoStore);
  const account = user!.account;
  const provider = user!.provider;

  const [communityName, setCommunityName] = useState('');
  const [sarUrls, setSarUrls] = useSessionStorage<string[]>(
    `${account}_software_artifact_repository`,
    []
  );
  const [grUrls, setGrUrls] = useSessionStorage<string[]>(
    `${account}_governance_repository`,
    []
  );

  const options = uniq([...sarUrls, ...grUrls].map((v) => getRepoName(v)));
  const { isLoading, isError, mutate, data } = useCreateProjectTaskMutation(
    client,
    {
      onSuccess() {
        setCommunityName('');
        setSarUrls([]);
        setGrUrls([]);
      },
    }
  );

  const createStatus = data?.createProjectTask?.status;
  const createMessage = data?.createProjectTask?.message || '';
  const createPrUrl = data?.createProjectTask?.prUrl;
  const reportUrl = data?.createProjectTask?.reportUrl;
  const statusFailed = createStatus === 'false';

  const handleSubmit = () => {
    const common = {
      origin: provider as string,
    };
    const projectName = communityName || options[0];
    mutate({
      ...common,
      projectName,
      projectTypes: [
        { type: 'software-artifact-repositories', repoList: sarUrls },
        { type: 'governance-repositories', repoList: grUrls },
      ],
    });
  };

  return (
    <div className="flex w-full md:flex-col md:px-6">
      <div className="flex-1">
        <h3 className="mb-6 text-[28px] font-medium">
          {t('submit_project:community')}
        </h3>

        <SoftwareArtifactRepository
          value={sarUrls}
          onChange={(v) => {
            const val = v.map(fillHttps);
            setSarUrls(uniq(val));
          }}
        />

        <GovernanceRepository
          value={grUrls}
          onChange={(v) => {
            const val = v.map(fillHttps);
            setGrUrls(uniq(val));
          }}
        />

        {options.length > 0 && (
          <div className="max-w-[500px]">
            <label className="mt-10 mb-4 block text-xl font-medium">
              {t('submit_project:community_name')}
            </label>
            <Select
              className="w-full"
              value={communityName}
              onChange={(e) => {
                setCommunityName(e);
              }}
            >
              {options.map((option) => {
                return (
                  <option key={option} value={option}>
                    {option}
                  </option>
                );
              })}
            </Select>
          </div>
        )}

        <Button
          loading={isLoading}
          className="mt-10 min-w-[130px]"
          disabled={sarUrls.length === 0}
          onClick={() => handleSubmit()}
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

      <SwitchToSingleRepo />
    </div>
  );
};

export default FormCommunity;
