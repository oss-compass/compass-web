import React, { PropsWithChildren } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import classname from 'classnames';
import { useSnapshot } from 'valtio';
import { FiEdit } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import { formFiledState, actions, FormFiledState } from './state';

export const SelectedItemCard = ({ ident }: { ident: string }) => {
  return (
    <div className="flex h-24 flex-col border border-[#CCCCCC] bg-[#FAFAFA] p-3">
      <div className="flex-1">
        <div>{ident}</div>
      </div>
      <div className="flex justify-end text-[#585858]">
        <div className="cursor-pointer p-1" onClick={() => {}}>
          <RiDeleteBinLine />
        </div>
      </div>
    </div>
  );
};

const checkIsSelect = (
  ident: string,
  list: Readonly<FormFiledState['selected'][string]>
): boolean => {
  if (list) {
    const index = list.findIndex((i) => i.ident === ident);
    return index > -1;
  }
  return false;
};

export const MetricItemsCard = ({
  id,
  ident,
  category,
  threshold,
  weight,
}: {
  id: number;
  ident: string;
  category: string;
  threshold: number;
  weight: number;
}) => {
  const snapshot = useSnapshot(formFiledState);
  const select = checkIsSelect(ident, snapshot.selected[category]);

  return (
    <div
      className={classname(
        'relative flex h-16 cursor-pointer flex-col border border-[#CCCCCC] bg-[#FAFAFA] p-3',
        [select ? ['border-blue-600', 'border-2'] : ['border', 'p-px']]
      )}
      onClick={() => {
        actions.onSelect({ id, ident, threshold, weight, category });
      }}
    >
      <div className="flex-1">
        <div>{ident}</div>
        <div className="text-xs text-[#585858]"></div>
      </div>
      <div className="absolute bottom-4 right-4">
        <input checked={select} type="checkbox" onChange={() => {}} />
      </div>
    </div>
  );
};

export const ItemCardPlus = ({ onHandleAdd }: { onHandleAdd: () => void }) => {
  return (
    <div
      className="flex h-24 cursor-pointer flex-col items-center justify-center border border-[#CCCCCC]  p-3 text-lg"
      onClick={() => {
        onHandleAdd();
      }}
    >
      <AiOutlinePlus />
    </div>
  );
};
