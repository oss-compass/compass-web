import React, { useState } from 'react';
import ProductivityIcon from '../assets/Productivity.svg';
import RobustnessIcon from '../assets/Robustness.svg';
import { useTranslation } from 'next-i18next';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { AiFillCaretDown } from 'react-icons/ai';

const ModeTitle: React.FC<{
  dimensionality?: string | null;
  desc?: string | null;
  extra?: string | null;
  metric?: string | null;
}> = ({ dimensionality, desc, extra, metric }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <>
      <div className=" flex items-center">
        <span className="mr-2 flex-shrink-0">
          <RobustnessIcon />
        </span>
        <h3 className="text-sm text-[#000000]">Robustness</h3>
      </div>
      <div className="mt-2 text-3xl">Starter Project Health Metrics Model</div>
      <div className="mt-2 flex w-full justify-between">
        <div className="max-w-5xl text-sm text-[#585858] line-clamp-2">
          This metrics model is designed to help people get started with four
          key project health metrics that they can expand on and customize to
          meet their unique needs later.
          <a
            className="ml-1 text-primary hover:underline"
            data-html2canvas-ignore="true"
            href={
              'https://chaoss.community/kb/metrics-model-starter-project-health/'
            }
          >
            {t('common:know_more')}
          </a>
        </div>
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
      </div>
    </>
  );
};

export default ModeTitle;
