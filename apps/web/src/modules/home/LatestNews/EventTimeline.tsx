import React from 'react';
import { Timeline } from 'antd';
import { useTranslation } from 'react-i18next';
import LinkX from '@common/components/LinkX';
import newsData from './NewsData.json';

const EventTimeline = () => {
  const { i18n } = useTranslation();

  const timelineItems = [...newsData.eventList]
    .reverse()
    .map((event, index) => ({
      key: index,
      dot: (
        <div className="h-3 w-3 rounded-full border-2 border-white bg-[#B26ECD] shadow-md" />
      ),
      children: (
        <>
          <div className="mb-1 text-sm text-gray-500">
            {i18n.language === 'en' ? event.dateEn : event.date}
          </div>
          <div className="text-base font-medium">
            <LinkX href={event.url}>
              <span className="text-gray-800 transition-colors duration-200 hover:text-[#B26ECD]">
                {' '}
                {i18n.language === 'en' ? event.titleEn : event.titleCn}
              </span>
            </LinkX>
          </div>
        </>
      ),
    }));

  return (
    <div className="max-h-[300px] overflow-y-auto px-4">
      <Timeline
        mode="left"
        items={timelineItems}
        className="custom-timeline pt-2"
      />
      <style jsx global>{`
        .custom-timeline .ant-timeline-item-tail {
          border-left: 2px solid #e5e7eb;
        }
        .custom-timeline .ant-timeline-item:last-child .ant-timeline-item-tail {
          display: none;
        }
        .custom-timeline .ant-timeline-item-head {
          background-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default EventTimeline;
