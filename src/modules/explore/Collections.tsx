import classnames from 'classnames';
import CollectionCard from './CollectionCard';
import CollectionFullCard from './CollectionFullCard';
import { Collection } from './type';
import collections from '../../../script/tmp/collections.json';

const fullShowCollections = ['deep-learning-frameworks', 'sql-databases'];

const Collections = () => {
  const fullCardItems: Collection[] = fullShowCollections.map((k) => {
    return (collections as any)[k];
  });

  const CardItems: Collection[] = Object.keys(collections)
    .filter((k) => !fullShowCollections.includes(k))
    .map((k) => {
      return (collections as any)[k];
    });

  return (
    <div className="xl:px-4">
      <div className="xl:hidden">
        {fullCardItems.map((item) => {
          return <CollectionFullCard key={item.ident} collection={item} />;
        })}
      </div>

      <div
        className={classnames(
          'grid grid-cols-4 gap-6',
          'xl:grid-cols-3 md:gap-4',
          'lg:grid-cols-2 md:gap-4',
          'md:grid-cols-1 md:gap-4'
        )}
      >
        {CardItems.map((item) => {
          return <CollectionCard key={item.ident} collection={item} />;
        })}
      </div>
    </div>
  );
};

export default Collections;
