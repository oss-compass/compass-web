import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import { Button, message, Form, Input, Select, Row, Col, Space } from 'antd';
import Dialog from '@common/components/Dialog';
import {
  MinusCircleOutlined,
  PlusOutlined,
  DownOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import SelectReport from '@modules/oh/components/Report/SelectReport';
import {
  incubationTimeList,
  adaptationMethodList,
  queryKey,
} from '@modules/oh/constant';
import client from '@common/gqlClient';
import { useCreateTpcSoftwareSelectionMutation } from '@oss-compass/graphql';
import { openGiteeIssue } from '@modules/oh/utils';
import getErrorMessage from '@common/utils/getErrorMessage';
import ReportPageItem from '@modules/oh/components/Report/ReportPageItem';

const SelectionApplication = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [report, setReport] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();
  const mutation = useCreateTpcSoftwareSelectionMutation(client, {
    onSuccess(data) {
      if (data.createTpcSoftwareSelection.status == 'true') {
        // let issueUrl = data.createTpcSoftwareSelection.issueUrl;
        messageApi.open({
          type: 'success',
          style: {
            marginTop: '150px',
          },
          content: (
            <>
              提交成功，即将跳转 Gitee，会自动生成 Issue
              模板，您只需点击按钮创建 Issue 即可
              {/* 提交成功，已在 Gitee 建立 Issue 跟踪，可点击
              <a className="text-[#1677ff]" href={issueUrl} target="_blank">
                {issueUrl}
              </a>
              查看 Issue, */}
            </>
          ),
        });
        setTimeout(() => {
          openGiteeIssue(report, form.getFieldsValue(true));
        }, 3000);
      } else {
        messageApi.open({
          type: 'error',
          style: {
            marginTop: '200px',
          },
          content: data.createTpcSoftwareSelection.message,
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
      console.log(values);
      const repoUrl = values.repoUrl.map((z) => z['repoUrl']);
      report &&
        mutation.mutate({
          ...queryKey,
          ...values,
          repoUrl,
          selectionType: 0,
          tpcSoftwareSelectionReportIds: report.map(
            (r) => r.tpcSoftwareReportMetric.tpcSoftwareReportId
          ),
        });
    });
  };
  const onReset = () => {
    form.resetFields();
    setReport([]);
  };
  const autoFill = (report) => {
    console.log(report);
    form.setFieldsValue({
      name: report?.name || 'jasonsantos/luajava',
      domain: report?.tpcSoftwareSig?.id || 1,
      release: report?.release || 'v1.0.0',
      releaseTime: dayjs(report?.releaseTime || '2020-01-01'),
      manufacturer: report?.manufacturer || 'jasonsantos',
      websiteUrl: report?.websiteUrl || 'www.keplerproject.org/luajava/',
      // '游戏中心使用 LuaJava 进行 lua 与 java 间的调用。该工具的目标是允许用 Lua 编写的脚本操作用 Java 开发的组件。LuaJava 允许使用与访问 Lua 原生对象相同的语法从 Lua 访问 Java 组件，而无需任何声明或任何形式的预处理。OH 目前没有支持 lua 层到 arkTS 之间的调用。需要将该开源库进行 OpenHarmony 移植适配',
      codeUrl: report?.codeUrl || 'https://github.com/jasonsantos/luajava',
      programmingLanguage: report?.programmingLanguage || 'Java',
      codeCount: report?.codeCount || '10000 行',
      bugPublish: 'https://github.com/jasonsantos/luajava/issues',

      adaptationMethod: 1,
      committers: 'jasonsantos,talklittle,hishamhm', //'jasonsantos,talklittle,hishamhm',
      reason:
        '该工具的目标是允许用 Lua 编写的脚本操作用 Java 开发的组件。LuaJava 允许使用与访问 Lua 原生对象相同的语法从 Lua 访问 Java 组件，而无需任何声明或任何形式的预处理。',
      repoDescription:
        '该工具的目标是允许用 Lua 编写的脚本操作用 Java 开发的组件。LuaJava 允许使用与访问 Lua 原生对象相同的语法从 Lua 访问 Java 组件，而无需任何声明或任何形式的预处理。',
      incubationTime: dayjs('2022-01-01'),
    });
  };
  let main = (
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
        <>
          <Col span={12} className="mt-4">
            <Form.Item
              label="选择软件"
              name="name"
              rules={[{ required: true, message: '请输入!' }]}
            >
              <Input
                suffix={
                  <DownOutlined className="text-[#d9d9d9]" rev={undefined} />
                }
                disabled={false}
                onClick={() => {
                  setOpenConfirm(true);
                }}
                readOnly
              ></Input>
            </Form.Item>
          </Col>
          {report.length > 0 && (
            <>
              <div className="mb-6 text-base font-semibold">仓库信息</div>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="选型验证时长"
                    name="incubationTime"
                    rules={[{ required: true, message: '请选择!' }]}
                  >
                    <Select disabled={false}>
                      {incubationTimeList.map((item) => {
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
                    label="引入方式"
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

                <Col span={24}>
                  <Form.Item
                    labelCol={{
                      span: 3,
                      style: { fontWeight: 'bold' },
                    }}
                    label="Commiters"
                    name="committers"
                    rules={[{ required: true, message: '请输入!' }]}
                  >
                    <Input
                      placeholder="需填写 Commiters 的 Gitee/Github 用户名，多个
                          Commiters 用逗号分开"
                      disabled={false}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="需求来源"
                    name="demandSource"
                    labelCol={{
                      span: 3,
                      style: { fontWeight: 'bold' },
                    }}
                    rules={[{ required: true, message: '请输入!' }]}
                  >
                    <Input
                      placeholder="请列出您需要使用三方软件的需求来源"
                      disabled={false}
                      onFocus={() => {}}
                      // addonBefore="https://gitee.com/openharmony-tpc/ohos_"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    labelCol={{
                      span: 3,
                      style: { fontWeight: 'bold' },
                    }}
                    label="需求描述"
                    name="reason"
                    rules={[{ required: true, message: '请输入!' }]}
                  >
                    <Input
                      placeholder="请列出您需要使用三方软件的主要场景"
                      disabled={false}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    labelCol={{
                      span: 3,
                      style: { fontWeight: 'bold' },
                    }}
                    label="功能描述"
                    name="functionalDescription"
                    rules={[{ required: true, message: '请输入!' }]}
                  >
                    <Input
                      placeholder="请列出您需要使用三方软件的主要功能"
                      disabled={false}
                    />
                  </Form.Item>
                </Col>

                <Form.List name="repoUrl" initialValue={[{ repoUrl: '' }]}>
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {/* <Col span={12}>
                        <Form.Item
                          label="适配仓路径"
                          name={['repoUrl', 'repoUrl']}
                          rules={[{ required: true, message: '请输入!' }]}
                        >
                          <Space.Compact style={{ width: '100%' }}>
                            <Input
                              placeholder="填写完成 OH 适配后的仓库路径"
                              disabled={false}
                            />
                            <Button
                              className="rounded-none pt-0"
                              type="primary"
                              onClick={() => add()}
                            >
                              <PlusOutlined rev={undefined} />
                            </Button>
                          </Space.Compact>
                        </Form.Item>
                      </Col> */}
                      {fields.map((field, index) => (
                        <Col span={12} key={field.key}>
                          <Form.Item
                            label={`适配仓路径${index ? index + 1 : ''}`}
                            key={field.key}
                            name={[field.name, 'repoUrl']}
                            rules={[{ required: true, message: '请输入!' }]}
                          >
                            <Space.Compact style={{ width: '100%' }}>
                              <Input
                                placeholder="填写完成 OH 适配后的仓库路径"
                                disabled={false}
                              />
                              {index === 0 ? (
                                <Button
                                  className="rounded-none pt-0"
                                  type="primary"
                                  onClick={() => add()}
                                >
                                  <PlusOutlined rev={undefined} />
                                </Button>
                              ) : (
                                <Button
                                  className="dynamic-delete-button rounded-none pt-0"
                                  onClick={() => remove(field.name)}
                                >
                                  <MinusCircleOutlined rev={undefined} />
                                </Button>
                              )}
                            </Space.Compact>
                          </Form.Item>
                        </Col>
                      ))}
                    </>
                  )}
                </Form.List>
              </Row>
              {report.length > 0 && (
                <>
                  <div className="mb-4 text-base font-semibold">报告信息</div>
                  <ReportPageItem reportItems={report} />
                </>
              )}
              {/* {report.length > 1 ? (
                <>
                  <Tabs
                    className="oh-antd"
                    size={'small'}
                    items={report.map((r) => {
                      return {
                        label: r.name,
                        key: r.id,
                        children: <ReportInfo report={r} />,
                      };
                    })}
                  />
                </>
              ) : (
                <ReportInfo report={report[0]} />
              )} */}
            </>
          )}
        </>
      </Form>
    </div>
  );
  return (
    <>
      {contextHolder}
      {main}
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
              getReport={(item) => {
                setOpenConfirm(false);
                setReport(item);
                form.setFieldsValue({
                  name: item.map((item) => item.name).join(', '),
                });
              }}
            />
          </div>
        }
        handleClose={() => {
          setOpenConfirm(false);
        }}
      />
      {report.length > 0 && (
        <div className="fixed bottom-2 left-0 flex w-[100%] justify-center gap-2 border-t pt-2">
          <Button
            className="rounded-none"
            type="primary"
            loading={mutation.isLoading}
            onClick={() => {
              submit();
            }}
          >
            提交申请
          </Button>
          {/* <Button className="rounded-none">保存</Button> */}
          {/* <Button
            className="rounded-none"
            htmlType="submit"
            onClick={() => {
              autoFill('');
            }}
          >
            自动填充
          </Button> */}
          <Button className="rounded-none" htmlType="button" onClick={onReset}>
            重置
          </Button>
        </div>
      )}
    </>
  );
};
export default SelectionApplication;
