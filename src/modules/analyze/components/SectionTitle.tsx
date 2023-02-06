import React, { PropsWithChildren, useRef } from 'react';
import classnames from 'classnames';

const SectionTitle: React.FC<PropsWithChildren<{ id: string }>> = ({
  children,
  id,
}) => {
  return (
    <h2
      className={classnames(
        'group relative z-10 mb-6 scroll-mt-[180px] text-2xl',
        'md:px-4 md:text-xl'
      )}
      id={id}
    >
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
