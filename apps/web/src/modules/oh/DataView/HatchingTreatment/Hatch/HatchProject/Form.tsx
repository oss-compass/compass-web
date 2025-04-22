import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Space,
  Popover,
  Radio,
  Button,
} from 'antd';
import { incubationTimeList } from '@modules/oh/constant';
import { getPathname } from '@common/utils';
import { MinusOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
const SelectionForm = ({ form, report, setOpenConfirm }) => {
  const [sameCheck, setSameCheck] = useState(false);

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
                <Col span={12}>
                  <Form.Item
                    label="孵化周期"
                    name="incubationTime"
                    rules={[{ required: true, message: '请选择!' }]}
                  >
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

                <Col span={12}>
                  <Form.Item
                    label="目标孵化软件"
                    name="targetSoftware"
                    rules={[{ required: true, message: '请输入!' }]}
                  >
                    <Select
                      onChange={(value) => {
                        form.setFieldsValue({
                          committers: report
                            .find((item) => item.codeUrl.includes(value))
                            ?.tpcSoftwareSig?.sigCommitter?.map(
                              (i) => i.giteeAccount
                            )
                            .join(', '),
                        });
                      }}
                      disabled={false}
                    >
                      {report.map((item) => {
                        return (
                          <Select.Option
                            key={item.id}
                            value={getPathname(item.codeUrl)}
                          >
                            {getPathname(item.codeUrl)}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
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
                    labelCol={{
                      span: 3,
                      style: { fontWeight: 'bold' },
                    }}
                    label="需求描述"
                    name="reason"
                    rules={[{ required: true, message: '请输入!' }]}
                  >
                    <Input
                      placeholder="请列出您需要使用三方软件的主要场景"
                      disabled={false}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    labelCol={{
                      span: 3,
                      style: { fontWeight: 'bold' },
                    }}
                    label="功能描述"
                    name="functionalDescription"
                    rules={[{ required: true, message: '请输入!' }]}
                  >
                    <Input
                      placeholder="请列出您需要使用三方软件的主要功能"
                      disabled={false}
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
                <Col span={12} className="relative">
                  <Popover
                    placement="topLeft"
                    arrow={false}
                    content={
                      <>
                        <div>存在已完成适配的同类型三方库</div>
                      </>
                    }
                    trigger="hover"
                  >
                    <Form.Item
                      label="存在同类型三方库"
                      rules={[{ required: true, message: '请输入!' }]}
                      name="isSameTypeCheck"
                      initialValue={0}
                    >
                      <Radio.Group
                        className="mt-1 ml-2"
                        onChange={(e) => {
                          if (e.target.value === 1) {
                            setSameCheck(true);
                          } else {
                            setSameCheck(false);
                          }
                        }}
                      >
                        <Radio value={1}>是</Radio>
                        <Radio value={0}>否</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Popover>
                </Col>
                <Col span={12} className="relative">
                  {sameCheck && (
                    <Form.Item
                      // className="absolute -top-1 right-3 w-[50%]"
                      label="同类型三方库链接"
                      name="sameTypeSoftwareName"
                    >
                      <Input placeholder="请输入同类型三方库链接" />
                    </Form.Item>
                  )}
                </Col>

                <Form.List name="repoUrl" initialValue={[{ repoUrl: '' }]}>
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => (
                        <>
                          <Col span={12}>
                            <Form.Item
                              label={`适配仓路径${index ? index + 1 : ''}`}
                              key={field.key}
                              name={[field.name, 'repoUrl']}
                              rules={[{ required: true, message: '请输入!' }]}
                            >
                              <Space.Compact style={{ width: '100%' }}>
                                <Input
                                  placeholder="填写完成 OH 适配后的仓库路径"
                                  disabled={false}
                                />
                                {index === 0 ? (
                                  <Button
                                    className="rounded-none pt-0"
                                    type="primary"
                                    onClick={() => add()}
                                  >
                                    <PlusOutlined />
                                  </Button>
                                ) : (
                                  <Button
                                    className="dynamic-delete-button rounded-none pt-0"
                                    onClick={() => remove(field.name)}
                                  >
                                    <MinusOutlined />
                                  </Button>
                                )}
                              </Space.Compact>
                            </Form.Item>
                          </Col>
                          <Col span={1}></Col>
                        </>
                      ))}
                    </>
                  )}
                </Form.List>
              </Row>
            </>
          )}
        </>
      </Form>
    </div>
  );
};

export default SelectionForm;
