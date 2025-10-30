import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Center } from '@common/components/Layout';
import {
  AiOutlineUser,
  AiOutlineProject,
  AiOutlineDatabase,
  AiOutlineBarChart,
  AiOutlineGlobal,
} from 'react-icons/ai';

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
  delay = 0,
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
        flex min-h-[160px] w-full flex-col
        items-center justify-center rounded-lg border
        border-gray-200 bg-white
        p-6 pb-2 transition-all
        duration-300 ease-out hover:border-gray-300 hover:shadow-lg
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
      `}
    >
      <div className="mb-3 text-3xl text-gray-800">{icon}</div>
      <div className="mb-2 text-2xl font-bold text-gray-900">
        {displayValue}
      </div>
      <div className="mb-1 text-center text-sm font-medium text-gray-900">
        {label}
      </div>
      {
        <div className="h-5 text-center text-xs leading-tight text-gray-500">
          {description}
        </div>
      }
    </div>
  );
};

const StatisticsModule: React.FC = () => {
  const { t, i18n } = useTranslation();

  // 根据语言环境获取格式化的数值
  const getFormattedValue = (key: string) => {
    const isEnglish = i18n.language === 'en';

    switch (key) {
      case 'open_source_projects':
        return isEnglish ? '600M' : '6亿';
      case 'active_users':
        return isEnglish ? '18.5K' : '18527';
      default:
        return '';
    }
  };

  return (
    <section className="py-16">
      <Center>
        <div className="w-full">
          {/* 标题样式与其他模块保持一致 */}
          {/* <div className="mb-6 text-2xl font-bold">{t('home:platform_statistics')}</div> */}

          {/* 五个统计卡片网格布局 */}
          <div className="grid grid-cols-5 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <StatisticCard
              icon={<AiOutlineDatabase />}
              value="10"
              label={t('home:data_platform_integration')}
              delay={100}
            />
            <StatisticCard
              icon={<AiOutlineBarChart />}
              value="114/50"
              label={t('home:evaluation_metrics_models')}
              delay={200}
            />
            <StatisticCard
              icon={<AiOutlineProject />}
              value={getFormattedValue('open_source_projects')}
              label={t('home:open_source_projects')}
              delay={300}
            />
            <StatisticCard
              icon={<AiOutlineGlobal />}
              value="93"
              label={t('home:countries_regions')}
              delay={400}
            />
            <StatisticCard
              icon={<AiOutlineUser />}
              value={getFormattedValue('active_users')}
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
