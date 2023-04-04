import React, { PropsWithChildren, useEffect } from 'react';
import classnames from 'classnames';
import { useInViewport } from 'ahooks';
import useTopicNavbarScroll from '@modules/analyze/hooks/useTopicNavbarScroll';
import { CiGrid41 } from 'react-icons/ci';
import ProductivityIcon from '@modules/analyze/components/SideBar/assets/Productivity.svg';
import RobustnessIcon from '@modules/analyze/components/SideBar/assets/Robustness.svg';
import NicheCreationIcon from '@modules/analyze/components/SideBar/assets/NicheCreation.svg';

const TopicNavbar = () => {
  interface IconMap {
    [key: string]: React.ReactNode;
  }
  const iconMap: IconMap = {
    Overview: <CiGrid41 className="mr-2 h-4 w-4" />,
    Productivity: <ProductivityIcon className="mr-2 h-4 w-4" />,
    Robustness: <RobustnessIcon className=" mr-2 h-4 w-4" />,
    'Niche Creation': <NicheCreationIcon className="mr-2 h-4 w-4" />,
    概览: <CiGrid41 className="mr-2 h-4 w-4" />,
    生产力: <ProductivityIcon className="mr-2 h-4 w-4" />,
    稳健性: <RobustnessIcon className=" mr-2 h-4 w-4" />,
    创新力: <NicheCreationIcon className="mr-2 h-4 w-4" />,
  };
  const [inViewport] = useInViewport(
    document.getElementById('topic_overview_navbar')
  );
  const { topicId, subId } = useTopicNavbarScroll();

  return (
    <div
      className={classnames(
        'absolute left-64 z-header h-10 w-[calc(100%-16rem)]  border-b bg-white text-sm leading-10 transition-all lg:left-0 lg:w-full ',
        [inViewport === false ? 'block' : 'hidden']
      )}
    >
      {topicId && (
        <a className="p flex cursor-pointer items-center rounded px-4 font-semibold">
          {iconMap[topicId]}
          <h3>
            {topicId}
            {subId && ' / ' + subId}
          </h3>
        </a>
      )}
    </div>
  );
};

export default TopicNavbar;
