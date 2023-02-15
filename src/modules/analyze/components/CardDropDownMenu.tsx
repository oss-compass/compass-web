import React, { RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineDownload, AiOutlineLoading } from 'react-icons/ai';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Average from 'public/images/analyze/average.svg';
import Median from 'public/images/analyze/median.svg';
import classnames from 'classnames';
import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi';
import DownCardLoadImage from './DownCardLoadImage';

interface CardDropDownMenuProps {
  downloadImageSize?: 'middle' | 'full';
  cardRef: RefObject<HTMLElement>;
  fullScreen: boolean;
  onFullScreen: (v: boolean) => void;

  enableReference?: boolean;
  showAvg?: boolean;
  onAvgChange?: (pre: boolean) => void;
  showMedian?: boolean;
  onMedianChange?: (pre: boolean) => void;
}

const CardDropDownMenu = (props: CardDropDownMenuProps) => {
  const {
    downloadImageSize = 'middle',
    cardRef,
    enableReference = true,
    showAvg = false,
    showMedian = false,
    onMedianChange,
    onAvgChange,
  } = props;

  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [loadingDownLoadImg, setLoadingDownLoadImg] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <>
      <ClickAwayListener
        onClickAway={() => {
          if (!open) return;
          setOpen(() => false);
        }}
      >
        <div data-html2canvas-ignore="true">
          <div
            className="ml-2 cursor-pointer p-1"
            onClick={(e) => handleClick(e)}
          >
            <BsThreeDots />
          </div>
          <Popper
            id={id}
            open={open}
            style={{
              zIndex: 1000,
            }}
            placement={'bottom-end'}
            anchorEl={anchorEl}
          >
            <div className="rounded bg-white py-2 shadow-[0_1px_4px_1px_rgba(0,0,0,0.1)]">
              {enableReference ? (
                <>
                  <div
                    className={classnames(
                      'flex h-8 cursor-pointer  items-center  border-b  px-4 md:hidden'
                    )}
                    onClick={() => {
                      onAvgChange?.(!showAvg);
                    }}
                  >
                    <Average />
                    <span className="ml-2 text-xs text-[#585858]">
                      {showAvg
                        ? t('analyze:avg_line.hide')
                        : t('analyze:avg_line.show')}
                    </span>
                  </div>
                  <div
                    className={classnames(
                      'flex h-8 cursor-pointer items-center border-b  px-4 md:hidden'
                    )}
                    onClick={() => {
                      onMedianChange?.(!showMedian);
                    }}
                  >
                    <Median />
                    <span className="ml-2 text-xs text-[#585858]">
                      {showMedian
                        ? t('analyze:median_line.hide')
                        : t('analyze:median_line.show')}
                    </span>
                  </div>
                </>
              ) : null}

              <div
                className="flex  h-8 cursor-pointer items-center border-b  px-4"
                onClick={() => {
                  setLoadingDownLoadImg(true);
                }}
              >
                {loadingDownLoadImg ? (
                  <AiOutlineLoading className="t animate-spin" />
                ) : (
                  <AiOutlineDownload className="text-[#585858]" />
                )}
                <span className="ml-2 text-xs text-[#585858]">
                  {t('analyze:download_chart_img')}
                </span>
              </div>

              <div
                className={classnames(
                  'flex h-8 cursor-pointer items-center  px-4   md:hidden'
                )}
                onClick={() => {
                  props.onFullScreen(!props.fullScreen);
                  setOpen((previousOpen) => !previousOpen);
                }}
              >
                {props.fullScreen ? (
                  <>
                    <BiExitFullscreen className="text-[#585858]" />
                    <span className="ml-2 text-xs text-[#585858]">
                      {t('analyze:full_screen_exit')}
                    </span>
                  </>
                ) : (
                  <>
                    <BiFullscreen className="text-[#585858]" />
                    <span className="ml-2 text-xs text-[#585858]">
                      {t('analyze:full_screen')}
                    </span>
                  </>
                )}
              </div>
            </div>
            `
          </Popper>
          {loadingDownLoadImg && (
            <DownCardLoadImage
              size={downloadImageSize}
              cardRef={cardRef}
              onComplete={() => {
                setLoadingDownLoadImg(false);
              }}
            />
          )}
        </div>
      </ClickAwayListener>
    </>
  );
};

export default CardDropDownMenu;
