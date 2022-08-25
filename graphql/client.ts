import { GraphQLClient } from 'graphql-request';

const isDevelopment = process.env.NODE_ENV === 'development';

const config: { mode: RequestMode; credentials: RequestCredentials } = {
  mode: isDevelopment ? 'cors' : 'same-origin',
  credentials: isDevelopment ? 'include' : 'same-origin',
};

const gqlClient = new GraphQLClient(
  isDevelopment
    ? 'http://localhost:3000/api/graphql'
    : process.env.NEXT_PUBLIC_GRAPHQL_API_URL || '',
  config
);

export default gqlClient;
