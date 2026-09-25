import React, { useId, useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useCountDown } from 'ahooks';
import { useTranslation } from 'next-i18next';
import { GrClose } from 'react-icons/gr';
import Dialog from '@mui/material/Dialog';
import { BiCopy } from 'react-icons/bi';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Transition } from '@common/components/Dialog';
import Tooltip from '@common/components/Tooltip';
import * as RadioGroup from '@radix-ui/react-radio-group';

const queryMap = {
  COLLAB_DEV_INDEX: 'collab_dev_index',
  COMMUNITY: 'community',
  ACTIVITY: 'activity',
  ORGANIZATIONS_ACTIVITY: 'organizations_activity',
};

const anchorList = [
  {
    badgeUrlQuery: queryMap.COLLAB_DEV_INDEX,
    anchor: 'collaboration_development_index',
  },
  {
    badgeUrlQuery: queryMap.COMMUNITY,
    anchor: 'community_service_support',
  },
  {
    badgeUrlQuery: queryMap.ACTIVITY,
    anchor: 'community_activity',
  },
  {
    badgeUrlQuery: queryMap.ORGANIZATIONS_ACTIVITY,
    anchor: 'organizations_activity',
  },
];

const Badge = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const slug = router.query.slugs as string;
  const badgeLinks = {
    logo: `/badge/${slug}.svg`,
    collab_dev_index: `/badge/${slug}.svg?metric=${queryMap.COLLAB_DEV_INDEX}`,
    community: `/badge/${slug}.svg?metric=${queryMap.COMMUNITY}`,
    activity: `/badge/${slug}.svg?metric=${queryMap.ACTIVITY}`,
    organizations_activity: `/badge/${slug}.svg?metric=${queryMap.ORGANIZATIONS_ACTIVITY}`,
  };

  const [open, setOpen] = useState(false);
  const dialogId = useId();
  const titleId = useId();

  const [badgeSrc, setBadgeSrc] = useState(badgeLinks.logo);

  return (
    <>
      <div className="border-b py-2 pl-3.5 font-bold text-gray-900">
        {t('analyze:function_menu')}
      </div>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? dialogId : undefined}
        className="focus-visible:outline-primary group flex w-full cursor-pointer py-2 pl-3.5 text-left transition focus-visible:outline focus-visible:outline-2"
        onClick={() => {
          setOpen(true);
        }}
      >
        {t('analyze:badge.title')}
      </button>

      <Dialog
        TransitionComponent={Transition}
        open={open}
        aria-labelledby={titleId}
        PaperProps={{ id: dialogId }}
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
          <h2 id={titleId} className="mb-8 text-3xl font-bold">
            {t('analyze:badge.title')}
          </h2>
          <button
            type="button"
            autoFocus
            aria-label={t('common:btn.close')}
            className="focus-visible:outline-primary absolute right-10 top-8 cursor-pointer p-2 focus-visible:outline focus-visible:outline-2"
            onClick={() => {
              setOpen(false);
            }}
          >
            <GrClose className="text-base" aria-hidden="true" />
          </button>
          <RadioGroup.Root
            aria-labelledby={titleId}
            value={badgeSrc}
            onValueChange={(v) => {
              setBadgeSrc(v);
            }}
          >
            <div className="mb-6 grid grid-cols-2 gap-4">
              <BadgeItem
                activeSrc={badgeSrc}
                src={badgeLinks.logo}
                label={t('common:oss_compass')}
              />
            </div>

            <div className="mb-2 font-medium">
              {t('analyze:topic.productivity')}
            </div>
            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-1">
              <BadgeItem
                activeSrc={badgeSrc}
                src={badgeLinks.collab_dev_index}
                label={t('analyze:all_model.collaboration_development_index')}
              />
              <BadgeItem
                activeSrc={badgeSrc}
                src={badgeLinks.community}
                label={t('analyze:all_model.community_service_and_support')}
              />
            </div>

            <div className="mb-2 font-medium">
              {t('analyze:topic.robustness')}
            </div>
            <div className="mb-6 grid grid-cols-2 gap-4">
              <BadgeItem
                activeSrc={badgeSrc}
                src={badgeLinks.activity}
                label={t('analyze:all_model.community_activity')}
              />
            </div>

            <div className="mb-2 font-medium">
              {t('analyze:topic.niche_creation')}
            </div>
            <div className="mb-6 grid grid-cols-2 gap-4">
              <BadgeItem
                activeSrc={badgeSrc}
                src={badgeLinks.organizations_activity}
                label={t('analyze:all_model.organization_activity')}
              />
            </div>
          </RadioGroup.Root>
          <TabPanel badgeSrc={badgeSrc} />
        </div>
      </Dialog>
    </>
  );
};

