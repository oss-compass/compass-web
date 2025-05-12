import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const constructUrl = (path: string, values: any) => {
  return path.replace(/\{([^}]+)\}/g, (_, key) => values[key] || `:${key}`);
};
const APITestForm = ({ method, path, params }) => {
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
    <div className="mt-6 rounded bg-gray-50 p-4">
      <Form form={form} onFinish={handleTest} layout="vertical">
        <div className="grid grid-cols-2 gap-4">
          {params.map((param) => (
            <Form.Item
              key={param.name}
              label={param.name}
              name={param.name}
              rules={[{ required: param.required }]}
            >
              <Input
                placeholder={`${param.type}${
                  param.required ? ' (required)' : ''
                }`}
              />
            </Form.Item>
          ))}
        </div>
        <Button type="primary" htmlType="submit">
          {t('open_api:send_request')}
        </Button>
      </Form>

      {testResult && (
        <div className="mt-4 overflow-auto rounded bg-white p-4">
          <pre>{JSON.stringify(testResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
export default APITestForm;
