import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import Repos from './Repos';

const Trending = () => {
  return (
    <section
      className={classnames(
        'relative mx-auto grid w-[1200px] grid-cols-2 gap-x-8 pt-[40px] pb-[120px]',
        ''
      )}
    >
      <Repos />
      <Repos />
    </section>
  );
};

export default Trending;
