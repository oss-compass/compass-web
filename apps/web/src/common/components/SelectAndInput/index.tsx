import React, { PropsWithChildren, useState } from 'react';
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
    options: string[];
    onClick?: () => void;
  }>
> = ({
  value,
  onChange,
  className,
  options,
  disabled = false,
  error = false,
  placeholder,
}) => {
  const [showList, setShowlist] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );
  return (
    <div className={classnames(className, 'group relative')}>
      <input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange?.(e.target.value);
        }}
        onFocus={() => {
          setShowlist(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setShowlist(false);
          }, 200);
        }}
        placeholder={placeholder}
        className={classnames(
          'daisy-select h-12 w-full flex-1  border-2 border-black text-base outline-none'
        )}
        autoComplete={'off'}
      />
      {filteredOptions.length > 0 && (
        <div
          className={classnames(
            'absolute z-50  w-full flex-1 border border-black bg-white text-base outline-none',
            { hidden: !showList }
          )}
          id="option-list"
        >
          {filteredOptions.map((item) => {
            return (
              <div
                key={item}
                className="px-4 hover:bg-[#1e90ff]"
                onClick={() => {
                  console.log(1);
                  setInputValue(item);
                  onChange(item);
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      )}
      <div className={classnames('absolute top-2 right-2 cursor-pointer p-2')}>
        <AiFillCaretDown />
      </div>
    </div>
  );
};

export default Select;
