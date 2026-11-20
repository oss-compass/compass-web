import React, { useMemo, useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useCountDown } from 'ahooks';
import { useTranslation } from 'next-i18next';
import { GrClose } from 'react-icons/gr';
import classnames from 'classnames';
import Dialog from '@mui/material/Dialog';
import { BiCopy } from 'react-icons/bi';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { toast } from 'react-hot-toast';
import { Transition } from '@common/components/Dialog';
import Tooltip from '@common//components/Tooltip';
import * as RadioGroup from '@radix-ui/react-radio-group';
import {
  BADGE_LOGO,
  BADGE_SNIPPET_FORMATS,
  BADGE_TOPICS,
  BadgeSelection,
  BadgeSnippetFormat,
  buildBadgeSnippet,
  buildBadgeSrc,
} from './badgeConfig';

const Badge = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const slug = router.query.slugs as string;

  const [open, setOpen] = useState(false);
  // The selection is stored as a metric id instead of the badge url so the
  // preview still resolves when `router.query.slugs` becomes available after
  // the first client render.
  const [selection, setSelection] = useState<BadgeSelection>(BADGE_LOGO);
  const badgeSrc = useMemo(
    () => buildBadgeSrc(slug, selection),
    [slug, selection]
  );

  return (
    <>
      <div className="border-b py-2 pl-3.5 font-bold text-gray-900">
        {t('analyze:function_menu')}
      </div>
      <div
        className={classnames(
          'group flex cursor-pointer py-2 pl-3.5 transition'
        )}
        onClick={() => {
          setOpen(true);
        }}
      >
        {t('analyze:badge.title')}
      </div>

      <Dialog
        TransitionComponent={Transition}
        open={open}
        classes={{
          paper: cn(
            'border-2 border-black w-[640px] !rounded-none',
            'md:w-full md:h-full md:!m-0 md:!min-h-full md:border-none'
          ),
        }}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className="relative px-10 py-8">
          <p className="mb-8 text-3xl font-bold">{t('analyze:badge.title')}</p>
          <div
            className="absolute right-10 top-8 cursor-pointer p-2"
            onClick={() => {
              setOpen(false);
            }}
          >
            <GrClose className="text-base" />
          </div>
          <RadioGroup.Root
            value={selection}
            onValueChange={(v) => {
              setSelection(v as BadgeSelection);
            }}
          >
            <div className="mb-6 grid grid-cols-2 gap-4">
              <BadgeItem
                activeSelection={selection}
                selection={BADGE_LOGO}
                src={buildBadgeSrc(slug, BADGE_LOGO)}
              />
            </div>

            {BADGE_TOPICS.map((topic) => (
              <React.Fragment key={topic.topicKey}>
                <div className="mb-2 font-medium">{t(topic.topicKey)}</div>
                <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-1">
                  {topic.metrics.map((metric) => (
                    <BadgeItem
                      key={metric}
                      activeSelection={selection}
                      selection={metric}
                      src={buildBadgeSrc(slug, metric)}
                    />
                  ))}
                </div>
              </React.Fragment>
            ))}
          </RadioGroup.Root>
          <TabPanel badgeSrc={badgeSrc} />
        </div>
      </Dialog>
    </>
  );
};

const BadgeItem = ({
  activeSelection,
  selection,
  src,
}: {
  activeSelection: BadgeSelection;
  selection: BadgeSelection;
  src: string;
}) => {
  const isChecked = activeSelection === selection;
  // The radio id is derived from the metric id, which is always a valid html
  // id fragment, instead of the badge url that contains slashes and queries.
  const id = `badge-option-${selection}`;
  return (
    <div className="flex cursor-pointer items-center ">
      <RadioGroup.Item
        value={selection}
        id={id}
        className={cn(
          'h-[20px] w-[20px]  rounded-full border-2 bg-white outline-none ',
          [isChecked ? 'border-primary' : 'border-secondary']
        )}
      >
        <RadioGroup.Indicator className="after:bg-primary relative flex h-full w-full items-center justify-center after:block after:h-[12px] after:w-[12px] after:rounded-[50%] after:content-['']" />
      </RadioGroup.Item>
      <label
        className="flex cursor-pointer pl-[15px] text-[15px] leading-none text-black"
        htmlFor={id}
      >
        <img src={src} alt="" />
      </label>
    </div>
  );
};

const TabPanel = ({ badgeSrc }: { badgeSrc: string }) => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<BadgeSnippetFormat>('Markdown');
  const [targetDate, setTargetDate] = useState<number>();
  const [countdown] = useCountDown({ targetDate });

  // The dialog is only rendered after a user click, so `window` is safe to
  // read here. The snippet helpers stay pure and receive the location
  // explicitly, which keeps them unit testable.
  const source = buildBadgeSnippet(badgeSrc, tab, {
    origin: window.origin,
    pathname: window.location.pathname,
  });

  return (
    <>
      <Tabs
        classes={{ flexContainer: 'border-b', indicator: '!bg-black' }}
        value={tab}
        onChange={(e, v) => {
          setTab(v);
        }}
        aria-label="Tabs where selection follows focus"
        selectionFollowsFocus
      >
        {BADGE_SNIPPET_FORMATS.map((format) => (
          <Tab
            key={format}
            disableRipple
            classes={{
              root: '!normal-case',
              selected: '!text-black !normal-case',
            }}
            label={format}
            value={format}
          />
        ))}
      </Tabs>
      <div className="mt-4 flex  h-[60px] items-center justify-between rounded border bg-[#fafafa] px-3">
        <div className="break-all text-xs">{source}</div>
        <Tooltip
          title={
            countdown === 0
              ? t('common:copy.click_to_copy')
              : t('common:copy.copy_successfully')
          }
          arrow
          placement="top"
        >
          <div
            className="ml-4 cursor-pointer rounded border bg-white p-1.5 hover:bg-gray-200"
            onClick={() => {
              if (navigator.clipboard?.writeText) {
                navigator.clipboard
                  .writeText(source)
                  .then((value) => {
                    setTargetDate(Date.now() + 800);
                  })
                  .catch((err) => {
                    toast.error('Failed: no clipboard permission');
                  });
              } else {
                toast.error('Failed: clipboard is not supported');
              }
            }}
          >
            <BiCopy />
          </div>
        </Tooltip>
      </div>
    </>
  );
};

export default Badge;
