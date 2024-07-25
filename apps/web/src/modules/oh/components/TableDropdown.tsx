import React, { useState } from 'react';
import { Button, Input } from 'antd';

const ContributorDropdown = ({
  selectedKeys,
  setSelectedKeys,
  confirm,
  clearFilters,
  placeholder,
}) => {
  const [contributor, setContributor] = useState(selectedKeys);

  const handleSearch = (name = contributor) => {
    setSelectedKeys(name);
    confirm();
  };
  const handleReset = () => {
    setContributor([]);
    handleSearch([]);
  };
  return (
    <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
      <Input
        placeholder={placeholder}
        value={contributor[0]}
        onChange={(e) => setContributor([e.target.value])}
        onPressEnter={() => handleSearch()}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <div className="flex justify-between">
        <Button
          type="link"
          disabled={contributor[0] ? false : true}
          onClick={() => handleReset()}
          size="small"
        >
          重置
        </Button>
        <Button
          type="primary"
          className="flex items-center"
          onClick={() => handleSearch()}
          size="small"
        >
          搜索
        </Button>
      </div>
    </div>
  );
};

export default ContributorDropdown;
