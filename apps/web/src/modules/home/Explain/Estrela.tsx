import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import styles from './index.module.scss';

const getRandomArbitrary = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
const Estrela: React.FC = () => {
  const [width, setWidth] = useState(900);
  useEffect(() => {
    const box = document.getElementById('sectionexplain');
    const offsetWidth = box?.offsetWidth;
    setWidth(offsetWidth || 900);
  }, []);
  return (
    <span
      style={{
        animationDelay: '0.' + getRandomArbitrary(0, 9) + 's',
        left: getRandomArbitrary(50, width) + 'px',
        top: getRandomArbitrary(50, 900) + 'px',
      }}
      className={classnames(
        styles['estrela'],
        styles[`estrelaStyle${getRandomArbitrary(1, 5)}`],
        styles[`estrelaOpacity${getRandomArbitrary(1, 4)}`],
        styles[`estrelaTam${getRandomArbitrary(1, 4)}`]
      )}
    ></span>
  );
};
export default React.memo(Estrela);
