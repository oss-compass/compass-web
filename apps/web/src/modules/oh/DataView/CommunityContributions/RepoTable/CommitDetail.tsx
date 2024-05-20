import React, { useState } from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import type { CommitDetail } from '@oss-compass/graphql';
import { Button, InputNumber, Form, Input, Select } from 'antd';
import type { FormProps } from 'antd';

const CommitDetails = ({ commitInfo }) => {
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Commit Hash',
      children: commitInfo['commitHash'],
      span: 3,
    },
    {
      key: '2',
      label: '关联 PR',
      children: commitInfo['prUrl'],
      span: 3,
    },
    {
      key: '3',
      label: '仓库',
      children: commitInfo['repoName'],
      span: 3,
    },
    {
      key: '4',
      label: '日期',
      children: commitInfo['grimoireCreationDate'],
      span: 3,
    },
    {
      key: '5',
      label: '提交人',
      children: commitInfo['authorEmail'],
      span: 3,
    },
    {
      key: '6',
      label: '组织',
      children: commitInfo['orgName'],
      span: 3,
    },
    {
      key: '7',
      label: 'commit 新增代码量',
      children: commitInfo['linesAdded'],
      span: 3,
    },
    {
      key: '8',
      label: 'commit 删除代码量',
      children: commitInfo['linesRemoved'],
      span: 3,
    },
    {
      key: '9',
      label: '修改代码量 (增 + 删)',
      children: commitInfo['linesChanged'],
      span: 3,
    },
  ];

  const [openConfirm, setOpenConfirm] = useState(false);
  const onFinish: FormProps<CommitDetail>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<CommitDetail>['onFinishFailed'] = (
    errorInfo
  ) => {
    // console.log('Failed:', errorInfo);
  };
  const [form] = Form.useForm();
  form.setFieldsValue(commitInfo);
  return (
    <>
      {openConfirm ? (
        <div>
          <div className="mb-6 text-xl">Commit 申诉</div>
          <Form
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Commit Hash"
              name="commitHash"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input disabled={true} />
            </Form.Item>
            <Form.Item
              label="仓库"
              name="repoName"
              rules={[{ required: true }]}
            >
              <Input disabled={true} />
            </Form.Item>
            <Form.Item
              label="关联 PR"
              name="prUrl"
              rules={[{ required: true }]}
            >
              <Input disabled={true} />
            </Form.Item>

            <Form.Item
              label="commit 日期"
              name="grimoireCreationDate"
              rules={[{ required: true }]}
            >
              <Input disabled={true} />
            </Form.Item>

            <Form.Item
              label="提交人"
              name="authorEmail"
              rules={[{ required: true }]}
            >
              <Input disabled={true} />
            </Form.Item>

            <Form.Item label="组织" name="orgName" rules={[{ required: true }]}>
              <Input disabled={true} />
            </Form.Item>

            <Form.Item
              label="新增代码量"
              name="linesAdded"
              rules={[{ required: true, message: 'Please input!' }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="删除代码量"
              name="linesRemoved"
              rules={[{ required: true, message: 'Please input!' }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="修改代码量"
              name="linesChanged"
              rules={[{ required: true, message: 'Please input!' }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="贡献者"
              name="contributor"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="联系方式"
              name="contact "
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="申诉原因"
              name="cause"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="审核人"
              name="verifier"
              rules={[{ required: true }]}
            >
              <Select />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <div className="">
          <div className="mb-4 text-xl">Commit 详情</div>
          <Descriptions title="" bordered items={items} />
          <div className="mt-6 mb-4 text-center">
            对结果有异议？请点击
            <span
              onClick={() => {
                setOpenConfirm(true);
              }}
              className="cursor-pointer text-[#3e8eff] underline"
            >
              这里
            </span>
            进行申述
          </div>
        </div>
      )}
    </>
  );
};

export default CommitDetails;
