import { createContext, useContext } from 'react';

const CiRepositoryContext = createContext<string | undefined>(undefined);
export const CiRepositoryProvider = CiRepositoryContext.Provider;
export const useCiRepositoryUrl = () => useContext(CiRepositoryContext);
