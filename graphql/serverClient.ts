import { GraphQLClient } from 'graphql-request';
import { GetServerSidePropsContext } from 'next';

const gqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_SERVER_GRAPHQL_API_URL || ''
);

const serverGqlClient = (req: GetServerSidePropsContext['req']) => {
  gqlClient.setHeader('Cookie', req.headers.cookie || '');
  return gqlClient;
};
export default serverGqlClient;
