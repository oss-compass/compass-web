import React, { PropsWithChildren, useEffect, useRef } from 'react';
import classnames from 'classnames';

const Modal: React.FC<
  PropsWithChildren<{
    visible: boolean;
    onClose: () => void;
    bodyClass?: string;
    destroyOnClose?: boolean;
  }>
> = ({
  visible,
  onClose,
  children,
  bodyClass = 'h-[500px] w-[500px]  bg-white',
  destroyOnClose = false,
}) => {
  const showed = useRef(false);

  useEffect(() => {
    if (visible) showed.current = true;
  }, [visible]);

  const noRenderShowed = visible || showed.current;
  const isRenderChildren = destroyOnClose ? visible : noRenderShowed;

  return (
    <div
      className={classnames('fixed left-0 right-0 top-0 bottom-0 z-modal', {
        hidden: !visible,
      })}
    >
      <div
        className="absolute left-0 top-0 h-full w-full bg-black/50"
        onClick={() => onClose()}
      ></div>
      <div
        className={classnames(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          bodyClass
        )}
      >
        {isRenderChildren ? children : null}
      </div>
    </div>
  );
};

export default Modal;
