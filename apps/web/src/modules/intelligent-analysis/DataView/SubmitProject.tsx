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

const { TextArea } = Input;
const { Text, Paragraph } = Typography;

interface ProjectFormData {
  projectName: string;
  description?: string;
  mainRepositories: string[];
  thirdPartyRepositories: string[];
}

const SubmitProject: React.FC = () => {
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
      message.success('项目提交成功！我们会在3个工作日内审核您的项目。');
      form.resetFields();
      setRepositories({ main: [], thirdParty: [] });
      setBatchInputText({ main: '', thirdParty: '' });
    } catch (error) {
      message.error('提交失败，请稍后重试');
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
        message.success(`成功导入 ${repositories.length} 个仓库地址`);
      } catch (error) {
        message.error('JSON文件格式错误，请检查文件内容');
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
      message.warning('请输入有效的仓库地址（以http://或https://开头）');
      return;
    }

    setRepositories((prev) => ({
      ...prev,
      [type]: [...prev[type], ...urls],
    }));

    // 清空文本域
    setBatchInputText((prev) => ({ ...prev, [type]: '' }));
    message.success(`成功添加 ${urls.length} 个仓库地址`);
  };

  const removeRepository = (type: 'main' | 'thirdParty', index: number) => {
    setRepositories((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
    message.success('已删除仓库地址');
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
          <h1 className="text-2xl font-bold text-gray-900">提交项目</h1>
          <p className="mt-2 text-gray-600">请填写项目基本信息和仓库地址</p>
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
                  项目名称 <span className="text-red-500">*</span>
                </span>
              }
              name="projectName"
              rules={[
                { required: true, message: '请输入项目名称' },
                { min: 2, message: '项目名称至少2个字符' },
                { max: 50, message: '项目名称不能超过50个字符' },
              ]}
            >
              <Input
                placeholder="请输入项目名称，如：我的移动应用项目"
                size="large"
              />
            </Form.Item>

            {/* 项目描述 - 选填 */}
            <Form.Item
              label={<span className="font-medium">项目描述</span>}
              name="description"
              extra="选填：简要描述项目的功能、特点和技术栈"
            >
              <TextArea
                rows={3}
                placeholder="请详细描述您的项目功能、特点和技术栈，如：这是一个基于React Native开发的电商移动应用..."
                maxLength={500}
                showCount
              />
            </Form.Item>

            <Divider />

            {/* 主仓库地址 */}
            <div className="mb-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-base font-medium">主仓库地址</span>
                <Upload {...jsonUploadProps('main')}>
                  <Button icon={<UploadOutlined />} size="small">
                    导入JSON
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
                  添加到列表
                </Button>
              </div>

              {/* 仓库列表显示 */}
              {repositories.main.length > 0 && (
                <div className="mb-4">
                  <div className="mb-2">
                    <Text className="font-medium">
                      已添加的主仓库 ({repositories.main.length})
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
                <span className="text-base font-medium">三方库仓库地址</span>
                <Upload {...jsonUploadProps('thirdParty')}>
                  <Button icon={<UploadOutlined />} size="small">
                    导入JSON
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
                  添加到列表
                </Button>
              </div>

              {/* 仓库列表显示 */}
              {repositories.thirdParty.length > 0 && (
                <div className="mb-4">
                  <div className="mb-2">
                    <Text className="font-medium">
                      已添加的三方库仓库 ({repositories.thirdParty.length})
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
                  提交项目
                </Button>
                <Button size="large" onClick={() => form.resetFields()}>
                  重置表单
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
