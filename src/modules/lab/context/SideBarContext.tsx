import React, { createContext, useContext, PropsWithChildren } from 'react';

export interface SideBarActiveId {
  topicId: string;
  menuId: string;
  subMenuId: string;
}

export const DEFAULT_CONFIG: SideBarActiveId = {
  topicId: '',
  menuId: '',
  subMenuId: '',
};

export const SideBarContext = createContext<SideBarActiveId>(DEFAULT_CONFIG);

export function useSideBarContext() {
  return useContext(SideBarContext);
}

export const SideBarContextProvider: React.FC<
  PropsWithChildren<{
    value: SideBarActiveId;
  }>
> = ({ value, children }) => {
  return (
    <SideBarContext.Provider value={value}>{children}</SideBarContext.Provider>
  );
};
