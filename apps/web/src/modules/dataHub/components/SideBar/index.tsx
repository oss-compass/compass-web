import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { withErrorBoundary } from 'react-error-boundary';
import { usePrevious, useWindowScroll } from 'react-use';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
import SideBarContent from './SideBarContent';
import useActiveMenuId from './useActiveMenuId';
import NoSsr from '@common/components/NoSsr';
import { SideBarContextProvider } from '../../context/SideBarContext';
import ErrorFallback from '@common/components/ErrorFallback';
import { useApiDataContext } from '@modules/dataHub/context';

const MenuLoading = () => (
  <div className="px-4">
    <div className="mb-8 flex-1 space-y-4">
      <div className="h-4 rounded bg-slate-100"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 h-4 rounded bg-slate-100"></div>
        <div className="col-span-1 h-4 rounded bg-slate-100"></div>
      </div>
      <div className="h-4 rounded bg-slate-100"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 h-4 rounded bg-slate-100"></div>
        <div className="col-span-2 h-4 rounded bg-slate-100"></div>
      </div>
      <div className="h-4 rounded bg-slate-100"></div>
    </div>
    <div className="mb-8 flex-1 space-y-4">
      <div className="h-4 rounded bg-slate-100"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 h-4 rounded bg-slate-100"></div>
        <div className="col-span-1 h-4 rounded bg-slate-100"></div>
      </div>
      <div className="h-4 rounded bg-slate-100"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 h-4 rounded bg-slate-100"></div>
        <div className="col-span-2 h-4 rounded bg-slate-100"></div>
      </div>
      <div className="h-4 rounded bg-slate-100"></div>
    </div>
    <div className="mb-8 flex-1 space-y-4">
      <div className="h-4 rounded bg-slate-100"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 h-4 rounded bg-slate-100"></div>
        <div className="col-span-1 h-4 rounded bg-slate-100"></div>
      </div>
      <div className="h-4 rounded bg-slate-100"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 h-4 rounded bg-slate-100"></div>
        <div className="col-span-2 h-4 rounded bg-slate-100"></div>
      </div>
      <div className="h-4 rounded bg-slate-100"></div>
    </div>
  </div>
);
const SideBarMenuContent = () => {
  const activeId = useHashchangeEvent();
  const active = useActiveMenuId(activeId);
  return (
    <SideBarContextProvider value={active}>
      <SideBarContent />
    </SideBarContextProvider>
  );
};

export const SideBarMenu: React.FC<PropsWithChildren> = ({ children }) => {
  const { isLoading } = useApiDataContext();

  if (isLoading) {
    return <MenuLoading />;
  }

  return (
    <NoSsr>
      <SideBarMenuContent />
    </NoSsr>
  );
};

const SideBar = () => {
  return (
    <aside className="relative min-w-[255px] flex-shrink-0 border-r bg-white lg:hidden">
      <div className="thin-scrollbar sticky top-[0px] h-[calc(100vh-80px)] overflow-auto">
        <div className="py-4">
          <div className="mb-4 pl-8 text-lg font-semibold">
            开源数据&模型研究服务
          </div>
          <SideBarMenu />
        </div>
      </div>
    </aside>
  );
};

export default withErrorBoundary(SideBar, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.log(error, info);
    // Do something with the error
    // E.g. log to an error logging client here
  },
});
