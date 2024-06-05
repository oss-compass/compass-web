import React, { useState } from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import type { CommitDetail } from '@oss-compass/graphql';
import {
  Button,
  InputNumber,
  Radio,
  Form,
  Input,
  Select,
  Row,
  Col,
  Upload,
} from 'antd';
import type { FormProps } from 'antd';
import { PlusOutlined, ExclamationCircleTwoTone } from '@ant-design/icons';
import { useRouter } from 'next/router';
import EvaluationDetail from '@modules/oh/components/EvaluationInfo/EvaluationDetail';

const SelectionEvaluation = () => {
  const router = useRouter();
  const queryType = router.query?.type as string;

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

  let listItem = [
    {
      label: '官网地址',
      span: 2,
      children: '192.168.1.100',
    },
    {
      label: '源码地址',
      span: 2,
      children: 'https://github.com/example/project',
    },
    {
      label: '开发商',
      span: 2,
      children: '某公司',
    },
    {
      label: '代码量',
      span: 2,
      children: '10000 行',
    },
    {
      label: '主语言类型',
      span: 2,
      children: 'Java',
    },
    {
      label: '版本发布日期',
      span: 2,
      children: '2023-05-01',
    },
    {
      label: '版本描述',
      span: 4,
      children: '此版本优化了性能和用户体验',
    },
  ];
  return (
    <>
      <div className="flex flex-col justify-center py-4 px-5">
        <div className="mb-5 flex items-start gap-2 border border-[#91d5ff] bg-[#e6f7ff] px-3 py-2 text-xs leading-5">
          <ExclamationCircleTwoTone rev={undefined} className="mt-1" />
          <div>
            数据补全说明：若字段左侧出现符号，表示该字段信息为系统自动带出；若字段值左上角标示蓝色角标，表示该字段信息当前与版本火车或社区信息不一致，建议关注；
            “发布日期、“代码量”、“Copyright”已取消必填，若选型申请环节未填写，软件上车后数据治理团队/工具会自动补齐，并可在软件商城软件详情页进行查询
          </div>
        </div>

        {queryType === '孵化选型评审' ? (
          <>
            <Descriptions className="oh" bordered items={listItem} />
            <div className="my-6 text-base font-semibold">选型评估信息</div>
            <EvaluationDetail />
            <div className="my-6 text-base font-semibold">审核信息</div>
            <Form
              form={form}
              labelCol={{
                span: 6,
                style: { fontWeight: 'bold' },
              }}
              style={{
                width: '100%',
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Col span={24}>
                <Form.Item
                  labelCol={{
                    span: 3,
                    style: { fontWeight: 'bold' },
                  }}
                  label="审核结论"
                  name="commitHash"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Radio.Group>
                    <Radio value="apple"> 通过 </Radio>
                    <Radio value="pear"> 驳回 </Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  labelCol={{
                    span: 3,
                    style: { fontWeight: 'bold' },
                  }}
                  label="审核意见"
                  name="commitHash"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Form>
          </>
        ) : (
          <Form
            form={form}
            labelCol={{ span: 6, style: { fontWeight: 'bold' } }}
            style={{
              width: '100%',
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="mb-6 text-base font-semibold">软件基础信息</div>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="官网地址"
                  name="commitHash"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="源码地址"
                  name="commitHash1"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="开发商"
                  name="commitHash"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="代码量"
                  name="commitHash1"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
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
                  label="版本发布日期"
                  name="commitHash1"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  labelCol={{ span: 3, style: { fontWeight: 'bold' } }}
                  label="版本描述"
                  name="commitHash"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
            {/* <div className="mb-6 text-base font-semibold">选型评估信息</div>
            <EvaluationDetail /> */}
          </Form>
        )}
      </div>
    </>
  );
};

export default SelectionEvaluation;
