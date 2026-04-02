import React, { useMemo } from 'react';
import useMenuContent from '@modules/dataHub/components/SideBar/useMenuContent';
import EndpointTab from './EndpointTab';
import {
  findEndpointById,
  findFirstEndpoint,
} from '../../components/SideBar/menuTree';

const APIDocumentation = ({ id }) => {
  const { result: apiData } = useMenuContent();

  const activeContent = useMemo(() => {
    if (!apiData) return null;

    const target = findEndpointById(apiData, id);
    return target || findFirstEndpoint(apiData);
  }, [apiData, id]);

  if (activeContent === null) {
    return <div>Loading...</div>;
  }

  return <EndpointTab endpoint={activeContent} />;
};

export default APIDocumentation;
