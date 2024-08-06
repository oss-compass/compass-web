import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import {
  Button,
  message,
  Form,
  Input,
  Select,
  Row,
  Col,
  Space,
  Popover,
  Radio,
} from 'antd';
import Dialog from '@common/components/Dialog';
import { MinusOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
import SelectReport from '@modules/oh/components/Report/SelectReport';
import { incubationTimeList, queryKey } from '@modules/oh/constant';
import client from '@common/gqlClient';
import { useCreateTpcSoftwareSelectionMutation } from '@oss-compass/graphql';
import { openGiteeIssue } from '@modules/oh/utils';
import getErrorMessage from '@common/utils/getErrorMessage';
import ReportPageItems from '@modules/oh/components/Report/ReportPageItems';
import { getPathname } from '@common/utils';
import HasOhRole from '@modules/oh/components/HasOhRole';
import useHasOhRole from '@modules/oh/hooks/useHasOhRole';

const SelectionApplication = () => {
  const { hasOhRole } = useHasOhRole();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [report, setReport] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [sameCheck, setSameCheck] = useState(false);

  const [form] = Form.useForm();
  const mutation = useCreateTpcSoftwareSelectionMutation(client, {
    onSuccess(data) {
      if (data.createTpcSoftwareSelection.status == 'true') {
        const id = data.createTpcSoftwareSelection.id;
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
          openGiteeIssue(report, form.getFieldsValue(true), id);
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

  let main = (
    <div className="flex w-full flex-col justify-center px-5 pt-4">
      <Form
        className="w-full"
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
                    label="孵化周期"
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
                    label="目标孵化软件"
                    name="targetSoftware"
                    rules={[{ required: true, message: '请输入!' }]}
                  >
                    <Select disabled={false}>
                      {report.map((item) => {
                        return (
                          <Select.Option
                            key={item.id}
                            value={getPathname(item.codeUrl)}
                          >
                            {getPathname(item.codeUrl)}
                          </Select.Option>
                        );
                      })}
                    </Select>
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
                <Col span={24}>
                  <Form.Item
                    labelCol={{
                      span: 3,
                      style: { fontWeight: 'bold' },
                    }}
                    label="Committers"
                    name="committers"
                    rules={[{ required: true, message: '请输入!' }]}
                  >
                    <Input
                      placeholder="需填写 Committers 的 Gitee/Github 用户名，多个
                      Committers 用逗号分开"
                      disabled={false}
                    />
                  </Form.Item>
                </Col>
                <Col span={12} className="relative">
                  <Popover
                    placement="topLeft"
                    arrow={false}
                    content={
                      <>
                        <div>存在已完成适配的同类型三方库</div>
                      </>
                    }
                    trigger="hover"
                  >
                    <Form.Item
                      label="存在同类型三方库"
                      rules={[{ required: true, message: '请输入!' }]}
                      name="isSameTypeCheck"
                      initialValue={0}
                    >
                      <Radio.Group
                        // value={value.xxx || number}
                        onChange={(e) => {
                          if (e.target.value === 1) {
                            setSameCheck(true);
                          } else {
                            setSameCheck(false);
                          }
                        }}
                      >
                        <Radio value={1}>是</Radio>
                        <Radio value={0}>否</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Popover>
                </Col>
                <Col span={12} className="relative">
                  {sameCheck && (
                    <Form.Item
                      // className="absolute -top-1 right-3 w-[50%]"
                      label="同类型三方库链接"
                      name="sameTypeSoftwareName"
                    >
                      <Input placeholder="请输入同类型三方库链接" />
                    </Form.Item>
                  )}
                </Col>

                <Form.List name="repoUrl" initialValue={[{ repoUrl: '' }]}>
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => (
                        <>
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
                                    <MinusOutlined rev={undefined} />
                                  </Button>
                                )}
                              </Space.Compact>
                            </Form.Item>
                          </Col>
                          <Col span={1}></Col>
                        </>
                      ))}
                    </>
                  )}
                </Form.List>
              </Row>
              {report.length > 0 && (
                <>
                  <div className="mb-4 text-base font-semibold">报告信息</div>
                  <ReportPageItems reportItems={report} />
                </>
              )}
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
        // dialogTitle={
        //   <>
        //     <p className="">选择软件</p>
        //     <div
        //       className="absolute right-6 top-4 cursor-pointer p-2"
        //       onClick={() => {
        //         setOpenConfirm(false);
        //       }}
        //     >
        //       <GrClose className="text-base" />
        //     </div>
        //   </>
        // }
        dialogContent={
          <div className="w-full">
            <div
              className="absolute right-6 top-4 cursor-pointer p-2"
              onClick={() => {
                setOpenConfirm(false);
              }}
            >
              <GrClose className="text-base" />
            </div>
            <SelectReport
              getReport={(item) => {
                if (item.length > 0) {
                  form.resetFields();
                  setReport(item);
                  form.setFieldsValue({
                    name: item.map((item) => item.name).join(', '),
                    targetSoftware:
                      item.length > 1 ? '' : getPathname(item[0].codeUrl),
                  });
                }
                setOpenConfirm(false);
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
          <HasOhRole>
            <Button
              disabled={!hasOhRole}
              className="rounded-none"
              type="primary"
              loading={mutation.isLoading}
              onClick={() => {
                submit();
              }}
            >
              提交申请
            </Button>
          </HasOhRole>
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
