import React, { useState } from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import type { CommitDetail } from '@oss-compass/graphql';
import {
  Button,
  InputNumber,
  Radio,
  Form,
  Input,
  Select,
  Row,
  Col,
  Upload,
} from 'antd';
import type { FormProps } from 'antd';
import { PlusOutlined, ExclamationCircleTwoTone } from '@ant-design/icons';
import { useRouter } from 'next/router';
import EvaluationDetail from '@modules/oh/components/EvaluationInfo/EvaluationDetail';

const SelectionEvaluation = () => {
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
  return (
    <>
      <div className="flex flex-col justify-center py-4 px-5">
        <div className="mb-5 flex items-start gap-2 border border-[#91d5ff] bg-[#e6f7ff] px-3 py-2 text-xs leading-5">
          <ExclamationCircleTwoTone rev={undefined} className="mt-1" />
          <div>
            数据补全说明：若字段左侧出现符号，表示该字段信息为系统自动带出；若字段值左上角标示蓝色角标，表示该字段信息当前与版本火车或社区信息不一致，建议关注；
            “发布日期、“代码量”、“Copyright”已取消必填，若选型申请环节未填写，软件上车后数据治理团队/工具会自动补齐，并可在软件商城软件详情页进行查询
          </div>
        </div>
        <Form
          form={form}
          labelCol={{ span: 6, style: { fontWeight: 'bold' } }}
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
                label="管网地址"
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
                label="主语言类型"
                name="commitHash"
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
          <div className="mb-6 text-base font-semibold">选型评估信息</div>
          <div className="my-2">
            <EvaluationDetail />
          </div>
          {/* <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="官网地址"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Radio.Group>
                  <Radio value="apple"> 是 </Radio>
                  <Radio value="pear"> 否 </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="软件生命力"
                name="commitHash1"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="社区版本发布节奏"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="社区 EOL 日期"
                name="commitHash1"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="社区 EOL 披露地址"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="官网漏洞披露地址"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="外部漏洞源的软件名称"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="是否涉及用户登录"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Radio.Group>
                  <Radio value="apple"> 是 </Radio>
                  <Radio value="pear"> 否 </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="是否是安卓类 APP 组件"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Radio.Group>
                  <Radio value="apple"> 是 </Radio>
                  <Radio value="pear"> 否 </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="C-TMG CBB 技术决策附近"
                valuePropName="fileList"
                getValueFromEvent={null}
              >
                <Upload action="/upload.do" listType="picture-card">
                  <button
                    style={{ border: 0, background: 'none' }}
                    type="button"
                  >
                    <PlusOutlined rev={undefined} />
                    <div style={{ marginTop: 8 }}>上传</div>
                  </button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Col span={24}>
            <Form.Item
              labelCol={{ span: 4 }}
              label="社区安全问题求助渠道"
              name="commitHash"
              rules={[{ required: true, message: '请输入!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              labelCol={{ span: 4 }}
              label="开源主 License"
              name="commitHash"
              rules={[{ required: true, message: '请输入!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              labelCol={{ span: 4 }}
              label="License 分析报告"
              name="commitHash"
              rules={[{ required: true, message: '请输入!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Copyright"
                valuePropName="fileList"
                getValueFromEvent={null}
              >
                <Upload action="/upload.do" listType="picture-card">
                  <button
                    style={{ border: 0, background: 'none' }}
                    type="button"
                  >
                    <PlusOutlined rev={undefined} />
                    <div style={{ marginTop: 8 }}>上传</div>
                  </button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Col span={24}>
            <Form.Item
              labelCol={{ span: 4 }}
              label="备注"
              name="commitHash"
              rules={[{ message: '请输入!' }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col> */}
        </Form>
        {queryType === '孵化选型评审' && (
          <>
            <div className="mb-6 text-base font-semibold">审核信息</div>
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
        )}
      </div>
    </>
  );
};

export default SelectionEvaluation;
