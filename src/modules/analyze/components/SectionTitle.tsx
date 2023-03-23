import React, { PropsWithChildren, useRef } from 'react';
import classnames from 'classnames';

const SectionTitle: React.FC<PropsWithChildren<{ id: string }>> = ({
  children,
  id,
}) => {
  return (
    <h2
      className={classnames(
        'group relative z-10 mb-6 flex scroll-mt-[200px] text-2xl font-semibold',
        'md:px-4 md:text-xl'
      )}
      id={id}
    >
      <div className="relative mr-4 ml-1.5">
        <div className="absolute -top-[46px] left-[3px] h-[101px] w-0.5 bg-[#e5e5e5]" />
        <div className="relative mt-3 h-2 w-2 rounded bg-[#000000]"></div>
      </div>
      {children}
      <a href={`#${id}`}>
        <span className="invisible ml-2 cursor-pointer group-hover:visible group-hover:text-primary">
          #
        </span>
      </a>
    </h2>
  );
};

export default SectionTitle;
