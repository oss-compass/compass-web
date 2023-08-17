import React, { useContext } from 'react';
import { ChartsDataContext } from '../context/LabDataProvider';

const useLabData = () => {
  return useContext(ChartsDataContext);
};

export default useLabData;
