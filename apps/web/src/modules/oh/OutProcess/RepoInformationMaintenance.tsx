import React, { useState } from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import type { CommitDetail } from '@oss-compass/graphql';
import {
  Button,
  InputNumber,
  Checkbox,
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  Row,
  Col,
} from 'antd';
import type { FormProps } from 'antd';
import MyTable from '@common/components/Table';
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { useRouter } from 'next/router';

const RepoInformationMaintenance = () => {
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

  const columns = [
    {
      title: '操作',
      key: 'index',
      render: (text: string, record: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: '类型',
      dataIndex: 'linesAdded',
      key: 'linesAdded',
    },
    {
      title: '实体包下载地址',
      dataIndex: 'linesRemoved',
      key: 'linesRemoved',
    },
    {
      title: '实体包',
      key: 'linesChanged',
      dataIndex: 'linesChanged',
    },
  ];
  const tableData = [];
  return (
    <>
      <div className="flex flex-col justify-center py-4 px-5">
        <div className="mb-4 text-base font-semibold">源码仓信息维护</div>
        <div className="mb-5 flex items-start gap-2 border border-[#91d5ff] bg-[#e6f7ff] px-3 py-2 text-xs leading-5">
          <ExclamationCircleTwoTone rev={undefined} className="mt-1" />
          <div>
            <div>
              1、未初始化的华为源码中心仓根据推荐值选取规则（参考开源源码中心仓仓库管理规范）生成推荐仓库地址，用户可以编辑修改；已初始化的仓库查询展示不可编辑修改；
            </div>
            <div>
              2、已入库未在通用区初始化源码仓的软件，如果已经在黄区（https://codehub-y.huawei.com/OpenSourceCenter/）初始化源码仓，建议先联系“
              张欢鹏 zwx601434
              “迁移仓库至通用区，再进行关联源码仓，迁仓操作指导；{' '}
            </div>
            <div>3、已经初始化的源码仓会自动导入社区 Tag；</div>
          </div>
        </div>
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
                <Input />
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
        <div className="mb-6 text-base font-semibold">仓库信息维护</div>
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
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="SIG Manifest分支"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="SIG Manifestfile"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="编译形态名"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="后编译命令"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 3, style: { fontWeight: 'bold' } }}
                label="是否打patch"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Radio.Group>
                  <Radio value="是"> 是 </Radio>
                  <Radio value="否"> 否 </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 3, style: { fontWeight: 'bold' } }}
                label="预编译命令"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 3, style: { fontWeight: 'bold' } }}
                label="编译命令"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 3, style: { fontWeight: 'bold' } }}
                label="产物路径"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 3, style: { fontWeight: 'bold' } }}
                label="代码下载命令"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 3, style: { fontWeight: 'bold' } }}
                label="是否关联下载代码"
                name="commitHash"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Radio.Group>
                  <Radio value="是"> 是 </Radio>
                  <Radio value="否"> 否 </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
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
        {/* <div className="mb-4 text-lg font-semibold">实体包信息维护</div>
        <div className="">
          <Button>新增</Button>
          <Checkbox className="!ml-4">确定无二进制包</Checkbox>
          <Checkbox className="!ml-4">确定无源码包</Checkbox>
        </div>
        <div className="mt-4">
          <MyTable
            columns={columns}
            dataSource={tableData}
            rowKey={'key'}
            scroll={{ x: 'max-content' }}
          />
        </div> */}
      </div>
    </>
  );
};

export default RepoInformationMaintenance;
