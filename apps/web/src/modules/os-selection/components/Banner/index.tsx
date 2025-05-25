import React from 'react';
import styles from './index.module.css';

const Banner = () => {
  return (
    <div className={`${styles.headerBgLine} py-16`}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">
            开源软件选型引擎
          </h1>
          <p className="text-lg text-gray-600">
            智能推荐最适合您需求的开源软件解决方案
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
