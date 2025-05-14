// 修改后的 ParamsTableWithForm.tsx
import React from 'react';
import { Table, Form, Input, Button } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export interface ApiParameter {
  name: string;
  required: boolean;
  type: string;
  description?: string;
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
  const [testResult, setTestResult] = React.useState<any>(null);

  const handleTest = async (values: any) => {
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
                  />
                </Form.Item>
              ),
              width: 250,
            },
            {
              title: 'Type',
              dataIndex: 'type',
              key: 'type',
              width: 120,
            },
            {
              title: 'Description',
              dataIndex: 'description',
              key: 'description',
              ellipsis: true,
            },
          ]}
          dataSource={params}
          pagination={false}
          rowKey="name"
        />

        {/* 操作按钮和结果展示 */}
        <div className="mt-4 flex flex-col gap-4">
          <div>
            <Button type="primary" htmlType="submit">
              {t('open_api:send_request')}
            </Button>
          </div>
          {testResult && (
            <div className="flex-1 overflow-auto rounded bg-gray-50 p-4">
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
