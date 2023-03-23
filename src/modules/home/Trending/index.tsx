import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import Repos from './Repos';
import Community from './Community';

const Trending = () => {
  return (
    <section
      className={classnames(
        'relative mx-auto grid w-[1200px] grid-cols-2 gap-x-8 pt-[40px] pb-[120px]',
        'lg:w-full lg:grid-cols-1 lg:gap-y-6 lg:px-4'
      )}
    >
      <Repos />
      <Community />
    </section>
  );
};

export default Trending;
