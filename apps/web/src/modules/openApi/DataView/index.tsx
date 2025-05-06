import React from 'react';
import APIGroupPanel from './APIGroupPanel';
import useMenuContent from '@modules/openApi/components/SideBar/useMenuContent';
import Loading from './Loading';
import { useTranslation } from 'next-i18next';

const APIDocumentation = () => {
  const { t } = useTranslation();
  const { isLoading, result: apiData } = useMenuContent();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mx-auto w-full">
      <h1 className="mb-8 text-3xl font-bold">
        {t('open_api:api_documentation')}
      </h1>
      {apiData?.map((group) => (
        <div
          id={group.name}
          className="scroll-mt-[100px] pb-4"
          key={group.name}
        >
          <h3 className="group mb-4 ml-4 text-2xl font-semibold">
            {group.name}
            <a href={`#${group.name}`}>
              <span className="group-hover:text-primary invisible ml-2 cursor-pointer group-hover:visible">
                #
              </span>
            </a>
          </h3>
          <APIGroupPanel group={group} />
        </div>
      ))}
    </div>
  );
};

export default APIDocumentation;
