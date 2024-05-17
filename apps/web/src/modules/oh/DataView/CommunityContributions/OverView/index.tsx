import React from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

const SigDetail = () => {
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '代码下载量',
      children: '2.79 亿次',
    },
    {
      key: '2',
      label: '门禁年度共执行',
      children: '45+ 万次',
    },
    {
      key: '3',
      label: '编译构建',
      children: '270+ 万次',
    },
    {
      key: '4',
      label: '社区用户数',
      children: '273+ 万人',
    },
    {
      key: '5',
      label: '贡献者',
      children: '6495 人',
    },
    {
      key: '6',
      label: 'PR',
      children: '47309 个',
    },
    {
      key: '7',
      label: '编译制作多形态设备版本',
      children: '270+ 次',
      span: 3,
    },
  ];
  return (
    <>
      <Descriptions title="总览" bordered items={items} />
      <div className="mt-4 mb-4 text-base font-semibold text-[#191919]">
        项目活跃度量
      </div>
      <div className=" p-4">
        <Row gutter={16}>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title={
                  <div className="!text-base text-black">commit : 234583</div>
                }
                value={40.69}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowUpOutlined rev={undefined} />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title={<div className="!text-base text-black">PR : 149286</div>}
                value={46.39}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowUpOutlined rev={undefined} />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title={
                  <div className="!text-base text-black">
                    Contributor : 9358
                  </div>
                }
                value={18.23}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowUpOutlined rev={undefined} />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title={
                  <div className="!text-base text-black">Issue : 119665</div>
                }
                value={63.28}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowUpOutlined rev={undefined} />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
      </div>
      <div className="mt-4 mb-4 text-base font-semibold text-[#191919]">
        项目影响力度量
      </div>
      <div className="p-4">
        <Row gutter={16}>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title={
                  <div className="!text-base text-black">
                    下载次数 : 27934583
                  </div>
                }
                value={90.69}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowUpOutlined rev={undefined} />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title={
                  <div className="!text-base text-black">关注人数 : 39304</div>
                }
                value={10.51}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowUpOutlined rev={undefined} />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title={
                  <div className="!text-base text-black">Star : 24312</div>
                }
                value={18.23}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowUpOutlined rev={undefined} />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title={
                  <div className="!text-base text-black">Fork : 67765</div>
                }
                value={53.28}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowUpOutlined rev={undefined} />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SigDetail;
