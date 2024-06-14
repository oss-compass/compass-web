import React, { useState } from 'react';
import {
  message,
  Button,
  Form,
  Input,
  DatePicker,
  Radio,
  Row,
  Col,
} from 'antd';
import dayjs from 'dayjs';
import {
  procseeState,
  procseeActions,
} from '@modules/oh/DataView/HatchingTreatment/Process/procseeState';
import { useSnapshot } from 'valtio';

const RepoInformationMaintenance = () => {
  const processesID = '建仓门禁评审';
  const snap = useSnapshot(procseeState);
  const { allProcesses } = snap;
  let proceedingProcesses = allProcesses.find(
    (item) => item.state === 'proceeding'
  );
  let isProceedingProcesses = proceedingProcesses.id === processesID;
  const [submitLoading, setSubmitLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();
  form.setFieldsValue({
    softwareName: 'Sample Software',
    domain: '数据压缩',
    softwareVersion: '1.0.0',
    releaseDate: dayjs('2020-01-01'),
    developer: 'ABC Company',
    websiteUrl: 'https://example.com',
    selectionReason: '该软件具有优秀的性能表现和易用性',
    codeRepositoryUrl: 'https://github.com/example/project',
    programmingLanguage: 'Python',
    codeSize: '10000 行',
    integrationMethod: '适配',
    sigName: '数据压缩算法',
    sigDescription: '数据压缩算法 SIG 描述',
    newRepositoryPath: '/data-compression-algorithm',
    committers: 'John Doe, Jane Smith',
    repositoryDescription: '该仓库用于存储数据压缩算法相关代码',
    incubationTime: dayjs('2022-01-01'),
  });
  const submit = () => {
    form.validateFields().then((values) => {
      setSubmitLoading(true);
      setTimeout(() => {
        messageApi.open({
          type: 'success',
          content: '提交成功',
        });
        setSubmitLoading(false);
        procseeActions.setNextProcsee(processesID);
      }, 1000);
      console.log(values);
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
          disabled={!isProceedingProcesses}
          autoComplete="off"
        >
          <div className="mb-6 text-base font-semibold">仓库信息维护</div>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="SIG名称"
                name="sigName"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <div className="mt-1.5">数据压缩算法</div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="SIG描述"
                name="sigDescription"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <div className="mt-1.5">数据压缩算法 SIG 描述</div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="新建仓路径"
                name="newRepositoryPath"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input addonBefore="https://gitee.com/openharmony-tpc/" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Commiters"
                name="committers"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="仓描述"
                name="repositoryDescription"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="孵化时间"
                name="incubationTime"
                rules={[{ required: true, message: '请选择!' }]}
              >
                <DatePicker placeholder="请选择日期" />
              </Form.Item>
            </Col>
          </Row>
          <div className="my-6 text-base font-semibold">审核信息</div>
          <Col span={24}>
            <Form.Item
              labelCol={{
                span: 3,
                style: { fontWeight: 'bold' },
              }}
              label="审核结论"
              name="conclusion"
              rules={[{ required: true, message: '请输入!' }]}
            >
              <Radio.Group>
                <Radio value="apple"> 通过 </Radio>
                <Radio value="pear"> 驳回 </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              labelCol={{
                span: 3,
                style: { fontWeight: 'bold' },
              }}
              label="审核意见"
              name="comment"
              rules={[{ required: true, message: '请输入!' }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Form>
      </div>
      {isProceedingProcesses && (
        <div className="fixed bottom-2 left-0 flex w-[99%] justify-center gap-2 border-t pt-2">
          <Button
            className="rounded-none"
            type="primary"
            loading={submitLoading}
            onClick={() => {
              submit();
            }}
          >
            提交
          </Button>
          <Button className="rounded-none">转其他人</Button>
        </div>
      )}
    </>
  );
};

export default RepoInformationMaintenance;
