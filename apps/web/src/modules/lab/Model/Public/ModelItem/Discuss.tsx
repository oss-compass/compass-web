import React, { useState } from 'react';
import IconProductivity from '@public/images/analyze/topic/Productivity.svg';
import IconRobustness from '@public/images/analyze/topic/Robustness.svg';
import IconNicheCreation from '@public/images/analyze/topic/NicheCreation.svg';
import {
  useLabModelPublicOverviewQuery,
  ModelPublicOverview,
} from '@oss-compass/graphql';
import { useTranslation } from 'next-i18next';
import Popper from '@mui/material/Popper';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { AiFillCaretDown } from 'react-icons/ai';

const Discuss = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <div className="flex flex-none  text-sm font-semibold leading-8 md:hidden">
      <ClickAwayListener
        onClickAway={() => {
          if (!open) return;
          setOpen(() => false);
        }}
      >
        <div
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
            setOpen((previousOpen) => !previousOpen);
          }}
          className="flex h-8 w-[118px] cursor-pointer border border-gray-500 px-2.5"
        >
          <a>
            <img
              className="mr-2 inline-block align-text-top"
              src="/images/lab/comment.svg"
              alt=""
            />
          </a>
          {t('lab:discuss')}
          <AiFillCaretDown color="#868690" className="ml-2 mt-2" />
          <Popper
            id={'1'}
            open={open}
            style={{
              zIndex: 1000,
            }}
            placement={'bottom-end'}
            anchorEl={anchorEl}
          >
            <div className="rounded bg-white text-sm font-semibold shadow-[0_1px_4px_1px_rgba(0,0,0,0.1)]">
              <div className="h-14 px-3 pt-3 hover:bg-[#f2f2f2]">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={'https://chaoss.discourse.group/c/metrics/8' || ''}
                >
                  <img
                    className="mr-2 mt-[1px] inline-block align-text-top"
                    src="/images/logos/chaoss.svg"
                    alt=""
                  />
                  CHAOSS official channel
                </a>
                <span className="ml-6 block h-4  font-normal text-[#86868f]">
                  in Discourse
                </span>
              </div>
              <div className="h-15 px-3 py-2 hover:bg-[#f2f2f2]">
                <a href={'/docs/community/slack/' || ''}>
                  <img
                    className="mr-2 inline-block h-4 w-3.5 align-text-top"
                    src="favicon.ico"
                    alt=""
                  />
                  Compass official channel
                </a>
                <span className="ml-6 block h-4  font-normal text-[#86868f]">
                  in Slack
                </span>
              </div>
            </div>
          </Popper>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default Discuss;
