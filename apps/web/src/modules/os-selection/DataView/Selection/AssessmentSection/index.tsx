import React, { useState, useEffect } from 'react';
import SoftwareCard from '../SoftwareCard';
import client from '@common/gqlClient';
import { Empty, Spin, Modal, Button } from 'antd';
import GenReport from '../GenReport';
import {
  useSearchQuery,
  useCreateRepoTaskMutation,
} from '@oss-compass/graphql';
import { getPathname, getProvider, fillHttps } from '@common/utils';
import { useTranslation } from 'next-i18next';
import { getUrlReg } from '@modules/submitProject/Misc';
import { useSubmitUser } from '@modules/auth';
import SuccessMessage from '@modules/submitProject/Misc/SuccessMessage';
import ErrorMessage from '@modules/submitProject/Misc/ErrorMessage';
import { TrackingWrapper } from '@common/monumentedStation';

const AssessmentSection = () => {
  const { t } = useTranslation();
  const { submitUser: user } = useSubmitUser();
  const [description, setDescription] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedSoftware, setSelectedSoftware] = useState<any[]>([]);
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [showCreatePR, setShowCreatePR] = useState(false);
  const [createPrUrl, setCreatePrUrl] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { data, isFetching, refetch } = useSearchQuery(
    client,
    {
      keyword: description,
      level: 'repo',
    },
    { enabled: false }
  );

  const { mutate: createRepoTask, isLoading: isCreatingRepo } =
    useCreateRepoTaskMutation(client, {
      onSuccess(data) {
        if (data?.createRepoTask?.status === 'true') {
          setErrorMessage('');
          setShowCreatePR(false);
          setCreatePrUrl(data?.createRepoTask?.prUrl || null);
          setShowSuccessModal(true);
        } else {
          setErrorMessage(data?.createRepoTask?.message || '提交失败');
          setShowErrorModal(true);
        }
      },
      onError(error) {
        setErrorMessage('提交失败，请稍后重试');
        setShowErrorModal(true);
      },
    });

  const targetMap = {
    github: 'selected.github',
    gitee: 'selected.gitee',
  };

  useEffect(() => {
    if (data?.fuzzySearch.length > 0) {
      setRecommendations(
        data.fuzzySearch?.map((item) => {
          const name = getPathname(item.label);
          const target = targetMap[getProvider(item.label)];
          return {
            name,
            target,
            ...item,
          };
        })
      );
      setShowCreatePR(false);
    } else if (data?.fuzzySearch.length === 0 && isValidUrl) {
      setRecommendations([]);
      setShowCreatePR(true);
    }
  }, [data, isValidUrl]);

  const handleSoftwareSelect = (software: any) => {
    setSelectedSoftware((prev) => {
      if (prev.find((i) => i.label === software.label)) {
        return prev.filter((i) => i.label !== software.label);
      } else {
        return [...prev, software];
      }
    });
  };

  const validateUrl = (url: string) => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return false;

    // 检查是否是GitHub或Gitee链接
    const githubReg = getUrlReg('github');
    const giteeReg = getUrlReg('gitee');

    return githubReg.test(trimmedUrl) || giteeReg.test(trimmedUrl);
  };

  const handleGetRecommendations = () => {
    setErrorMessage('');
    setSelectedSoftware([]);
    setShowCreatePR(false);

    const isValid = validateUrl(description);
    setIsValidUrl(isValid);

    refetch();
  };

  const handleCreatePR = () => {
    const provider = user.provider || 'github';
    const urls = [fillHttps(description.trim())];

    createRepoTask({
      origin: provider,
      repoUrls: urls,
    });
  };

  let content: any = '';
  if (isFetching) {
    content = (
      <div className="flex h-full min-h-[400px] w-full items-center justify-center rounded bg-white p-6 shadow-sm">
        <Spin size="large" />
      </div>
    );
  } else {
    if (recommendations.length === 0 && !showCreatePR) {
      content = (
        <div className="flex h-full min-h-[400px] w-full items-center justify-center rounded bg-white p-6 shadow-sm">
          <Empty />
        </div>
      );
    } else if (showCreatePR) {
      content = (
        <div className="flex h-full min-h-[400px] w-full items-center justify-center rounded bg-white p-6 shadow-sm">
          <div className="text-center">
            <div>
              <div className="mb-4 text-lg text-gray-600">平台未收录该项目</div>
              <TrackingWrapper
                module="os-selection"
                type="assessment_section_create_pr"
                content={{
                  repoUrl: description.trim(),
                  userProvider: user?.provider || 'unknown',
                }}
                validate={() => {
                  if (!user) {
                    setErrorMessage('请先登录');
                    setShowErrorModal(true);
                    return false;
                  }
                  return true;
                }}
              >
                <button
                  onClick={handleCreatePR}
                  disabled={isCreatingRepo}
                  className="bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600 disabled:bg-gray-400"
                >
                  {isCreatingRepo ? '提交中...' : '点击创建PR提交该项目'}
                </button>
              </TrackingWrapper>
            </div>
          </div>
        </div>
      );
    } else {
      content = (
        <div className="min-h-[400px] rounded bg-white p-6 shadow-sm ">
          <div className="mb-4 border-b pb-4">
            <GenReport selectedSoftware={selectedSoftware} />
          </div>
          <div className="grid grid-cols-3 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((software) => (
              <SoftwareCard
                key={software.label}
                software={software}
                isSelected={selectedSoftware.find(
                  (i) => i.label === software.label
                )}
                onSelect={() => handleSoftwareSelect(software)}
                showSimilarity={true}
              />
            ))}
          </div>
        </div>
      );
    }
  }

  return (
    <div className="mx-auto max-w-6xl py-4">
      <div className="mx-auto mb-8 rounded bg-white p-6 shadow-sm">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4 w-full rounded-lg border-2 border-gray-300 p-4 text-base focus:border-blue-500 focus:outline-none"
          placeholder={t('os-selection:assessment_section.input_placeholder')}
        />

        <TrackingWrapper
          module="os-selection"
          type="assessment_section_search"
          content={{
            inputUrl: description.trim(),
            isValidUrl: validateUrl(description.trim()),
          }}
          validate={() => {
            if (!description.trim()) {
              setErrorMessage(t('os-selection:assessment_section.input_error'));
              setShowErrorModal(true);
              return false;
            }
            const isValid = validateUrl(description);
            if (!isValid) {
              setErrorMessage('请输入有效的GitHub或Gitee仓库链接');
              setShowErrorModal(true);
              return false;
            }
            return true;
          }}
        >
          <button
            onClick={handleGetRecommendations}
            className="mt-4 bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            {t('os-selection:assessment_section.button')}
          </button>
        </TrackingWrapper>
      </div>
      {content}

      {/* 成功提交PR的弹窗 */}
      <Modal
        title={null}
        open={showSuccessModal}
        onCancel={() => setShowSuccessModal(false)}
        footer={[]}
        centered
        width={600}
      >
        <SuccessMessage
          content={t('submit_project:submit_success')}
          url={createPrUrl || ''}
        />
      </Modal>

      {/* 错误提示弹窗 */}
      <Modal
        title={null}
        open={showErrorModal}
        onCancel={() => {
          setShowErrorModal(false);
          setErrorMessage('');
        }}
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={() => {
              setShowErrorModal(false);
              setErrorMessage('');
            }}
          >
            确定
          </Button>,
        ]}
        centered
        width={600}
      >
        <ErrorMessage content={errorMessage} />
      </Modal>
    </div>
  );
};

export default AssessmentSection;
