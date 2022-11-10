import React, { PropsWithChildren, useRef } from 'react';
import classnames from 'classnames';

const TopicTitle: React.FC<
  PropsWithChildren<{ id: string; paddingTop?: boolean }>
> = ({ children, id, paddingTop = false }) => {
  return (
    <h1
      className={classnames(
        'group relative z-20 mb-6 pt-[128px] text-3xl',
        'md:-mt-[108px] md:px-4 md:pt-[128px] md:text-3xl',
        [paddingTop ? '-mt-[108px]' : '-mt-[48px]']
      )}
      id={id}
    >
      {children}
      <a href={`#${id}`}>
        <span className="invisible ml-2 cursor-pointer group-hover:visible group-hover:text-primary">
          #
        </span>
      </a>
    </h1>
  );
};

export default TopicTitle;
