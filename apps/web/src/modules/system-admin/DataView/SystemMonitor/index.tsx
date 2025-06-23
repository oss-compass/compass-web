import React from 'react';
import { Card, Row, Col, Progress, Statistic } from 'antd';
import {
  DatabaseOutlined,
  CloudServerOutlined,
  HddOutlined,
  WifiOutlined,
} from '@ant-design/icons';

const SystemMonitor: React.FC = () => {
  return (
    <div>
      {/* 系统概览 */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="CPU使用率"
              value={68.5}
              precision={1}
              suffix="%"
              prefix={<CloudServerOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <Progress percent={68.5} size="small" className="mt-2" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="内存使用率"
              value={75.2}
              precision={1}
              suffix="%"
              prefix={<DatabaseOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <Progress percent={75.2} size="small" className="mt-2" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="磁盘使用率"
              value={45.8}
              precision={1}
              suffix="%"
              prefix={<HddOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
            <Progress percent={45.8} size="small" className="mt-2" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="网络带宽"
              value={128.5}
              precision={1}
              suffix="Mbps"
              prefix={<WifiOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
            <div className="h-5" />
          </Card>
        </Col>
      </Row>

      {/* 详细监控信息 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="CPU详细信息">
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex justify-between">
                  <span>核心1</span>
                  <span>65%</span>
                </div>
                <Progress percent={65} size="small" />
              </div>
              <div>
                <div className="mb-1 flex justify-between">
                  <span>核心2</span>
                  <span>72%</span>
                </div>
                <Progress percent={72} size="small" />
              </div>
              <div>
                <div className="mb-1 flex justify-between">
                  <span>核心3</span>
                  <span>58%</span>
                </div>
                <Progress percent={58} size="small" />
              </div>
              <div>
                <div className="mb-1 flex justify-between">
                  <span>核心4</span>
                  <span>79%</span>
                </div>
                <Progress percent={79} size="small" />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="内存详细信息">
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex justify-between">
                  <span>已使用内存</span>
                  <span>12.1 GB / 16 GB</span>
                </div>
                <Progress percent={75.6} size="small" />
              </div>
              <div>
                <div className="mb-1 flex justify-between">
                  <span>缓存</span>
                  <span>2.8 GB</span>
                </div>
                <Progress percent={17.5} size="small" strokeColor="#52c41a" />
              </div>
              <div>
                <div className="mb-1 flex justify-between">
                  <span>缓冲区</span>
                  <span>1.1 GB</span>
                </div>
                <Progress percent={6.9} size="small" strokeColor="#1890ff" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={24} lg={12}>
          <Card title="磁盘使用情况">
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex justify-between">
                  <span>/dev/sda1 (系统盘)</span>
                  <span>45.8 GB / 100 GB</span>
                </div>
                <Progress percent={45.8} size="small" />
              </div>
              <div>
                <div className="mb-1 flex justify-between">
                  <span>/dev/sda2 (数据盘)</span>
                  <span>128.5 GB / 500 GB</span>
                </div>
                <Progress percent={25.7} size="small" />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="网络流量">
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex justify-between">
                  <span>入站流量</span>
                  <span>85.2 Mbps</span>
                </div>
                <Progress percent={66.4} size="small" strokeColor="#52c41a" />
              </div>
              <div>
                <div className="mb-1 flex justify-between">
                  <span>出站流量</span>
                  <span>43.3 Mbps</span>
                </div>
                <Progress percent={33.7} size="small" strokeColor="#1890ff" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SystemMonitor;