const BadgeItem = ({
  activeSrc,
  src,
  label,
}: {
  activeSrc: string;
  src: string;
  label: string;
}) => {
  const id = useId();
  const isChecked = activeSrc === src;
  return (
    <div className="flex cursor-pointer items-center ">
      <RadioGroup.Item
        value={src}
        id={id}
        className={cn(
          'focus-visible:ring-primary h-[20px] w-[20px] shrink-0 rounded-full border-2 bg-white outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          [isChecked ? 'border-primary' : 'border-secondary']
        )}
      >
        <RadioGroup.Indicator className="after:bg-primary relative flex h-full w-full items-center justify-center after:block after:h-[12px] after:w-[12px] after:rounded-[50%] after:content-['']" />
      </RadioGroup.Item>
      <label
        className="flex cursor-pointer pl-[15px] text-[15px] leading-none text-black"
        htmlFor={id}
      >
        <span className="sr-only">{label}</span>
        <img src={src} alt="" />
      </label>
    </div>
  );
};

const getMarkdownAnchorLink = (badgeSrc: string) => {
  const url = window.origin + window.location.pathname;
  const item = anchorList.find((i) => badgeSrc.endsWith(i.badgeUrlQuery));
  if (!item) {
    return url;
  }
  return `${url}#${item.anchor}`;
};

const TabPanel = ({ badgeSrc }: { badgeSrc: string }) => {
  const { t } = useTranslation();
  const [tab, setTab] = React.useState('Markdown');
  const tabsId = useId();
  const [copyResult, setCopyResult] = useState<{
    source: string;
    status: 'success' | 'error';
  }>();
  const [targetDate, setTargetDate] = useState<number>();
  const [countdown] = useCountDown({ targetDate });
  const badgeLink = window.origin + badgeSrc;

  let source = '';
  switch (tab) {
    case 'Markdown': {
      source = `[![OSS Compass Analyze](${badgeLink})](${getMarkdownAnchorLink(
        badgeSrc
      )})`;
      break;
    }
    case 'HTML': {
      source = `<img src="${badgeLink}" alt="OSS Compass Analyze" />`;
      break;
    }
    case 'Link': {
      source = badgeLink;
      break;
    }
    default: {
      break;
    }
  }

  const copyStatus =
    copyResult?.source === source ? copyResult.status : undefined;
  const copySource = async () => {
    setCopyResult(undefined);
    try {
      await navigator.clipboard.writeText(source);
      setCopyResult({ source, status: 'success' });
      setTargetDate(Date.now() + 800);
    } catch {
      setCopyResult({ source, status: 'error' });
    }
  };

  return (
    <>
      <Tabs
        classes={{ flexContainer: 'border-b', indicator: '!bg-black' }}
        value={tab}
        onChange={(e, v) => {
          setTab(v);
        }}
        aria-label={t('analyze:badge.text')}
        sx={{
          '& .MuiTab-root.Mui-focusVisible': {
            outline: '2px solid currentColor',
            outlineOffset: '-2px',
          },
        }}
        selectionFollowsFocus
      >
        <Tab
          disableRipple
          classes={{ root: '!normal-case', selected: '!text-black ' }}
          label="Markdown"
          value="Markdown"
          id={`${tabsId}-Markdown`}
          aria-controls={`${tabsId}-panel`}
        />
        <Tab
          disableRipple
          classes={{
            root: '!normal-case',
            selected: '!text-black !normal-case',
          }}
          label="HTML"
          value="HTML"
          id={`${tabsId}-HTML`}
          aria-controls={`${tabsId}-panel`}
        />
        <Tab
          disableRipple
          classes={{
            root: '!normal-case',
            selected: '!text-black !normal-case',
          }}
          label="Link"
          value="Link"
          id={`${tabsId}-Link`}
          aria-controls={`${tabsId}-panel`}
        />
      </Tabs>
      <div
        role="tabpanel"
        id={`${tabsId}-panel`}
        aria-labelledby={`${tabsId}-${tab}`}
      >
        <div className="mt-4 flex min-h-[60px] items-center justify-between rounded border bg-[#fafafa] px-3 py-2">
          <code className="min-w-0 break-all text-xs">{source}</code>
          <Tooltip
            title={
              copyStatus !== 'success' || countdown === 0
                ? t('common:copy.click_to_copy')
                : t('common:copy.copy_successfully')
            }
            arrow
            placement="top"
            describeChild
          >
            <button
              type="button"
              aria-label={t('common:copy.click_to_copy')}
              className="focus-visible:outline-primary ml-4 shrink-0 cursor-pointer rounded border bg-white p-1.5 hover:bg-gray-200 focus-visible:outline focus-visible:outline-2"
              onClick={copySource}
            >
              <BiCopy aria-hidden="true" />
            </button>
          </Tooltip>
        </div>
        <p role="status" className="sr-only">
          {copyStatus === 'success' ? t('common:copy.copy_successfully') : ''}
        </p>
        <p role="alert" className="mt-2 text-sm text-red-700">
          {copyStatus === 'error' ? (
            <>
              {t('common:error.something_went_wrong')}{' '}
              {t('common:error.try_again')}
            </>
          ) : (
            ''
          )}
        </p>
      </div>
    </>
  );
};

export default Badge;
