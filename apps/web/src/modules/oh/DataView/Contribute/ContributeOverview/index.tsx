import React from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import TableCard from '@modules/oh/components/TableCard';
import CodeChart from './CodeChart';
import CodePie from './CodePie';

const ContributeOverview = () => {
  return (
    <>
      <TableCard title={'总览'} id={'contributeOverview1'}>
        <div className="flex flex-col gap-4">
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic
                  title={
                    <div className="!text-base text-black">commit : 234583</div>
                  }
                  value={40.69}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title={
                    <div className="!text-base text-black">PR : 149286</div>
                  }
                  value={46.39}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title={
                    <div className="!text-base text-black">
                      Contributor : 9358
                    </div>
                  }
                  value={18.23}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title={
                    <div className="!text-base text-black">Issue : 119665</div>
                  }
                  value={63.28}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic
                  title={
                    <div className="!text-base text-black">
                      下载次数 : 27934583
                    </div>
                  }
                  value={90.69}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title={
                    <div className="!text-base text-black">
                      关注人数 : 39304
                    </div>
                  }
                  value={10.51}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title={
                    <div className="!text-base text-black">Star : 24312</div>
                  }
                  value={18.23}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title={
                    <div className="!text-base text-black">Fork : 67765</div>
                  }
                  value={53.28}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </TableCard>
      <CodeChart />
      <CodePie />
    </>
  );
};

export default ContributeOverview;
