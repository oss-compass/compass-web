import type { NextPage } from 'next';
import { useGetOverviewQuery } from '@graphql/generated';
import client from '@graphql/client';

const Home: NextPage = () => {
  const { data } = useGetOverviewQuery(client);
  return (
    <div>
      <h1 className="text-3xl font-bold ">Overview</h1>
      <pre> {JSON.stringify(data || {})}</pre>
    </div>
  );
};

export default Home;
