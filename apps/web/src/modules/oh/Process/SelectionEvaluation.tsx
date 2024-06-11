import React, { useState } from 'react';
import { Button, Radio, Form, Input, Col, message, Tabs } from 'antd';
import EvaluationDetail from '@modules/oh/components/EvaluationInfo/EvaluationDetail';
import { procseeState, procseeActions } from '@modules/oh/Process/procseeState';
import { useSnapshot } from 'valtio';

const SelectionEvaluation = () => {
  const processesID = '孵化选型评审';
  const [submitLoading, setSubmitLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const snap = useSnapshot(procseeState);
  const { allProcesses } = snap;
  let proceedingProcesses = allProcesses.find(
    (item) => item.state === 'proceeding'
  );
  let isProceedingProcesses = proceedingProcesses.id === processesID;

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

  let tabItems = [
    {
      key: '2',
      label: <div className="mx-2">选型评估信息</div>,
      children: (
        <div className="pt-4">
          <EvaluationDetail />
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
            disabled={!isProceedingProcesses}
            autoComplete="off"
          >
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
      ),
    },
    {
      key: '4',
      label: <div className="mx-2">依赖关系解析</div>,
      children: '依赖关系解析',
      disabled: true,
    },
    {
      key: '5',
      label: <div className="mx-2">完整性信息维护</div>,
      children: '完整性信息维护',
      disabled: true,
    },
  ];
  return (
    <>
      {contextHolder}
      <div className="flex flex-col justify-center py-4 px-5">
        {/* <div className="mb-5 flex items-start gap-2 border border-[#91d5ff] bg-[#e6f7ff] px-3 py-2 text-xs leading-5">
          <ExclamationCircleTwoTone rev={undefined} className="mt-1" />
          <div>
            数据补全说明：若字段左侧出现符号，表示该字段信息为系统自动带出；若字段值左上角标示蓝色角标，表示该字段信息当前与版本火车或社区信息不一致，建议关注；
            “发布日期、“代码量”、“Copyright”已取消必填，若选型申请环节未填写，软件上车后数据治理团队/工具会自动补齐，并可在软件商城软件详情页进行查询
          </div>
        </div> */}

        <Tabs className="oh-antd" size={'small'} items={tabItems} />
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
          <Button className="rounded-none">转其他人</Button>
          <Button className="rounded-none" htmlType="button" onClick={onReset}>
            重置
          </Button>
        </div>
      )}
    </>
  );
};

export default SelectionEvaluation;
