import React from 'react';
import { formatToNow } from '@common/utils';
import Button from '@modules/submitProject/Form/Button';

const RepoItem: React.FC<{
  name: string;
  updateAt: string;
  onPick: () => void;
}> = ({ name, updateAt, onPick }) => {
  return (
    <div className="flex items-center py-3">
      <div className="flex flex-1 items-center">
        <p className="max-w-[300px]  truncate font-medium">{name}</p>
        <p className="ml-4 text-sm text-gray-400">
          • {formatToNow(updateAt)} agao
        </p>
      </div>
      <Button className="bg-primary text-white" onClick={() => onPick()}>
        Pick it
      </Button>
    </div>
  );
};

export default RepoItem;
