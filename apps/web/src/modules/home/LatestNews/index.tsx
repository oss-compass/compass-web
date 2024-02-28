import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import jsonData from './NewsData.json';
import Image from 'next/image';
import { BsArrowRight } from 'react-icons/bs';
import DatePicker from './DatePicker';
import LinkX from '@common/components/LinkX';

const NewsBox = (props: {
  type: string;
  title: string;
  titleCn: string;
  img?: string;
  imgCn?: string;
  url?: string;
}) => {
  const { t, i18n } = useTranslation();
  const typeMap = {
    Announcement: t('home:announcement'),
    Report: t('home:report'),
    Blog: t('home:blog'),
    Event: t('home:event'),
  };
  const { type, title, titleCn, img, imgCn, url } = props;
  return (
    <div>
      <div className="h-[430px] rounded border p-6 shadow">
        <span
          className={classnames('h-6 max-w-[110px] px-2 py-1 text-sm', {
            'border-[#A3BDFF] bg-[#F1F5FF] text-[#6E89CD]':
              type === 'Announcement',
            'border-[#A8E99B] bg-[#F1FFF4] text-[#5ECA66]':
              type === 'Report' || type === 'Blog',
            'border-[#DDA3FF] bg-[#FBF1FF] text-[#B26ECD]': type === 'Event',
          })}
        >
          {typeMap[type]}
        </span>
        {type === 'Event' ? (
          <>
            <div className="line-clamp-3 mt-2 h-[46px] text-2xl font-bold">
              {i18n.language === 'en' ? title : titleCn}
            </div>
            <div className="flex justify-center">
              <DatePicker />
            </div>
          </>
        ) : (
          <>
            <div className="line-clamp-3 mt-2 h-[96px] text-2xl font-bold">
              {i18n.language === 'en' ? title : titleCn}
            </div>
            <div className="mt-4 mb-6 flex justify-center">
              <Image
                width={336}
                height={190}
                src={i18n.language === 'en' ? img : imgCn}
                unoptimized
                alt={''}
                style={{
                  maxWidth: '100%',
                  height: '190px',
                }}
              />
            </div>
            <div className="h-8 leading-8">
              <LinkX href={url || ''}>
                {t('home:read_more')}
                <BsArrowRight className="ml-2 inline-block text-xs" />
              </LinkX>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const LatestNews = () => {
  const { t } = useTranslation();
  const data = jsonData['formData'];
  return (
    <section
      className={classnames(
        'relative mx-auto grid w-[1200px] pt-[40px] pb-6',
        'lg:w-full lg:grid-cols-1 lg:gap-y-6 lg:px-4'
      )}
    >
      <div className="mb-6 text-2xl font-bold">{t('home:the_latest_from')}</div>
      <div className="mb-10 grid grid-cols-3 gap-5 lg:w-full lg:grid-cols-1 lg:gap-y-6 lg:px-4">
        {data.map(({ type, title, title_cn, img, img_cn, url }) => {
          return (
            <NewsBox
              type={type}
              title={title}
              titleCn={title_cn}
              img={img}
              imgCn={img_cn}
              url={url}
              key={title}
            />
          );
        })}
      </div>
    </section>
  );
};

export default LatestNews;
