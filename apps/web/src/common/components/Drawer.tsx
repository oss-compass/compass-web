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
        'z-drawer fixed left-full right-0 top-0 bottom-0 h-screen w-screen',
        { '!left-0': visible }
      )}
    >
      <div
        className={classnames(
          'z-mask bg-mask absolute top-0 left-full bottom-0 right-0 opacity-5 transition-opacity',
          { '!left-0 !opacity-100': visible }
        )}
        onClick={() => onClose()}
      />
      <div
        className={classnames(
          'z-drawer fixed top-0 bottom-0 -left-full w-8/12 overflow-auto bg-white transition-[left]',
          { '!left-0': visible }
        )}
      >
        {visible && <div>{children}</div>}
      </div>
    </div>
  );
};

export default Drawer;
