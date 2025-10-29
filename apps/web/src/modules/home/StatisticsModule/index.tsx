import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Center } from '@common/components/Layout';
import { AiOutlineUser, AiOutlineProject } from 'react-icons/ai';

interface StatisticCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay?: number;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  icon,
  value,
  label,
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
         min-h-[180px] w-full
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <div className="text-4xl text-gray-800 mb-4">
        {icon}
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">
        {displayValue}
      </div>
      <div className="text-sm text-gray-600 text-center font-medium">
        {label}
      </div>
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
          <div className="mb-6 text-2xl font-bold">{t('home:platform_statistics')}</div>

          {/* 两个统计卡片左右分布 */}
          <div className="flex gap-8 md:flex-col">
            <StatisticCard
              icon={<AiOutlineUser />}
              value="18500"
              label={t('home:active_users')}
              delay={200}
            />
            <StatisticCard
              icon={<AiOutlineProject />}
              value="204493"
              label={t('home:collected_projects')}
              delay={400}
            />
          </div>
        </div>
      </Center>
    </section>
  );
};

export default StatisticsModule;