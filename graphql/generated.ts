/* eslint-disable max-lines */
import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
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

export type ActivityMetric = {
  __typename?: 'ActivityMetric';
  /** number of active C1 issue comments contributors in the past 90 days */
  activeC1IssueCommentsContributorCount?: Maybe<Scalars['Float']>;
  /** number of active C1 issue create contributors in the past 90 days */
  activeC1IssueCreateContributorCount?: Maybe<Scalars['Float']>;
  /** number of active C1 pr comments contributors in the past 90 days */
  activeC1PrCommentsContributorCount?: Maybe<Scalars['Float']>;
  /** number of active C1 pr create contributors in the past 90 days */
  activeC1PrCreateContributorCount?: Maybe<Scalars['Float']>;
  /** number of active C2 developers in the past 90 days */
  activeC2ContributorCount?: Maybe<Scalars['Float']>;
  /** score of activity metric model */
  activityScore?: Maybe<Scalars['Float']>;
  /** number of issues closed in the past 90 days */
  closedIssuesCount?: Maybe<Scalars['Float']>;
  /** mean of comments per PR over the past 90 days */
  codeReviewCount?: Maybe<Scalars['Float']>;
  /** mean of comments per issue over the past 90 days */
  commentFrequency?: Maybe<Scalars['Float']>;
  /** mean of submissions per week over the past 90 days */
  commitFrequency?: Maybe<Scalars['Float']>;
  /** number of active D1 developers in the past 90 days */
  contributorCount?: Maybe<Scalars['Float']>;
  /** number of months since the project was created */
  createdSince?: Maybe<Scalars['Float']>;
  /** metric model creatiton time */
  grimoireCreationDate?: Maybe<Scalars['ISO8601DateTime']>;
  /** metric model object identification */
  label?: Maybe<Scalars['String']>;
  /** metric model object level */
  level?: Maybe<Scalars['String']>;
  /** number of issue updates in the past 90 days */
  updatedIssuesCount?: Maybe<Scalars['Float']>;
  /** (average of months from the last code commit to the time of statistics */
  updatedSince?: Maybe<Scalars['Float']>;
};

export type CodequalityMetric = {
  __typename?: 'CodequalityMetric';
  /** number of active C1 pr comments contributors in the past 90 days */
  activeC1PrCommentsContributorCount?: Maybe<Scalars['Float']>;
  /** number of active C1 pr create contributors in the past 90 days */
  activeC1PrCreateContributorCount?: Maybe<Scalars['Float']>;
  /** number of active C2 developers in the past 90 days */
  activeC2ContributorCount?: Maybe<Scalars['Float']>;
  /** ratio of merge pulls and all pulls */
  codeMergeRatio?: Maybe<Scalars['Float']>;
  /** merged pr count past 90 days */
  codeMergedCount?: Maybe<Scalars['Float']>;
  /** score of code quality metric model */
  codeQualityGuarantee?: Maybe<Scalars['Float']>;
  /** ratio of pulls with one more reviewers and all pulls */
  codeReviewRatio?: Maybe<Scalars['Float']>;
  /** count of pulls with one more reviewers */
  codeReviewedCount?: Maybe<Scalars['Float']>;
  /** mean of submissions per week over the past 90 days */
  commitFrequency?: Maybe<Scalars['Float']>;
  /** mean of inside submissions per week over the past 90 days */
  commitFrequencyInside?: Maybe<Scalars['Float']>;
  /** number of active D1 developers in the past 90 days */
  contributorCount?: Maybe<Scalars['Float']>;
  /** ratio of pr_commit_linked_count and pr_commit_count */
  gitPrLinkedRatio?: Maybe<Scalars['Float']>;
  /** metric model creatiton time */
  grimoireCreationDate?: Maybe<Scalars['ISO8601DateTime']>;
  /** maintenance status */
  isMaintained?: Maybe<Scalars['Float']>;
  /** metric model object identification */
  label?: Maybe<Scalars['String']>;
  /** metric model object level */
  level?: Maybe<Scalars['String']>;
  /** average of added lines code each commit */
  linesAddedFrequency?: Maybe<Scalars['Float']>;
  /** average of removed lines code each commit */
  linesRemovedFrequency?: Maybe<Scalars['Float']>;
  /** average of lines code each commit */
  locFrequency?: Maybe<Scalars['Float']>;
  /** pr count base for pr_commit_linked_count past 90 days */
  prCommitCount?: Maybe<Scalars['Float']>;
  /** pr with commits linked count past 90 days */
  prCommitLinkedCount?: Maybe<Scalars['Float']>;
  /** all pr count past 90 days */
  prCount?: Maybe<Scalars['Float']>;
  /** count of pulls which are linked issues */
  prIssueLinkedCount?: Maybe<Scalars['Float']>;
  /** ratio of pulls which are linked issues and all pulls */
  prIssueLinkedRatio?: Maybe<Scalars['Float']>;
};

