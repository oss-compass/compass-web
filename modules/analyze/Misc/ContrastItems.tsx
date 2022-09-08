import React, { useMemo } from 'react';
import useCompareItems from '../hooks/useCompareItems';

const ContrastItems = () => {
  const { contrastItems } = useCompareItems();
  return (
    <div className="flex">
      {contrastItems.map((item, index) => {
        return (
          <React.Fragment key={item}>
            <div>{item}</div>
            {index < contrastItems.length - 1 ? (
              <div className="px-2 text-slate-300">vs</div>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ContrastItems;
