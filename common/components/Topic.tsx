import React, { PropsWithChildren, useRef } from 'react';
import classnames from 'classnames';

const Topic: React.FC<
  PropsWithChildren<{ id: string; paddingTop?: boolean }>
> = ({ children, id, paddingTop = false }) => {
  return (
    <h1
      className={classnames(
        'z-2 group relative mb-6 pt-[138px] text-3xl',
        'md:-mt-[108px] md:px-4 md:pt-[138px] md:text-3xl',
        [paddingTop ? '-mt-[138px]' : '-mt-[88px]']
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

export default Topic;
