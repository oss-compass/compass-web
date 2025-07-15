import React, { RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { BsThreeDots } from 'react-icons/bs';
import Popper from '@mui/material/Popper';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import classnames from 'classnames';
import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi';
import DownloadAndShare from './DownloadAndShare';

interface CardDropDownMenuProps {
  downloadImageSize?: 'middle' | 'full';
  cardRef: RefObject<HTMLElement>;
  fullScreen?: boolean;
  onFullScreen?: (v: boolean) => void;
  yKey?: string;
}

const CardDropDownMenu = (props: CardDropDownMenuProps) => {
  const { downloadImageSize = 'middle', cardRef, yKey } = props;

  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

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
              {yKey ? (
                <DownloadAndShare
                  cardRef={cardRef}
                  downloadImageSize={downloadImageSize}
                  yKey={yKey}
                />
              ) : (
                ''
              )}
              {FullScreen}
            </div>
          </Popper>
        </div>
      </ClickAwayListener>
    </>
  );
};

export default CardDropDownMenu;
