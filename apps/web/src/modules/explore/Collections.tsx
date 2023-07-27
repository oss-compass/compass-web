import classnames from 'classnames';
import collections from '@public/data/collections.json';
import collectionConfig from '../../../script/config.json';
import CollectionCard from './CollectionCard';
import CollectionFullCard from './CollectionFullCard';
import { Collection } from './type';

const hotCollections = collectionConfig.hot_collections;

const Collections = () => {
  const hotItemsCard: Collection[] = hotCollections.map((k) => {
    return (collections as any)[k];
  });

  const CardItems: Collection[] = Object.keys(collections)
    .filter((k) => !hotCollections.includes(k))
    .map((k) => {
      return (collections as any)[k];
    });

  return (
    <div className="xl:px-4">
      <div className="xl:hidden">
        {hotItemsCard.map((item) => {
          return <CollectionFullCard key={item.ident} collection={item} />;
        })}
      </div>

      <div
        className={classnames(
          'grid grid-cols-4 gap-6',
          'md:gap-4 xl:grid-cols-3',
          'md:gap-4 lg:grid-cols-2',
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
