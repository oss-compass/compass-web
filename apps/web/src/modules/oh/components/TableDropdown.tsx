import React, { useState, useEffect, useCallback } from 'react';
import { Input, Button } from 'antd';
import { AiFillFilter } from 'react-icons/ai';
interface InternalDropdownProps {
  value: string[];
  onConfirm: (keys: string[]) => void;
  onReset: () => void;
  placeholder?: string;
  iconStyle?: React.CSSProperties;
}

const InternalDropdown: React.FC<InternalDropdownProps> = React.memo(
  ({ value, onConfirm, onReset, placeholder = '请输入', iconStyle = {} }) => {
    const [inputValue, setInputValue] = useState(value?.[0] || '');

    // 同步外部值变化
    useEffect(() => {
      setInputValue(value?.[0] || '');
    }, [value]);

    const handleConfirm = useCallback(() => {
      onConfirm(inputValue ? [inputValue] : []);
    }, [inputValue, onConfirm]);

    const handleReset = useCallback(() => {
      setInputValue('');
      onReset();
    }, [onReset]);

    return (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleConfirm}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <div className="flex justify-between">
          <Button
            type="link"
            size="small"
            disabled={!inputValue}
            onClick={handleReset}
          >
            重置
          </Button>
          <Button
            className="flex items-center"
            type="primary"
            size="small"
            onClick={handleConfirm}
          >
            确认
          </Button>
        </div>
      </div>
    );
  }
);
InternalDropdown.displayName = 'InternalDropdown';
// 配置生成器工厂
export const createFilterConfig = (placeholder, iconProps = {}) => ({
  filterDropdown: ({
    selectedKeys,
    setSelectedKeys,
    confirm,
    clearFilters,
  }) => (
    <InternalDropdown
      value={selectedKeys}
      onConfirm={(keys) => {
        setSelectedKeys(keys);
        confirm();
      }}
      onReset={() => {
        clearFilters?.();
        confirm();
      }}
      placeholder={placeholder}
    />
  ),
  filterIcon: (filtered) => (
    <AiFillFilter
      style={{
        color: filtered ? '#1677ff' : undefined,
        ...iconProps,
      }}
    />
  ),
});

export const TableDropdown = {
  createFilterConfig,
};
