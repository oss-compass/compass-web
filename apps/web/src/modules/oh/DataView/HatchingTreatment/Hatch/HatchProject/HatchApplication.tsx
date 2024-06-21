import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import { Button, message, Form, Input, Select, Row, Col, Popover } from 'antd';
import Dialog from '@common/components/Dialog';
import DatePicker from '@common/components/Form';
import { ExclamationCircleTwoTone, DownOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import EvaluationDetail from '@modules/oh/components/EvaluationInfo/EvaluationDetail';
import SelectReport from '@modules/oh/components/SelectReport';
import { domainList } from '@modules/oh/constant';

const HatchApplication = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [report, setReport] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const submit = () => {
    form.validateFields().then((values) => {
      setSubmitLoading(true);
      setTimeout(() => {
        messageApi.open({
          style: {
            marginTop: '200px',
          },
          type: 'success',
          content: (
            <>
              提交成功，已在 Gitee 建立 Issue 跟踪，可点击
              <a
                className="text-[#1677ff]"
                href="https://gitee.com/openharmony-tpc/ImageKnife/issues"
                // _blank={true}
              >
                https://gitee.com/openharmony-tpc/ImageKnife/issues
              </a>
              查看 Issue,
            </>
          ),
        });
        setSubmitLoading(false);
        // procseeActions.setNextProcsee(processesID);
      }, 1000);
      console.log(values);
    });
  };
  const onReset = () => {
    form.resetFields();
  };
  const autoFill = (report) => {
    form.setFieldsValue({
      softwareName: report || 'jasonsantos/luajava',
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
      license: 'MIT',
      integrationMethod: '适配',
      sigName: '工具 (Tools)',
      sigDescription: '开发相关工具',
      newRepositoryPath: 'luajava',
      committers: 'jasonsantos,talklittle,hishamhm',
      repositoryDescription:
        '该工具的目标是允许用 Lua 编写的脚本操作用 Java 开发的组件。LuaJava 允许使用与访问 Lua 原生对象相同的语法从 Lua 访问 Java 组件，而无需任何声明或任何形式的预处理。',

      incubationTime: dayjs('2022-01-01'),
      bugPublish: 'https://github.com/jasonsantos/luajava/issues',
    });
  };
  return (
    <>
      {contextHolder}
      <div className="flex flex-col justify-center py-4 px-5">
        <Form
          form={form}
          labelCol={{
            span: 6,
            style: { fontWeight: 'bold' },
          }}
          style={{
            width: '100%',
          }}
          disabled={!report}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="mb-6 text-base font-semibold">软件基础信息</div>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="选择软件"
                name="softwareName"
                rules={[{ required: true, message: '请输入!' }]}
              >
                {
                  <Input
                    suffix={
                      <DownOutlined
                        className="text-[#d9d9d9]"
                        rev={undefined}
                      />
                    }
                    disabled={false}
                    onClick={() => {
                      setOpenConfirm(true);
                    }}
                    readOnly
                  ></Input>
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="所属领域"
                name="domain"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Select>
                  {domainList.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="软件版本"
                name="softwareVersion"
                // rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="版本发布日期"
                name="releaseDate"
                // rules={[{ required: true, message: '请输入!' }]}
              >
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
              <Form.Item
                label="官网地址"
                name="websiteUrl"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
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
                label="代码量"
                name="codeSize"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="License"
                name="license"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="漏洞披露机制" name="bugPublish">
                <Input disabled={false} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="漏洞响应机制" name="bugPublish">
                <Input disabled={false} />
              </Form.Item>
            </Col>
          </Row>
          <div className="mb-6 text-base font-semibold">仓库信息</div>
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
                  label="新建仓路径"
                  name="newRepositoryPath"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input
                    disabled={false}
                    onFocus={() => {}}
                    addonBefore="https://gitee.com/openharmony-tpc/ohos_"
                  />
                </Form.Item>
              </Popover>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Commiters"
                name="committers"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input disabled={false} />
              </Form.Item>
            </Col>
            {/* <Col span={12}>
              <Form.Item
                label="仓描述"
                name="repositoryDescription"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input  />
              </Form.Item>
            </Col> */}
            <Col span={12}>
              <Form.Item
                label="孵化时间"
                name="incubationTime"
                rules={[{ required: true, message: '请选择!' }]}
              >
                <DatePicker disabled={false} placeholder="请选择日期" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="引入方式"
                name="integrationMethod"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Select disabled={false}>
                  <Select.Option value="适配">适配</Select.Option>
                  <Select.Option value="重写">重写</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                labelCol={{
                  span: 3,
                  style: { fontWeight: 'bold' },
                }}
                label="需求背景"
                name="selectionReason"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input.TextArea disabled={false} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {report && (
          <>
            <div className="mb-6 text-base font-semibold">评估报告</div>
            <EvaluationDetail name={report} type={'edit'} />
          </>
        )}
      </div>
      <Dialog
        open={openConfirm}
        classes={{
          paper: classnames(
            'border w-[95%] !max-w-[95%] min-h-[400px] !m-0',
            'md:w-full md:h-full md:!m-0 md:!min-h-full md:border-none'
          ),
        }}
        dialogTitle={
          <>
            <p className="">选择软件</p>
            <div
              className="absolute right-6 top-4 cursor-pointer p-2"
              onClick={() => {
                setOpenConfirm(false);
              }}
            >
              <GrClose className="text-base" />
            </div>
          </>
        }
        dialogContent={
          <div className="w-full">
            <SelectReport
              getReport={(name) => {
                setOpenConfirm(false);
                setReport(name);
                autoFill(name);
              }}
            />
          </div>
        }
        handleClose={() => {
          setOpenConfirm(false);
        }}
      />
      <div className="fixed bottom-2 left-0 flex w-[100%] justify-center gap-2 border-t pt-2">
        <Button
          className="rounded-none"
          type="primary"
          loading={submitLoading}
          onClick={() => {
            submit();
          }}
        >
          提交申请
        </Button>
        <Button className="rounded-none">保存</Button>
        <Button
          className="rounded-none"
          htmlType="submit"
          onClick={() => {
            autoFill('');
          }}
        >
          自动填充
        </Button>
        <Button className="rounded-none" htmlType="button" onClick={onReset}>
          重置
        </Button>
      </div>
    </>
  );
};
export default HatchApplication;