export type CommunityMetric = {
  __typename?: 'CommunityMetric';
  /** number of pulls closed in the past 90 days */
  closedPrsCount?: Maybe<Scalars['Float']>;
  /** mean of comments per PR over the past 90 days */
  codeReviewCount?: Maybe<Scalars['Float']>;
  /** mean of comments per issue over the past 90 days */
  commentFrequency?: Maybe<Scalars['Float']>;
  /** score of community support metric model */
  communitySupportScore?: Maybe<Scalars['Float']>;
  /** metric model creatiton time */
  grimoireCreationDate?: Maybe<Scalars['ISO8601DateTime']>;
  /** mean of issues first response time (days) */
  issueFirstReponseAvg?: Maybe<Scalars['Float']>;
  /** middle of issues first response time (days) */
  issueFirstReponseMid?: Maybe<Scalars['Float']>;
  /** mean of issues open time (days) */
  issueOpenTimeAvg?: Maybe<Scalars['Float']>;
  /** middle of issues open time (days) */
  issueOpenTimeMid?: Maybe<Scalars['Float']>;
  /** metric model object identification */
  label?: Maybe<Scalars['String']>;
  /** metric model object level */
  level?: Maybe<Scalars['String']>;
  /** mean of pulls open time (days) */
  prOpenTimeAvg?: Maybe<Scalars['Float']>;
  /** middle of pulls open time (days) */
  prOpenTimeMid?: Maybe<Scalars['Float']>;
  /** number of issue updates in the past 90 days */
  updatedIssuesCount?: Maybe<Scalars['Float']>;
};

/** Autogenerated input type of CreateProjectTask */
export type CreateProjectTaskInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** user's origin (gitee/github) */
  origin: Scalars['String'];
  /** project label for following repositories */
  projectName: Scalars['String'];
  /** project detail information */
  projectTypes: Array<ProjectTypeInput>;
  /** user's oauth token only for username verification */
  token: Scalars['String'];
  /** gitee or github login/username */
  username: Scalars['String'];
};

/** Autogenerated return type of CreateProjectTask */
export type CreateProjectTaskPayload = {
  __typename?: 'CreateProjectTaskPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
  prUrl?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

/** Autogenerated input type of CreateRepoTask */
export type CreateRepoTaskInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** user's origin (gitee/github) */
  origin: Scalars['String'];
  /** repository url */
  repoUrl: Scalars['String'];
  /** user's oauth token only for username verification */
  token: Scalars['String'];
  /** gitee or github login/username */
  username: Scalars['String'];
};

