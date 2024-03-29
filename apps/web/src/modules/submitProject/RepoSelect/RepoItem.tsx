import React from 'react';
import { formatToNowStrict } from '@common/utils';
import { Button } from '@oss-compass/ui';
import { useTranslation } from 'react-i18next';

const RepoItem: React.FC<{
  name: string;
  updateAt: string;
  onPick: () => void;
}> = ({ name, updateAt, onPick }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center py-3 ">
      <div className="flex flex-1 items-center overflow-hidden pr-3">
        <p className="truncate font-medium">{name}</p>
        <p className="ml-4 shrink-0 text-sm text-gray-400">
          • {formatToNowStrict(updateAt)} {t('common:ago')}
        </p>
      </div>
      <Button
        className="bg-primary shrink-0 text-white"
        onClick={() => onPick()}
      >
        {t('submit_project:pick_it')}
      </Button>
    </div>
  );
};

export default RepoItem;
