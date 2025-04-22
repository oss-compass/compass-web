import React, { useState } from 'react';
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

  const [badgeSrc, setBadgeSrc] = useState(badgeLinks.logo);

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
            value={badgeSrc}
            onValueChange={(v) => {
              setBadgeSrc(v);
            }}
          >
            <div className="mb-6 grid grid-cols-2 gap-4">
              <BadgeItem activeSrc={badgeSrc} src={badgeLinks.logo} />
            </div>

            <div className="mb-2 font-medium">
              {t('analyze:topic.productivity')}
            </div>
            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-1">
              <BadgeItem
                activeSrc={badgeSrc}
                src={badgeLinks.collab_dev_index}
              />
              <BadgeItem activeSrc={badgeSrc} src={badgeLinks.community} />
            </div>

            <div className="mb-2 font-medium">
              {t('analyze:topic.robustness')}
            </div>
            <div className="mb-6 grid grid-cols-2 gap-4">
              <BadgeItem activeSrc={badgeSrc} src={badgeLinks.activity} />
            </div>

            <div className="mb-2 font-medium">
              {t('analyze:topic.niche_creation')}
            </div>
            <div className="mb-6 grid grid-cols-2 gap-4">
              <BadgeItem
                activeSrc={badgeSrc}
                src={badgeLinks.organizations_activity}
              />
            </div>
          </RadioGroup.Root>
          <TabPanel badgeSrc={badgeSrc} />
        </div>
      </Dialog>
    </>
  );
};

const BadgeItem = ({ activeSrc, src }: { activeSrc: string; src: string }) => {
  const isChecked = activeSrc === src;
  return (
    <div className="flex cursor-pointer items-center ">
      <RadioGroup.Item
        value={src}
        id={src}
        className={cn(
          'h-[20px] w-[20px]  rounded-full border-2 bg-white outline-none ',
          [isChecked ? 'border-primary' : 'border-secondary']
        )}
      >
        <RadioGroup.Indicator className="after:bg-primary relative flex h-full w-full items-center justify-center after:block after:h-[12px] after:w-[12px] after:rounded-[50%] after:content-['']" />
      </RadioGroup.Item>
      <label
        className="flex cursor-pointer pl-[15px] text-[15px] leading-none text-black"
        htmlFor={src}
      >
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
        <Tab
          disableRipple
          classes={{ root: '!normal-case', selected: '!text-black ' }}
          label="Markdown"
          value="Markdown"
        />
        <Tab
          disableRipple
          classes={{
            root: '!normal-case',
            selected: '!text-black !normal-case',
          }}
          label="HTML"
          value="HTML"
        />
        <Tab
          disableRipple
          classes={{
            root: '!normal-case',
            selected: '!text-black !normal-case',
          }}
          label="Link"
          value="Link"
        />
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
                    toast.error('Failed！No copy permission');
                  });
              } else {
                toast.error('Failed！ Not Supported clipboard');
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
