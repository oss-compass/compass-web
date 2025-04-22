import React, { PropsWithChildren, useRef } from 'react';
import classnames from 'classnames';

const TopicTitle: React.FC<
  PropsWithChildren<{ id: string; paddingTop?: boolean; icon: React.ReactNode }>
> = ({ children, id, paddingTop = false, icon }) => {
  return (
    <h1
      className={classnames(
        'group relative mt-20 mb-10 flex scroll-mt-[200px] text-3xl font-semibold',
        ' md:px-4  md:text-3xl'
      )}
      id={id}
    >
      {icon}
      {children}
      <a href={`#${id}`}>
        <span className="group-hover:text-primary invisible ml-2 cursor-pointer group-hover:visible">
          #
        </span>
      </a>
    </h1>
  );
};

export default TopicTitle;
