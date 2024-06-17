import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import { Button, message, Form, Input, Select, Row, Col } from 'antd';
import Dialog from '@common/components/Dialog';
import DatePicker from '@common/components/Form';
import { ExclamationCircleTwoTone, DownOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import {
  procseeState,
  procseeActions,
  getProceedingState,
} from '@modules/oh/DataView/HatchingTreatment/Process/procseeState';
import { useSnapshot } from 'valtio';
import EvaluationDetail from '@modules/oh/components/EvaluationInfo/EvaluationDetail';
import Report from '@modules/oh/DataView/HatchingTreatment/Workbench/Report';

let yList = [
  'RN 框架 (React Native)',
  'Flutter 框架 (Flutter)',
  '动画 (Animation)',
  '网络及协议 (Networking&Protocol)',
  '加解密 (Encryption)',
  '数据库 (Database)',
  '文件及解析 (Files&Parsing)',
  '多媒体 (Media)',
  '图片 (Image)',
  '图形 (Graphics)',
  '人工智能 (AI)',
  '工具 (Tools)',
  '数学及算法 (Math&Algorithm)',
  '架构及模式 (Architecture&Patterns)',
  '日志及调试 (Logging&Debugging)',
  '辅助实用 (Utility)',
];
const SelectReport = ({ getReport }) => {
  let items = [
    {
      name: 'vue3',
      description:
        'Vue.js 是构建 Web 界面的 JavaScript 库，提供数据驱动的组件，还有简单灵活的 API，使得 MVVM 更简单。',
      reportVersion: 'v2',
      updated: '2024-06-01',
      score: '88',
      evaluationDetail: [
        {
          name: '合法合规',
          score: 73,
        },
        {
          name: '技术生态',
          score: 65,
        },
        {
          name: '生命周期',
          score: 77,
        },
        {
          name: '网络安全',
          score: 44,
        },
      ],
    },
    {
      name: 'vue',
      description:
        'Vue.js 是构建 Web 界面的 JavaScript 库，提供数据驱动的组件，还有简单灵活的 API，使得 MVVM 更简单。',
      reportVersion: 'v2',
      updated: '2024-06-01',
      score: '88',
      evaluationDetail: [
        {
          name: '合法合规',
          score: 73,
        },
        {
          name: '技术生态',
          score: 65,
        },
        {
          name: '生命周期',
          score: 77,
        },
        {
          name: '网络安全',
          score: 44,
        },
      ],
    },
    {
      name: 'react',
      description:
        'React 是一个用于建构用户界面的 JavaScript 库。它被划分为声明式和组件化的概念，提供了多样的工具和库来支持复杂的用户界面开发。',
      reportVersion: 'v3',
      updated: '2024-05-15',
      score: '93',
      evaluationDetail: [
        {
          name: '合法合规',
          score: 85,
        },
        {
          name: '技术生态',
          score: 92,
        },
        {
          name: '生命周期',
          score: 82,
        },
        {
          name: '网络安全',
          score: 77,
        },
      ],
    },
    {
      name: 'angular',
      description:
        'Angular 是一个基于 TypeScript 的 Web 应用程序框架。它提供了完整的解决方案，涵盖了路由、表单管理、状态管理等常见需求，是企业级 Web 应用的理想选择。',
      reportVersion: 'v1',
      updated: '2024-07-01',
      score: '86',
      evaluationDetail: [
        {
          name: '合法合规',
          score: 78,
        },
        {
          name: '技术生态',
          score: 72,
        },
        {
          name: '生命周期',
          score: 68,
        },
        {
          name: '网络安全',
          score: 64,
        },
      ],
    },
    {
      name: 'node.js',
      description:
        'Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境。它使用事件驱动、非阻塞 I/O 模型，非常适合构建高性能、实时的网络应用。',
      reportVersion: 'v2',
      updated: '2024-04-20',
      score: '91',
      evaluationDetail: [
        {
          name: '合法合规',
          score: 82,
        },
        {
          name: '技术生态',
          score: 88,
        },
        {
          name: '生命周期',
          score: 79,
        },
        {
          name: '网络安全',
          score: 72,
        },
      ],
    },
    {
      name: 'django',
      description:
        'Django 是一个基于 Python 的 Web 框架，它强调快速开发、安全性和灵活性。它提供了很多开箱即用的功能，如 ORM、Admin 后台、模板引擎等。',
      reportVersion: 'v1',
      updated: '2024-08-01',
      score: '87',
      evaluationDetail: [
        {
          name: '合法合规',
          score: 75,
        },
        {
          name: '技术生态',
          score: 81,
        },
        {
          name: '生命周期',
          score: 73,
        },
        {
          name: '网络安全',
          score: 69,
        },
      ],
    },
    {
      name: 'flask',
      description:
        'Flask 是一个轻量级的 Python Web 框架，它专注于构建 API 和微服务。它具有简单、优雅、灵活的特点，非常适合快速开发小型到中型的 Web 应用。',
      reportVersion: 'v2',
      updated: '2024-03-01',
      score: '84',
      evaluationDetail: [
        {
          name: '合法合规',
          score: 71,
        },
        {
          name: '技术生态',
          score: 75,
        },
        {
          name: '生命周期',
          score: 68,
        },
        {
          name: '网络安全',
          score: 62,
        },
      ],
    },
  ];
  const [selected, setSelected] = useState<string>('');
  return (
    <>
      <Report
        items={items}
        selected={selected}
        selectFun={(name) => {
          setSelected(name);
          getReport(name);
        }}
      />
    </>
  );
};

const SelectionApplication = () => {
  const processesID = '孵化选型申请';
  let isProceedingProcesses = getProceedingState.id === processesID;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [report, setReport] = useState(null);
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
  const autoFill = (report) => {
    form.setFieldsValue({
      softwareName: report || 'Sample Software',
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
  // let tabItems = [
  //   {
  //     key: '2',
  //     label: <div className="mx-2">选型评估信息</div>,
  //     children: (
  //       <div className="pt-4">
  //         <EvaluationDetail />
  //         <div className="my-6 text-base font-semibold">审核信息</div>
  //         <Form
  //           form={form}
  //           labelCol={{
  //             span: 6,
  //             style: { fontWeight: 'bold' },
  //           }}
  //           style={{
  //             width: '100%',
  //           }}
  //           disabled={!isProceedingProcesses}
  //           autoComplete="off"
  //         >
  //           <Col span={24}>
  //             <Form.Item
  //               labelCol={{
  //                 span: 3,
  //                 style: { fontWeight: 'bold' },
  //               }}
  //               label="审核结论"
  //               name="conclusion"
  //               rules={[{ required: true, message: '请输入!' }]}
  //             >
  //               <Radio.Group>
  //                 <Radio value="apple"> 通过 </Radio>
  //                 <Radio value="pear"> 驳回 </Radio>
  //               </Radio.Group>
  //             </Form.Item>
  //           </Col>
  //           <Col span={24}>
  //             <Form.Item
  //               labelCol={{
  //                 span: 3,
  //                 style: { fontWeight: 'bold' },
  //               }}
  //               label="审核意见"
  //               name="comment"
  //               rules={[{ required: true, message: '请输入!' }]}
  //             >
  //               <Input.TextArea />
  //             </Form.Item>
  //           </Col>
  //         </Form>
  //       </div>
  //     ),
  //   },
  //   {
  //     key: '4',
  //     label: <div className="mx-2">依赖关系解析</div>,
  //     children: '依赖关系解析',
  //     disabled: true,
  //   },
  // ];
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
          disabled={!report || isProceedingProcesses}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="mb-6 text-base font-semibold">软件基础信息</div>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="选择软件"
                name="softwareName"
                rules={[{ required: true, message: '请输入!' }]}
              >
                {!isProceedingProcesses ? (
                  <Input
                    suffix={
                      <DownOutlined
                        className="text-[#d9d9d9]"
                        rev={undefined}
                      />
                    }
                  />
                ) : (
                  <Input
                    suffix={
                      <DownOutlined
                        className="text-[#d9d9d9]"
                        rev={undefined}
                      />
                    }
                    disabled={false}
                    onClick={() => {
                      setOpenConfirm(true);
                    }}
                    readOnly
                  ></Input>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="所属SIG"
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
          </Row>
          {/* <div className="mb-6 text-base font-semibold">软件源码信息</div> */}
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
          </Row>
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
            {/* <Col span={12}>
              <Form.Item
                label="SIG 描述"
                name="sigDescription"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <div className="mt-1.5">数据压缩算法 SIG 描述</div>
              </Form.Item>
            </Col> */}
            <Col span={12}>
              <Form.Item
                label="新建仓路径"
                name="newRepositoryPath"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input
                  disabled={!isProceedingProcesses}
                  addonBefore="https://gitee.com/openharmony-tpc/"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Commiters"
                name="committers"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input disabled={!isProceedingProcesses} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="仓描述"
                name="repositoryDescription"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input disabled={!isProceedingProcesses} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="孵化时间"
                name="incubationTime"
                rules={[{ required: true, message: '请选择!' }]}
              >
                <DatePicker
                  disabled={!isProceedingProcesses}
                  placeholder="请选择日期"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="引入方式"
                name="integrationMethod"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Select disabled={!isProceedingProcesses}>
                  <Select.Option value="适配">适配</Select.Option>
                  <Select.Option value="重写">重写</Select.Option>
                </Select>
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
                <Input.TextArea disabled={!isProceedingProcesses} />
              </Form.Item>
            </Col>
          </Row>
          <div className="mb-6 text-base font-semibold">评估报告</div>
          <EvaluationDetail />
        </Form>
      </div>
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
            <p className="">选择软件</p>
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
            <SelectReport
              getReport={(name) => {
                setOpenConfirm(false);
                setReport(name);
                autoFill(name);
              }}
            />
          </div>
        }
        handleClose={() => {
          setOpenConfirm(false);
        }}
      />
      {isProceedingProcesses && (
        <div className="fixed bottom-2 left-0 flex w-[100%] justify-center gap-2 border-t pt-2">
          <Button
            className="rounded-none"
            type="primary"
            loading={submitLoading}
            onClick={() => {
              submit();
            }}
          >
            提交申请
          </Button>
          <Button className="rounded-none">保存</Button>
          <Button
            className="rounded-none"
            htmlType="submit"
            onClick={() => {
              autoFill('');
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
