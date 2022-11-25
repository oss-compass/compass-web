import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import styles from './index.module.scss';

const Plant: React.FC<
  PropsWithChildren<{
    prop: { top: number; left: number; size: number; color: string };
    className: string;
    onMouseHover: () => void;
  }>
> = ({ children, prop, className, onMouseHover }) => {
  return (
    <div
      style={{
        top: prop.top + 'px',
        left: prop.left + 'px',
        width: prop.size + 'px',
        height: prop.size + 'px',
      }}
      className={classnames(
        styles.box,
        styles[prop.color],
        'absolute md:hidden',
        className
      )}
    >
      <div
        className={styles.boxHover}
        onMouseEnter={() => {
          onMouseHover();
        }}
      ></div>
      {children}
    </div>
  );
};

export default React.memo(Plant);
