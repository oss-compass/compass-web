import React, { useState } from 'react';
import { Button, message, Form, Input, Select, Row, Col, Popover } from 'antd';
import DatePicker from '@common/components/Form';
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useSnapshot } from 'valtio';

let yList = [
  'RN 框架 (React Native)',
  'Flutter 框架 (Flutter)',
  '动画 (Animation)',
  '网络及协议 (Networking&Protocol)',
  '加解密 (Encryption)',
  '数据库 (Database)',
  '文件及解析 (Files&Parsing)',
  '多媒体 (Media)',
  '图片 (Image)',
  '图形 (Graphics)',
  '人工智能 (AI)',
  '工具 (Tools)',
  '数学及算法 (Math&Algorithm)',
  '架构及模式 (Architecture&Patterns)',
  '日志及调试 (Logging&Debugging)',
  '辅助实用 (Utility)',
];
const SelectionApplication = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const submit = () => {
    form.validateFields().then((values) => {
      setSubmitLoading(true);
      setTimeout(() => {
        messageApi.open({
          type: 'success',
          style: {
            marginTop: '200px',
          },
          content: '提交成功，报告生成后将会邮件通知您！',
        });
        values.time = new Date().toLocaleString();
        window.sessionStorage.setItem(
          values.softwareName,
          JSON.stringify(values)
        );
        setTimeout(() => {
          window.location.hash = 'work?key=1&name=' + values.softwareName;
        }, 1000);
        setSubmitLoading(false);
      }, 1000);
    });
  };
  const onReset = () => {
    form.resetFields();
  };
  const autoFill = () => {
    form.setFieldsValue({
      softwareName: 'luajava',
      domain: '工具 (Tools)',
      softwareVersion: 'v1.0.0',
      releaseDate: dayjs('2020-01-01'),
      developer: 'jasonsantos',
      websiteUrl: 'www.keplerproject.org/luajava/',
      selectionReason:
        '游戏中心使用 LuaJava 进行 lua 与 java 间的调用。该工具的目标是允许用 Lua 编写的脚本操作用 Java 开发的组件。LuaJava 允许使用与访问 Lua 原生对象相同的语法从 Lua 访问 Java 组件，而无需任何声明或任何形式的预处理。OH 目前没有支持 lua 层到 arkTS 之间的调用。需要将该开源库进行 OpenHarmony 移植适配',
      codeRepositoryUrl: 'https://github.com/jasonsantos/luajava',
      programmingLanguage: 'Java',
      codeSize: '10000 行',
      integrationMethod: '适配',
      sigName: '工具 (Tools)',
      sigDescription: '开发相关工具',
      newRepositoryPath: 'luajava',
      committers: 'jasonsantos,talklittle,hishamhm',
      repositoryDescription:
        '该工具的目标是允许用 Lua 编写的脚本操作用 Java 开发的组件。LuaJava 允许使用与访问 Lua 原生对象相同的语法从 Lua 访问 Java 组件，而无需任何声明或任何形式的预处理。',
      incubationTime: dayjs('2024-06-18'),
      bugPublish: 'https://github.com/jasonsantos/luajava/issues',
      time: new Date().toLocaleString(),
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
      <div className="oh-tabs flex flex-col justify-center py-4 px-5">
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
                name="softwareName"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="所属SIG"
                name="domain"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Select>
                  {yList.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
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
                  name="softwareVersion"
                  rules={[{ validator: versionValidator }]}
                >
                  <Input />
                </Form.Item>
              </Popover>
            </Col>
            <Col span={12}>
              <Form.Item label="版本发布日期" name="releaseDate">
                <DatePicker placeholder="请选择日期" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="开发商"
                name="developer"
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
          {/* <div className="mb-6 text-base font-semibold">软件源码信息</div> */}
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="源码地址"
                name="codeRepositoryUrl"
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
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="漏洞披露机制"
                name="bugPublish"
                rules={[
                  {
                    required: true,
                    message: '请输入!',
                  },
                  { type: 'url', message: '请输入有效的漏洞披露地址!' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            {/* <Col span={12}>
              <Form.Item
                label="代码量"
                name="codeSize"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="引入方式"
                name="integrationMethod"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Select>
                  <Select.Option value="适配">适配</Select.Option>
                  <Select.Option value="重写">重写</Select.Option>
                </Select>
              </Form.Item>
            </Col> */}
          </Row>
          {/* <div className="mb-6 text-base font-semibold">仓库信息维护</div>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="SIG 名称"
                name="sigName"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <div className="mt-1.5">数据压缩算法</div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="SIG 描述"
                name="sigDescription"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <div className="mt-1.5">数据压缩算法 SIG 描述</div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="新建仓路径"
                name="newRepositoryPath"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input addonBefore="https://gitee.com/openharmony-tpc/ohos_" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Commiters"
                name="committers"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="仓描述"
                name="repositoryDescription"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="孵化时间"
                name="incubationTime"
                rules={[{ required: true, message: '请选择!' }]}
              >
                <DatePicker placeholder="请选择日期" />
              </Form.Item>
            </Col>
          </Row> */}
        </Form>
      </div>
      {/* {isProceedingProcesses && ( */}
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

export default SelectionApplication;
