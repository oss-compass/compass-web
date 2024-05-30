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
import { PlusOutlined } from '@ant-design/icons';

const SelectionEvaluation = () => {
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
      <div className="my-6 flex flex-col justify-center ">
        <Form
          form={form}
          labelCol={{ span: 8 }}
          style={{
            width: '100%',
            paddingLeft: 24,
            paddingRight: 24,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="mb-4 text-lg font-semibold">软件基础信息</div>
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
                label="发布日期"
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
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 3 }}
                label="版本描述"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          <div className="mb-4 text-lg font-semibold">选型评估信息</div>
          <Row gutter={24}>
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
                label="社区EOL日期"
                name="commitHash1"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="社区EOL披露地址"
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
                label="是否是安卓类APP组件"
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
                label="C-TMG CBB技术决策附近"
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
              label="开源主License"
              name="commitHash"
              rules={[{ required: true, message: '请输入!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              labelCol={{ span: 4 }}
              label="License分析报告"
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
          </Col>
        </Form>
        <div className="flex justify-center gap-2">
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="submit">保存</Button>
          <Button htmlType="submit">置空</Button>
        </div>
      </div>
    </>
  );
};

export default SelectionEvaluation;
