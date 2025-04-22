import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Form, Input, Select, Row, Col, Popover, Button, Radio } from 'antd';
import DatePicker from '@common/components/DatePicker';
import { incubationTimeList } from '@modules/oh/constant';
import client from '@common/gqlClient';
import { useUpdateTpcSoftwareGraduationMutation } from '@oss-compass/graphql';
import { toast } from 'react-hot-toast';
import Dialog from '@common/components/Dialog';
import { EditOutlined } from '@ant-design/icons';
import { GrClose } from 'react-icons/gr';
import { useUserInfo } from '@modules/auth/useUserInfo';
import dayjs from 'dayjs';

const EditReportForm = ({ report, refetch }) => {
  const [form] = Form.useForm();
  const incubationStartTime = dayjs(report?.incubationStartTime);
  const name = report?.tpcSoftwareGraduationReports[0].name;

  useEffect(() => {
    form.setFieldsValue({ ...report, incubationStartTime, name });
  }, []);
  const mutation = useUpdateTpcSoftwareGraduationMutation(client, {
    onSuccess(data) {
      if (data.updateTpcSoftwareGraduation.status == 'true') {
        toast.success('修改成功');
        refetch && refetch();
      } else {
        toast.error(data.updateTpcSoftwareGraduation.message);
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
      };
      delete softwareReport.name;
      mutation.mutate({
        graduationId: report.id,
        ...softwareReport,
      });
    });
  };

  return (
    <div className="oh-tabs px-6">
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
          <Col span={24}>
            <Form.Item
              label="目标软件"
              name="name"
              labelCol={{
                span: 3,
                style: { fontWeight: 'bold' },
              }}
            >
              <Input disabled={true} />
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
              label="功能描述"
              name="functionalDescription"
              labelCol={{
                span: 3,
                style: { fontWeight: 'bold' },
              }}
              rules={[{ required: true, message: '请输入!' }]}
            >
              <Input
                placeholder="请列出您需要使用该软件的主要功能"
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
              label="垂域Committers"
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
          <Col span={12}>
            <Form.Item label="孵化开始时间" name="incubationStartTime">
              <DatePicker placeholder="请选择" format={'YYYY-MM-DD'} />
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

const EditApply = ({ report, editSuccess }) => {
  const { currentUser } = useUserInfo();
  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <>
      {currentUser?.id === report.userId && (
        <Popover content={'修改毕业申请信息'}>
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
            <p className="">{report?.name} 毕业申请信息</p>
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
export default EditApply;
