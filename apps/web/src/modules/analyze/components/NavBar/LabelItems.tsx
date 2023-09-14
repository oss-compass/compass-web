import React from 'react';
import { useTranslation } from 'next-i18next';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import { getProvider } from '@common/utils';
import { Level } from '@modules/analyze/constant';
import classnames from 'classnames';
import ProviderIcon from '../ProviderIcon';
import CollectionTag from '@common/components/CollectionTag';

const LabelItems = () => {
  const { t } = useTranslation();
  const { compareItems } = useCompareItems();
  const item = compareItems.length > 0 ? [compareItems[0]] : [];

  return (
    <>
      <div className="relative flex h-6 flex-1 items-center overflow-hidden">
        {item.map(({ name, label, level, collections }) => {
          const host = getProvider(label);
          let labelNode = (
            <span className={'ml-1 mr-1 font-semibold'}>{name}</span>
          );

          if (level === Level.REPO) {
            labelNode = (
              <a
                className="ml-1 mr-1 whitespace-nowrap font-semibold hover:underline"
                href={label}
                target="_blank"
                rel={'noreferrer'}
              >
                {name}
              </a>
            );
          }

          return (
            <div key={label} className={classnames('flex items-center')}>
              <ProviderIcon provider={host} />
              {labelNode}
              {level === Level.COMMUNITY && (
                <div className="ml-2 rounded-[10px] bg-[#FFF9F2] px-2 py-0.5 text-xs text-[#D98523]">
                  {t('home:community')}
                </div>
              )}
              <CollectionTag
                className={'col-span-2 mx-2'}
                collections={collections}
              />
            </div>
          );
        })}
      </div>
      <div className="hidden md:block">
        {/* todo show compare items in mobile */}
      </div>
    </>
  );
};

export default LabelItems;
