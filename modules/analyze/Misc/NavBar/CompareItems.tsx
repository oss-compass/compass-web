import React from 'react';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';

const CompareItems = () => {
  const { compareItems } = useCompareItems();

  return (
    <div className="flex">
      {compareItems.map(({ name }, index) => {
        return (
          <React.Fragment key={name}>
            <div>{name}</div>

            {index < compareItems.length - 1 ? (
              <div className="px-2 text-slate-300">vs</div>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CompareItems;
