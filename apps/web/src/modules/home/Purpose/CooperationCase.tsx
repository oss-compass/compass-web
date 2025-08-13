import React, { useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { Popover } from 'antd';

const CooperationCase = ({ caseList }) => {
  const { t } = useTranslation();
  const [active, setActive] = useState(caseList[0].name);
  const activeCase = caseList.find((item) => item.name === active);

  return (
    <>
      <div className="mb-3 text-2xl font-medium">
        {t('academe:cooperation_case')}
      </div>
      <div className="flex border bg-[#f7f7f7]">
        {caseList.map((item, index) => {
          return (
            <div
              key={item.name}
              onClick={() => {
                setActive(item.name);
              }}
              className={classnames(
                'relative flex h-[56px] w-[300px] cursor-pointer items-center justify-center border-b-0 border-t-0 border-r  bg-[#f7f7f7]',
                { '!bg-white': active === item.name }
              )}
            >
              <div className="max-w-[180px] overflow-hidden">
                <div
                  className={classnames('flex items-center justify-center', {
                    'xl:pl-2': !item.name.includes('pku'),
                  })}
                >
                  <Image
                    src={item.url}
                    width={item?.pngWidth || 100}
                    height={item?.pngHeight || 35}
                    alt={item.title}
                    style={{
                      objectFit: 'contain',
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mb-10  max-h-[400px] overflow-auto border border-t-0 border-[#CFCFCF] p-8">
        <div className="flex items-center md:flex-col">
          <div className="mb-4 w-[500px] pl-2 md:w-full">
            <div className="text-xl font-semibold">{activeCase.title}</div>
            <div className="mt-2 w-[500px] text-sm md:w-full">
              {activeCase.desc}
            </div>
            {activeCase.experienceUrl && (
              <div
                onClick={() => {
                  window.open(activeCase.experienceUrl);
                }}
                className="mt-4 flex h-8 w-48 cursor-pointer items-center justify-center bg-[#000000] px-3 text-sm text-white hover:bg-black/90"
              >
                {t('academe:experience_immediately')}
              </div>
            )}
            {activeCase.contactUrl && (
              <Popover
                content={
                  <>
                    <div className="flex items-center justify-center text-base">
                      Email:
                      <a
                        className="ml-2 mb-0.5 text-[#002fa7]"
                        href={`mailto:${activeCase.contactUrl}`}
                      >
                        {activeCase.contactUrl}
                      </a>
                    </div>
                  </>
                }
                trigger="click"
              >
                <div className="mt-4 flex h-8 w-48 cursor-pointer items-center justify-center bg-[#000000] px-3 text-sm text-white hover:bg-black/90">
                  {t('academe:contact_immediately')}
                </div>
              </Popover>
            )}
            {activeCase.experience && activeCase.experience}
          </div>
          <div className="ml-8 flex h-[280px] flex-1 items-center">
            {activeCase.content}
          </div>
        </div>
      </div>
    </>
  );
};

export default CooperationCase;
