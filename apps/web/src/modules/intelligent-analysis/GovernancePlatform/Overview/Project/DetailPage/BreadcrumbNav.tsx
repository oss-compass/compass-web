import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useTranslation } from 'next-i18next';
import { PROJECT_DISPLAY_NAME_MAP } from '../../utils';

interface BreadcrumbNavProps {
  projectType: string;
  userId: string;
  onBack: () => void;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  projectType,
  userId,
  onBack,
}) => {
  const { t } = useTranslation('intelligent_analysis');

  // 获取项目显示名称
  const projectDisplayName =
    PROJECT_DISPLAY_NAME_MAP[projectType] || projectType;

  return (
    <div className="mb-6">
      <Breadcrumb
        className="mb-4 text-base"
        items={[
          {
            href: '/intelligent-analysis/overview',
            title: (
              <span className="flex items-center">
                <HomeOutlined />
                <span className="ml-1">{t('overview')}</span>
              </span>
            ),
          },
          {
            title: projectDisplayName,
            onClick: onBack,
            className: 'cursor-pointer hover:text-blue-600',
          },
          {
            title: t('project_detail.breadcrumb.user_details', { userId }),
          },
        ]}
      />
    </div>
  );
};

export default BreadcrumbNav;
