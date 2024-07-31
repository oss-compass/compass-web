import React, { useState } from 'react';
import { Button, message, Form, Input, Select, Row, Col, Popover } from 'antd';
import dayjs from 'dayjs';
import {
  languagesList,
  adaptationMethodList,
  domainList,
  queryKey,
} from '@modules/oh/constant';
import client from '@common/gqlClient';
import { useCreateTpcSoftwareSelectionReportMutation } from '@oss-compass/graphql';
import getErrorMessage from '@common/utils/getErrorMessage';

const SelectionReportApplication = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const mutation = useCreateTpcSoftwareSelectionReportMutation(client, {
    onSuccess(data) {
      if (data.createTpcSoftwareSelectionReport.status == 'true') {
        messageApi.open({
          type: 'success',
          style: {
            marginTop: '200px',
          },
          content: '提交成功，可在毕业项目申请列表中查看报告状态！',
        });
        setTimeout(() => {
          window.location.hash = 'hatchTable?tab=1';
        }, 2000);
      } else {
        messageApi.open({
          type: 'error',
          style: {
            marginTop: '200px',
          },
          content: data.createTpcSoftwareSelectionReport.message,
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
        reportType: 0,
        softwareReport: { ...values },
      });
    });
  };
  const onReset = () => {
    form.resetFields();
  };
  const autoFill = () => {
    form.setFieldsValue({
      name: 'luajava',
      tpcSoftwareSigId: 2,
      release: 'v1.0.0',
      releaseTime: dayjs('2020-01-01'),
      manufacturer: 'jasonsantos',
      websiteUrl: 'www.keplerproject.org/luajava/',
      codeUrl: 'https://github.com/jasonsantos/luajava',
      programmingLanguage: 'Java',
    });
  };
  const websiteValidator = (_, value) => {
    if (
      !value ||
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/.test(
        value
      )
    ) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('请输入一个有效的网站 URL'));
  };
  const versionValidator = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('请输入版本号'));
    }

    // 检查是否为 master 分支
    if (value.toLowerCase() === 'master') {
      return Promise.reject(new Error('版本号不能使用 "master"'));
    }
    if (
      /beta/i.test(value.toLowerCase()) ||
      /alpha/i.test(value.toLowerCase())
    ) {
      return Promise.reject(new Error('版本号不能使用非正式版本 "beta" 等'));
    }

    return Promise.resolve();
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
          // disabled={!isProceedingProcesses}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
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
                label="上游源码地址"
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
                label="生命周期策略说明"
                name="adaptationMethod"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input placeholder="提供项目Release版本生命周期维护策略文档、说明链接" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="fixed bottom-2 left-0 flex w-[100%] justify-center gap-2 border-t pt-2">
        <Button
          className="rounded-none"
          type="primary"
          loading={mutation.isLoading}
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
