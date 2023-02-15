import React from 'react';
import classnames from 'classnames';

const Banner: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div
      className={classnames(
        'relative h-40 overflow-hidden bg-[#2c5fea]',
        "bg-[url('/images/explore/bg-line.png')] bg-[length:89px_57px] bg-repeat"
      )}
    >
      <div className="relative mx-auto w-[1280px] pt-12 text-5xl font-medium text-white md:w-full md:px-2">
        {content}
        <div
          className={classnames(
            'absolute top-0 right-10 h-[160px] w-[169px]',
            "bg-[url('/images/explore/bg-graph.png')] bg-cover bg-no-repeat"
          )}
        ></div>
      </div>
    </div>
  );
};

export default Banner;
