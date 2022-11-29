import React, { PropsWithChildren, useRef } from 'react';
import classnames from 'classnames';

const TopicTitle: React.FC<
  PropsWithChildren<{ id: string; paddingTop?: boolean }>
> = ({ children, id, paddingTop = false }) => {
  return (
    <h1
      className={classnames(
        'group relative z-20 mt-20 mb-8 scroll-mt-[140px] text-3xl',
        ' md:px-4  md:text-3xl'
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
