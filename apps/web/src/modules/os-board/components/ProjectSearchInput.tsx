import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useThrottle } from 'ahooks';
import { useClickAway } from 'react-use';
import { useSearchQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { Button } from '@oss-compass/ui';
import {
  SearchType,
  SearchResultItem,
} from '@modules/home/Banner/Search/types';
import { getSearchItemContent } from '@modules/home/Banner/Search/utils';
import Icon from '@modules/home/Banner/Search/components/Icon';
import { AiOutlineLoading, AiOutlineClose } from 'react-icons/ai';

const SEARCH_DEBOUNCE_DELAY = 300;

interface ProjectSearchInputProps {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  disabled?: boolean;
  searchType?: SearchType;
  searchLevel?: 'repo' | 'community';
}

const ProjectSearchInput = ({
  values,
  onChange,
  placeholder,
  disabled,
  searchType,
  searchLevel,
}: ProjectSearchInputProps) => {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const throttledKeyword = useThrottle(keyword, {
    wait: SEARCH_DEBOUNCE_DELAY,
  });

  const { isLoading, data, fetchStatus } = useSearchQuery(
    client,
    {
      keyword: throttledKeyword,
      type: searchType ? Number(searchType) : undefined,
      level: searchLevel,
    },
    { enabled: Boolean(throttledKeyword) }
  );

  useClickAway(containerRef, () => {
    setIsFocused(false);
  });

  const showLoading = isLoading && fetchStatus === 'fetching';
  const searchResult = data?.fuzzySearch || [];

  const handleSelect = (label: string) => {
    if (!values.includes(label)) {
      onChange([...values, label]);
    }
    setKeyword('');
    setIsFocused(false);
  };

  const handleRemove = (value: string) => {
    onChange(values.filter((v) => v !== value));
  };

  const renderSelectedItems = () => {
    return (
      <div className="mt-3 flex flex-col gap-2">
        {values.map((v) => {
          // 这里的 v 是 label，我们需要构造一个假的 SearchResultItem 来复用 getSearchItemContent
          // 注意：如果 v 是 repo 类型，通常格式是 provider:owner/repo
          // 如果 v 是 community 类型，通常就是名称
          const mockItem: SearchResultItem = {
            label: v,
            level: v.includes(':') ? 'repo' : 'community',
            __typename: 'ProjectCompletionRow',
          };
          const content = getSearchItemContent(mockItem, t);

          return (
            <div
              key={v}
              className="group flex items-center justify-between border bg-white p-3 transition-colors hover:border-blue-200 hover:bg-blue-50/30"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                {content.showIcon && content.icon && (
                  <div className="flex-shrink-0 text-xl">
                    <Icon name={content.icon} />
                  </div>
                )}
                <div className="flex min-w-0 flex-col">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-gray-900">
                      {content.title}
                    </span>
                    {content.type === 'community' && (
                      <span className="flex-shrink-0 rounded bg-orange-50 px-1.5 py-0.5 text-[10px] font-medium text-orange-600">
                        {content.subtitle}
                      </span>
                    )}
                  </div>
                  {content.type === 'repository' && (
                    <span className="truncate text-xs text-gray-500">
                      {content.subtitle}
                    </span>
                  )}
                </div>
              </div>
              <button
                className="ml-2 flex h-6 w-6 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                type="button"
                disabled={disabled}
                onClick={() => handleRemove(v)}
                title={t('common:btn.delete')}
              >
                <AiOutlineClose size={14} />
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={disabled ? 'opacity-60' : ''} ref={containerRef}>
      <div className="relative">
        <div className="flex items-center border border-gray-200 bg-white px-3 py-2.5 transition-all focus-within:border-blue-500">
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setIsFocused(true);
            }}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            disabled={disabled}
          />
          {showLoading && (
            <AiOutlineLoading className="animate-spin text-gray-400" />
          )}
        </div>

        {/* Dropdown Results */}
        {isFocused && keyword && (
          <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-72 overflow-auto border border-gray-200 bg-white shadow-xl">
            {searchResult.length > 0 ? (
              searchResult.map((item) => {
                const content = getSearchItemContent(item, t);
                const isSelected = values.includes(item.label || '');
                return (
                  <div
                    key={item.label}
                    className={`flex cursor-pointer items-center justify-between px-4 py-3 transition-colors hover:bg-gray-50 ${
                      isSelected ? 'bg-blue-50/50' : ''
                    }`}
                    onClick={() =>
                      !isSelected && handleSelect(item.label || '')
                    }
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      {content.showIcon && content.icon && (
                        <div className="flex-shrink-0 text-lg">
                          <Icon name={content.icon} />
                        </div>
                      )}
                      <div className="flex min-w-0 flex-col">
                        <div className="flex items-center gap-2">
                          <span
                            className={`truncate text-sm font-medium ${
                              isSelected ? 'text-blue-600' : 'text-gray-900'
                            }`}
                          >
                            {content.title}
                          </span>
                          {content.type === 'community' && (
                            <span className="flex-shrink-0 rounded bg-orange-50 px-1.5 py-0.5 text-[10px] font-medium text-orange-600">
                              {content.subtitle}
                            </span>
                          )}
                        </div>
                        {content.type === 'repository' && (
                          <span className="truncate text-xs text-gray-500">
                            {content.subtitle}
                          </span>
                        )}
                      </div>
                    </div>
                    {isSelected && (
                      <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-500">
                        {t('os_selection:software_card.selected')}
                      </span>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-sm text-gray-500">
                {!showLoading && t('common:no_data')}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Items List */}
      {values.length > 0 && renderSelectedItems()}
    </div>
  );
};

export default ProjectSearchInput;
