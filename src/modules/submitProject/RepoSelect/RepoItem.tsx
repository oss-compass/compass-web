import React from 'react';
import { formatToNow } from '@common/utils';
import Button from '@modules/submitProject/Form/Button';
import { useTranslation } from 'react-i18next';

const RepoItem: React.FC<{
  name: string;
  updateAt: string;
  onPick: () => void;
}> = ({ name, updateAt, onPick }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center py-3">
      <div className="flex flex-1 items-center">
        <p className="max-w-[300px]  truncate font-medium">{name}</p>
        <p className="ml-4 text-sm text-gray-400">
          • {formatToNow(updateAt)} {t('submit_project:agao')}
        </p>
      </div>
      <Button className="bg-primary text-white" onClick={() => onPick()}>
        {t('submit_project:pick_it')}
      </Button>
    </div>
  );
};

export default RepoItem;
