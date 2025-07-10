import React, { useState } from 'react';
import { Table, Form, Input, Button, Spin } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { getLocalizedText } from '@modules/dataHub/utils';

export interface ApiParameter {
  name: string;
  required: boolean;
  type: string;
  description?: string;
  default?: any;
  example?: any;
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
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 检查字符串是否为有效的 JSON
  const isValidJson = (str: string): boolean => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  // 获取参数的基本类型
  const getBaseType = (type: string): string => {
    return type.toLowerCase().split('<')[0].trim();
  };

  // 检查参数是否需要特殊处理
  const needsSpecialHandling = (type: string): boolean => {
    const baseType = getBaseType(type);
    return ['array', 'object', 'boolean', 'number'].includes(baseType);
  };

  // 处理数组类型的值
  const processArrayValue = (value: any): any => {
    if (typeof value !== 'string') return value;

    const trimmedValue = value.trim();
    // 检查是否已经是有效的JSON格式的数组字符串
    if (
      trimmedValue.startsWith('[') &&
      trimmedValue.endsWith(']') &&
      isValidJson(trimmedValue)
    ) {
      return JSON.parse(trimmedValue);
    }
    return value;
  };

  // 处理对象类型的值
  const processObjectValue = (value: any): any => {
    if (typeof value !== 'string') return value;

    const trimmedValue = value.trim();
    if (
      trimmedValue.startsWith('{') &&
      trimmedValue.endsWith('}') &&
      isValidJson(trimmedValue)
    ) {
      return JSON.parse(trimmedValue);
    }
    return value;
  };

  // 处理布尔类型的值
  const processBooleanValue = (value: any): any => {
    if (typeof value !== 'string') return value;

    const lowerValue = value.toLowerCase();
    if (lowerValue === 'true') return true;
    if (lowerValue === 'false') return false;
    return value;
  };

  // 处理数字类型的值
  const processNumberValue = (value: any): any => {
    if (typeof value !== 'string') return value;

    if (!isNaN(Number(value))) {
      return Number(value);
    }
    return value;
  };

  // 根据参数类型处理输入值的函数
  const processValueByType = (value: any, type: string): any => {
    // 如果值为空，直接返回
    if (value === undefined || value === null || value === '') {
      return value;
    }

    // 获取基本类型（处理如 'array<string>' 这样的复合类型描述）
    const baseType = getBaseType(type);

    // 根据类型处理值
    try {
      switch (baseType) {
        case 'array':
          return processArrayValue(value);
        case 'object':
          return processObjectValue(value);
        case 'boolean':
          return processBooleanValue(value);
        case 'number':
          return processNumberValue(value);
        default:
          return value;
      }
    } catch (e) {
      console.error(`Failed to parse value for type ${type}:`, e);
      return value; // 解析失败时返回原始值
    }
  };

  const handleTest = async (values: any) => {
    console.log(values);
    setLoading(true);
    setTestResult(null);

    // 创建一个副本以避免直接修改原始的 values 对象
    const processedValues = { ...values };

    // 根据参数类型处理每个输入值
    params.forEach((param) => {
      if (
        processedValues[param.name] !== undefined &&
        needsSpecialHandling(param.type)
      ) {
        const originalValue = processedValues[param.name];
        processedValues[param.name] = processValueByType(
          originalValue,
          param.type
        );

        // 添加调试日志，显示参数处理前后的变化
        if (originalValue !== processedValues[param.name]) {
          console.log(`参数 ${param.name} (${param.type}) 处理: `, {
            原始值: originalValue,
            处理后: processedValues[param.name],
            类型: typeof processedValues[param.name],
          });
        }
      }
    });

    try {
      const config = {
        method: method.toLowerCase(),
        url: constructUrl(path, processedValues), // 使用处理过的 processedValues
        data: method === 'POST' ? processedValues : null, // 使用处理过的 processedValues
        params: method === 'GET' ? processedValues : null, // 使用处理过的 processedValues
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
              render: (_, record) => (
                <span>
                  {getLocalizedText(record.description || '', i18n.language)}
                </span>
              ),
            },
            {
              title: 'Example',
              dataIndex: 'example',
              key: 'example',
              ellipsis: true,
              render: (_, record) => (
                <div className="flex items-center">
                  <span className="mr-1">
                    {' '}
                    {typeof record.example === 'string'
                      ? record.example
                      : JSON.stringify(record.example)}
                  </span>
                </div>
              ),
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
