import React, { useState } from 'react';
import classnames from 'classnames';
import {
  Button,
  message,
  Form,
  Input,
  Collapse,
  Row,
  Col,
  DatePicker,
} from 'antd';
import { GrClose } from 'react-icons/gr';
import { DownOutlined, ExclamationCircleTwoTone } from '@ant-design/icons';
import dayjs from 'dayjs';
import {
  procseeActions,
  getProceedingState,
} from '@modules/oh/DataView/HatchingTreatment/OutProcess/OutProcessState';
import EvaluationDetail from '@modules/oh/components/EvaluationInfo/EvaluationDetail';
import Dialog from '@common/components/Dialog';
import SelectReport from '@modules/oh/components/SelectReport';

const SelectionApplication = () => {
  const processesID = '孵化准出申请';
  let isProceedingProcesses = getProceedingState().id === processesID;

  const [openConfirm, setOpenConfirm] = useState(false);
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
  const recall = () => {
    // form.resetFields();
  };
  const [report, setReport] = useState(null);
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
  const [label, setLabel] = useState(true);
  return (
    <>
      {contextHolder}
      <div className="oh flex flex-col justify-center py-4 px-5">
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
        <div className="mb-6 text-base font-semibold">软件基础信息</div>
        {/* <Descriptions className="oh" bordered items={listItem} /> */}
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
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="软件名称"
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
                label="SIG名称"
                name="domain"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="仓库地址"
                name="codeRepositoryUrl"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="孵化时长"
                name="incubationTime"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <DatePicker placeholder="" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                labelCol={{
                  span: 3,
                  style: { fontWeight: 'bold' },
                }}
                label="申请背景"
                name="selectionReason"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input.TextArea disabled={false} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className="my-6 text-base font-semibold">软件评估信息</div>
        <Collapse
          defaultActiveKey={['1']}
          ghost
          onChange={(key) => {
            setLabel(false);
          }}
          items={[
            {
              key: '1',
              label: label ? '点击收起软件评估报告' : '点击展开软件评估报告',
              children: <EvaluationDetail />,
            },
          ]}
        />
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
            提交
          </Button>
          {/* <Button
            className="rounded-none"
            htmlType="submit"
            onClick={() => {
              recall();
            }}
          >
            撤回
          </Button> */}
        </div>
      )}
    </>
  );
};

export default SelectionApplication;
