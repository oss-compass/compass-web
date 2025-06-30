import React, { useState } from 'react';
import { Center } from '@common/components/Layout';
import Search from './Search';
import Carousel from './Carousel';
import { SEARCH_TYPES } from './Search/constants';
import styles from './index.module.scss';
import { SearchType } from './Search/types';

const SectionBanner = () => {
  const [highlightSearch, setHighlightSearch] = useState(false);
  const [searchType, setSearchType] = useState<SearchType>(
    SEARCH_TYPES.REPOSITORY
  );

  /**
   * 处理轮播图点击事件
   * @param moduleId 模块ID
   */
  const handleCarouselClick = (moduleId: string) => {
    if (moduleId === 'developer-profile') {
      setSearchType(SEARCH_TYPES.DEVELOPER);
      setHighlightSearch(true);
    } else if (moduleId === 'health-assessment') {
      setSearchType(SEARCH_TYPES.REPOSITORY);
      setHighlightSearch(true);
    }

    // 3秒后取消高亮
    setTimeout(() => {
      setHighlightSearch(false);
    }, 3000);
  };

  return (
    <section className={`${styles.bg}`}>
      <Center className="relative z-10 mx-auto flex h-[620px] gap-2 md:h-[500px]">
        <Carousel onModuleClick={handleCarouselClick} />
        <Search highlight={highlightSearch} defaultSearchType={searchType} />
      </Center>
    </section>
  );
};

export default SectionBanner;
