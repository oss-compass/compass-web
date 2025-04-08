import React from 'react';
import { BiCheck } from 'react-icons/bi';
import { rangeTags } from '@modules/developer/constant';
import classnames from 'classnames';
import { useToggle } from 'react-use';
import useI18RangeTag from './useI18RangeTag';
import useQueryDateRange from '@modules/developer/DataView/MetricDetail/useVerifyDateRange';
import useSwitchRange from '@modules/developer/components/NavBar/useSwitchRange';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'next-i18next';
import DateRangePicker from './DateRangePicker';
import Tooltip from '@common/components/Tooltip';
import useVerifyDetailRangeQuery from '@modules/developer/hooks/useVerifyDetailRangeQuery';
import { AiOutlineLoading } from 'react-icons/ai';

const ContributorDateTagPanel = ({
  togglePickerPanel,
}: {
  togglePickerPanel: (v: boolean) => void;
}) => {
  const { t } = useTranslation();
  const i18RangeTag = useI18RangeTag();
  const [showRangePicker, setShowRangePicker] = useToggle(false);
  const { range } = useQueryDateRange();
  const { switchRange } = useSwitchRange();
  const { isLoading, data } = useVerifyDetailRangeQuery();
  if (isLoading) {
    return (
      <div
        className={
          'bg-base-100 right-0 h-[184px] w-[280px] rounded text-xs drop-shadow-md'
        }
      >
        <div className="flex h-full items-center justify-center">
          <AiOutlineLoading className="t animate-spin text-3xl" />
        </div>
      </div>
    );
  }
  const statusFalse = !data?.verifyDetailDataRange?.status;
  if (statusFalse) {
    return (
      <div
        className={
          'bg-base-100 right-0 w-[280px] rounded text-xs drop-shadow-md'
        }
      >
        <div className="flex flex-wrap justify-between px-4 pt-4">
          {rangeTags.map((time, index) => {
            if (index < 3) {
              return (
                <div
                  className={classnames(
                    {
                      'bg-primary text-white':
                        range === time && !showRangePicker,
                    },
                    'mb-2 flex h-8 w-[120px] cursor-pointer justify-between border py-2 pl-3 pr-2 text-xs'
                  )}
                  key={time}
                  onClick={async () => {
                    await switchRange(time);
                    togglePickerPanel(false);
                    setShowRangePicker(false);
                  }}
                >
                  {i18RangeTag[time]}
                  {range === time && !showRangePicker && (
                    <div className="h-3.5 w-3.5 rounded-full bg-white">
                      <BiCheck className="text-primary text-sm" />
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Tooltip
                arrow
                key={time}
                title={
                  <>
                    <div> {t('analyze:only_the_latest_month')}</div>
                    <div className="text-[#ABABAB]">
                      {t('analyze:for_more_time_frames')}
                      <span className="cursor-pointer text-white underline">
                        <a href="mailto:contact@oss-compass.org">
                          {t('analyze:contact_us')}
                        </a>
                      </span>
                    </div>
                  </>
                }
              >
                <div
                  className={classnames(
                    {
                      'bg-primary text-white':
                        range === time && !showRangePicker,
                    },
                    {
                      'cursor-not-allowed text-[#ABABAB]':
                        statusFalse && index !== 0,
                    },
                    'mb-2 flex h-8 w-[120px] cursor-pointer justify-between border py-2 pl-3 pr-2 text-xs'
                  )}
                  key={time}
                >
                  {i18RangeTag[time]}
                  {range === time && !showRangePicker && (
                    <div className="h-3.5 w-3.5 rounded-full bg-white">
                      <BiCheck className="text-primary text-sm" />
                    </div>
                  )}
                </div>
              </Tooltip>
            );
          })}
          <Tooltip
            arrow
            title={
              <>
                <div> {t('analyze:only_the_latest_month')}</div>
                <div className="text-[#ABABAB]">
                  {t('analyze:for_more_time_frames')}
                  <span className="cursor-pointer text-white underline">
                    <a href="mailto:contact@oss-compass.org">
                      {t('analyze:contact_us')}
                    </a>
                  </span>
                </div>
              </>
            }
          >
            <div
              className={classnames(
                'mb-2 flex h-8 w-[120px] cursor-pointer justify-between border py-2 pl-3 pr-2 text-xs',
                {
                  'bg-primary text-white': showRangePicker,
                  'mb-4': !showRangePicker,
                },
                { 'cursor-not-allowed text-[#ABABAB]': statusFalse }
              )}
            >
              {t('analyze:custom')}
            </div>
          </Tooltip>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={
          'bg-base-100 right-0 w-[280px] rounded text-xs drop-shadow-md'
        }
      >
        <div className="flex flex-wrap justify-between px-4 pt-4">
          {rangeTags.map((t, index) => {
            return (
              <div
                className={classnames(
                  { 'bg-primary text-white': range === t && !showRangePicker },
                  'mb-2 flex h-8 w-[120px] cursor-pointer justify-between border py-2 pl-3 pr-2 text-xs'
                )}
                key={t}
                onClick={async () => {
                  await switchRange(t);
                  togglePickerPanel(false);
                  setShowRangePicker(false);
                }}
              >
                {i18RangeTag[t]}
                {range === t && !showRangePicker && (
                  <div className="h-3.5 w-3.5 rounded-full bg-white">
                    <BiCheck className="text-primary text-sm" />
                  </div>
                )}
              </div>
            );
          })}
          <div
            className={classnames(
              'mb-2 flex h-8 w-[120px] cursor-pointer justify-between border py-2 pl-3 pr-2 text-xs',
              {
                'bg-primary text-white': showRangePicker,
                'mb-4': !showRangePicker,
              }
            )}
            onClick={async () => {
              setShowRangePicker(true);
            }}
          >
            {t('analyze:custom')}
            {showRangePicker && (
              <div className="h-3.5 w-3.5 rounded-full bg-white">
                <BiCheck className="text-primary text-sm" />
              </div>
            )}
          </div>
        </div>
        <div
          className={classnames('h-10 bg-[#F7F7F7] px-4', {
            hidden: !showRangePicker,
          })}
        >
          <DateRangePicker
            onClick={async (t) => {
              await switchRange(t);
              togglePickerPanel(false);
            }}
          />
        </div>
      </div>
    );
  }
};
export default ContributorDateTagPanel;
