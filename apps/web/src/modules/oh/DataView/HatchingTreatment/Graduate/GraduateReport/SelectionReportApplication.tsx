import React, { useState } from 'react';
import { Button, message, Form, Input, Select, Row, Col, Popover } from 'antd';
import dayjs from 'dayjs';
import {
  languagesList,
  adaptationMethodList,
  lifecyclePolicyList,
  domainList,
  queryKey,
} from '@modules/oh/constant';
import client from '@common/gqlClient';
import { useCreateTpcSoftwareGraduationReportMutation } from '@oss-compass/graphql';
import getErrorMessage from '@common/utils/getErrorMessage';
import HasOhRole from '@modules/oh/components/HasOhRole';
import useHasOhRole from '@modules/oh/hooks/useHasOhRole';

const SelectionReportApplication = () => {
  const { hasOhRole } = useHasOhRole();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const mutation = useCreateTpcSoftwareGraduationReportMutation(client, {
    onSuccess(data) {
      if (data.createTpcSoftwareGraduationReport.status == 'true') {
        messageApi.open({
          type: 'success',
          style: {
            marginTop: '200px',
          },
          content: '提交成功，可在毕业项目申请列表中查看报告状态！',
        });
        setTimeout(() => {
          window.location.hash = 'graduateTable?tab=1';
        }, 2000);
      } else {
        messageApi.open({
          type: 'error',
          style: {
            marginTop: '200px',
          },
          content: data.createTpcSoftwareGraduationReport.message,
        });
      }
    },
    onError(res) {
      messageApi.open({
        type: 'error',
        style: {
          marginTop: '200px',
        },
        content: getErrorMessage(res),
      });
    },
  });

  const submit = () => {
    form.validateFields().then((values) => {
      mutation.mutate({
        ...queryKey,
        softwareReport: { ...values },
      });
    });
  };
  const onReset = () => {
    form.resetFields();
  };
  const autoFill = () => {
    form.setFieldsValue({
      name: 'aeraki',
      tpcSoftwareSigId: 2,
      release: 'v1.0.0',
      releaseTime: dayjs('2020-01-01'),
      manufacturer: 'jasonsantos',
      websiteUrl: 'www.keplerproject.org/luajava/',
      codeUrl: 'https://github.com/aeraki-mesh/aeraki',
      upstreamCodeUrl: 'https://github.com/aeraki-mesh/aeraki',
      programmingLanguage: 'Java',
      lifecyclePolicy: 'asfdf',
      adaptationMethod: 'Java 库重写',
    });
  };
  return (
    <>
      {contextHolder}
      <div className="oh-tabs flex flex-col justify-center p-5">
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
          <div className="mb-6 pl-2 text-base font-semibold">软件基础信息</div>
          <Row gutter={24}>
            <Col span={12}>
              <Popover
                placement="topRight"
                content={
                  <>
                    <div>1.软件名称和其官网保持一致;</div>
                    <div>1.禁止以软件的子模块作为软件名;</div>
                  </>
                }
                title="规则"
                trigger="click"
              >
                <Form.Item
                  label="软件名称"
                  name="name"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input />
                </Form.Item>
              </Popover>
            </Col>
            <Col span={12}>
              <Form.Item
                label="所属领域"
                name="tpcSoftwareSigId"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Select>
                  {domainList.map(({ name, id }) => (
                    <Select.Option key={id} value={id}>
                      {name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="源码地址"
                name="codeUrl"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="编程语言"
                name="programmingLanguage"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Select>
                  {languagesList.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="适配方式"
                name="adaptationMethod"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Select disabled={false}>
                  {adaptationMethodList.map((item) => {
                    return (
                      <Select.Option key={item} value={item}>
                        {item}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="发布版本生命周期"
                name="lifecyclePolicy"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Select disabled={false}>
                  {lifecyclePolicyList.map((item) => {
                    return (
                      <Select.Option key={item} value={item}>
                        {item}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="上游源码地址" name="upstreamCodeUrl">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Popover
                placement="topRight"
                content={
                  <>
                    孵化软件适配、新增特性推荐回合上游社区，请提供在上游社区发起特性回合的
                    Issue/PR 链接。
                  </>
                }
                title="说明"
                trigger="click"
              >
                <Form.Item label="回合上游链接" name="roundUpstream">
                  <Input placeholder="提供在上游社区发起特性回合的Issue/PR链接" />
                </Form.Item>
              </Popover>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="fixed bottom-2 left-0 flex w-[100%] justify-center gap-2 border-t pt-2">
        <HasOhRole>
          <Button
            className="rounded-none"
            type="primary"
            loading={mutation.isLoading}
            disabled={!hasOhRole}
            onClick={() => {
              submit();
            }}
          >
            提交
          </Button>
        </HasOhRole>
        {/* <Button
          className="rounded-none"
          htmlType="submit"
          onClick={() => {
            autoFill();
          }}
        >
          自动填充
        </Button> */}
        <Button className="rounded-none" htmlType="button" onClick={onReset}>
          重置
        </Button>
      </div>
      {/* )} */}
    </>
  );
};

export default SelectionReportApplication;
