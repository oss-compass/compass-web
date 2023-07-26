import React, { forwardRef, FocusEvent, ChangeEvent } from 'react';
import classnames from 'classnames';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { useControllableValue } from 'ahooks';

interface InputProps {
  defaultValue?: string;
  name?: string;
  value?: string;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
}

const inputVariants = cva(' w-full text-base outline-none', {
  variants: {
    intent: {
      primary: 'border-solid  border-black',
      secondary: 'border-solid  border-[#CCCCCC]',
    },
    size: {
      lg: 'h-12 px-3 border-2',
      md: 'h-10 px-3 border',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
});

interface InputVariants extends VariantProps<typeof inputVariants> {}

export const Input = forwardRef<HTMLInputElement, InputProps & InputVariants>(
  (props, ref) => {
    const {
      intent,
      size,
      name,
      className,
      style,
      onBlur,
      placeholder,
      disabled = false,
      error = false,
    } = props;

    const [state, setState] = useControllableValue<string>(props, {
      defaultValuePropName: 'defaultValue',
      valuePropName: 'value',
      trigger: 'onChange',
    });

    const cls = classnames(
      inputVariants({ intent, size }),
      [error ? 'border-red-500' : ''],
      className
    );

    return (
      <input
        ref={ref}
        name={name}
        type="text"
        value={state}
        style={style}
        onChange={(e) => setState(e.target.value)}
        onBlur={(e) => onBlur?.(e)}
        placeholder={placeholder}
        disabled={disabled}
        className={twMerge(cls)}
      />
    );
  }
);

Input.displayName = 'Input';
