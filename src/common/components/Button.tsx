import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { CgSpinner } from 'react-icons/cg';

const Button: React.FC<
  PropsWithChildren<{
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  }>
> = ({
  children,
  type = 'button',
  disabled = false,
  className,
  loading = false,
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      className={classnames(
        'flex items-center justify-center rounded-none bg-black px-3 py-2 text-white hover:opacity-90',
        { 'opacity-50 hover:opacity-50': disabled },
        className
      )}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
      }}
      {...props}
    >
      {loading && <CgSpinner className="mr-1 animate-spin text-xl" />}
      {children}
    </button>
  );
};

export default Button;
