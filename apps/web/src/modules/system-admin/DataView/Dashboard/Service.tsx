import React from 'react';
import { Row, Col } from 'antd';
import ServiceClickChart from './ServiceClickChart';
import ServiceTrendChart from './ServiceTrendChart';
import InsightChart from './InsightChart';
import HotSearchCard from './HotSearchCard';
import EvaluationChart from './EvaluationChart';
import DataHubCard from './DataHubCard';
import ActiveUsersByRegionChart from './ActiveUsersByRegionChart';
import UserSourceCard from './UserSourceCard';

const ServiceMonitor: React.FC = () => {
  return (
    <div>
      <Row gutter={[16, 24]}>
        {/* 第一行 */}
        {/* - 地图组件占满整行 */}
        <Col xs={24}>
          <ActiveUsersByRegionChart className="h-100" />
        </Col>
        {/* 第四行 */}
        <Col xs={24} lg={12}>
          <UserSourceCard className="h-96" />
        </Col>
        <Col xs={24} lg={12}>
          <ServiceClickChart className="h-96" />
        </Col>

        <Col xs={24} lg={12}>
          <ServiceTrendChart className="h-96" />
        </Col>

        {/* 第二行 */}
        <Col xs={24} lg={12}>
          <InsightChart className="h-96" />
        </Col>

        <Col xs={24} lg={12}>
          <HotSearchCard className="h-96" />
        </Col>

        {/* 第三行 */}
        <Col xs={24} lg={12}>
          <EvaluationChart className="h-96" />
        </Col>

        <Col xs={24} lg={12}>
          <DataHubCard className="h-96" />
        </Col>
      </Row>
    </div>
  );
};

export default ServiceMonitor;
