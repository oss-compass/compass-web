import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Form, Input, Select, Row, Col, Popover, Button, Radio } from 'antd';
import Upload from '@modules/oh/components/Upload';
import {
  languagesList,
  adaptationMethodList,
  domainList,
  lifecyclePolicyList,
} from '@modules/oh/constant';
import client from '@common/gqlClient';
import { useUpdateTpcSoftwareGraduationReportMutation } from '@oss-compass/graphql';
import { toast } from 'react-hot-toast';
import Dialog from '@common/components/Dialog';
import { EditOutlined } from '@ant-design/icons';
import { GrClose } from 'react-icons/gr';
import { useUserInfo } from '@modules/auth/useUserInfo';

const EditReportForm = ({ report, refetch }) => {
  const [form] = Form.useForm();
  const tpcSoftwareSigId = report?.tpcSoftwareSig?.id;
  useEffect(() => {
    form.setFieldsValue({ ...report, tpcSoftwareSigId });
  }, []);
  const mutation = useUpdateTpcSoftwareGraduationReportMutation(client, {
    onSuccess(data) {
      if (data.updateTpcSoftwareGraduationReport.status == 'true') {
        toast.success('修改成功');
        refetch && refetch();
      } else {
        toast.error(data.updateTpcSoftwareGraduationReport.message);
      }
    },
    onError(res) {
      //   toast.error(res?.message);
    },
  });
  const submit = () => {
    form.validateFields().then((values) => {
      const softwareReport = {
        ...values,
        architectureDiagrams: values.architectureDiagrams.map((item) => ({
          id: item.id,
          filename: item.filename,
          base64: item.base64 || item.url,
        })),
      };
      delete softwareReport.codeUrl;
      mutation.mutate({
        reportId: report.id,
        softwareReport,
      });
    });
  };
  const imageList = report.architectureDiagrams.map((item) => {
    return {
      id: item.id,
      uid: item.id,
      name: item.filename,
      status: 'done',
      url: item.url,
    };
  });
  const validateCommitSHA = (_, value) => {
    const commitSHARegex = /^[0-9a-f]{40}$/;
    if (!value || commitSHARegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('请输入有效的 commit SHA'));
  };
  return (
    <div className="px-6">
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
              <Input disabled />
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
                imageList={imageList}
                onFileChange={(images) => {
                  form.setFieldsValue({
                    architectureDiagrams: images,
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <div className="mt-20 flex justify-center">
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
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

const EditReport = ({ report, editSuccess }) => {
  const { currentUser } = useUserInfo();
  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <>
      {currentUser?.id === report.userId && (
        <Popover content={'编辑基础信息'}>
          <EditOutlined
            onClick={() => {
              //   anction(record);
              setOpenConfirm(true);
            }}
          />
        </Popover>
      )}
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
            <p className="">{report?.name} 基础信息</p>
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
            <EditReportForm
              report={report}
              refetch={() => {
                setOpenConfirm(false);
                editSuccess();
              }}
            />
          </div>
        }
        handleClose={() => {
          setOpenConfirm(false);
        }}
      />
    </>
  );
};
export default EditReport;
