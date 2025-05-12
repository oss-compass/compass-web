import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { withErrorBoundary } from 'react-error-boundary';
import { usePrevious, useWindowScroll } from 'react-use';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
import MenuLoading from './Menu/MenuLoading';
import SideBarContent from './SideBarContent';
import useActiveMenuId from './useActiveMenuId';
import NoSsr from '@common/components/NoSsr';
import { SideBarContextProvider } from '../../context/SideBarContext';
import ErrorFallback from '@common/components/ErrorFallback';
import { useApiDataContext } from '@modules/openApi/context';

const SideBarMenuContent = () => {
  const activeId = useHashchangeEvent();
  const active = useActiveMenuId(activeId);
  return (
    <SideBarContextProvider value={active}>
      <SideBarContent />;
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

const SideBarWrap: React.FC<PropsWithChildren> = ({ children }) => {
  const { y } = useWindowScroll();
  const preY = usePrevious(y) as number;

  return (
    <aside
      className={classnames(
        'relative w-64 flex-shrink-0 border-r bg-white',
        'lg:hidden'
      )}
    >
      <div
        className={classnames('thin-scrollbar sticky overflow-auto', [
          y < preY ? 'top-[80px] h-[calc(100vh)]' : 'top-[0px] h-[calc(100vh)]',
        ])}
      >
        <div className="py-4">{children}</div>
      </div>
    </aside>
  );
};

const SideBar = () => {
  return (
    <SideBarWrap>
      <SideBarMenu />
    </SideBarWrap>
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
