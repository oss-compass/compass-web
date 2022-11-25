import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { withErrorBoundary } from 'react-error-boundary';
import { usePrevious, useWindowScroll } from 'react-use';
import { useConfigContext } from '@modules/analyze/context';
import { checkIsPending } from '@modules/analyze/constant';
import MenuLoading from '@modules/analyze/components/SideBar/MenuLoading';
import TopicOverview from '@modules/analyze/components/SideBar/TopicOverview';
import TopicProductivity from '@modules/analyze/components/SideBar/TopicProductivity';
import TopicRobustness from '@modules/analyze/components/SideBar/TopicRobustness';
import TopicNicheCreation from '@modules/analyze/components/SideBar/TopicNicheCreation';
import useHashchangeEvent from '@modules/analyze/components/SideBar/useHashchangeEvent';
import NoSsr from '@common/components/NoSsr';
import { SideBarContextProvider } from '@modules/analyze/context/SideBarContext';
import ErrorFallback from '@common/components/ErrorFallback';

const Divider = () => (
  <div className="mx-6 mt-2 mb-4 border-b border-gray-200"></div>
);

const SideBarMenuContent = () => {
  const active = useHashchangeEvent();
  return (
    <SideBarContextProvider value={active}>
      <TopicOverview />
      <Divider />
      <TopicProductivity />
      <Divider />
      <TopicRobustness />
      <Divider />
      <TopicNicheCreation />
    </SideBarContextProvider>
  );
};

export const SideBarMenu: React.FC<PropsWithChildren> = ({ children }) => {
  const { status } = useConfigContext();

  if (checkIsPending(status)) {
    return <MenuLoading />;
  }

  return (
    <NoSsr>
      <SideBarMenuContent />
    </NoSsr>
  );
};

const SideBar = () => {
  const { y } = useWindowScroll();
  const preY = usePrevious(y) as number;

  return (
    <aside
      className={classnames(
        'relative z-menu w-64 flex-shrink-0 border-r bg-white',
        'lg:hidden'
      )}
    >
      <div
        className={classnames('sticky', [
          y < preY
            ? 'top-[136px] h-[calc(100vh-136px)]'
            : 'top-[56px] h-[calc(100vh-56px)]',
        ])}
      >
        <div className="py-4">
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
