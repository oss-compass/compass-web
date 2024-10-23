import React, { useState, RefObject } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useCountDown } from 'ahooks';
import { useTranslation } from 'next-i18next';
import { PiShareFatLight } from 'react-icons/pi';
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
import DownCardLoadImage from './DownCardLoadImage';
import { AiOutlineLoading } from 'react-icons/ai';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import useQueryDateRange from '@modules/analyze/hooks/useQueryDateRange';
import { rangeTags } from '../constant';
import { format } from 'date-fns';
import { toUnderline } from '@common/utils/format';

const queryMap = {
  metricCodequality: 'collab_dev_index',
  metricCommunity: 'community',
  metricActivity: 'activity',
  metricGroupActivity: 'organizations_activity',
};

const useGetSvgUrl = (
  slug: string,
  id: string,
  yAxisScale: boolean,
  onePointSys: boolean,
  yKey: string
) => {
  const { range, timeStart, timeEnd } = useQueryDateRange();
  let url = `/chart/${slug}.svg`;
  let metrc = '';
  let field = '';
  if (id === 'topic_overview') {
    metrc = 'overview';
  } else {
    const [metrcKey, fieldKey] = yKey.split('.');
    metrc = queryMap[metrcKey];
    if (id.indexOf('overview') === -1) {
      field = toUnderline(fieldKey);
    }
  }
  metrc && (url += `?metric=${metrc}`);
  field && (url += `&field=${field}`);
  !onePointSys && (url += `&y_trans=1`);
  !yAxisScale && (url += `&y_abs=1`);
  if (
    id === 'code_quality_is_maintained' ||
    id === 'code_quality_loc_frequency'
  ) {
    url += `&chart=bar`;
  }
  if (rangeTags.includes(range)) {
    url += `&range=${range}`;
  } else {
    const begin_date = format(timeStart!, 'yyyy-MM-dd');
    const end_date = format(timeEnd!, 'yyyy-MM-dd');
    url += `&begin_date=${begin_date}&end_date=${end_date}`;
  }
  return url;
};
const DownloadAndShare = (props: {
  cardRef: RefObject<HTMLElement>;
  downloadImageSize?: 'middle' | 'full';
  yAxisScale?: boolean;
  onePointSys?: boolean;
  yKey?: string;
}) => {
  const { cardRef, downloadImageSize, yAxisScale, onePointSys, yKey } = props;
  const { t } = useTranslation();
  const router = useRouter();
  const slug = router.query.slugs as string;
  const { compareItems } = useCompareItems();
  const len = compareItems.length;
  const svgUrl = useGetSvgUrl(
    slug,
    cardRef.current.id,
    yAxisScale,
    onePointSys,
    yKey
  );
  const [open, setOpen] = useState(false);
  const [fileFormat, setFileFormat] = useState('SVG');
  const [loadingDownLoadImg, setLoadingDownLoadImg] = useState(false);
  const [loadingPrviewImg, setLoadingPrviewImg] = useState(false);

  return (
    <>
      <div
        className={classnames(
          'flex  h-8 cursor-pointer items-center border-b px-4'
        )}
        onClick={() => {
          setOpen(true);
        }}
      >
        <PiShareFatLight />
        <span className="ml-2 text-xs text-[#585858]">
          {t('analyze:download_chart_img')}
        </span>
      </div>

      <Dialog
        TransitionComponent={Transition}
        open={open}
        classes={{
          paper: classnames(
            'border-2 border-black w-[640px] !max-w-[640px] !rounded-none !m-0',
            'md:w-full md:h-full md:!m-0 md:!min-h-full md:border-none'
          ),
        }}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className="relative px-10 py-8">
          <p className="mb-8 text-3xl font-bold">
            {t('analyze:download_chart_img')}
          </p>
          <div
            className="absolute right-10 top-8 cursor-pointer p-2"
            onClick={() => {
              setOpen(false);
            }}
          >
            <GrClose className="text-base" />
          </div>
          <div className="mb-2 flex w-full items-center">
            <span className="text-base font-medium">
              {t('analyze:file_format')}
            </span>
            <RadioGroup.Root
              value={fileFormat}
              onValueChange={(v) => {
                setFileFormat(v);
              }}
            >
              <div className="flex items-center">
                <RadioGroup.Item
                  value="SVG"
                  id="SVG"
                  className="flex items-center"
                >
                  <div
                    className={cn(
                      'ml-10 h-[20px]  w-[20px] rounded-full border-2 bg-white outline-none',
                      [
                        fileFormat === 'SVG'
                          ? 'border-primary'
                          : 'border-secondary',
                      ]
                    )}
                  >
                    <RadioGroup.Indicator className="after:bg-primary relative flex h-full w-full items-center justify-center after:block after:h-[12px] after:w-[12px] after:rounded-[50%] after:content-['']" />
                  </div>
                  <label className="flex cursor-pointer pl-[15px] text-[15px] leading-none text-black">
                    SVG
                  </label>
                </RadioGroup.Item>
                <RadioGroup.Item
                  value="PNG"
                  id="PNG"
                  className="flex items-center"
                >
                  <div
                    className={cn(
                      'ml-10 flex h-[20px] w-[20px] rounded-full border-2 bg-white outline-none ',
                      [
                        fileFormat === 'PNG'
                          ? 'border-primary'
                          : 'border-secondary',
                      ]
                    )}
                  >
                    <RadioGroup.Indicator className="after:bg-primary relative flex h-full w-full items-center justify-center after:block after:h-[12px] after:w-[12px] after:rounded-[50%] after:content-['']"></RadioGroup.Indicator>
                  </div>
                  <label className="float-right mx-[15px] flex cursor-pointer text-[15px] leading-none text-black">
                    PNG
                  </label>
                </RadioGroup.Item>
              </div>
            </RadioGroup.Root>
            {loadingPrviewImg && (
              <div
                onClick={() => {
                  setLoadingDownLoadImg(true);
                }}
                className="absolute right-10 top-24 flex  h-7 w-20 cursor-pointer items-center justify-center rounded-sm border border-[#3A5BEF] text-xs text-[#3A5BEF]"
              >
                {loadingDownLoadImg ? (
                  <AiOutlineLoading className="t animate-spin" />
                ) : (
                  t('analyze:download')
                )}
              </div>
            )}
          </div>
          <DownCardLoadImage
            size={downloadImageSize}
            cardRef={cardRef}
            loadingDownLoadImg={loadingDownLoadImg}
            fileFormat={fileFormat}
            onCompleteLoad={() => {
              setLoadingPrviewImg(true);
            }}
            onComplete={() => {
              setLoadingDownLoadImg(false);
            }}
          />
          {fileFormat === 'SVG'
            ? len === 1 && (
                <TabPanel badgeSrc={svgUrl} id={cardRef.current.id} />
              )
            : ''}
        </div>
      </Dialog>
    </>
  );
};

const TabPanel = ({ badgeSrc, id }: { badgeSrc: string; id: string }) => {
  const { t } = useTranslation();
  const [tab, setTab] = React.useState('Markdown');
  const [targetDate, setTargetDate] = useState<number>();
  const [countdown] = useCountDown({ targetDate });
  const badgeLink = window.origin + badgeSrc;
  const anchor = `${window.origin + window.location.pathname}#${id}`;
  let source = '';
  switch (tab) {
    case 'Markdown': {
      source = `[![OSS Compass Analyze](${badgeLink})](${anchor})`;
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
      <div className="mt-4 flex h-[70px] items-center justify-between rounded border bg-[#fafafa] px-3">
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
                    toast.error('Failed! No copy permission');
                  });
              } else {
                toast.error('Failed! Not Supported clipboard');
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
export default DownloadAndShare;
