import React from 'react';
import { useRouter } from 'next/router';
import RepoCard from '../explore/RepoCard';
import { Collection } from '@modules/explore/type';
import classnames from 'classnames';
import jsonData from '../../../script/tmp/collections.json';

const collections = jsonData as unknown as Record<string, Collection>;

const MainContent = () => {
  const router = useRouter();
  const { slug } = router.query;

  const ident = Object.keys(collections).find((ident) => {
    return collections[ident].slug === `/${slug}`;
  });
  const collection = ident ? collections[ident] : null;

  return (
    <div className="flex-1 px-8 py-4">
      <div>
        <div>{collection?.name}</div>
      </div>
      <div>
        <div
          className={classnames(
            'grid flex-1 gap-6',
            '>2xl:grid-cols-5',
            '2xl:grid-cols-5',
            'xl:grid-cols-4',
            'lg:grid-cols-3',
            'md:grid-cols-2',
            'sm:grid-cols-1'
          )}
        >
          {collection?.items?.map((label) => {
            return (
              <div className="w-full" key={label}>
                <RepoCard key={label} label={label} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
