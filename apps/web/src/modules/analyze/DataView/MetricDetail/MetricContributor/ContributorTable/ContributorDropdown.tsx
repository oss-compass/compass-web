import React, { useState } from 'react';
// import { AiOutlineSearch } from 'react-icons/ai';
import { Button, Input } from 'antd';
import { useTranslation } from 'next-i18next';

const ContributorDropdown = ({
  selectedKeys,
  setSelectedKeys,
  confirm,
  placeholder,
}) => {
  const { t } = useTranslation();
  const [contributor, setContributor] = useState(selectedKeys);

  const handleSearch = () => {
    setSelectedKeys(contributor);
    confirm();
  };
  const handleReset = () => {
    setContributor([]);
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
          {t('analyze:metric_detail:reset')}
        </Button>
        <Button
          type="primary"
          className="flex items-center"
          onClick={() => handleSearch()}
          size="small"
        >
          {t('analyze:metric_detail:search')}
        </Button>
      </div>
    </div>
  );
};

export default ContributorDropdown;