/** Autogenerated return type of CreateRepoTask */
export type CreateRepoTaskPayload = {
  __typename?: 'CreateRepoTaskPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
  prUrl?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

export type Error = {
  __typename?: 'Error';
  /** 错误信息 */
  message?: Maybe<Scalars['String']>;
  /** 错误路径 */
  path?: Maybe<Array<Scalars['String']>>;
};

export type LatestMetrics = {
  __typename?: 'LatestMetrics';
  /** latest score of activity metric model */
  activityScore?: Maybe<Scalars['Float']>;
  /** latest score of activity metric model updated_at */
  activityScoreUpdatedAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** latest score of code quality metric model */
  codeQualityGuarantee?: Maybe<Scalars['Float']>;
  /** latest score of code quality metric model updated_at */
  codeQualityGuaranteeUpdatedAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** latest score of community support metric model */
  communitySupportScore?: Maybe<Scalars['Float']>;
  /** latest score of community support metric model up */
  communitySupportScoreUpdatedAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** metric model object identification */
  label?: Maybe<Scalars['String']>;
  /** metric model object level */
  level?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Submit a project analysis task */
  createProjectTask?: Maybe<CreateProjectTaskPayload>;
  /** Submit a repository analysis task */
  createRepoTask?: Maybe<CreateRepoTaskPayload>;
};

export type MutationCreateProjectTaskArgs = {
  input: CreateProjectTaskInput;
};

export type MutationCreateRepoTaskArgs = {
  input: CreateRepoTaskInput;
};

export type Overview = {
  __typename?: 'Overview';
  dimensionsCount?: Maybe<Scalars['Int']>;
  metricsCount?: Maybe<Scalars['Int']>;
  modelsCount?: Maybe<Scalars['Int']>;
  projectsCount?: Maybe<Scalars['Int']>;
  trends?: Maybe<Array<Repo>>;
};

export type ProjectCompletionRow = {
  __typename?: 'ProjectCompletionRow';
  /** metric model object identification */
  label?: Maybe<Scalars['String']>;
  /** metric model object level (project or repo) */
  level?: Maybe<Scalars['String']>;
};

export type ProjectTypeInput = {
  /** project's repositories list */
  repoList: Array<Scalars['String']>;
  /** project type label */
  type: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** repo or project analysis status (pending/progress/success/error/canceled/unsumbit) */
  analysisStatus: Scalars['String'];
  /** Fuzzy search project by keyword */
  fuzzySearch: Array<ProjectCompletionRow>;
  /** Get latest metrics data of the specified label */
  latestMetrics: LatestMetrics;
  /** Get activity metrics data of compass */
  metricActivity: Array<ActivityMetric>;
  /** Get code quality metrics data of compass */
  metricCodequality: Array<CodequalityMetric>;
  /** Get community metrics data of compass */
  metricCommunity: Array<CommunityMetric>;
  /** Get overview data of compass */
  overview: Overview;
};

export type QueryAnalysisStatusArgs = {
  label: Scalars['String'];
};

export type QueryFuzzySearchArgs = {
  keyword: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
};

export type QueryLatestMetricsArgs = {
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
};

export type QueryMetricActivityArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
};

export type QueryMetricCodequalityArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
};

export type QueryMetricCommunityArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
};

export type Repo = {
  __typename?: 'Repo';
  backend?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  forksCount?: Maybe<Scalars['Int']>;
  language?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  openIssuesCount?: Maybe<Scalars['Int']>;
  origin: Scalars['String'];
  path?: Maybe<Scalars['String']>;
  stargazersCount?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['ISO8601DateTime'];
  watchersCount?: Maybe<Scalars['Int']>;
};

export type CreateRepoTaskMutationVariables = Exact<{
  username: Scalars['String'];
  repoUrl: Scalars['String'];
  token: Scalars['String'];
  origin: Scalars['String'];
}>;

export type CreateRepoTaskMutation = {
  __typename?: 'Mutation';
  createRepoTask?: {
    __typename?: 'CreateRepoTaskPayload';
    message?: string | null;
    status: string;
    prUrl?: string | null;
  } | null;
};

export type CreateProjectTaskMutationVariables = Exact<{
  username: Scalars['String'];
  projectName: Scalars['String'];
  projectTypes: Array<ProjectTypeInput> | ProjectTypeInput;
  token: Scalars['String'];
  origin: Scalars['String'];
}>;

export type CreateProjectTaskMutation = {
  __typename?: 'Mutation';
  createProjectTask?: {
    __typename?: 'CreateProjectTaskPayload';
    message?: string | null;
    status: string;
    prUrl?: string | null;
  } | null;
};

export type StatusQueryVariables = Exact<{
  label: Scalars['String'];
}>;

export type StatusQuery = { __typename?: 'Query'; analysisStatus: string };

export type SearchQueryVariables = Exact<{
  keyword: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
}>;

export type SearchQuery = {
  __typename?: 'Query';
  fuzzySearch: Array<{
    __typename?: 'ProjectCompletionRow';
    level?: string | null;
    label?: string | null;
  }>;
};

export type LatestMetricsQueryVariables = Exact<{
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
}>;

