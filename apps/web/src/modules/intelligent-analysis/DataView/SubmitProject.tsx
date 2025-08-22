import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Space,
  message,
  Upload,
  Divider,
  Typography,
  Alert,
  Tag,
  List,
} from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { useTranslation } from 'next-i18next';

const { TextArea } = Input;
const { Text, Paragraph } = Typography;

interface ProjectFormData {
  projectName: string;
  description?: string;
  mainRepositories: string[];
  thirdPartyRepositories: string[];
}

const SubmitProject: React.FC = () => {
  const { t } = useTranslation('intelligent_analysis');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [batchInputText, setBatchInputText] = useState<{
    main: string;
    thirdParty: string;
  }>({
    main: '',
    thirdParty: '',
  });
  const [repositories, setRepositories] = useState<{
    main: string[];
    thirdParty: string[];
  }>({
    main: [],
    thirdParty: [],
  });

  const handleSubmit = async (
    values: Omit<ProjectFormData, 'mainRepositories' | 'thirdPartyRepositories'>
  ) => {
    setLoading(true);
    try {
      const submitData = {
        ...values,
        mainRepositories: repositories.main,
        thirdPartyRepositories: repositories.thirdParty,
      };

      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('提交的项目数据:', submitData);
      message.success(t('submit_project.submit_success'));
      form.resetFields();
      setRepositories({ main: [], thirdParty: [] });
      setBatchInputText({ main: '', thirdParty: '' });
    } catch (error) {
      message.error(t('submit_project.submit_error'));
    } finally {
      setLoading(false);
    }
  };

  const handleJsonUpload = (file: File, type: 'main' | 'thirdParty') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        let repositories: string[] = [];

        if (Array.isArray(jsonData)) {
          repositories = jsonData.filter((item) => typeof item === 'string');
        } else if (
          jsonData.repositories &&
          Array.isArray(jsonData.repositories)
        ) {
          repositories = jsonData.repositories.filter(
            (item) => typeof item === 'string'
          );
        } else {
          throw new Error('JSON格式不正确');
        }

        setRepositories((prev) => ({
          ...prev,
          [type]: [...prev[type], ...repositories],
        }));
        message.success(t('submit_project.import_success', { count: repositories.length }));
      } catch (error) {
        message.error(t('submit_project.json_format_error'));
      }
    };
    reader.readAsText(file);
    return false; // 阻止自动上传
  };

  const handleBatchInput = (type: 'main' | 'thirdParty') => {
    const text = batchInputText[type];
    if (!text.trim()) return;

    // 按行分割，过滤空行和无效URL
    const urls = text
      .split('\n')
      .map((line) => line.trim())
      .filter(
        (line) =>
          line && (line.startsWith('http://') || line.startsWith('https://'))
      );

    if (urls.length === 0) {
      message.warning(t('submit_project.invalid_url_warning'));
      return;
    }

    setRepositories((prev) => ({
      ...prev,
      [type]: [...prev[type], ...urls],
    }));

    // 清空文本域
    setBatchInputText((prev) => ({ ...prev, [type]: '' }));
    message.success(t('submit_project.add_success', { count: urls.length }));
  };

  const removeRepository = (type: 'main' | 'thirdParty', index: number) => {
    setRepositories((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
    message.success(t('submit_project.remove_success'));
  };

  const jsonUploadProps = (type: 'main' | 'thirdParty'): UploadProps => ({
    name: 'file',
    multiple: false,
    accept: '.json',
    beforeUpload: (file) => handleJsonUpload(file, type),
    showUploadList: false,
  });

  return (
    <div className="min-h-full bg-gray-50">
      <div className="px-6 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{t('submit_project.title')}</h1>
          <p className="mt-2 text-gray-600">{t('submit_project.description')}</p>
        </div>

        <Card>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
          >
            {/* 项目名称 - 必填 */}
            <Form.Item
              label={
                <span className="font-medium">
                  {t('submit_project.project_name')} <span className="text-red-500">*</span>
                </span>
              }
              name="projectName"
              rules={[
                { required: true, message: t('submit_project.project_name_required_error') },
                { min: 2, message: t('submit_project.project_name_min_error') },
                { max: 50, message: t('submit_project.project_name_max_error') },
              ]}
            >
              <Input
                placeholder={t('submit_project.project_name_placeholder')}
                size="large"
              />
            </Form.Item>

            {/* 项目描述 - 选填 */}
            <Form.Item
              label={<span className="font-medium">{t('submit_project.project_description')}</span>}
              name="description"
              extra={t('submit_project.project_description_extra')}
            >
              <TextArea
                rows={3}
                placeholder={t('submit_project.project_description_placeholder')}
                maxLength={500}
                showCount
              />
            </Form.Item>

            <Divider />

            {/* 主仓库地址 */}
            <div className="mb-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-base font-medium">{t('submit_project.main_repositories')}</span>
                <Upload {...jsonUploadProps('main')}>
                  <Button icon={<UploadOutlined />} size="small">
                    {t('submit_project.import_json')}
                  </Button>
                </Upload>
              </div>

              {/* 批量输入区域 */}
              <div className="mb-4 rounded-lg bg-gray-50 p-4">
                <div className="mb-2">
                  <Text type="secondary" className="text-sm">
                    {t('submit_project.batch_input_hint')}
                  </Text>
                </div>
                <TextArea
                  rows={4}
                  placeholder="https://github.com/username/repo1&#10;https://gitlab.com/username/repo2&#10;https://gitee.com/username/repo3"
                  value={batchInputText.main}
                  onChange={(e) =>
                    setBatchInputText((prev) => ({
                      ...prev,
                      main: e.target.value,
                    }))
                  }
                  className="mb-3"
                />
                <Button
                  size="small"
                  onClick={() => handleBatchInput('main')}
                  disabled={!batchInputText.main.trim()}
                >
                  {t('submit_project.add_to_list')}
                </Button>
              </div>

              {/* 仓库列表显示 */}
              {repositories.main.length > 0 && (
                <div className="mb-4">
                  <div className="mb-2">
                    <Text className="font-medium">
                      {t('submit_project.added_main_repos_count', { count: repositories.main.length })}
                    </Text>
                  </div>
                  <List
                    size="small"
                    bordered
                    dataSource={repositories.main}
                    renderItem={(item, index) => (
                      <List.Item
                        actions={[
                          <Button
                            key="delete"
                            type="text"
                            size="small"
                            icon={<DeleteOutlined />}
                            onClick={() => removeRepository('main', index)}
                            className="text-red-500"
                          />,
                        ]}
                      >
                        <div className="flex-1 truncate">
                          <Text className="text-sm">{item}</Text>
                        </div>
                      </List.Item>
                    )}
                  />
                </div>
              )}
            </div>

            <Divider />

            {/* 三方库仓库地址 */}
            <div className="mb-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-base font-medium">{t('submit_project.third_party_repositories')}</span>
                <Upload {...jsonUploadProps('thirdParty')}>
                  <Button icon={<UploadOutlined />} size="small">
                    {t('submit_project.import_json')}
                  </Button>
                </Upload>
              </div>

              {/* 批量输入区域 */}
              <div className="mb-4 rounded-lg bg-gray-50 p-4">
                <div className="mb-2">
                  <Text type="secondary" className="text-sm">
                    每行输入一个仓库地址，支持GitHub、GitLab、Gitee等平台
                  </Text>
                </div>
                <TextArea
                  rows={4}
                  placeholder="https://github.com/username/repo1&#10;https://gitlab.com/username/repo2&#10;https://gitee.com/username/repo3"
                  value={batchInputText.thirdParty}
                  onChange={(e) =>
                    setBatchInputText((prev) => ({
                      ...prev,
                      thirdParty: e.target.value,
                    }))
                  }
                  className="mb-3"
                />
                <Button
                  size="small"
                  onClick={() => handleBatchInput('thirdParty')}
                  disabled={!batchInputText.thirdParty.trim()}
                >
                  {t('submit_project.add_to_list')}
                </Button>
              </div>

              {/* 仓库列表显示 */}
              {repositories.thirdParty.length > 0 && (
                <div className="mb-4">
                  <div className="mb-2">
                    <Text className="font-medium">
                      {t('submit_project.added_third_party_repos_count', { count: repositories.thirdParty.length })}
                    </Text>
                  </div>
                  <List
                    size="small"
                    bordered
                    dataSource={repositories.thirdParty}
                    renderItem={(item, index) => (
                      <List.Item
                        actions={[
                          <Button
                            key="delete"
                            type="text"
                            size="small"
                            icon={<DeleteOutlined />}
                            onClick={() =>
                              removeRepository('thirdParty', index)
                            }
                            className="text-red-500"
                          />,
                        ]}
                      >
                        <div className="flex-1 truncate">
                          <Text className="text-sm">{item}</Text>
                        </div>
                      </List.Item>
                    )}
                  />
                </div>
              )}
            </div>

            <Divider />

            <Form.Item>
              <Space size="large">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                >
                  {t('submit_project.submit_button')}
                </Button>
                <Button size="large" onClick={() => form.resetFields()}>
                  {t('submit_project.reset_button')}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default SubmitProject;
