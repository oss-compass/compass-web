import React from 'react';
import { Card } from 'antd';
import { useTranslation } from 'next-i18next';
import EcoCharts from './EcoCharts';
import { EcoData } from '../../types';

interface EcosystemChartsProps {
  data: EcoData[];
}

const EcosystemCharts: React.FC<EcosystemChartsProps> = ({ data }) => {
  const { t } = useTranslation('intelligent_analysis');
  
  if (data.length === 0) {
    return null;
  }

  return (
    <Card title={t('project_detail.ecosystem.charts_title')} className="mb-6">
      <div style={{ minHeight: '500px' }}>
        <EcoCharts data={data} />
      </div>
    </Card>
  );
};

export default EcosystemCharts;