export type LatestMetricsQuery = {
  __typename?: 'Query';
  latestMetrics: {
    __typename?: 'LatestMetrics';
    activityScore?: number | null;
    activityScoreUpdatedAt?: any | null;
    codeQualityGuarantee?: number | null;
    codeQualityGuaranteeUpdatedAt?: any | null;
    communitySupportScore?: number | null;
    communitySupportScoreUpdatedAt?: any | null;
    label?: string | null;
    level?: string | null;
  };
};

export type OverviewQueryVariables = Exact<{ [key: string]: never }>;

export type OverviewQuery = {
  __typename?: 'Query';
  overview: {
    __typename?: 'Overview';
    projectsCount?: number | null;
    dimensionsCount?: number | null;
    metricsCount?: number | null;
    modelsCount?: number | null;
    trends?: Array<{
      __typename?: 'Repo';
      backend?: string | null;
      forksCount?: number | null;
      language?: string | null;
      name?: string | null;
      openIssuesCount?: number | null;
      path?: string | null;
      stargazersCount?: number | null;
      watchersCount?: number | null;
    }> | null;
  };
};

export type MetricQueryVariables = Exact<{
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['ISO8601DateTime']>;
  end?: InputMaybe<Scalars['ISO8601DateTime']>;
}>;

export type MetricQuery = {
  __typename?: 'Query';
  metricCodequality: Array<{
    __typename?: 'CodequalityMetric';
    activeC1PrCommentsContributorCount?: number | null;
    activeC1PrCreateContributorCount?: number | null;
    activeC2ContributorCount?: number | null;
    codeMergeRatio?: number | null;
    codeMergedCount?: number | null;
    codeQualityGuarantee?: number | null;
    codeReviewRatio?: number | null;
    codeReviewedCount?: number | null;
    commitFrequency?: number | null;
    commitFrequencyInside?: number | null;
    contributorCount?: number | null;
    gitPrLinkedRatio?: number | null;
    grimoireCreationDate?: any | null;
    isMaintained?: number | null;
    label?: string | null;
    level?: string | null;
    linesAddedFrequency?: number | null;
    linesRemovedFrequency?: number | null;
    locFrequency?: number | null;
    prCommitCount?: number | null;
    prCommitLinkedCount?: number | null;
    prCount?: number | null;
    prIssueLinkedRatio?: number | null;
    prIssueLinkedCount?: number | null;
  }>;
  metricCommunity: Array<{
    __typename?: 'CommunityMetric';
    closedPrsCount?: number | null;
    codeReviewCount?: number | null;
    commentFrequency?: number | null;
    communitySupportScore?: number | null;
    grimoireCreationDate?: any | null;
    issueFirstReponseAvg?: number | null;
    issueFirstReponseMid?: number | null;
    issueOpenTimeAvg?: number | null;
    issueOpenTimeMid?: number | null;
    label?: string | null;
    level?: string | null;
    prOpenTimeAvg?: number | null;
    prOpenTimeMid?: number | null;
    updatedIssuesCount?: number | null;
  }>;
  metricActivity: Array<{
    __typename?: 'ActivityMetric';
    activeC1IssueCommentsContributorCount?: number | null;
    activeC1IssueCreateContributorCount?: number | null;
    activeC1PrCommentsContributorCount?: number | null;
    activeC1PrCreateContributorCount?: number | null;
    activeC2ContributorCount?: number | null;
    activityScore?: number | null;
    closedIssuesCount?: number | null;
    codeReviewCount?: number | null;
    commentFrequency?: number | null;
    commitFrequency?: number | null;
    contributorCount?: number | null;
    createdSince?: number | null;
    grimoireCreationDate?: any | null;
    label?: string | null;
    level?: string | null;
    updatedIssuesCount?: number | null;
    updatedSince?: number | null;
  }>;
};

export const CreateRepoTaskDocument = /*#__PURE__*/ `
    mutation createRepoTask($username: String!, $repoUrl: String!, $token: String!, $origin: String!) {
  createRepoTask(
    input: {username: $username, repoUrl: $repoUrl, origin: $origin, token: $token}
  ) {
    message
    status
    prUrl
  }
}
    `;
