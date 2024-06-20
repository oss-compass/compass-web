import React, { useState } from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import type { CommitDetail } from '@oss-compass/graphql';
import dayjs from 'dayjs';
import {
  message,
  Button,
  InputNumber,
  Radio,
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Collapse,
} from 'antd';
import type { FormProps } from 'antd';
import { DownOutlined, ExclamationCircleTwoTone } from '@ant-design/icons';
import {
  procseeActions,
  getProceedingState,
} from '@modules/oh/DataView/HatchingTreatment/OutProcess/OutProcessState';

import EvaluationDetail from '@modules/oh/components/EvaluationInfo/EvaluationDetail';

const SelectionEvaluation = () => {
  const processesID = '孵化准出 QA 预审';
  let isProceedingProcesses = getProceedingState().id === processesID;
  const [commitInfo, setOpenConfirm] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const submit = () => {
    form.validateFields().then((values) => {
      setSubmitLoading(true);
      setTimeout(() => {
        messageApi.open({
          type: 'success',
          content: '提交成功',
        });
        setSubmitLoading(false);
        procseeActions.setNextProcsee(processesID);
      }, 1000);
      console.log(values);
    });
  };
  const [label, setLabel] = useState(false);
  const [form] = Form.useForm();
  const autoFill = (report) => {
    form.setFieldsValue({
      softwareName: report || 'luajava',
      domain: '工具 (Tools)',
      softwareVersion: '1.0.0',
      releaseDate: dayjs('2020-01-01'),
      developer: 'ABC Company',
      websiteUrl: 'https://example.com',
      selectionReason: '该软件具有优秀的性能表现和易用性',
      codeRepositoryUrl: 'https://github.com/jasonsantos/luajava',
      programmingLanguage: 'Python',
      codeSize: '10000 行',
      integrationMethod: '适配',
      sigName: '数据压缩算法',
      sigDescription: '数据压缩算法 SIG 描述',
      newRepositoryPath: '/data-compression-algorithm',
      committers: 'John Doe, Jane Smith',
      repositoryDescription: '该仓库用于存储数据压缩算法相关代码',
      incubationTime: dayjs('2022-01-01'),
    });
  };
  autoFill(null);
  return (
    <>
      <div className="flex flex-col justify-center py-4 px-5">
        {/* <div className="mb-5 flex items-start gap-2 border border-[#91d5ff] bg-[#e6f7ff] px-3 py-2 text-xs leading-5">
          <ExclamationCircleTwoTone rev={undefined} className="mt-1" />
          <div>
            数据补全说明：若字段左侧出现符号，表示该字段信息为系统自动带出；若字段值左上角标示蓝色角标，表示该字段信息当前与版本火车或社区信息不一致，建议关注；
            “发布日期、“代码量”、“Copyright”已取消必填，若选型申请环节未填写，软件上车后数据治理团队/工具会自动补齐，并可在软件商城软件详情页进行查询
          </div>
        </div> */}
        <Form
          form={form}
          labelCol={{ span: 6, style: { fontWeight: 'bold' } }}
          style={{
            width: '100%',
          }}
          autoComplete="off"
        >
          <div className="mb-6 text-base font-semibold">软件基础信息</div>
          <Form
            form={form}
            labelCol={{
              span: 6,
              style: { fontWeight: 'bold' },
            }}
            style={{
              width: '100%',
            }}
            disabled={true}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="软件名称"
                  name="softwareName"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input
                    suffix={
                      <DownOutlined
                        className="text-[#d9d9d9]"
                        rev={undefined}
                      />
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="SIG名称"
                  name="domain"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="仓库地址"
                  name="codeRepositoryUrl"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="孵化时长"
                  name="incubationTime"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <DatePicker placeholder="" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  labelCol={{
                    span: 3,
                    style: { fontWeight: 'bold' },
                  }}
                  label="申请背景"
                  name="selectionReason"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input.TextArea disabled={false} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div className="my-6 text-base font-semibold">软件评估信息</div>

          <div className="mb-4">
            <Collapse
              // defaultActiveKey={['1']}
              ghost
              onChange={() => {
                setLabel(false);
              }}
              items={[
                {
                  key: '1',
                  label: label
                    ? '点击收起软件评估报告'
                    : '点击展开软件评估报告',
                  children: <EvaluationDetail />,
                },
              ]}
            />
          </div>
        </Form>
        {isProceedingProcesses && (
          <>
            <div className="mb-6 text-base font-semibold">审核信息</div>
            <Form
              form={form}
              labelCol={{
                span: 6,
                style: { fontWeight: 'bold' },
              }}
              style={{
                width: '100%',
              }}
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
                    <Radio value="pass"> 通过 </Radio>
                    <Radio value="reject"> 驳回 </Radio>
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
                  name="comment "
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Form>
            <div className="fixed bottom-2 left-0 flex w-[100%] justify-center gap-2 border-t pt-2">
              <Button
                className="rounded-none"
                type="primary"
                loading={submitLoading}
                onClick={() => {
                  submit();
                }}
              >
                提交
              </Button>
              {/* <Button
            className="rounded-none"
            htmlType="submit"
            onClick={() => {
              recall();
            }}
          >
            撤回
          </Button> */}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SelectionEvaluation;
