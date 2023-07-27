import React, { PropsWithChildren } from 'react';
import router from 'next/router';
import { useSnapshot } from 'valtio';
import { userInfoStore } from './UserInfoStore';

interface Props {
  className?: string;
  loadingUi?: React.ReactNode;
  redirectTo?: string;
}

const AuthRequire: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
  loadingUi,
  redirectTo,
}) => {
  const { currentUser, loading } = useSnapshot(userInfoStore);

  if (!loading && !currentUser) {
    let redirectUrl = redirectTo ?? window.location.pathname;
    router.replace(
      `/auth/signin?redirect_to=${encodeURIComponent(redirectUrl)}`
    );
    return null;
  }

  if (loading && loadingUi) {
    return <>{loadingUi}</>;
  }

  if (loading) {
    return (
      <div className={className}>
        <div className="flex-1 space-y-4">
          <div className="h-6 rounded bg-slate-200"></div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-6 rounded bg-slate-200"></div>
            <div className="col-span-1 h-6 rounded bg-slate-200"></div>
          </div>

          <div className="h-6 rounded bg-slate-200"></div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 h-6 rounded bg-slate-200"></div>
            <div className="col-span-2 h-6 rounded bg-slate-200"></div>
          </div>

          <div className="h-6 rounded bg-slate-200"></div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthRequire;
