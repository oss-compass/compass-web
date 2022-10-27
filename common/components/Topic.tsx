import React, { PropsWithChildren, useRef } from 'react';
import useHashScroll from '@common/hooks/useHashScroll';

const Topic: React.FC<PropsWithChildren<{ id: string }>> = ({
  children,
  id,
}) => {
  const titleRef = useRef<HTMLDivElement>(null);

  return (
    <h1
      className="group relative z-10 -mt-10 mb-6 pt-24 text-3xl md:mt-9 md:mb-4 md:px-4 md:text-xl md:font-semibold"
      id={id}
      ref={titleRef}
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
