import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Divider, Input } from 'antd';
import { FiSearch } from 'react-icons/fi';

interface TableFilterItem {
  text: string;
  value: string;
}

interface OrganizationFilterDropdownProps {
  /** 当前选中的筛选值（antd Table 注入） */
  selectedKeys: React.Key[];
  setSelectedKeys: (keys: React.Key[]) => void;
  confirm: (param?: { closeDropdown?: boolean }) => void;
  clearFilters?: () => void;
  /** 筛选项全集（组织列表） */
  filters: TableFilterItem[];
}

/**
 * 组织列筛选下拉：搜索 + 勾选 + 反选 + 确定/重置。
 * 反选语义参考"创建人组织"筛选的差集方案：对当前可见项取反
 * （已选取消、未选选中），被搜索隐藏的项保持原状。
 */
const OrganizationFilterDropdown: React.FC<OrganizationFilterDropdownProps> = ({
  selectedKeys,
  setSelectedKeys,
  confirm,
  clearFilters,
  filters,
}) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const keyword = search.trim().toLowerCase();
  const visibleFilters = useMemo(
    () =>
      keyword
        ? filters.filter((item) => item.text.toLowerCase().includes(keyword))
        : filters,
    [filters, keyword]
  );

  const selected = selectedKeys as string[];

  const toggleValue = (value: string) => {
    setSelectedKeys(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value]
    );
  };

  // 全选：将当前可见项全部选中，搜索隐藏项保持原状
  const handleSelectAll = () => {
    const visibleValues = visibleFilters.map((item) => item.value);
    const visibleSet = new Set(visibleValues);
    setSelectedKeys([
      ...selected.filter((item) => !visibleSet.has(item)),
      ...visibleValues,
    ]);
  };

  // 反选：对当前可见项取反，搜索隐藏项保持原状
  const handleInvert = () => {
    const visibleValues = visibleFilters.map((item) => item.value);
    const visibleSet = new Set(visibleValues);
    const selectedSet = new Set(selected);
    setSelectedKeys([
      ...selected.filter((item) => !visibleSet.has(item)),
      ...visibleValues.filter((item) => !selectedSet.has(item)),
    ]);
  };

  return (
    <div className="min-w-[180px] rounded-md bg-white p-1 shadow-md">
      <Input
        size="small"
        allowClear
        prefix={<FiSearch className="text-gray-400" />}
        placeholder={t('os_board:table_filter.search_placeholder')}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-1"
      />
      <div className="max-h-64 overflow-y-auto py-0.5">
        {visibleFilters.length === 0 ? (
          <div className="px-2 py-1 text-xs text-gray-400">
            {t('common:no_data')}
          </div>
        ) : (
          visibleFilters.map((item) => (
            <div
              key={item.value}
              className="flex cursor-pointer items-center rounded px-2 py-1 hover:bg-gray-50"
              onClick={() => toggleValue(item.value)}
            >
              <Checkbox checked={selected.includes(item.value)} />
              <span
                className="ml-2 truncate text-sm text-gray-700"
                title={item.text}
              >
                {item.text}
              </span>
            </div>
          ))
        )}
      </div>
      <Divider className="my-1" />
      <div className="flex items-center justify-between gap-1 px-1 pb-1">
        <div className="flex items-center gap-3">
          <Button
            size="small"
            type="link"
            className="px-0"
            disabled={visibleFilters.length === 0}
            onClick={handleSelectAll}
          >
            {t('os_board:issue_table.select_all')}
          </Button>
          <Button
            size="small"
            type="link"
            className="px-0"
            disabled={visibleFilters.length === 0}
            onClick={handleInvert}
          >
            {t('os_board:issue_table.invert_selection')}
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="small"
            onClick={() => {
              clearFilters?.();
              confirm();
            }}
          >
            {t('os_board:table_filter.reset')}
          </Button>
          <Button size="small" type="primary" onClick={() => confirm()}>
            {t('common:btn.confirm')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationFilterDropdown;
