import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { useLabModelVersion, useLabModelDetail } from '../hooks';

type ProviderProps = PropsWithChildren<{
  loadingClassName?: string;
  loadingUi?: React.ReactNode;
}>;

// Keep query status rendering reusable without adding another query observer
// that could unmount the editor and discard its initialization state on errors.
export const ModelVersionQueryBoundary = ({
  children,
  loadingClassName,
  loadingUi,
  loading,
  failed,
  hasData,
}: ProviderProps & {
  loading: boolean;
  failed: boolean;
  hasData: boolean;
}) => {
  if (loading) {
    if (loadingUi) {
      return (
        <div role="status" className={classnames(loadingClassName)}>
          {loadingUi}
        </div>
      );
    }
    return (
      <div role="status" className={classnames(loadingClassName)}>
        <div className="flex-1 animate-pulse space-y-4">
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

  if (failed) {
    return (
      <div role="alert" className="py-10 text-center text-lg text-gray-600">
        404 not found
      </div>
    );
  }

  if (!hasData) {
    return (
      <div role="alert" className="py-10 text-center text-lg text-gray-600">
        Forbidden
      </div>
    );
  }

  return <>{children}</>;
};

const ModelVersionProvider = ({ children, ...props }: ProviderProps) => {
  const model = useLabModelDetail();
  const version = useLabModelVersion();
  return (
    <ModelVersionQueryBoundary
      {...props}
      loading={model.isLoading || version.isLoading}
      failed={Boolean(model.error || version.error)}
      hasData={Boolean(
        model.data?.labModelDetail?.id && version.data?.labModelVersion?.id
      )}
    >
      {children}
    </ModelVersionQueryBoundary>
  );
};

export default ModelVersionProvider;
