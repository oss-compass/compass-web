import React, { useState } from 'react';
import { Input } from 'antd';
import classnames from 'classnames';
import { useThrottle } from 'ahooks';
import { AiOutlineLoading } from 'react-icons/ai';
import { useTpcSoftwareSelectionSearchQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { queryKey } from '@modules/oh/constant';
import { getPathname } from '@common/utils';

const SearchInput: React.FC<{
  placeholder: string;
  setReport: (item: any, value) => void;
}> = ({ placeholder, setReport }) => {
  const [value, setValue] = useState<string>();
  const [keyword, setKeyword] = useState<string>();
  const [showDropdown, setShowDropdown] = useState(false);
  const throttledKeyword = useThrottle(keyword, { wait: 500 });

  const { isLoading, data, fetchStatus } = useTpcSoftwareSelectionSearchQuery(
    client,
    { keyword: throttledKeyword, selectionType: 0, ...queryKey },
    {
      enabled: Boolean(throttledKeyword),
      onSuccess: () => {
        let result = data?.tpcSoftwareSelectionSearch!;
        console.log(data, result);
        if (Array.isArray(result) && result.length > 0) {
          setShowDropdown(true);
        } else {
          setShowDropdown(false);
        }
      },
    }
  );
  const showLoading = isLoading && fetchStatus === 'fetching';
  const suffix = (
    <>
      {showLoading ? (
        <AiOutlineLoading className="h-full w-full animate-spin" />
      ) : (
        <span />
      )}
    </>
  );
  const reportList = data?.tpcSoftwareSelectionSearch || [];
  return (
    <div className="relative flex">
      <Input
        value={value}
        placeholder={placeholder}
        onChange={(event) => {
          const val = event.target.value;
          setKeyword(val);
          setValue(val);
          setReport(null, value);
        }}
        // suffix={suffix}
        onBlur={() => {
          setTimeout(() => {
            setShowDropdown(false);
          }, 200);
        }}
      />
      {reportList.length > 0 && showDropdown && (
        <div className="z-dropdown absolute left-0 right-0 top-[36px] max-h-[200px] w-full overflow-auto bg-white p-1 drop-shadow-xl">
          {reportList.map(({ repoUrl, tpcSoftwareSelectionReport }, index) => {
            return (
              <div
                key={index}
                className={classnames(
                  'flex h-8 cursor-pointer items-center px-3 hover:bg-[#f5f5f5]',
                  [false && 'bg-[#e6f4ff] font-semibold']
                )}
                onClick={(e) => {
                  const newReport = {
                    repoUrl,
                    ...tpcSoftwareSelectionReport,
                    upstreamCodeUrl: tpcSoftwareSelectionReport.codeUrl,
                    codeUrl: repoUrl?.[0] || '',
                  };
                  setReport(newReport, value);
                  setValue(getPathname(tpcSoftwareSelectionReport.codeUrl));
                  setShowDropdown(false);
                }}
              >
                {tpcSoftwareSelectionReport.codeUrl}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
