import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Popper from '@mui/material/Popper';
import { AiFillCaretDown } from 'react-icons/ai';
import classnames from 'classnames';

const CommunityDropDownMenu: React.FC<{
  type: string;
  onTypeChange: (v: string) => void;
}> = ({ type, onTypeChange }) => {
  const { t } = useTranslation();
  interface typeMap {
    [key: string]: string;
  }
  const typeMap: typeMap = {
    all: t('analyze:repos_type:all'),
    governance: t('analyze:repos_type:governance_repository'),
    'software-artifact': t('analyze:repos_type:software_artifact_repository'),
  };
  //
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };
  return (
    <>
      <ClickAwayListener
        onClickAway={() => {
          if (!open) return;
          setOpen(() => false);
        }}
      >
        <div>
          <div
            className="ml-2 flex cursor-pointer items-center p-1 text-sm"
            onClick={(e) => handleClick(e)}
          >
            {typeMap[type]}
            <AiFillCaretDown color="#868690" className="ml-2" />
          </div>
          <Popper
            id={'communityDrop'}
            open={open}
            style={{
              zIndex: 1000,
            }}
            placement={'bottom-end'}
            anchorEl={anchorEl}
          >
            <div className="rounded bg-white py-2 shadow-[0_1px_4px_1px_rgba(0,0,0,0.1)]">
              {Object.keys(typeMap).map((item, i) => {
                return (
                  <div
                    key={item}
                    className={classnames(
                      'h-7 cursor-pointer  px-4 text-center',
                      { 'bg-[#f3f4f6]': item === type },
                      { 'border-b': i !== 2 }
                    )}
                    onClick={() => {
                      onTypeChange(item);
                      setOpen(() => false);
                    }}
                  >
                    <span className="text-xs text-[#585858]">
                      {typeMap[item]}
                    </span>
                  </div>
                );
              })}
            </div>
          </Popper>
        </div>
      </ClickAwayListener>
    </>
  );
};
export default CommunityDropDownMenu;
