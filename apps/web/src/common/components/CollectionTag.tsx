import React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import Tooltip from '@common/components/Tooltip';
import { getSecondIdentName } from '@common/collectionsI18n';
import cls from 'classnames';

const CollectionTag = ({
  collections,
  className,
}: {
  collections: string[];
  className: string;
}) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const first = collections?.[0];

  let restCollections: string[] = [];
  if (collections?.length > 1) {
    restCollections = collections?.slice(1).map((item) => {
      return getSecondIdentName(item, i18n.language);
    });
  }

  return (
    <div
      className={cls(
        'text-secondary flex cursor-pointer items-center text-xs',
        className
      )}
    >
      {first ? (
        <>
          <div
            className="bg-smoke rounded px-2 py-1.5"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              router.push(`/collection/${first}`);
            }}
          >
            {getSecondIdentName(first, i18n.language)}
          </div>
          {collections?.length > 1 ? (
            <Tooltip
              title={
                <div className="p-2 text-white">
                  {restCollections?.join(', ')}
                </div>
              }
            >
              <div className="ml-1">+{collections.length - 1}</div>
            </Tooltip>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default CollectionTag;
