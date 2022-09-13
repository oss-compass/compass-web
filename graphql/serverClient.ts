import { GraphQLClient } from 'graphql-request';
import { GetServerSidePropsContext } from 'next';

const gqlClient = new GraphQLClient('/api/graphql');

const serverGqlClient = (req: GetServerSidePropsContext['req']) => {
  gqlClient.setHeader('Cookie', req.headers.cookie || '');
  return gqlClient;
};
export default serverGqlClient;
