import React, { useState } from 'react';
import { Table, Form, Input, Button, Spin } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export interface ApiParameter {
  name: string;
  required: boolean;
  type: string;
  description?: string;
  default?: any;
}

const constructUrl = (path: string, values: any) => {
  return path.replace(/\{([^}]+)\}/g, (_, key) => values[key] || `:${key}`);
};

const ParamsTableWithForm = ({
  method,
  path,
  params,
}: {
  method: string;
  path: string;
  params: ApiParameter[];
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleTest = async (values: any) => {
    setLoading(true);
    setTestResult(null);
    try {
      const config = {
        method: method.toLowerCase(),
        url: constructUrl(path, values),
        data: method === 'POST' ? values : null,
        params: method === 'GET' ? values : null,
      };

      const response = await axios(config);
      setTestResult({ status: response.status, data: response.data });
    } catch (error) {
      setTestResult({
        status: error.response?.status || 500,
        data: error.response?.data || { error: 'Request failed' },
      });
    } finally {
      setLoading(false); // 结束加载
    }
  };

  return (
    <Form form={form} onFinish={handleTest} layout="vertical">
      <div className="mt-4">
        <h3 className="mb-4 text-lg font-semibold">
          {t('open_api:parameters')}
        </h3>

        {/* 参数表格 */}
        <Table
          bordered
          size="small"
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              width: 200,
              render: (_, record) => (
                <div className="flex items-center">
                  <span className="mr-1">{record.name}</span>
                  {record.required && <span className="text-red-500">*</span>}
                </div>
              ),
            },
            {
              title: 'Test Input',
              key: 'input',
              render: (_, record) => (
                <Form.Item
                  name={record.name}
                  rules={[{ required: record.required }]}
                  style={{ margin: 0 }}
                >
                  <Input
                    placeholder={`${record.type}${
                      record.required ? ' (required)' : ''
                    }`}
                    defaultValue={record?.default}
                  />
                </Form.Item>
              ),
              width: 250,
            },
            {
              title: 'Description',
              dataIndex: 'description',
              key: 'description',
              ellipsis: true,
            },
            {
              title: 'Example',
              dataIndex: 'example',
              key: 'example',
              ellipsis: true,
            },
          ]}
          dataSource={params}
          pagination={false}
          rowKey="name"
        />

        {/* 操作按钮和结果展示 */}
        <div className="mt-4 flex w-full flex-col gap-4">
          <div>
            <Button type="primary" htmlType="submit" loading={loading}>
              {t('open_api:send_request')}
            </Button>
          </div>
          {loading && (
            <div className="flex flex-1 justify-center overflow-auto rounded bg-gray-50 p-8">
              <Spin size="large" />
            </div>
          )}
          {testResult && (
            <div className="w-full flex-1 overflow-auto rounded bg-gray-50 p-4">
              <pre className="text-xs">
                {JSON.stringify(testResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </Form>
  );
};

export default ParamsTableWithForm;
