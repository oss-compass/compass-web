import React, { useState } from 'react';
import { Button, message, Form, Input, Select, Row, Col } from 'antd';
import DatePicker from '@common/components/Form';
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import dayjs from 'dayjs';
import { procseeState, procseeActions } from '@modules/oh/Process/procseeState';
import { useSnapshot } from 'valtio';

let yList = [
  '数据压缩算法',
  'UI',
  '图片',
  '工具',
  '数据存储',
  '其他',
  '框架类',
  '图像图形处理',
  '字体字幕处理',
  '网络协议通信',
  '视频编解码',
  '日志打印',
  '文本解析器',
  '深度学习',
  '安全',
  '数据结构存储',
  '音视频',
  '加解密算法',
  '搜索',
  '动画',
  '多媒体',
  '文件数据与传输',
];
const SelectionApplication = () => {
  const processesID = '孵化评估申请';

  const snap = useSnapshot(procseeState);
  const { allProcesses } = snap;
  let proceedingProcesses = allProcesses.find(
    (item) => item.state === 'proceeding'
  );
  let isProceedingProcesses = proceedingProcesses.id === processesID;

  const [submitLoading, setSubmitLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
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
  const onReset = () => {
    form.resetFields();
  };
  const autoFill = () => {
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
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="mb-6 text-base font-semibold">软件基础信息</div>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="软件名称"
                name="softwareName"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="所属领域"
                name="domain"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Select>
                  {yList.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="软件版本"
                name="softwareVersion"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="版本发布日期"
                name="releaseDate"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <DatePicker placeholder="请选择日期" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="开发商"
                name="developer"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="官网地址"
                name="websiteUrl"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                labelCol={{
                  span: 3,
                  style: { fontWeight: 'bold' },
                }}
                label="选型原因"
                name="selectionReason"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          <div className="mb-6 text-base font-semibold">软件源码信息</div>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="源码地址"
                name="codeRepositoryUrl"
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
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="代码量"
                name="codeSize"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="引入方式"
                name="integrationMethod"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Select>
                  <Select.Option value="适配">适配</Select.Option>
                  <Select.Option value="重写">重写</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/* <div className="mb-6 text-base font-semibold">仓库信息维护</div>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="SIG 名称"
                name="sigName"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <div className="mt-1.5">数据压缩算法</div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="SIG 描述"
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
          </Row> */}
        </Form>
      </div>
      {isProceedingProcesses && (
        <div className="fixed bottom-2 flex w-[99%] justify-center gap-2">
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
          <Button className="rounded-none">保存</Button>
          <Button
            className="rounded-none"
            htmlType="submit"
            onClick={() => {
              autoFill();
            }}
          >
            自动填充
          </Button>
          <Button className="rounded-none" htmlType="button" onClick={onReset}>
            重置
          </Button>
        </div>
      )}
    </>
  );
};

export default SelectionApplication;
