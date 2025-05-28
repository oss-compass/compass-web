import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { withErrorBoundary } from 'react-error-boundary';
import { usePrevious, useWindowScroll } from 'react-use';
import { useStatusContext } from '@modules/developer/context';
import { checkIsPending } from '@modules/developer/constant';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
import MenuLoading from '@modules/developer/components/SideBar/Menu/MenuLoading';
import TopicWhoAmI from '@modules/developer/components/SideBar/TopicWhoAmI';
import useActiveMenuId from '@modules/developer/components/SideBar/useActiveMenuId';
import NoSsr from '@common/components/NoSsr';
import ErrorFallback from '@common/components/ErrorFallback';
import MenuTopicItem from './Menu/MenuTopicItem';
import { useTopic } from './config';
const SideBarMenuContent = () => {
  const activeId = useHashchangeEvent();
  const { selection } = useTopic();
  console.log(selection);
  return (
    <>
      <TopicWhoAmI />
      {/* <TopicOverview /> */}
      {selection?.map((item) => (
        <MenuTopicItem
          key={item.id}
          hash={item.id}
          icon={''}
          active={activeId === item.id}
        >
          {item.name}
        </MenuTopicItem>
      ))}
    </>
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
