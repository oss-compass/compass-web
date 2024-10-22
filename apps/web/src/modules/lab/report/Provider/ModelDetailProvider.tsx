import React, { useEffect, PropsWithChildren } from 'react';
import classnames from 'classnames';
import { useLabModelDetail } from '../hooks';

const ModelDetailProvider: React.FC<
  PropsWithChildren<{ loadingClassName?: string; loadingUi?: React.ReactNode }>
> = ({ children, loadingClassName, loadingUi }) => {
  const { isLoading, data: modelData, error: modelError } = useLabModelDetail();

  if (isLoading) {
    if (loadingUi) {
      return <div className={classnames(loadingClassName)}>{loadingUi}</div>;
    }

    return (
      <div className={classnames(loadingClassName)}>
        <div className=" flex-1 animate-pulse space-y-4">
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

  if (modelError) {
    return (
      <div className="py-10 text-center text-lg text-gray-600">
        404 not found
      </div>
    );
  }

  if (!modelData?.labModelDetail?.id) {
    return (
      <div className="py-10 text-center text-lg text-gray-600">Forbidden</div>
    );
  }

  return <>{children}</>;
};

export default ModelDetailProvider;
