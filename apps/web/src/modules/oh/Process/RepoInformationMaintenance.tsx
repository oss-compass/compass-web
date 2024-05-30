import React, { useState } from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import type { CommitDetail } from '@oss-compass/graphql';
import {
  Button,
  InputNumber,
  Checkbox,
  Form,
  Input,
  Select,
  Row,
  Col,
} from 'antd';
import type { FormProps } from 'antd';
import MyTable from '@common/components/Table';

const RepoInformationMaintenance = () => {
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

  const columns = [
    {
      title: '操作',
      key: 'index',
      render: (text: string, record: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: '类型',
      dataIndex: 'linesAdded',
      key: 'linesAdded',
    },
    {
      title: '实体包下载地址',
      dataIndex: 'linesRemoved',
      key: 'linesRemoved',
    },
    {
      title: '实体包',
      key: 'linesChanged',
      dataIndex: 'linesChanged',
    },
  ];
  const tableData = [];
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
          <div className="mb-4 text-lg font-semibold">源码仓信息维护</div>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="源码仓初始化状态"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <div className="mt-1.5">未初始化</div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="仓库"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <div className="mt-1.5">通用区</div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="是否GIT托管"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="初始化类型"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <div className="mt-1.5">git</div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="社区源码托管地址"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="社区Tag/Commit ID"
                name="commitHash1"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                style={{ marginRight: 10 }}
                labelCol={{ span: 3 }}
                label="源码包下载地址"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                style={{ marginRight: 10 }}
                labelCol={{ span: 3 }}
                label="华为源码中心仓下载地址"
                name="commitHash1"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <div className="mb-4 text-lg font-semibold">仓库信息维护</div>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="主语言类型"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="仓库类型"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <div className="mb-4 text-lg font-semibold">实体包信息维护</div>
          <div className="">
            <Button>新增</Button>
            <Checkbox className="!ml-4">确定无二进制包</Checkbox>
            <Checkbox className="!ml-4">确定无源码包</Checkbox>
          </div>
          <div className="mt-4">
            <MyTable
              columns={columns}
              dataSource={tableData}
              rowKey={'key'}
              scroll={{ x: 'max-content' }}
            />
          </div>
        </Form>
        <div className="mt-10 flex justify-center gap-2">
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

export default RepoInformationMaintenance;
