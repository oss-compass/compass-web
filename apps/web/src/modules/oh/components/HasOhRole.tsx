import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { useUserInfo } from '@modules/auth';
import { Popover } from 'antd';

const HasOhRole: React.FC<PropsWithChildren> = ({ children }) => {
  const { roleLevel } = useUserInfo();

  if (roleLevel >= 2) {
    return <>{children}</>;
  } else {
    return (
      <Popover content={'请使用已授权的账号登录后方可操作'}>{children}</Popover>
    );
  }
};
export default HasOhRole;
