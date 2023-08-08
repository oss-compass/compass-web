import React, { PropsWithChildren } from 'react';
import router from 'next/router';
import Link from 'next/link';
import classnames from 'classnames';
import { useSnapshot } from 'valtio';
import { userInfoStore } from './UserInfoStore';

interface Props {
  className?: string;
  loadingClassName?: string;
  loadingUi?: React.ReactNode;
  redirectTo?: string;
  redirectToAuth?: boolean;
}

const AuthRequire: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
  loadingClassName,
  loadingUi,
  redirectTo,
  redirectToAuth = true,
}) => {
  const { currentUser, loading } = useSnapshot(userInfoStore);

  if (loading && loadingUi) {
    return <>{loadingUi}</>;
  }

  if (loading) {
    return (
      <div className={classnames(className, loadingClassName)}>
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

  if (!currentUser) {
    let authUrl = `/auth/signin?redirect_to=${encodeURIComponent(
      redirectTo ?? window.location.pathname
    )}`;

    if (redirectToAuth) {
      router.replace(authUrl);
      return null;
    } else {
      return (
        <div className="text-steel pt-20 pb-10 text-center text-2xl">
          Please
          <Link href={authUrl} className=" text-primary mx-2">
            Sign In
          </Link>
          to access the full content !
        </div>
      );
    }
  }

  return <>{children}</>;
};

export default AuthRequire;
