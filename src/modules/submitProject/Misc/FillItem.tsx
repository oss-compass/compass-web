import React from 'react';
import { AiFillGithub, AiOutlineClose } from 'react-icons/ai';
import { SiGitee } from 'react-icons/si';
import { useSnapshot } from 'valtio';
import { userInfoStore } from '@modules/auth/UserInfoStore';

export const getIcons = (type: string) => {
  switch (type) {
    case 'github':
      return <AiFillGithub className="mr-2" />;
    case 'gitee':
      return <SiGitee color="#c71c27" className="mr-2" />;
    default:
      return null;
  }
};

const FillItem: React.FC<{ url: string; onDelete: (v: string) => void }> = ({
  url,
  onDelete,
}) => {
  const { user } = useSnapshot(userInfoStore);
  const provider = user?.provider!;

  return (
    <div className="mb-6 flex max-w-[600px] items-center">
      <div className="flex flex-1 items-center">
        {getIcons(provider)}
        <p className="max-w-[400px] truncate">{url}</p>
      </div>
      <div
        className="cursor-pointer p-2 transition-all hover:bg-gray-200"
        onClick={() => onDelete(url)}
      >
        <AiOutlineClose />
      </div>
    </div>
  );
};

export default FillItem;
