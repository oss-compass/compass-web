import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6 rounded-lg bg-white">
      {/* 标题区块 */}
      <Breadcrumb items={[{ label: t('open_api:about') }]} />
      <div className="px-6">
        <h2 className="pb-4 text-xl font-bold text-gray-800">
          {t('open_api:data_download_title')}
        </h2>
        <div className="text-lg">{t('open_api:data_download_description')}</div>
        <div className="my-4 text-lg">{t('open_api:download_methods')}</div>
        <div className="flex items-center gap-6 pt-4">
          <div
            onClick={() => {
              window.location.hash = 'introduction';
            }}
            className="hover:border-primary max-w-[460px] flex-1 cursor-pointer rounded-xl border border-[#ebedf0] bg-white p-6 shadow hover:shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                {t('open_api:rest_api')}
              </h3>
            </div>
            <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
              {t('open_api:rest_api_description')}
            </p>
          </div>
          <div
            onClick={() => {
              window.location.hash = 'archive-insight';
            }}
            className="hover:border-primary max-w-[460px] flex-1 cursor-pointer rounded-xl border border-[#ebedf0] bg-white p-6 shadow hover:shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                {t('open_api:archive_download')}
              </h3>
            </div>
            <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
              {t('open_api:archive_download_description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
