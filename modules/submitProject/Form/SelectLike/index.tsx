import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { AiFillCaretDown, AiOutlineClose } from 'react-icons/ai';

const SelectLike: React.FC<
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
  onClick,
  placeholder,
}) => {
  return (
    <div className={classnames(className, 'group relative')}>
      <input
        readOnly
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onClick={onClick}
        className={classnames(
          'daisy-input-bordered daisy-input h-12 w-full flex-1 cursor-pointer border-2 border-black  pl-4 pr-10 text-base outline-none '
        )}
      />
      <div
        className={classnames(
          'absolute top-2 right-2  hidden cursor-pointer p-2',
          { 'group-hover:block': Boolean(value) }
        )}
        onClick={(e) => {
          e.preventDefault();
          onChange?.('');
        }}
      >
        <AiOutlineClose />
      </div>
      <div
        className={classnames('absolute top-2 right-2 cursor-pointer p-2', {
          'group-hover:hidden': Boolean(value),
        })}
        onClick={onClick}
      >
        <AiFillCaretDown />
      </div>
    </div>
  );
};

export default SelectLike;
