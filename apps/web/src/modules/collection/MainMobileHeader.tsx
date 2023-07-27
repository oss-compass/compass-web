import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Collection } from '@modules/explore/type';
import classnames from 'classnames';
import { AiFillCaretDown } from 'react-icons/ai';

const MainMobileHeader = ({
  slug,
  nameKey,
  total,
  collectionArray,
}: {
  slug: string;
  nameKey: 'name_cn' | 'name';
  total: number;
  collectionArray: Collection[];
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        const checkEle = selectRef.current?.querySelector('option:checked');
        const helper = document.getElementById('select-element-width-helper')!;
        if (helper) {
          helper.innerHTML = checkEle!.innerHTML;
          const width = helper.offsetWidth;
          selectRef.current!.style.width = `${width + 10}px`;
        }
      } catch (e) {
        console.log(e);
      }
    }, 0);
    return () => {
      clearTimeout(t);
    };
  }, [slug]);

  return (
    <>
      <div className=">md:hidden mb-4 flex flex h-11 items-center justify-between border-b bg-white px-4">
        <div className="flex items-center">
          <select
            ref={selectRef}
            className={classnames(
              'appearance-none bg-white font-medium outline-0'
            )}
            value={`/${slug}`}
            onChange={async (e) => {
              const collectionSlug = e.target.value;
              await router.push(`/collection${collectionSlug}`);
            }}
          >
            {collectionArray.map((item) => {
              return (
                <option key={item.ident} value={item.slug}>
                  {`${item[nameKey]}`}
                </option>
              );
            })}
          </select>
          <div className="text-xs">
            <AiFillCaretDown />
          </div>
        </div>
        <div className="text-xs text-gray-400">
          {t('collection:repositories', {
            length: total,
          })}
        </div>
      </div>
      <span
        id="select-element-width-helper"
        className="absolute -left-[9999px]  appearance-none bg-white font-medium outline-0"
      />
    </>
  );
};

export default MainMobileHeader;
