import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { withErrorBoundary } from 'react-error-boundary';
import { usePrevious, useWindowScroll } from 'react-use';
import { useStatusContext } from '@modules/analyze/context';
import { checkIsPending } from '@modules/analyze/constant';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
import MenuLoading from '@modules/analyze/components/SideBar/Menu/MenuLoading';
import TopicOverview from '@modules/analyze/components/SideBar/TopicOverview';
import TopicTab from '@modules/analyze/components/SideBar/TopicTab';
import Collaboration from '@modules/analyze/components/SideBar/Collaboration';
import Contributor from '@modules/analyze/components/SideBar/Contributor';
import useActiveMenuId from '@modules/analyze/components/SideBar/useActiveMenuId';
import NoSsr from '@common/components/NoSsr';
import { SideBarContextProvider } from '@modules/analyze/context/SideBarContext';
import ErrorFallback from '@common/components/ErrorFallback';
import useQueryMetricType from '@modules/analyze/hooks/useQueryMetricType';

const Divider = () => (
  <div className="mx-6 mb-4 mt-2 border-b border-gray-200"></div>
);

const SideBarMenuContent = () => {
  const activeId = useHashchangeEvent();
  const active = useActiveMenuId(activeId);
  const topicType = useQueryMetricType();

  let source;
  if (topicType === 'collaboration') {
    source = <Collaboration />;
  } else {
    source = <Contributor />;
  }
  return (
    <SideBarContextProvider value={active}>
      <TopicTab />
      <TopicOverview />
      {source}
    </SideBarContextProvider>
  );
};

export const SideBarMenu: React.FC<PropsWithChildren> = ({ children }) => {
  const { status } = useStatusContext();

  if (checkIsPending(status)) {
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
          y < preY
            ? 'top-[136px] h-[calc(100vh-136px)]'
            : 'top-[56px] h-[calc(100vh-56px)]',
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
