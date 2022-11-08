import React, { PropsWithChildren, useRef } from 'react';
import classnames from 'classnames';

const MenuSection: React.FC<PropsWithChildren<{ id: string }>> = ({
  children,
  id,
}) => {
  return (
    <h1
      className={classnames(
        'z-1 group relative mb-6 -mt-[118px] pt-[138px] text-2xl',
        'md:-mt-[138px] md:px-4 md:pt-[138px] md:text-xl'
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

export default MenuSection;
