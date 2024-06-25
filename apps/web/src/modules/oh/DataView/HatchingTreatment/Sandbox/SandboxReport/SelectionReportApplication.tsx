import React, { useState } from 'react';
import { Button, message, Form, Input, Select, Row, Col, Popover } from 'antd';
import dayjs from 'dayjs';
import DatePicker from '@common/components/Form';
import { languagesList, domainList, queryKey } from '@modules/oh/constant';
import client from '@common/gqlClient';
import { useCreateTpcSoftwareSelectionReportMutation } from '@oss-compass/graphql';

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
          content: '提交成功，可在沙箱项目申请列表中查看报告状态！',
        });
        setTimeout(() => {
          window.location.hash = 'sandboxTable?tab=1';
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
        type: 'success',
        style: {
          marginTop: '200px',
        },
        content: '提交成功，可在沙箱项目申请列表中查看报告状态！',
      });
      setTimeout(() => {
        window.location.hash = 'sandboxTable?tab=1';
      }, 2000);
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
          <div className="mb-6 text-base font-semibold">软件基础信息</div>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="软件名称"
                name="name"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
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
              <Popover
                placement="topRight"
                content={
                  <>
                    <div>
                      1. master 是分支，不是版本号，不能用 master
                      作为版本号引入；
                    </div>
                    <div>
                      2. 引入官方发布版本（Release 版本），非正式版本（beta
                      等）未经过全面测试，不允许入库；
                    </div>
                  </>
                }
                title="规则"
                trigger="click"
              >
                <Form.Item
                  label="软件版本号"
                  name="release"
                  rules={[{ validator: versionValidator }]}
                >
                  <Input />
                </Form.Item>
              </Popover>
            </Col>
            <Col span={12}>
              <Form.Item label="版本发布日期" name="releaseTime">
                <DatePicker placeholder="请选择日期" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="开发商"
                name="manufacturer"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Popover
                placement="topRight"
                content={
                  <>
                    <div>
                      提供引入软件官方网址，无正式官网则提供主流代码托管商（github、gitee
                      等）对应项目托管地址
                    </div>
                  </>
                }
                title="规则"
                trigger="click"
              >
                <Form.Item
                  label="官网地址"
                  name="websiteUrl"
                  rules={[
                    {
                      required: true,
                      message: '请输入!',
                    },
                    { type: 'url', message: '请输入有效的官网地址!' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Popover>
            </Col>
          </Row>
          <Row gutter={24}>
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
              <Form.Item label="漏洞响应机制" name="bugPublish2">
                <Input placeholder="非必填" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="漏洞披露机制" name="bugPublish1">
                <Input placeholder="非必填" />
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
        <Button
          className="rounded-none"
          htmlType="submit"
          onClick={() => {
            autoFill();
          }}
        >
          自动填充
        </Button>
        <Button className="rounded-none" htmlType="button" onClick={onReset}>
          重置
        </Button>
      </div>
      {/* )} */}
    </>
  );
};

export default SelectionReportApplication;
