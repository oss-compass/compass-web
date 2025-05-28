import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Form, Input, Select, Row, Col, Popover, Button } from 'antd';
import Upload from '@modules/oh/components/Upload';
import {
  languagesList,
  adaptationMethodList,
  domainList,
} from '@modules/oh/constant';
import client from '@common/gqlClient';
import { useUpdateTpcSoftwareSelectionReportMutation } from '@oss-compass/graphql';
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
  const mutation = useUpdateTpcSoftwareSelectionReportMutation(client, {
    onSuccess(data) {
      if (data.updateTpcSoftwareSelectionReport.status == 'true') {
        toast.success('修改成功');
        refetch && refetch();
      } else {
        toast.error(data.updateTpcSoftwareSelectionReport.message);
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
  const imageList = report?.architectureDiagrams.map((item) => {
    return {
      id: item.id,
      uid: item.id,
      name: item.filename,
      status: 'done',
      url: item.url,
    };
  });
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
              rules={[{ required: true, message: '请输入!' }]}
              label="漏洞响应机制"
              name="vulnerabilityResponse"
            >
              <Input />
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
  const userId = currentUser?.id;

  return (
    <>
      {userId === report.userId && (
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
