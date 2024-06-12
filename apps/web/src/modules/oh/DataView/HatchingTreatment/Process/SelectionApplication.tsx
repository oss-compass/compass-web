import React, { useState } from 'react';
import { Button, message, Form, Input, Select, Row, Col } from 'antd';
import DatePicker from '@common/components/Form';
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import dayjs from 'dayjs';
import {
  procseeState,
  procseeActions,
} from '@modules/oh/DataView/HatchingTreatment/Process/procseeState';
import { useSnapshot } from 'valtio';
import EvaluationDetail from '@modules/oh/components/EvaluationInfo/EvaluationDetail';

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
  const processesID = '孵化选型申请';

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
        {/* <div className="mb-5 flex items-start gap-2 border border-[#91d5ff] bg-[#e6f7ff] px-3 py-2 text-xs leading-5">
          <ExclamationCircleTwoTone rev={undefined} className="mt-1" />
          <div>
            <div>
              <strong>已入库：</strong>
              软件/软件版本信息已经过选型流程正式入库；若选择“已入库”软件/软件版本，点击“补全数据”按钮可以自动带出其属性、依赖解析关系等信息，以减少人工填写/修改；
            </div>
            <div>
              <strong> 预入库：</strong>
              软件/软件版本信息已提前采集治理；若选择“预入库”软件/软件版本，点击“补全数据”按钮可以自动带出其已采集治理的属性、依赖解析关系等信息，以减少人工填写/修改；
            </div>
            <div>
              <strong> 补全数据：</strong>
              请在选择“所属领域/产业”、“版本火车名称”、“软件名称”、“软件版本”4
              个字段后点击页面下方“补全数据”按钮自动带出软件/软件版本信息或引入数据采集服务。
            </div>
            <div>
              <strong> 软件/版本选型说明：</strong>
              针对版本继承场景，推荐联系产品线开源代表批量导入，以快速完成选型；针对新软件或版本升级场景，
              推荐通过页面右上角联系数据治理服务提前采集选型信息，以快速补全数据；目前系统采集功能暂只支持
              GitHub/Gitee 类网站，依赖关系只支持 Java/Js/Python/Go/Rust/ArkTS
              高级语言解析，不支持 Ubuntu-center
              等其他场景，其他场景可手工处理或咨询
            </div>
          </div>
        </div> */}
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
          <div className="mb-6 text-base font-semibold">评估报告</div>
          <EvaluationDetail />
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
