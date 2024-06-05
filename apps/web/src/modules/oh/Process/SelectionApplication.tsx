import React, { useState } from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import type { CommitDetail } from '@oss-compass/graphql';
import { Button, Radio, DatePicker, Form, Input, Select, Row, Col } from 'antd';
import type { FormProps } from 'antd';
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const queryType = router.query?.type as string;

  const [commitInfo, setOpenConfirm] = useState({});
  const onFinish: FormProps<CommitDetail>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<CommitDetail>['onFinishFailed'] = (
    errorInfo
  ) => {
    // console.log('Failed:', errorInfo);
  };
  const [form] = Form.useForm();
  form.setFieldsValue(commitInfo);

  let listItem = [
    {
      label: '所属领域',
      span: 2,
      children: 'CI/CD',
    },
    {
      label: '编程语言',
      span: 2,
      children: 'Python',
    },
    {
      label: '软件名称',
      span: 2,
      children: '自动化工具',
    },
    {
      label: '软件版本',
      span: 2,
      children: 'V2.0',
    },
    {
      label: '相关 APP',
      span: 2,
      children: '公司内部使用',
    },
    {
      label: '软件性质',
      span: 2,
      children: '组织项目',
    },
    {
      label: '选型原因',
      span: 4,
      children: '提高生产效率',
    },
  ];
  return (
    <>
      <div className="flex flex-col justify-center py-4 px-5">
        <div className="mb-5 flex items-start gap-2 border border-[#91d5ff] bg-[#e6f7ff] px-3 py-2 text-xs leading-5">
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
        </div>

        {queryType === '孵化选型评审' ? (
          <>
            <Descriptions className="oh" bordered items={listItem} />
            <div className="my-6 text-base font-semibold">审核信息</div>
            <Form
              form={form}
              labelCol={{
                span: 6,
                style: { fontWeight: 'bold' },
              }}
              style={{
                width: '100%',
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Col span={24}>
                <Form.Item
                  labelCol={{
                    span: 3,
                    style: { fontWeight: 'bold' },
                  }}
                  label="审核结论"
                  name="commitHash"
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
                  name="commitHash"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Form>
          </>
        ) : (
          <Form
            form={form}
            labelCol={{
              span: 6,
              style: { fontWeight: 'bold' },
            }}
            style={{
              width: '100%',
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="mb-6 text-base font-semibold">软件基础信息</div>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="所属领域"
                  name="commitHash"
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
                  label="编程语言"
                  name="commitHash1"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="软件名称"
                  name="commitHash"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="软件版本"
                  name="commitHash1"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="相关APP"
                  name="commitHash"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="软件性质"
                  name="commitHash1"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Select>
                    <Select.Option value="组织项目">组织项目</Select.Option>
                    <Select.Option value="个人项目">个人项目</Select.Option>
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
                  name="commitHash"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="官网地址"
                  name="commitHash"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="源码地址"
                  name="commitHash1"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="开发商"
                  name="commitHash"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="代码量"
                  name="commitHash1"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="版本发布日期"
                  name="commitHash1"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  labelCol={{ span: 3, style: { fontWeight: 'bold' } }}
                  label="版本描述"
                  name="commitHash"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
            <div className="mb-6 text-base font-semibold">仓库信息维护</div>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="SIG名称"
                  name="commitHash"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <div className="mt-1.5">数据压缩算法</div>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="SIG描述"
                  name="commitHash"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <div className="mt-1.5">数据压缩算法 SIG 描述</div>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="新建仓路径"
                  name="commitHash"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Commiters"
                  name="commitHash"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="仓描述"
                  name="commitHash"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="引入方式"
                  name="commitHash"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Select>
                    <Select.Option value="适配">适配</Select.Option>
                    <Select.Option value="重写">重写</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="孵化时间"
                  name="commitHash"
                  rules={[{ required: true, message: '请选择!' }]}
                >
                  <DatePicker placeholder="请选择日期" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    </>
  );
};

export default SelectionApplication;
