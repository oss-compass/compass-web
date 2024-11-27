import React, { useState } from 'react';
import {
  Button,
  message,
  Form,
  Input,
  Select,
  Radio,
  Row,
  Col,
  Popover,
} from 'antd';
import Upload from '@modules/oh/components/Upload';
import SearchReport from './SearchReport';
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
  const [report, setReport] = useState(null);
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
  const validateCommitSHA = (_, value) => {
    const commitSHARegex = /^[0-9a-f]{40}$/;
    if (!value || commitSHARegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('请输入有效的 commit SHA'));
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
              <Form.Item
                label="软件名称"
                name="name"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <SearchReport
                  placeholder="输入软件仓库名称"
                  setReport={(item, value) => {
                    if (item) {
                      item.isIncubation = 1;
                      setReport(item);
                      form.setFieldsValue(item);
                    } else {
                      form.setFieldsValue({ name: value });
                    }
                  }}
                />
              </Form.Item>
              {/* </Popover> */}
            </Col>
            <Col span={12}>
              <Form.Item
                label="是否孵化项目"
                rules={[{ required: true, message: '请输入!' }]}
                name="isIncubation"
                initialValue={0}
              >
                <Radio.Group className="mt-1">
                  <Radio title={report ? '' : '未检测到该孵化项目'} value={1}>
                    是
                  </Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
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
              <Popover
                placement="topRight"
                content={
                  <>
                    <div>
                      请填写该软件上游社区最后一次提交的 Commit
                      SHA（鸿蒙化适配前一次提交的 Commit SHA）
                    </div>
                    <div>示例：ce45963962ed7b528937b113dc2782076d563075</div>
                  </>
                }
                title="规则"
                trigger="click"
              >
                <Form.Item
                  label="Commit SHA"
                  name="ohCommitSha"
                  rules={[
                    { required: true, message: '请输入!' },
                    {
                      validator: validateCommitSHA,
                      message: '请输入有效的Commit SHA',
                    },
                  ]}
                >
                  <Input placeholder="提供该软件上游社区最后一次提交的CommitSha" />
                </Form.Item>
              </Popover>
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
            <Col span={24}>
              <Form.Item
                labelCol={{
                  span: 3,
                  style: { fontWeight: 'bold' },
                }}
                label="架构图"
                name="architectureDiagrams"
              >
                <Upload
                  onFileChange={(images) => {
                    form.setFieldsValue({
                      architectureDiagrams: images,
                    });
                  }}
                />
              </Form.Item>
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
