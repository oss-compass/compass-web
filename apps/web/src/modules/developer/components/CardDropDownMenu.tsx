import React, { RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineLoading } from 'react-icons/ai';
import Popper from '@mui/material/Popper';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Average from 'public/images/analyze/average.svg';
import Median from 'public/images/analyze/median.svg';
import YScale from 'public/images/analyze/y-scale.svg';
import classnames from 'classnames';
import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi';
import DownCardLoadImage from './DownCardLoadImage';
import DownloadAndShare from './DownloadAndShare';
import { subscribeKey } from 'valtio/utils';
import { chartUserSettingState } from '@modules/developer/store';

interface CardDropDownMenuProps {
  downloadImageSize?: 'middle' | 'full';
  cardRef: RefObject<HTMLElement>;
  fullScreen: boolean;
  onFullScreen: (v: boolean) => void;

  enableReferenceLineSwitch?: boolean;
  showAvg?: boolean;
  onAvgChange?: (v: boolean) => void;
  showMedian?: boolean;
  onMedianChange?: (v: boolean) => void;

  enableLineSettingSwitch?: boolean;
  yAxisScale?: boolean;
  onYAxisScaleChange?: (v: boolean) => void;

  onePointSys?: boolean;
  yKey?: string;
}

const CardDropDownMenu = (props: CardDropDownMenuProps) => {
  const {
    downloadImageSize = 'middle',
    cardRef,
    enableReferenceLineSwitch = true,
    showAvg = false,
    showMedian = false,
    onMedianChange,
    onAvgChange,
    enableLineSettingSwitch = true,
    yAxisScale,
    onYAxisScaleChange,
    onePointSys = false,
    yKey = '',
  } = props;

  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  subscribeKey(chartUserSettingState, 'showAvg', (v) => {
    if (showAvg !== v) {
      onAvgChange?.(v);
    }
  });
  subscribeKey(chartUserSettingState, 'showMedian', (v) => {
    if (showMedian !== v) {
      onMedianChange?.(v);
    }
  });
  subscribeKey(chartUserSettingState, 'yAxisScale', (v) => {
    if (yAxisScale !== v) {
      onYAxisScaleChange?.(v);
    }
  });

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  const ReferenceNode = enableReferenceLineSwitch ? (
    <>
      <div
        className={classnames(
          'flex h-8 cursor-pointer  items-center  border-b  px-4 md:hidden',
          [showAvg ? 'text-primary' : 'text-[#585858]']
        )}
        onClick={() => {
          onAvgChange?.(!showAvg);
        }}
      >
        <Average />
        <span className="ml-2 text-xs">{t('analyze:average')}</span>
      </div>
      <div
        className={classnames(
          'flex h-8 cursor-pointer items-center border-b  px-4 md:hidden',
          [showMedian ? 'text-primary' : 'text-[#585858]']
        )}
        onClick={() => {
          onMedianChange?.(!showMedian);
        }}
      >
        <Median />
        <span className="ml-2 text-xs">{t('analyze:median')}</span>
      </div>
    </>
  ) : null;

  const LineSetting = enableLineSettingSwitch ? (
    <div
      className={classnames(
        'flex h-8 cursor-pointer  items-center  border-b  px-4 md:hidden',
        [yAxisScale ? 'text-primary' : 'text-[#585858]']
      )}
      onClick={() => {
        onYAxisScaleChange?.(!yAxisScale);
      }}
    >
      <YScale />
      <span className="ml-2 text-xs">{t('analyze:y_axis_scale')}</span>
    </div>
  ) : null;

  const FullScreen = (
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
  );

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
              {ReferenceNode}
              {LineSetting}
              <DownloadAndShare
                cardRef={cardRef}
                downloadImageSize={downloadImageSize}
                yAxisScale={yAxisScale}
                onePointSys={onePointSys}
                yKey={yKey}
              />
              {FullScreen}
            </div>
          </Popper>

          {/* {loadingDownLoadImg && (
            <DownCardLoadImage
              size={downloadImageSize}
              cardRef={cardRef}
              onComplete={() => {
                setLoadingDownLoadImg(false);
              }}
            />
          )} */}
        </div>
      </ClickAwayListener>
    </>
  );
};

export default CardDropDownMenu;
