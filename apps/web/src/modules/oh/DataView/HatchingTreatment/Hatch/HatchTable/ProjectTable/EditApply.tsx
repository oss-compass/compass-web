import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Form, Input, Select, Row, Col, Popover, Button, Radio } from 'antd';
import { incubationTimeList } from '@modules/oh/constant';
import client from '@common/gqlClient';
import { useUpdateTpcSoftwareSelectionMutation } from '@oss-compass/graphql';
import { toast } from 'react-hot-toast';
import Dialog from '@common/components/Dialog';
import { MinusOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { GrClose } from 'react-icons/gr';
import { useUserInfo } from '@modules/auth/useUserInfo';

const EditReportForm = ({ report, refetch }) => {
  const [form] = Form.useForm();
  const name = report?.tpcSoftwareSelectionReports[0].name;
  const [sameCheck, setSameCheck] = useState(Boolean(report.isSameTypeCheck));
  const [repoUrl, setRepoUrl] = useState(
    report.repoUrl.map((z) => {
      return { repoUrl: z };
    })
  );
  useEffect(() => {
    setSameCheck(report.isSameTypeCheck);
    form.setFieldsValue({
      ...report,
      name,
      repoUrl,
    });
  }, []);
  const mutation = useUpdateTpcSoftwareSelectionMutation(client, {
    onSuccess(data) {
      if (data.updateTpcSoftwareSelection.status == 'true') {
        toast.success('修改成功');
        refetch && refetch();
      } else {
        toast.error(data.updateTpcSoftwareSelection.message);
      }
    },
    onError(res) {
      //   toast.error(res?.message);
    },
  });
  const submit = () => {
    form.validateFields().then((values) => {
      const repoUrl = values.repoUrl.map((z) => z['repoUrl']);
      const softwareReport = {
        ...values,
        repoUrl,
      };
      delete softwareReport.name;
      mutation.mutate({
        selectionId: report.id,
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
              label="孵化周期"
              name="incubationTime"
              rules={[{ required: true, message: '请选择!' }]}
              labelCol={{
                span: 3,
                style: { fontWeight: 'bold' },
              }}
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
              >
                <Radio.Group
                  className="mt-1 ml-2"
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
            {sameCheck ? (
              <Form.Item
                // className="absolute -top-1 right-3 w-[50%]"
                label="同类型三方库链接"
                name="sameTypeSoftwareName"
              >
                <Input placeholder="请输入同类型三方库链接" />
              </Form.Item>
            ) : (
              ''
            )}
          </Col>

          <Form.List name="repoUrl">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <>
                    <Col className="" span={12} key={field.key}>
                      <Form.Item
                        label={`适配仓路径${index ? index + 1 : ''}`}
                        name={[field.name, 'repoUrl']}
                        rules={[{ required: true, message: '请输入!' }]}
                        labelCol={{
                          span: 6,
                          style: { fontWeight: 'bold' },
                        }}
                      >
                        <Input
                          placeholder="填写完成 OH 适配后的仓库路径"
                          disabled={false}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      {index === 0 ? (
                        <Button
                          className="rounded-none pt-0"
                          type="primary"
                          onClick={() => add()}
                        >
                          <PlusOutlined />
                        </Button>
                      ) : (
                        <Button
                          className="dynamic-delete-button rounded-none pt-0"
                          onClick={() => remove(field.name)}
                        >
                          <MinusOutlined />
                        </Button>
                      )}
                    </Col>
                  </>
                ))}
              </>
            )}
          </Form.List>
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
