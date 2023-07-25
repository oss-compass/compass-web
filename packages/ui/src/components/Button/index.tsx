import React, { ReactNode, forwardRef } from 'react';
import classnames from 'classnames';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { CgSpinner } from 'react-icons/cg';

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const buttonVariants = cva(
  'flex items-center justify-center cursor-pointer rounded-none ',
  {
    variants: {
      intent: {
        primary: 'bg-black text-white hover:opacity-80',
        secondary: 'border border-black text-black font-bold hover:bg-gray-100',
        danger:
          'border-2 border-[#CC0000] text-[#CC0000] font-bold hover:bg-red-600/5',
        text: 'hover:bg-gray-100',
      },
      size: {
        lg: 'text-base px-10 py-3',
        md: 'text-base px-3 py-2',
        sm: 'text-sm px-3 py-1.5',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  }
);

interface ButtonVariants extends VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonVariants & { children?: ReactNode | undefined }
>((props, ref) => {
  const {
    children,
    disabled = false,
    loading = false,
    type = 'button',
    intent,
    size,
    className,
    onClick,
    ...restProps
  } = props;

  const cls = classnames(
    buttonVariants({ intent, size }),
    { 'opacity-50 cursor-not-allowed hover:opacity-50': disabled },
    className
  );

  return (
    <button
      ref={ref}
      type={type}
      className={twMerge(cls)}
      onClick={(e) => {
        if (disabled || loading) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
      }}
      {...restProps}
    >
      {loading && <CgSpinner className="mr-1 animate-spin text-xl" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
