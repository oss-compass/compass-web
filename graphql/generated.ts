/* eslint-disable max-lines */
import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};

function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  headers?: RequestInit['headers']
) {
  return async (): Promise<TData> =>
    client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ISO8601DateTime: any;
};

/** Autogenerated input type of CreateRepoTask */
export type CreateRepoTaskInput = {
  /** Whether to calculate the activity model */
  activity?: InputMaybe<Scalars['Boolean']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** Whether to calculate the codequality model */
  codequality?: InputMaybe<Scalars['Boolean']>;
  /** Whether to calculate the community model */
  community?: InputMaybe<Scalars['Boolean']>;
  /** Whether to execute the enrich task */
  enrich?: InputMaybe<Scalars['Boolean']>;
  /** Whether to execute the raw fetch task */
  raw?: InputMaybe<Scalars['Boolean']>;
  /** Target repository url */
  repoUrl: Scalars['String'];
};

/** Autogenerated return type of CreateRepoTask */
export type CreateRepoTaskPayload = {
  __typename?: 'CreateRepoTaskPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

export type Error = {
  __typename?: 'Error';
  /** 错误信息 */
  message?: Maybe<Scalars['String']>;
  /** 错误路径 */
  path?: Maybe<Array<Scalars['String']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Submit a repository analysis task */
  createRepoTask?: Maybe<CreateRepoTaskPayload>;
};

export type MutationCreateRepoTaskArgs = {
  input: CreateRepoTaskInput;
};

export type Overview = {
  __typename?: 'Overview';
  issuesCount?: Maybe<Scalars['Int']>;
  pullsCount?: Maybe<Scalars['Int']>;
  reposCount?: Maybe<Scalars['Int']>;
  stargazersCount?: Maybe<Scalars['Int']>;
  subscribersCount?: Maybe<Scalars['Int']>;
  trends?: Maybe<Array<Repo>>;
};

export type Query = {
  __typename?: 'Query';
  /** Get overview data of compass */
  overview: Overview;
  /** Get repo data by specified url */
  repo?: Maybe<Repo>;
};

export type QueryRepoArgs = {
  url: Scalars['String'];
};

export type Repo = {
  __typename?: 'Repo';
  backend?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  forksCount?: Maybe<Scalars['Int']>;
  issuesCount?: Maybe<Scalars['Int']>;
  language?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  openIssuesCount?: Maybe<Scalars['Int']>;
  origin: Scalars['String'];
  path?: Maybe<Scalars['String']>;
  pullsCount?: Maybe<Scalars['Int']>;
  stargazersCount?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['ISO8601DateTime'];
  watchersCount?: Maybe<Scalars['Int']>;
};

export type GetOverviewQueryVariables = Exact<{ [key: string]: never }>;

export type GetOverviewQuery = {
  __typename?: 'Query';
  overview: {
    __typename?: 'Overview';
    issuesCount?: number | null;
    pullsCount?: number | null;
    reposCount?: number | null;
    stargazersCount?: number | null;
    subscribersCount?: number | null;
    trends?: Array<{
      __typename?: 'Repo';
      backend?: string | null;
      forksCount?: number | null;
      issuesCount?: number | null;
      language?: string | null;
      name?: string | null;
      openIssuesCount?: number | null;
      path?: string | null;
      pullsCount?: number | null;
      stargazersCount?: number | null;
      watchersCount?: number | null;
    }> | null;
  };
};

export const GetOverviewDocument = /*#__PURE__*/ `
    query getOverview {
  overview {
    issuesCount
    pullsCount
    reposCount
    stargazersCount
    subscribersCount
    trends {
      backend
      forksCount
      issuesCount
      language
      name
      openIssuesCount
      path
      pullsCount
      stargazersCount
      watchersCount
    }
  }
}
    `;
export const useGetOverviewQuery = <TData = GetOverviewQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: GetOverviewQueryVariables,
  options?: UseQueryOptions<GetOverviewQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetOverviewQuery, TError, TData>(
    variables === undefined ? ['getOverview'] : ['getOverview', variables],
    fetcher<GetOverviewQuery, GetOverviewQueryVariables>(
      client,
      GetOverviewDocument,
      variables,
      headers
    ),
    options
  );

useGetOverviewQuery.getKey = (variables?: GetOverviewQueryVariables) =>
  variables === undefined ? ['getOverview'] : ['getOverview', variables];
useGetOverviewQuery.fetcher = (
  client: GraphQLClient,
  variables?: GetOverviewQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<GetOverviewQuery, GetOverviewQueryVariables>(
    client,
    GetOverviewDocument,
    variables,
    headers
  );
