import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';
import DatePicker from '@common/components/DatePicker';
import { incubationTimeList } from '@modules/oh/constant';
import ReportPageItems from '@modules/oh/DataView/HatchingTreatment/Graduate/Report/ReportPageItems';
import { DownOutlined } from '@ant-design/icons';

const SelectionForm = ({ form, report, setOpenConfirm }) => {
  return (
    <div className="flex w-full flex-col justify-center px-5 pt-4">
      <Form
        className="w-full"
        form={form}
        labelCol={{
          span: 6,
          style: { fontWeight: 'bold' },
        }}
        style={{
          width: '100%',
        }}
        disabled={!report}
        autoComplete="off"
      >
        <>
          <Col span={12} className="mt-4">
            <Form.Item
              label="选择软件"
              name="name"
              rules={[{ required: true, message: '请输入!' }]}
            >
              <Input
                suffix={<DownOutlined className="text-[#d9d9d9]" />}
                disabled={false}
                onClick={() => {
                  setOpenConfirm(true);
                }}
                readOnly
              ></Input>
            </Form.Item>
          </Col>
          {report.length > 0 && (
            <>
              <div className="mb-6 text-base font-semibold">仓库信息</div>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    label="需求来源"
                    name="demandSource"
                    labelCol={{
                      span: 3,
                      style: { fontWeight: 'bold' },
                    }}
                    rules={[{ required: true, message: '请输入!' }]}
                  >
                    <Input
                      placeholder="请列出您需要使用三方软件的需求来源"
                      disabled={false}
                      onFocus={() => {}}
                      // addonBefore="https://gitee.com/openharmony-tpc/ohos_"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="功能描述"
                    name="functionalDescription"
                    labelCol={{
                      span: 3,
                      style: { fontWeight: 'bold' },
                    }}
                    rules={[{ required: true, message: '请输入!' }]}
                  >
                    <Input
                      placeholder="请列出您需要使用该软件的主要功能"
                      disabled={false}
                      onFocus={() => {}}
                      // addonBefore="https://gitee.com/openharmony-tpc/ohos_"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    labelCol={{
                      span: 3,
                      style: { fontWeight: 'bold' },
                    }}
                    label="垂域Committers"
                    name="committers"
                    rules={[{ required: true, message: '请输入!' }]}
                  >
                    <Input
                      placeholder="需填写 Committers 的 Gitee/Github 用户名，多个
                          Committers 用逗号分开"
                      disabled={true}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="孵化开始时间" name="incubationStartTime">
                    <DatePicker placeholder="请选择" format={'YYYY-MM-DD'} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="孵化周期" name="incubationTime">
                    <Select disabled={false}>
                      {incubationTimeList.map((item) => {
                        return (
                          <Select.Option key={item} value={item}>
                            {item}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              {report.length > 0 && (
                <>
                  <div className="mb-4 text-base font-semibold">报告信息</div>
                  <ReportPageItems reportItems={report} />
                </>
              )}
            </>
          )}
        </>
      </Form>
    </div>
  );
};

export default SelectionForm;
