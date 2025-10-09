import React from 'react';
import { Button, Form, Input, Select, Row, Col, Popover } from 'antd';
import {
  languagesList,
  adaptationMethodList,
  domainList,
  queryKey,
} from '@modules/oh/constant';
import { validateCommitSHA, validateCoderUrl } from '@modules/oh/utils/form';
import Upload from '@modules/oh/components/Upload';
import client from '@common/gqlClient';
import { useCreateTpcSoftwareSelectionReportMutation } from '@oss-compass/graphql';
import getErrorMessage from '@common/utils/getErrorMessage';
import HasOhRole from '@modules/oh/components/HasOhRole';
import { toast } from 'react-hot-toast';

const SelectionReportApplication = () => {
  const [form] = Form.useForm();
  const mutation = useCreateTpcSoftwareSelectionReportMutation(client, {
    onSuccess(data) {
      if (data.createTpcSoftwareSelectionReport.status == 'true') {
        toast.success(`提交成功，可在孵化项目申请列表中查看报告状态！`);
        setTimeout(() => {
          window.location.hash = 'hatchTable?tab=1';
        }, 2000);
      } else {
        toast.error(data.createTpcSoftwareSelectionReport.message);
      }
    },
    onError(res) {
      toast.error(getErrorMessage(res));
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

  return (
    <>
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
            <Col xs={24} sm={24} md={24} lg={12}>
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
            <Col xs={24} sm={24} md={24} lg={12}>
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
            <Col xs={24} sm={24} md={24} lg={12}>
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
            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item
                label="源码地址"
                name="codeUrl"
                rules={[
                  { required: true, message: '请输入!' },
                  {
                    validator: validateCoderUrl,
                  },
                ]}
              >
                <Input
                  onBlur={(e) => {
                    if (e.target.value) {
                      form.setFieldValue(
                        'vulnerabilityResponse',
                        e.target.value + '/issues'
                      );
                    }
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12}>
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
            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item
                rules={[{ required: true, message: '请输入!' }]}
                label="漏洞响应机制"
                name="vulnerabilityResponse"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12}>
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
            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item
                label="上游协同策略"
                name="upstreamCollaborationStrategy"
                rules={[{ required: true, message: '请选择上游协同策略!' }]}
              >
                <Select placeholder="请选择上游协同策略">
                  <Select.Option value={1}>上游贡献</Select.Option>
                  <Select.Option value={2}>适配后回合</Select.Option>
                  <Select.Option value={3}>自维护</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item
                label="上游沟通链接"
                name="upstreamCommunicationLink"
                rules={[{ required: true, message: '请输入上游沟通链接!' }]}
              >
                <Input placeholder="提供与上游沟通的链接（PR、Issue等）" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item label="架构图" name="architectureDiagrams">
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
            onClick={() => {
              submit();
            }}
          >
            提交
          </Button>
        </HasOhRole>

        <Button className="rounded-none" htmlType="button" onClick={onReset}>
          重置
        </Button>
      </div>
      {/* )} */}
    </>
  );
};

export default SelectionReportApplication;
