import React, { PropsWithChildren, useState } from 'react';
import classnames from 'classnames';
import { Input } from 'antd';
import { useThrottle } from 'ahooks';
import { useOrgSearchQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { AiOutlineLoading } from 'react-icons/ai';

const Select: React.FC<
  PropsWithChildren<{
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    inputClass?: string;
    dropClass?: string;
    placeholder?: string;
    onClick?: () => void;
  }>
> = ({ value, onChange, className, inputClass, dropClass, placeholder }) => {
  const [showList, setShowlist] = useState(false);

  const [keyword, setKeyword] = useState(value);
  const throttledKeyword = useThrottle(keyword, { wait: 300 });
  const { isLoading, data, fetchStatus } = useOrgSearchQuery(
    client,
    {
      keyword: throttledKeyword,
    },
    {
      enabled: Boolean(throttledKeyword),
      onSuccess(res) {
        if (res?.orgFuzzySearch?.length === 0) {
          onChange(throttledKeyword);
        }
      },
    }
  );
  const showLoading = isLoading && fetchStatus === 'fetching';

  return (
    <div className={classnames(className, 'group relative')}>
      <Input
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
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
        className={classnames(inputClass ? inputClass : 'ant-org-input')}
        autoComplete={'off'}
      />
      {data?.orgFuzzySearch?.length > 0 && (
        <div
          className={classnames(
            'z-modal absolute max-h-36 w-full min-w-[300px] flex-1 overflow-auto border-black bg-white  text-base outline-none',
            dropClass,
            { hidden: !showList }
          )}
          id="option-list"
        >
          {data?.orgFuzzySearch?.map(({ orgName }) => {
            return (
              <div
                key={orgName}
                className="flex h-10 cursor-pointer flex-nowrap items-center px-4 hover:bg-gray-100"
                onClick={() => {
                  setKeyword(orgName);
                  onChange(orgName);
                }}
              >
                <span className="line-clamp-1"> {orgName}</span>
              </div>
            );
          })}
        </div>
      )}
      <div
        className={classnames(
          'absolute top-1.5 right-2 cursor-pointer text-[#CCCCCC]'
        )}
      >
        {showLoading ? (
          <AiOutlineLoading className="mr-1 animate-spin" />
        ) : null}
      </div>
    </div>
  );
};

export default Select;
