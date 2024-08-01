import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import { Button, message, Form, Input, Select, Row, Col } from 'antd';
import Dialog from '@common/components/Dialog';
import { DownOutlined } from '@ant-design/icons';
import SelectReport from '@modules/oh/components/Report/SelectReport';
import { incubationTimeList, queryKey } from '@modules/oh/constant';
import client from '@common/gqlClient';
import { useCreateTpcSoftwareSelectionMutation } from '@oss-compass/graphql';
import { openGiteeIssue } from '@modules/oh/utils';
import getErrorMessage from '@common/utils/getErrorMessage';
import ReportPageItems from '@modules/oh/components/Report/ReportPageItems';
import { getPathname } from '@common/utils';

const SelectionApplication = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [report, setReport] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
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
                  <Form.Item label="孵化开始时间" name="incubationTime">
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
                  <Form.Item label="孵化周期" name="incubationTime">
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
