import React, { useState } from 'react';
import { Button, Radio, Form, Input, Col, message, Tabs, Result } from 'antd';
import {
  procseeState,
  procseeActions,
} from '@modules/oh/DataView/HatchingTreatment/Process/procseeState';
import { useSnapshot } from 'valtio';
import { LoadingOutlined } from '@ant-design/icons';

const AutomaticStorage = () => {
  const processesID = '入库自动化处理';
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
      setTimeout(() => {
        procseeActions.setNextProcsee(processesID);
      }, 2000);
      console.log(values);
    });
  };
  const onReset = () => {
    form.resetFields();
  };
  const [loading, setLoading] = useState(isProceedingProcesses);
  setTimeout(() => {
    setLoading(false);
    submit();
  }, 3000);
  return (
    <>
      {contextHolder}
      <div className="flex flex-col justify-center py-4 px-5">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-7xl text-[#1677ff]">
            <LoadingOutlined rev={undefined} />
            <div className="mt-6 text-2xl text-black">
              查询入库自动化处理状态中
            </div>
          </div>
        ) : (
          <Result status="success" title="入库自动化处理成功!" />
        )}
      </div>
      {/* {isProceedingProcesses && (
        <div className="fixed bottom-2 flex w-[99%] justify-center gap-2">
          {!loading && (
            <Button
              className="rounded-none"
              type="primary"
              loading={submitLoading}
              onClick={() => {
                submit();
              }}
            >
              结束
            </Button>
          )}
        </div>
      )} */}
    </>
  );
};

export default AutomaticStorage;
