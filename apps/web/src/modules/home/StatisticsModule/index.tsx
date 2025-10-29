import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Center } from '@common/components/Layout';
import { AiOutlineUser, AiOutlineProject, AiOutlineDatabase, AiOutlineBarChart, AiOutlineGlobal } from 'react-icons/ai';

interface StatisticCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  description?: string;
  delay?: number;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  icon,
  value,
  label,
  description,
  delay = 0
}) => {
  const [displayValue, setDisplayValue] = useState('0');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // 数字动画效果
      const numericValue = parseFloat(value.replace(/[^\d]/g, ''));
      let current = 0;
      const increment = numericValue / 30;
      const interval = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setDisplayValue(value);
          clearInterval(interval);
        } else {
          setDisplayValue(Math.floor(current).toString());
        }
      }, 50);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div
      className={`
        flex flex-col items-center justify-center
        bg-white rounded-lg border border-gray-200
        hover:border-gray-300 hover:shadow-lg
        transition-all duration-300 ease-out
        p-6 min-h-[160px] w-full
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <div className="text-3xl text-gray-800 mb-3">
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-2">
        {displayValue}
      </div>
      <div className="text-sm text-gray-900 text-center font-medium mb-1">
        {label}
      </div>
      {description && (
        <div className="text-xs text-gray-500 text-center leading-tight">
          {description}
        </div>
      )}
    </div>
  );
};

const StatisticsModule: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16">
      <Center>
        <div className="w-full">
          {/* 标题样式与其他模块保持一致 */}
          {/* <div className="mb-6 text-2xl font-bold">{t('home:platform_statistics')}</div> */}

          {/* 五个统计卡片网格布局 */}
          <div className="grid grid-cols-5 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            <StatisticCard
              icon={<AiOutlineDatabase />}
              value="10+"
              label={t('home:data_platform_integration')}
              description={t('home:data_platform_integration_desc')}
              delay={100}
            />
            <StatisticCard
              icon={<AiOutlineBarChart />}
              value="114/30+"
              label={t('home:evaluation_metrics_models')}
              description={t('home:evaluation_metrics_models_desc')}
              delay={200}
            />
            <StatisticCard
              icon={<AiOutlineProject />}
              value="1.5亿+"
              label={t('home:open_source_projects')}
              description={t('home:open_source_projects_desc')}
              delay={300}
            />
            <StatisticCard
              icon={<AiOutlineGlobal />}
              value="55"
              label={t('home:countries_regions')}
              description={t('home:countries_regions_desc')}
              delay={400}
            />
            <StatisticCard
              icon={<AiOutlineUser />}
              value="1.85万+"
              label={t('home:active_users_new')}
              description={t('home:active_users_new_desc')}
              delay={500}
            />
          </div>
        </div>
      </Center>
    </section>
  );
};

export default StatisticsModule;