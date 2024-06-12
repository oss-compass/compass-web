import React, { useState } from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import type { CommitDetail } from '@oss-compass/graphql';
import { Button, Form, Input, Select, Timeline, Space } from 'antd';
import type { FormProps } from 'antd';

const ApproveDetail = ({ commitInfo, setOpenConfirm }) => {
  const items: DescriptionsProps['items'] = [
    {
      key: '7',
      label: 'commit 新增代码量',
      span: 3,
      children: <>12 修改为 22</>,
    },
    {
      key: '8',
      span: 3,
      label: 'commit 删除代码量',
      children: '23 修改为 33',
    },
    {
      key: '9',
      label: '修改代码量 (增 + 删)',
      children: '35 修改为 55',
    },
    // {
    //   key: '9',
    //   label: '修改代码量 (增 + 删)',
    //   children: '35 修改为 55',
    //   span: 3,
    // },
  ];
  const { TextArea } = Input;
  const { Option } = Select;
  // const [openConfirm, setOpenConfirm] = useState(false);
  const onFinish: FormProps<CommitDetail>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<CommitDetail>['onFinishFailed'] = (
    errorInfo
  ) => {
    // console.log('Failed:', errorInfo);
  };
  const onGenderChange = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };

  const [form] = Form.useForm();
  form.setFieldsValue({ cause: '', verifier: '' });

  const TimelineItem = [
    {
      color: 'green',
      children: 'Create a services site 2015-09-01',
    },
    {
      color: 'green',
      children: 'Create a services site 2015-09-01',
    },
    {
      color: 'red',
      children: (
        <>
          <p>Solve initial network problems 1</p>
          <p>Solve initial network problems 2</p>
          <p>Solve initial network problems 3 2015-09-01</p>
        </>
      ),
    },
    // {
    //   children: (
    //     <>
    //       <p>Technical testing 1</p>
    //       <p>Technical testing 2</p>
    //       <p>Technical testing 3 2015-09-01</p>
    //     </>
    //   ),
    // },
    // {
    //   color: 'gray',
    //   children: (
    //     <>
    //       <p>Technical testing 1</p>
    //       <p>Technical testing 2</p>
    //       <p>Technical testing 3 2015-09-01</p>
    //     </>
    //   ),
    // },
  ];
  return (
    <div className="">
      <div className="my-4 text-base">申诉详情</div>
      <Descriptions title="" bordered items={items} />
      {/* <div className="my-4 text-lg">审核日志</div>
      <Timeline items={TimelineItem} /> */}
      {/* <div className="my-6 flex text-xl">
        <div>审批意见：</div>
        <TextArea />
      </div> */}
      <div className="my-4"></div>

      <Form
        form={form}
        layout="vertical"
        // labelCol={{ flex: '100px' }}
        // wrapperCol={{ flex: 'auto' }}
        // style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="审批意见" name="cause" rules={[{ required: true }]}>
          <TextArea />
        </Form.Item>

        <Form.Item label="结论" name="verifier" rules={[{ required: true }]}>
          <Select onChange={onGenderChange}>
            <Option value="female">通过</Option>
            <Option value="other">驳回</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                setOpenConfirm(false);
              }}
            >
              提交
            </Button>
            <Button
              htmlType="reset"
              onClick={() => {
                setOpenConfirm(false);
              }}
            >
              取消
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ApproveDetail;
