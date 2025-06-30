import React, { memo, useState, useRef } from 'react';
import Image from 'next/image';
import { Carousel } from 'antd';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';

const getShortTitle = (title: string) => {
  const shortTitles = {
    'Open Source Ecosystem Evaluation System': 'Ecosystem Evaluation',
    'Open Source Situation Insight': 'Situation Insight',
    'Open Source Selection Evaluation': 'Selection Evaluation',
    'Developer Persona Evaluation': 'Developer Persona',
    'OSS Data Hub': 'Data Hub',
  };
  return shortTitles[title] || title;
};
interface CarouselContentProps {
  onModuleClick?: (moduleId: string) => void;
}

const CarouselContent: React.FC<CarouselContentProps> = ({ onModuleClick }) => {
  const { t, i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  // 五个模块的数据
  const modules = [
    {
      id: 'os-situation',
      title: t('common:header.opensource_insight_service'),
      image: '/images/home/hero1.png',
      link: '/os-situation',
    },
    {
      id: 'selection-evaluation',
      title: t('common:header.opensource_selection_service'),
      image: '/images/home/hero2.png',
      link: '/os-selection',
    },
    {
      id: 'developer-profile',
      title: t('common:header.developer_influence_service'),
      image: '/images/home/hero3.png',
    },
    {
      id: 'health-assessment',
      title: t('common:header.opensource_assessment_service'),
      image: '/images/home/hero5.png',
    },
    {
      id: 'data-hub',
      link: '/dataHub',
      title: t('common:header.opensource_research_service'),
      image: '/images/home/hero4.png', // 后续替换为对应图片
    },
  ];

  const carouselRef = useRef(null);

  const handleModuleClick = (index) => {
    setCurrentSlide(index);
    if (carouselRef.current) {
      carouselRef.current.goTo(index);
    }
  };
  const carouselModuleClick = (module) => {
    // 如果模块有链接，跳转到对应页面
    if (module.link) {
      window.location.href = module.link;
    } else {
      // 如果没有链接，触发搜索高亮
      onModuleClick?.(module.id);
    }
  };
  return (
    <div
      className={classnames(
        'absolute top-[80px] -right-10 w-[650px] overflow-hidden pb-6 md:hidden',
        styles.searchBg
      )}
    >
      {/* 轮播图区域 */}
      <div className="relative h-[400px] w-full cursor-pointer overflow-hidden rounded-xl border backdrop-blur-md">
        <Carousel
          dots={false}
          ref={carouselRef}
          autoplaySpeed={8000}
          autoplay
          beforeChange={(from, to) => setCurrentSlide(to)}
          className="h-full"
        >
          {modules.map((module, index) => (
            <div
              onClick={() => carouselModuleClick(module)}
              key={module.id}
              className="relative h-[400px] w-full"
            >
              <Image
                src={module.image}
                alt={module.title}
                height={400}
                width={650}
                // fill
                // className="object-cover"
                priority={index === 0}
              />
              {/* 渐变遮罩层 */}
              {/* <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-primary/20" /> */}
              {/* 图片上的文字覆盖层 */}
              {/* <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-8">
                  <h2 className="text-4xl font-bold mb-4 tracking-wide drop-shadow-lg">{module.title}</h2>
                  <p className="text-xl opacity-95 font-light tracking-wide drop-shadow-md max-w-md mx-auto">{module.description}</p>
                </div>
              </div> */}
              {/* 装饰性边框 */}
              {/* <div className="absolute inset-0 rounded-2xl border-2 border-white/10" /> */}
            </div>
          ))}
        </Carousel>
      </div>

      {/* 进度指示器 */}
      <div className="mt-3 flex justify-center">
        <div className="flex space-x-2">
          {modules.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-500 ${
                currentSlide === index ? 'w-8 bg-black' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 模块标题导航区域 */}
      <div className="mt-3 flex justify-center">
        <div className="flex items-center space-x-1 rounded-full border bg-white/90 px-2 py-1.5 backdrop-blur-md">
          {modules.map((module, index) => {
            // 为长标题创建更短的缩写版本

            return (
              <button
                key={module.id}
                onClick={() => handleModuleClick(index)}
                className={`group relative rounded-full px-3 py-1.5 ${
                  i18n.language === 'zh' ? 'text-sm' : 'text-xs'
                } overflow-hidden whitespace-nowrap font-medium transition-all duration-500 ease-out ${
                  currentSlide === index
                    ? 'scale-105 transform bg-black text-white'
                    : 'hover:bg-black/8 hover:scale-102 text-black hover:text-black'
                }`}
              >
                <span className="relative z-10 block truncate transition-transform duration-300 group-hover:scale-105">
                  {getShortTitle(module.title)}
                </span>
                {currentSlide === index && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-black via-black to-black/90" />
                )}
                {/* 悬停效果 */}
                <div className="absolute inset-0 scale-0 rounded-full bg-black/10 transition-transform duration-300 group-hover:scale-100" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CarouselContent;
