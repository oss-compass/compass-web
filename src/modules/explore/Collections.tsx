import CollectionCard from './CollectionCard';
import CollectionFullCard from './CollectionFullCard';
import collections from '../../../script/tmp/collections.json';
import { Collection } from './type';

const fullShowCollections = ['relational-database', 'web-framework'];
const normalShowCollections = ['relational-database', 'web-framework'];

const Collections = () => {
  const fullCardItems: Collection[] = fullShowCollections.map((k) => {
    return (collections as any)[k];
  });

  const CardItems: Collection[] = normalShowCollections.map((k) => {
    return (collections as any)[k];
  });

  return (
    <div>
      {fullCardItems.map((item) => {
        return <CollectionFullCard key={item.ident} collection={item} />;
      })}
      <div className="grid grid-cols-4 gap-6">
        {CardItems.map((item) => {
          return <CollectionCard key={item.ident} collection={item} />;
        })}
      </div>
    </div>
  );
};

export default Collections;
