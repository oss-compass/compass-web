import { GraphQLClient } from 'graphql-request';
import { GetServerSidePropsContext } from 'next';

const isDevelopment = process.env.NODE_ENV === 'development';

const gqlClient = new GraphQLClient(
  isDevelopment ? '/api/graphql' : process.env.NEXT_PUBLIC_GRAPHQL_API_URL || ''
);

const serverGqlClient = (req: GetServerSidePropsContext['req']) => {
  gqlClient.setHeader('Cookie', req.headers.cookie || '');
  return gqlClient;
};
export default serverGqlClient;
