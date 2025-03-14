import React, { PropsWithChildren, useEffect } from 'react';
import { Popover } from 'antd';
import useHasOhRole from '@modules/oh/hooks/useHasOhRole';
import { toast } from 'react-hot-toast';

const HasOhRole: React.FC<PropsWithChildren> = ({ children }) => {
  const { hasOhRole, loading } = useHasOhRole();
  useEffect(() => {
    if (!loading && !hasOhRole) toast.error(`请使用已授权的账号登录后方可操作`);
  }, [hasOhRole, loading]);

  return hasOhRole ? (
    <>{children}</>
  ) : (
    <Popover content="请使用已授权的账号登录后方可操作">{children}</Popover>
  );
};
export default HasOhRole;
