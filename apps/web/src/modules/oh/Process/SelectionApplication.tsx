import React, { useState } from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import type { CommitDetail } from '@oss-compass/graphql';
import { Button, InputNumber, Form, Input, Select, Row, Col } from 'antd';
import type { FormProps } from 'antd';

const SelectionApplication = () => {
  const [commitInfo, setOpenConfirm] = useState({});
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
      <div className="my-6 flex flex-col justify-center">
        <Form
          form={form}
          labelCol={{ span: 6 }}
          style={{
            width: '100%',
            paddingLeft: 24,
            paddingRight: 24,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="所属领域"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="版本火车名称"
                name="commitHash1"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="软件名称"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="软件版本"
                name="commitHash1"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="软件所属开源组织"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="所属C-TMG"
                name="commitHash1"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 3 }}
                label="选型原因"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          {/* <Col span={24}>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button htmlType="submit">保存</Button>
              <Button htmlType="submit">置空</Button>
            </Form.Item>
          </Col> */}
        </Form>
        <div className="flex justify-center gap-2">
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="submit">保存</Button>
          <Button htmlType="submit">置空</Button>
        </div>
      </div>
    </>
  );
};

export default SelectionApplication;
