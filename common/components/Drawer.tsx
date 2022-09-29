import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { useLockBodyScroll } from 'react-use';

const Drawer: React.FC<
  PropsWithChildren<{ visible: boolean; onClose: () => void }>
> = ({ visible, onClose, children }) => {
  // useLockBodyScroll(visible);
  return (
    <div
      className={classnames(
        'fixed left-full right-0 top-0 bottom-0 z-drawer h-screen w-screen',
        { '!left-0': visible }
      )}
    >
      <div
        className={classnames(
          'absolute top-0 left-full bottom-0 right-0 z-mask bg-mask opacity-5 transition-opacity',
          { '!left-0 !opacity-100': visible }
        )}
        onClick={() => onClose()}
      />
      <div
        className={classnames(
          'fixed top-0 bottom-0 -left-full z-drawer w-8/12 overflow-auto bg-white transition-[left]',
          { '!left-0': visible }
        )}
      >
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
