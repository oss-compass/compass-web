import type { NextPage } from 'next';
import Link from 'next/link';
import { useGetOverviewQuery } from '@graphql/generated';
import client from '@graphql/client';
import { Header } from '@components/BaseLayout';
import Home from '@modules/home';

const HomePage: NextPage = () => {
  // const { data } = useGetOverviewQuery(client);
  return <Home />;
};

export default HomePage;
