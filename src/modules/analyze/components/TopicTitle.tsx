import React, { PropsWithChildren, useRef } from 'react';
import classnames from 'classnames';

const TopicTitle: React.FC<
  PropsWithChildren<{ id: string; paddingTop?: boolean; icon: React.ReactNode }>
> = ({ children, id, paddingTop = false, icon }) => {
  return (
    <h1
      className={classnames(
        'group relative z-20 mt-20 mb-8 flex scroll-mt-[180px] text-3xl',
        ' md:px-4  md:text-3xl'
      )}
      id={id}
    >
      {icon}
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
