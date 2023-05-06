import React, { forwardRef, FocusEvent, ChangeEvent } from 'react';
import classnames from 'classnames';

const Input = forwardRef<
  HTMLInputElement,
  {
    name?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    defaultValue?: string;
    className?: string;
    placeholder: string;
    error?: boolean;
    disabled?: boolean;
  }
>((props, ref) => {
  const {
    name,
    className,
    defaultValue,
    value,
    onChange,
    onBlur,
    placeholder,
    disabled = false,
    error = false,
  } = props;

  return (
    <div className="block">
      <input
        ref={ref}
        name={name}
        type="text"
        value={value}
        onChange={(e) => {
          onChange?.(e);
        }}
        onBlur={(e) => onBlur?.(e)}
        placeholder={placeholder}
        disabled={disabled}
        className={classnames(
          className,
          'daisy-input-bordered daisy-input h-12 flex-1 border-2  px-4 text-base outline-none',
          [error ? 'border-red-500' : 'border-black']
        )}
      />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
