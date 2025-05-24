import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import DataSourceSelector from '../../components/DataSourceSelector';
import { useTranslation } from 'react-i18next';
import DateSelect from './DateSelect';

const ArchiveDownload = ({ category }) => {
  const { t } = useTranslation();
  const apiBaseUrl = `${window.location.origin}`;
  const [baseUrl, setBaseUrl] = useState(apiBaseUrl);
  const [selectedDate, setSelectedDate] = useState('202503');

  const categoryData = {
    insight: {
      name: t('open_api:opensource_insight'),
      description: t('open_api:insight_description'),
      downloads: [
        {
          name: t('open_api:contribution_dataset'),
          link: `${baseUrl}/download/contribution/${selectedDate}.tar.gz`,
          description: t('open_api:contribution_dataset_description'),
        },
        {
          name: t('open_api:contributor_dataset'),
          link: `${baseUrl}/download/contributor/${selectedDate}.tar.gz`,
          description: t('open_api:contributor_dataset_description'),
        },
        {
          name: t('open_api:import_export_dataset'),
          link: `${baseUrl}/download/import_export/${selectedDate}.tar.gz`,
          description: t('open_api:import_export_dataset_description'),
        },
        {
          name: t('open_api:language_dataset'),
          link: `${baseUrl}/download/language/${selectedDate}.tar.gz`,
          description: t('open_api:language_dataset_description'),
        },
        {
          name: t('open_api:license_dataset'),
          link: `${baseUrl}/download/license/${selectedDate}.tar.gz`,
          description: t('open_api:license_dataset_description'),
        },
        {
          name: t('open_api:repo_dataset'),
          link: `${baseUrl}/download/repo/${selectedDate}.tar.gz`,
          description: t('open_api:repo_dataset_description'),
        },
        {
          name: t('open_api:technology_dataset'),
          link: `${baseUrl}/download/technology/${selectedDate}.tar.gz`,
          description: t('open_api:technology_dataset_description'),
        },
      ],
    },
  };

  const currentCategory = categoryData[category] || categoryData.insight;

  return (
    <div className="space-y-6 bg-white">
      <Breadcrumb
        items={[
          { label: t('open_api:archived_data') },
          { label: currentCategory?.name },
        ]}
      />
      <div className="text-lg text-gray-700">{currentCategory.description}</div>
      <DataSourceSelector
        defaultValue={apiBaseUrl}
        onChange={(value) => setBaseUrl(value)}
      />
      <DateSelect onChange={setSelectedDate} />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="min-w-[160px] border border-gray-300 px-4 py-2 text-left text-gray-800">
                {t('open_api:name')}
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-800">
                {t('open_api:description')}
              </th>
              <th className="min-w-[100px] border border-gray-300 px-4 py-2 text-left text-gray-800">
                {t('open_api:download_link')}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentCategory.downloads.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  {item.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href={item.link}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('open_api:download')}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArchiveDownload;
