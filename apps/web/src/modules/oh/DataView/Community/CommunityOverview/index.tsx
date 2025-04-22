import React from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import TableCard from '@modules/oh/components/TableCard';
import Chart from './Chart';

const ContributeOverview = () => {
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
      <TableCard title={'总览'} id={'contributeOverview1'}>
        <div className="flex flex-col gap-4">
          <Row gutter={16}>
            <Col span={4}>
              <Card>
                <Statistic
                  title={
                    <div className="mb-4 !text-base text-black">仓库数量 </div>
                  }
                  value={588}
                  // precision={2}
                  valueStyle={{
                    color: '#cf1322',

                    fontSize: '30px',
                  }}
                  // prefix={}
                  // suffix={<ArrowUpOutlined   />}
                />
              </Card>
            </Col>
            <Col span={4}>
              <Card>
                <Statistic
                  title={
                    <div className="mb-4 !text-base text-black">SIG 数量</div>
                  }
                  value={38}
                  // precision={2}
                  valueStyle={{
                    color: '#cf1322',

                    fontSize: '30px',
                  }}
                  // prefix={}
                  // suffix={<ArrowUpOutlined   />}
                />
              </Card>
            </Col>
            <Col span={4}>
              <Card>
                <Statistic
                  title={
                    <div className="mb-4 !text-base text-black">社区用户数</div>
                  }
                  value={35492}
                  // precision={2}
                  valueStyle={{
                    color: '#cf1322',

                    fontSize: '30px',
                  }}
                  // prefix={}
                  // suffix={<ArrowUpOutlined   />}
                />
              </Card>
            </Col>
            <Col span={4}>
              <Card>
                <Statistic
                  title={
                    <div className="mb-4 !text-base text-black">社区活跃度</div>
                  }
                  value={92}
                  // precision={2}
                  valueStyle={{
                    color: '#cf1322',

                    fontSize: '30px',
                  }}
                  // prefix={}
                  // suffix={<ArrowUpOutlined   />}
                />
              </Card>
            </Col>
            <Col span={4}>
              <Card>
                <Statistic
                  title={
                    <div className="mb-4 !text-base text-black">社区响应</div>
                  }
                  value={91}
                  // precision={2}
                  valueStyle={{
                    color: '#cf1322',

                    fontSize: '30px',
                  }}
                  // prefix={}
                  // suffix={<ArrowUpOutlined   />}
                />
              </Card>
            </Col>
            <Col span={4}>
              <Card>
                <Statistic
                  title={
                    <div className="mb-4 !text-base text-black">代码贡献</div>
                  }
                  value={88}
                  // precision={2}
                  valueStyle={{
                    color: '#cf1322',
                    fontSize: '30px',
                  }}
                  // prefix={}
                  // suffix={<ArrowUpOutlined   />}
                />
              </Card>
            </Col>
          </Row>
          {/* <Row gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic
                  title={
                    <div className="mb-4 !text-base text-black">
                      社区活跃度{' '}
                    </div>
                  }
                  value={92}
                  // precision={2}
                  valueStyle={{
                    color: '#cf1322',

                    fontSize: '30px',
                  }}
                  // prefix={}
                  // suffix={<ArrowUpOutlined   />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title={
                    <div className="mb-4 !text-base text-black">SIG 数 </div>
                  }
                  value={30}
                  // precision={2}
                  valueStyle={{
                    color: '#cf1322',
                    fontSize: '30px',
                  }}
                  // prefix={}
                  // suffix={<ArrowUpOutlined   />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title={
                    <div className="mb-4 !text-base text-black">
                      贡献者数量{' '}
                    </div>
                  }
                  value={33410}
                  // precision={2}
                  valueStyle={{
                    color: '#cf1322',

                    fontSize: '30px',
                  }}
                  // prefix={}
                  // suffix={<ArrowUpOutlined   />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title={
                    <div className="mb-4 !text-base text-black">
                      Issue 数量{' '}
                    </div>
                  }
                  value={92}
                  // precision={2}
                  valueStyle={{
                    color: '#cf1322',

                    fontSize: '30px',
                  }}
                  // prefix={}
                  // suffix={<ArrowUpOutlined   />}
                />
              </Card>
            </Col>
          </Row> */}
        </div>
      </TableCard>
      <TableCard title={'SIG 模型指标看板'} id={'contributeActive'}>
        <Chart />
      </TableCard>
    </>
  );
};

export default ContributeOverview;