export const useCreateRepoTaskMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    CreateRepoTaskMutation,
    TError,
    CreateRepoTaskMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    CreateRepoTaskMutation,
    TError,
    CreateRepoTaskMutationVariables,
    TContext
  >(
    ['createRepoTask'],
    (variables?: CreateRepoTaskMutationVariables) =>
      fetcher<CreateRepoTaskMutation, CreateRepoTaskMutationVariables>(
        client,
        CreateRepoTaskDocument,
        variables,
        headers
      )(),
    options
  );
useCreateRepoTaskMutation.fetcher = (
  client: GraphQLClient,
  variables: CreateRepoTaskMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<CreateRepoTaskMutation, CreateRepoTaskMutationVariables>(
    client,
    CreateRepoTaskDocument,
    variables,
    headers
  );
export const CreateProjectTaskDocument = /*#__PURE__*/ `
    mutation createProjectTask($username: String!, $projectName: String!, $projectTypes: [ProjectTypeInput!]!, $token: String!, $origin: String!) {
  createProjectTask(
    input: {username: $username, projectName: $projectName, projectTypes: $projectTypes, origin: $origin, token: $token}
  ) {
    message
    status
    prUrl
  }
}
    `;
export const useCreateProjectTaskMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    CreateProjectTaskMutation,
    TError,
    CreateProjectTaskMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    CreateProjectTaskMutation,
    TError,
    CreateProjectTaskMutationVariables,
    TContext
  >(
    ['createProjectTask'],
    (variables?: CreateProjectTaskMutationVariables) =>
      fetcher<CreateProjectTaskMutation, CreateProjectTaskMutationVariables>(
        client,
        CreateProjectTaskDocument,
        variables,
        headers
      )(),
    options
  );
useCreateProjectTaskMutation.fetcher = (
  client: GraphQLClient,
  variables: CreateProjectTaskMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<CreateProjectTaskMutation, CreateProjectTaskMutationVariables>(
    client,
    CreateProjectTaskDocument,
    variables,
    headers
  );
export const StatusDocument = /*#__PURE__*/ `
    query status($label: String!) {
  analysisStatus(label: $label)
}
    `;
export const useStatusQuery = <TData = StatusQuery, TError = unknown>(
  client: GraphQLClient,
  variables: StatusQueryVariables,
  options?: UseQueryOptions<StatusQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<StatusQuery, TError, TData>(
    ['status', variables],
    fetcher<StatusQuery, StatusQueryVariables>(
      client,
      StatusDocument,
      variables,
      headers
    ),
    options
  );

useStatusQuery.getKey = (variables: StatusQueryVariables) => [
  'status',
  variables,
];
useStatusQuery.fetcher = (
  client: GraphQLClient,
  variables: StatusQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<StatusQuery, StatusQueryVariables>(
    client,
    StatusDocument,
    variables,
    headers
  );
export const SearchDocument = /*#__PURE__*/ `
    query search($keyword: String!, $level: String) {
  fuzzySearch(keyword: $keyword, level: $level) {
    level
    label
  }
}
    `;
export const useSearchQuery = <TData = SearchQuery, TError = unknown>(
  client: GraphQLClient,
  variables: SearchQueryVariables,
  options?: UseQueryOptions<SearchQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<SearchQuery, TError, TData>(
    ['search', variables],
    fetcher<SearchQuery, SearchQueryVariables>(
      client,
      SearchDocument,
      variables,
      headers
    ),
    options
  );

useSearchQuery.getKey = (variables: SearchQueryVariables) => [
  'search',
  variables,
];
useSearchQuery.fetcher = (
  client: GraphQLClient,
  variables: SearchQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<SearchQuery, SearchQueryVariables>(
    client,
    SearchDocument,
    variables,
    headers
  );
export const LatestMetricsDocument = /*#__PURE__*/ `
    query latestMetrics($label: String!, $level: String) {
  latestMetrics(level: $level, label: $label) {
    activityScore
    activityScoreUpdatedAt
    codeQualityGuarantee
    codeQualityGuaranteeUpdatedAt
    communitySupportScore
    communitySupportScoreUpdatedAt
    label
    level
  }
}
    `;
export const useLatestMetricsQuery = <
  TData = LatestMetricsQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: LatestMetricsQueryVariables,
  options?: UseQueryOptions<LatestMetricsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<LatestMetricsQuery, TError, TData>(
    ['latestMetrics', variables],
    fetcher<LatestMetricsQuery, LatestMetricsQueryVariables>(
      client,
      LatestMetricsDocument,
      variables,
      headers
    ),
    options
  );

useLatestMetricsQuery.getKey = (variables: LatestMetricsQueryVariables) => [
  'latestMetrics',
  variables,
];
useLatestMetricsQuery.fetcher = (
  client: GraphQLClient,
  variables: LatestMetricsQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<LatestMetricsQuery, LatestMetricsQueryVariables>(
    client,
    LatestMetricsDocument,
    variables,
    headers
  );
export const OverviewDocument = /*#__PURE__*/ `
    query overview {
  overview {
    projectsCount
    dimensionsCount
    metricsCount
    modelsCount
    trends {
      backend
      forksCount
      language
      name
      openIssuesCount
      path
      stargazersCount
      watchersCount
    }
  }
}
    `;
export const useOverviewQuery = <TData = OverviewQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: OverviewQueryVariables,
  options?: UseQueryOptions<OverviewQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<OverviewQuery, TError, TData>(
    variables === undefined ? ['overview'] : ['overview', variables],
    fetcher<OverviewQuery, OverviewQueryVariables>(
      client,
      OverviewDocument,
      variables,
      headers
    ),
    options
  );

useOverviewQuery.getKey = (variables?: OverviewQueryVariables) =>
  variables === undefined ? ['overview'] : ['overview', variables];
useOverviewQuery.fetcher = (
  client: GraphQLClient,
  variables?: OverviewQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<OverviewQuery, OverviewQueryVariables>(
    client,
    OverviewDocument,
    variables,
    headers
  );
export const MetricDocument = /*#__PURE__*/ `
    query metric($label: String!, $level: String = "repo", $start: ISO8601DateTime, $end: ISO8601DateTime) {
  metricCodequality(
    label: $label
    level: $level
    beginDate: $start
    endDate: $end
  ) {
    activeC1PrCommentsContributorCount
    activeC1PrCreateContributorCount
    activeC2ContributorCount
    codeMergeRatio
    codeMergedCount
    codeQualityGuarantee
    codeReviewRatio
    codeReviewedCount
    commitFrequency
    commitFrequencyInside
    contributorCount
    gitPrLinkedRatio
    grimoireCreationDate
    isMaintained
    label
    level
    linesAddedFrequency
    linesRemovedFrequency
    locFrequency
    prCommitCount
    prCommitLinkedCount
    prCount
    prIssueLinkedRatio
    prIssueLinkedCount
  }
  metricCommunity(label: $label, level: $level, beginDate: $start, endDate: $end) {
    closedPrsCount
    codeReviewCount
    commentFrequency
    communitySupportScore
    grimoireCreationDate
    issueFirstReponseAvg
    issueFirstReponseMid
    issueOpenTimeAvg
    issueOpenTimeMid
    label
    level
    prOpenTimeAvg
    prOpenTimeMid
    updatedIssuesCount
  }
  metricActivity(label: $label, level: $level, beginDate: $start, endDate: $end) {
    activeC1IssueCommentsContributorCount
    activeC1IssueCreateContributorCount
    activeC1PrCommentsContributorCount
    activeC1PrCreateContributorCount
    activeC2ContributorCount
    activityScore
    closedIssuesCount
    codeReviewCount
    commentFrequency
    commitFrequency
    contributorCount
    createdSince
    grimoireCreationDate
    label
    level
    updatedIssuesCount
    updatedSince
  }
}
    `;
export const useMetricQuery = <TData = MetricQuery, TError = unknown>(
  client: GraphQLClient,
  variables: MetricQueryVariables,
  options?: UseQueryOptions<MetricQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<MetricQuery, TError, TData>(
    ['metric', variables],
    fetcher<MetricQuery, MetricQueryVariables>(
      client,
      MetricDocument,
      variables,
      headers
    ),
    options
  );

useMetricQuery.getKey = (variables: MetricQueryVariables) => [
  'metric',
  variables,
];
useMetricQuery.fetcher = (
  client: GraphQLClient,
  variables: MetricQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<MetricQuery, MetricQueryVariables>(
    client,
    MetricDocument,
    variables,
    headers
  );
