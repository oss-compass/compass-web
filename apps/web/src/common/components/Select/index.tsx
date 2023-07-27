import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { AiFillCaretDown, AiOutlineClose } from 'react-icons/ai';

const Select: React.FC<
  PropsWithChildren<{
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    placeholder?: string;
    error?: boolean;
    disabled?: boolean;
    onClick?: () => void;
  }>
> = ({
  value,
  onChange,
  children,
  className,
  disabled = false,
  error = false,
  placeholder,
}) => {
  return (
    <div className={classnames(className, 'group relative')}>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={classnames(
          'daisy-select  h-12 w-full flex-1  border-2 border-black text-base outline-none'
        )}
      >
        {children}
      </select>
      <div className={classnames('absolute top-2 right-2 cursor-pointer p-2')}>
        <AiFillCaretDown />
      </div>
    </div>
  );
};

export default Select;
