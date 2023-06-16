import fsx from 'fs-extra';
import { resolve } from 'node:path';
import { useBulkShortenedLabelQuery, LabelRowInput } from '@graphql/generated';
import { GraphQLClient } from 'graphql-request';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const gqlClient = new GraphQLClient(process.env.API_URL + '/api/graphql', {
  timeout: 5000,
});

const DIST_COLLECTIONS_TMP_JSON = './public/data/collections_tmp.json';
const DIST_COLLECTIONS_JSON = resolve('./public/data/collections.json');

const getOld = async () => {
  const exists = fsx.pathExistsSync(DIST_COLLECTIONS_JSON);
  if (exists) {
    return await fsx.readJSON(DIST_COLLECTIONS_JSON, {
      encoding: 'utf-8',
    });
  }
  return {};
};

const fetcherShortIds = async (LabelRow: LabelRowInput[]) => {
  return useBulkShortenedLabelQuery.fetcher(gqlClient, {
    labels: LabelRow,
  })();
};

async function getIds() {
  const collectionTmp = await fsx.readJSON(DIST_COLLECTIONS_TMP_JSON, {
    encoding: 'utf-8',
  });
  const newCollections: any = await getOld();

  for (const key in collectionTmp) {
    if (!Array.isArray(collectionTmp[key].items)) return;

    const labelRows = collectionTmp[key].items.map((i: string) => ({
      label: i,
      level: 'repo',
    }));

    const res = await fetcherShortIds(labelRows);

    if (Array.isArray(res.bulkShortenedLabel)) {
      newCollections[key] = {
        ...collectionTmp[key],
        items: res.bulkShortenedLabel,
      };
      await fsx.writeJSON(DIST_COLLECTIONS_JSON, newCollections);
      console.log(`${key} done!`);
    }
  }
}

getIds().catch((e) => {
  console.log(e);
});
