import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import useCompareItems from '../hooks/useVerifiedItems';
import { getProvider } from '@common/utils';
import { Level } from '@modules/analyze/constant';
import { useClickAway } from 'react-use';
import { useResizeDetector } from 'react-resize-detector';
import classnames from 'classnames';
import Popper from '@mui/material/Popper';
import ProviderIcon from '@common/components/ProviderIcon';

const LabelItems = () => {
  const { t } = useTranslation();
  const { compareItems } = useCompareItems();
  const [hiddenIndex, setHiddenIndex] = useState(-1);
  const [hiddenVisible, setHiddenVisible] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const hiddenRef = useRef<HTMLDivElement>(null);

  // const computeWidth = () => {
  //   if (ref) {
  //     const parentsWidth = ref.current.offsetWidth;
  //     let childrenWidth = 0;
  //     const index = [...ref.current.children].findIndex((item, index) => {
  //       if (item.id !== 'more') {
  //         childrenWidth += item.offsetWidth;
  //         if (parentsWidth < childrenWidth) {
  //           return index;
  //         }
  //       }
  //     });
  //     setHiddenIndex(index);
  //   }
  // };
  // const onResize = useCallback(computeWidth, [hiddenIndex, compareItems]);
  // useEffect(computeWidth, [compareItems]);
  // useClickAway(hiddenRef, () => {
  //   setTimeout(() => {
  //     setHiddenVisible(false);
  //   }, 200);
  // });

  // const { ref } = useResizeDetector({
  //   handleHeight: false,
  //   refreshMode: 'debounce',
  //   refreshRate: 200,
  //   onResize,
  // });

  const style = {
    background: 'linear-gradient(270deg, #FFFFFF 0%, rgba(255,255,255,0) 100%)',
  };
  return (
    <>
      <div
        className="relative flex h-6 flex-1 items-center overflow-hidden"
        // ref={ref}
      >
        {compareItems.map(({ name, label, level }, index) => {
          const host = getProvider(label);

          let labelNode = (
            <span className={'ml-1 mr-1 font-semibold'}>{name}</span>
          );

          if (level === Level.REPO) {
            labelNode = (
              <a
                className="ml-1 mr-1 whitespace-nowrap font-semibold hover:underline"
                href={label}
                target="_blank"
                rel={'noreferrer'}
              >
                {name}
              </a>
            );
          }

          return (
            <div
              key={label}
              className={classnames('flex items-center', {
                invisible: hiddenVisible && index >= hiddenIndex,
              })}
            >
              <ProviderIcon provider={host} />
              {labelNode}
              {level === Level.COMMUNITY && (
                <div className="ml-2 rounded-[10px] bg-[#FFF9F2] px-2 py-0.5 text-xs text-[#D98523]">
                  {t('home:community')}
                </div>
              )}
              {index < compareItems.length - 1 ? (
                <span className="px-2 text-slate-300">vs</span>
              ) : null}
            </div>
          );
        })}
        {hiddenIndex !== -1 && (
          <div
            className="absolute right-0 top-0 h-6 w-24 shrink-0 cursor-pointer"
            style={style}
            id="more"
          >
            <div
              className="ml-14  h-6 w-8 rounded-[24px] border border-[#EBEFF4] bg-[#f4f4f4] text-center leading-6"
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
                setHiddenVisible(true);
              }}
            >
              +{compareItems.length - hiddenIndex}
            </div>
          </div>
        )}
      </div>
      <div className="hidden md:block">
        {/* todo show compare items in mobile */}
      </div>
    </>
  );
};

export default LabelItems;
