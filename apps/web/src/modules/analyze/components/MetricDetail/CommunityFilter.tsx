import React, { useMemo, useRef, useState } from 'react';
import { Select, Checkbox, Divider } from 'antd';
import { useCommunityReposSearchQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { getLastPathSegment } from '@common/utils';
import { useTranslation } from 'next-i18next';

interface UserValue {
  label: string;
  value: string;
}

const CommunityFilter = ({ label, onRepoChange }) => {
  const [value, setValue] = useState<string[]>([]);
  const [options, setOptions] = useState<UserValue[]>([]);
  const [selectState, setSelectState] = useState(true);
  const { t } = useTranslation();
  const { isLoading } = useCommunityReposSearchQuery(
    client,
    { label: label, page: 1, per: 9999 },
    {
      onSuccess: (data) => {
        if (data) {
          let items = data.communityRepos.items;
          let opts = items.map((z) => ({
            label: getLastPathSegment(z.label),
            value: z.label,
          }));
          setOptions(opts);
          setValue(opts.map((item) => item.value));
        }
        console.log(data);
      },
    }
  );

  return (
    <Select
      mode="multiple"
      value={value}
      maxTagCount={'responsive'}
      maxTagPlaceholder={() =>
        selectState ? (
          <span>{t('analyze:metric_detail:all_repos')}</span>
        ) : (
          '+' + value.length
          //   <Tooltip title={omittedValues.map(({ label }) => label).join(', ')}>
          //   <span>Hover Me</span>
          // </Tooltip>
        )
      }
      options={options}
      onChange={(newValue) => {
        setValue(newValue);
        if (newValue.length === options.length) {
          setSelectState(true);
          onRepoChange([]);
        } else {
          setSelectState(false);
          onRepoChange(newValue);
        }
      }}
      style={{ width: 130 }}
      //   allowClear
      dropdownRender={(menu) => (
        <div>
          {menu}
          <Divider style={{ margin: '0' }} />
          <div style={{ padding: '8px 4px 8px 8px', cursor: 'pointer' }}>
            <Checkbox
              checked={selectState}
              onChange={(e) => {
                if (e.target.checked === true) {
                  setSelectState(true); //选中时 给 checked 改变状态
                  // 当选的时候 把所有列表值赋值给 functionIds
                  setValue(options.map((item) => item.value));
                } else {
                  setSelectState(false);
                  setValue([]);
                }
                onRepoChange([]);
              }}
            >
              {t('analyze:metric_detail:select_all')}
            </Checkbox>
          </div>
        </div>
      )}
    />
  );
};

export default CommunityFilter;
