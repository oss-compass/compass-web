/* eslint-disable max-lines */
import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
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

function fetcher<TData, TVariables extends { [key: string]: any }>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  requestHeaders?: RequestInit['headers']
) {
  return async (): Promise<TData> =>
    client.request({
      document: query,
      variables,
      requestHeaders,
    });
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
  /** organization count */
  orgCount?: Maybe<Scalars['Float']>;
  /** number of releases in the last 90 days */
  recentReleasesCount?: Maybe<Scalars['Float']>;
  /** metric model object short code */
  shortCode?: Maybe<Scalars['String']>;
  /** metric scores for repositories type, only for community (software-artifact/governance) */
  type?: Maybe<Scalars['String']>;
  /** number of issue updates in the past 90 days */
  updatedIssuesCount?: Maybe<Scalars['Float']>;
  /** (average of months from the last code commit to the time of statistics */
  updatedSince?: Maybe<Scalars['Float']>;
};

export type ActivitySummary = {
  __typename?: 'ActivitySummary';
  /** number of active C1 issue comments contributors in the past 90 days */
  activeC1IssueCommentsContributorCount?: Maybe<MetricStat>;
  /** number of active C1 issue create contributors in the past 90 days */
  activeC1IssueCreateContributorCount?: Maybe<MetricStat>;
  /** number of active C1 pr comments contributors in the past 90 days */
  activeC1PrCommentsContributorCount?: Maybe<MetricStat>;
  /** number of active C1 pr create contributors in the past 90 days */
  activeC1PrCreateContributorCount?: Maybe<MetricStat>;
  /** number of active C2 developers in the past 90 days */
  activeC2ContributorCount?: Maybe<MetricStat>;
  /** score of activity metric model */
  activityScore?: Maybe<MetricStat>;
  /** number of issues closed in the past 90 days */
  closedIssuesCount?: Maybe<MetricStat>;
  /** mean of comments per PR over the past 90 days */
  codeReviewCount?: Maybe<MetricStat>;
  /** mean of comments per issue over the past 90 days */
  commentFrequency?: Maybe<MetricStat>;
  /** mean of submissions per week over the past 90 days */
  commitFrequency?: Maybe<MetricStat>;
  /** number of active D1 developers in the past 90 days */
  contributorCount?: Maybe<MetricStat>;
  /** number of months since the project was created */
  createdSince?: Maybe<MetricStat>;
  /** metric summary creatiton time */
  grimoireCreationDate?: Maybe<Scalars['ISO8601DateTime']>;
  /** organization count */
  orgCount?: Maybe<MetricStat>;
  /** number of releases in the last 90 days */
  recentReleasesCount?: Maybe<MetricStat>;
  /** number of issue updates in the past 90 days */
  updatedIssuesCount?: Maybe<MetricStat>;
  /** (average of months from the last code commit to the time of statistics */
  updatedSince?: Maybe<MetricStat>;
};

export type Algorithm = {
  __typename?: 'Algorithm';
  ident: Scalars['String'];
  name: Scalars['String'];
};

export type Base64ImageInput = {
  /** image base64 data, To attach base64 data it is required to come in the form of Data URIs, eg: data:image/png;base64,[base64 data] */
  base64: Scalars['String'];
  /** image filename */
  filename: Scalars['String'];
};

export type BetaMetric = {
  __typename?: 'BetaMetric';
  createdAt: Scalars['ISO8601DateTime'];
  desc?: Maybe<Scalars['String']>;
  dimensionality?: Maybe<Scalars['String']>;
  extra?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  metric?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type BetaMetricOverview = {
  __typename?: 'BetaMetricOverview';
  projectsCount?: Maybe<Scalars['Int']>;
  trends?: Maybe<Array<BetaRepo>>;
};

export type BetaMetricScore = {
  __typename?: 'BetaMetricScore';
  /** metric model creatiton time */
  grimoireCreationDate?: Maybe<Scalars['ISO8601DateTime']>;
  /** metric model object identification */
  label?: Maybe<Scalars['String']>;
  /** metric model object level */
  level?: Maybe<Scalars['String']>;
  /** name of this beta metric */
  name?: Maybe<Scalars['String']>;
  /** score of this beta metric */
  score?: Maybe<Scalars['Float']>;
  /** metric model object short code */
  shortCode?: Maybe<Scalars['String']>;
};

export type BetaRepo = {
  __typename?: 'BetaRepo';
  backend?: Maybe<Scalars['String']>;
  betaMetricScores: Array<BetaMetricScore>;
  createdAt: Scalars['ISO8601DateTime'];
  language?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  origin: Scalars['String'];
  path?: Maybe<Scalars['String']>;
  shortCode?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

/** Autogenerated input type of BindWechatLink */
export type BindWechatLinkInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** Autogenerated return type of BindWechatLink */
export type BindWechatLinkPayload = {
  __typename?: 'BindWechatLinkPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  expireSeconds: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
  ticket: Scalars['String'];
  url: Scalars['String'];
};

/** Autogenerated input type of CancelMemberInvite */
export type CancelMemberInviteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** invitation id */
  invitationId: Scalars['Int'];
  /** lab model id */
  modelId: Scalars['Int'];
};

/** Autogenerated return type of CancelMemberInvite */
export type CancelMemberInvitePayload = {
  __typename?: 'CancelMemberInvitePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

/** Autogenerated input type of CancelSubscription */
export type CancelSubscriptionInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** repo or project label */
  label: Scalars['String'];
  /** repo or project level(repo/community) */
  level: Scalars['String'];
};

/** Autogenerated return type of CancelSubscription */
export type CancelSubscriptionPayload = {
  __typename?: 'CancelSubscriptionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
  status: Scalars['String'];
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
  /** metric model object short code */
  shortCode?: Maybe<Scalars['String']>;
  /** metric scores for repositories type, only for community (software-artifact/governance) */
  type?: Maybe<Scalars['String']>;
};

export type CodequalitySummary = {
  __typename?: 'CodequalitySummary';
  /** number of active C1 pr comments contributors in the past 90 days */
  activeC1PrCommentsContributorCount?: Maybe<MetricStat>;
  /** number of active C1 pr create contributors in the past 90 days */
  activeC1PrCreateContributorCount?: Maybe<MetricStat>;
  /** number of active C2 developers in the past 90 days */
  activeC2ContributorCount?: Maybe<MetricStat>;
  /** ratio of merge pulls and all pulls */
  codeMergeRatio?: Maybe<MetricStat>;
  /** merged pr count past 90 days */
  codeMergedCount?: Maybe<MetricStat>;
  /** score of code quality metric model */
  codeQualityGuarantee?: Maybe<MetricStat>;
  /** ratio of pulls with one more reviewers and all pulls */
  codeReviewRatio?: Maybe<MetricStat>;
  /** count of pulls with one more reviewers */
  codeReviewedCount?: Maybe<MetricStat>;
  /** mean of submissions per week over the past 90 days */
  commitFrequency?: Maybe<MetricStat>;
  /** mean of inside submissions per week over the past 90 days */
  commitFrequencyInside?: Maybe<MetricStat>;
  /** number of active D1 developers in the past 90 days */
  contributorCount?: Maybe<MetricStat>;
  /** ratio of pr_commit_linked_count and pr_commit_count */
  gitPrLinkedRatio?: Maybe<MetricStat>;
  /** metric summary creatiton time */
  grimoireCreationDate?: Maybe<Scalars['ISO8601DateTime']>;
  /** maintenance status */
  isMaintained?: Maybe<MetricStat>;
  /** average of added lines code each commit */
  linesAddedFrequency?: Maybe<MetricStat>;
  /** average of removed lines code each commit */
  linesRemovedFrequency?: Maybe<MetricStat>;
  /** average of lines code each commit */
  locFrequency?: Maybe<MetricStat>;
  /** pr count base for pr_commit_linked_count past 90 days */
  prCommitCount?: Maybe<MetricStat>;
  /** pr with commits linked count past 90 days */
  prCommitLinkedCount?: Maybe<MetricStat>;
  /** all pr count past 90 days */
  prCount?: Maybe<MetricStat>;
  /** count of pulls which are linked issues */
  prIssueLinkedCount?: Maybe<MetricStat>;
  /** ratio of pulls which are linked issues and all pulls */
  prIssueLinkedRatio?: Maybe<MetricStat>;
};

export type CollectionPage = {
  __typename?: 'CollectionPage';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<Repo>>;
  page?: Maybe<Scalars['Int']>;
  totalPage?: Maybe<Scalars['Int']>;
};

export type CommunityMetric = {
  __typename?: 'CommunityMetric';
  /** mean of bug issues open time (days) */
  bugIssueOpenTimeAvg?: Maybe<Scalars['Float']>;
  /** middle of bug issues open time (days) */
  bugIssueOpenTimeMid?: Maybe<Scalars['Float']>;
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
  /** metric model object short code */
  shortCode?: Maybe<Scalars['String']>;
  /** metric scores for repositories type, only for community (software-artifact/governance) */
  type?: Maybe<Scalars['String']>;
  /** number of issue updates in the past 90 days */
  updatedIssuesCount?: Maybe<Scalars['Float']>;
};

export type CommunityOverview = {
  __typename?: 'CommunityOverview';
  communityUrl?: Maybe<Scalars['String']>;
  projectsCount?: Maybe<Scalars['Int']>;
  trends?: Maybe<Array<Repo>>;
};

export type CommunitySummary = {
  __typename?: 'CommunitySummary';
  /** mean of bug issues open time (days) */
  bugIssueOpenTimeAvg?: Maybe<MetricStat>;
  /** middle of bug issues open time (days) */
  bugIssueOpenTimeMid?: Maybe<MetricStat>;
  /** number of pulls closed in the past 90 days */
  closedPrsCount?: Maybe<MetricStat>;
  /** mean of comments per PR over the past 90 days */
  codeReviewCount?: Maybe<MetricStat>;
  /** mean of comments per issue over the past 90 days */
  commentFrequency?: Maybe<MetricStat>;
  /** score of community support metric model */
  communitySupportScore?: Maybe<MetricStat>;
  /** metric summary creatiton time */
  grimoireCreationDate?: Maybe<Scalars['ISO8601DateTime']>;
  /** mean of issues first response time (days) */
  issueFirstReponseAvg?: Maybe<MetricStat>;
  /** middle of issues first response time (days) */
  issueFirstReponseMid?: Maybe<MetricStat>;
  /** mean of issues open time (days) */
  issueOpenTimeAvg?: Maybe<MetricStat>;
  /** middle of issues open time (days) */
  issueOpenTimeMid?: Maybe<MetricStat>;
  /** mean of pulls open time (days) */
  prOpenTimeAvg?: Maybe<MetricStat>;
  /** middle of pulls open time (days) */
  prOpenTimeMid?: Maybe<MetricStat>;
  /** number of issue updates in the past 90 days */
  updatedIssuesCount?: Maybe<MetricStat>;
};

/** Autogenerated input type of CreateLabModelComment */
export type CreateLabModelCommentInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** comment content */
  content: Scalars['String'];
  /** related images under this comment */
  images?: InputMaybe<Array<Base64ImageInput>>;
  /** lab model id */
  modelId: Scalars['Int'];
  /** lab model metric id */
  modelMetricId?: InputMaybe<Scalars['Int']>;
  /** reply to comment id */
  replyTo?: InputMaybe<Scalars['Int']>;
  /** lab model version id */
  versionId?: InputMaybe<Scalars['Int']>;
};

/** Autogenerated return type of CreateLabModelComment */
export type CreateLabModelCommentPayload = {
  __typename?: 'CreateLabModelCommentPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  data?: Maybe<ModelComment>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of CreateLabModel */
export type CreateLabModelInput = {
  /** the algorithm of the model, default: `default` */
  algorithm?: InputMaybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** the collection of the repositories */
  datasets: Array<DatasetRowTypeInput>;
  /** lab model dimension: `productivity => 0, robustness => 1, niche_creation => 2, default: 0` */
  dimension: Scalars['Int'];
  /** whether or not a generic domain model, default: true */
  isGeneral: Scalars['Boolean'];
  /** whether or not a public model, default: false */
  isPublic: Scalars['Boolean'];
  /** lab model metrics */
  metrics: Array<LabModelMetricInput>;
  /** lab model name */
  name: Scalars['String'];
};

/** Autogenerated return type of CreateLabModel */
export type CreateLabModelPayload = {
  __typename?: 'CreateLabModelPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  data?: Maybe<ModelDetail>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of CreateLabModelVersion */
export type CreateLabModelVersionInput = {
  /** the algorithm of the model, default: `default apm algorithm` */
  algorithm?: InputMaybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** the url collection of the repositories */
  datasets: Array<DatasetRowTypeInput>;
  /** lab model metrics */
  metrics: Array<LabModelMetricInput>;
  /** lab model id */
  modelId: Scalars['Int'];
  /** version number */
  version: Scalars['String'];
};

/** Autogenerated return type of CreateLabModelVersion */
export type CreateLabModelVersionPayload = {
  __typename?: 'CreateLabModelVersionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  data?: Maybe<ModelVersion>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
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
  /** project homepage url */
  projectUrl?: InputMaybe<Scalars['String']>;
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
  reportUrl?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

/** Autogenerated input type of CreateRepoTask */
export type CreateRepoTaskInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** user's origin (gitee/github) */
  origin: Scalars['String'];
  /** repository urls */
  repoUrls: Array<Scalars['String']>;
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
  reportUrl?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

/** Autogenerated input type of CreateSubscription */
export type CreateSubscriptionInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** repo or project label */
  label: Scalars['String'];
  /** repo or project level(repo/community) */
  level: Scalars['String'];
};

/** Autogenerated return type of CreateSubscription */
export type CreateSubscriptionPayload = {
  __typename?: 'CreateSubscriptionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

export type Dataset = {
  __typename?: 'Dataset';
  ident?: Maybe<Scalars['String']>;
  items?: Maybe<Array<DatasetCompletionRow>>;
  name?: Maybe<Scalars['String']>;
};

export type DatasetCompletionRow = {
  __typename?: 'DatasetCompletionRow';
  /** first ident of the object */
  firstIdent?: Maybe<Scalars['String']>;
  /** metric model object identification */
  label?: Maybe<Scalars['String']>;
  /** metric model object level (project or repo) */
  level?: Maybe<Scalars['String']>;
  /** second ident of the object */
  secondIdent?: Maybe<Scalars['String']>;
};

export type DatasetRowTypeInput = {
  /** first ident of the object */
  firstIdent?: InputMaybe<Scalars['String']>;
  /** metric model object identification */
  label: Scalars['String'];
  /** metric model object level (project or repo) */
  level: Scalars['String'];
  /** second ident of the object */
  secondIdent?: InputMaybe<Scalars['String']>;
};

/** Autogenerated input type of DeleteLabMember */
export type DeleteLabMemberInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** lab member id */
  memberId: Scalars['Int'];
  /** lab model id */
  modelId: Scalars['Int'];
};

/** Autogenerated return type of DeleteLabMember */
export type DeleteLabMemberPayload = {
  __typename?: 'DeleteLabMemberPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

/** Autogenerated input type of DeleteLabModelComment */
export type DeleteLabModelCommentInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** lab model comment id */
  commentId: Scalars['Int'];
  /** lab model id */
  modelId: Scalars['Int'];
};

/** Autogenerated return type of DeleteLabModelComment */
export type DeleteLabModelCommentPayload = {
  __typename?: 'DeleteLabModelCommentPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

/** Autogenerated input type of DeleteLabModel */
export type DeleteLabModelInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** lab model id */
  id: Scalars['Int'];
};

/** Autogenerated return type of DeleteLabModel */
export type DeleteLabModelPayload = {
  __typename?: 'DeleteLabModelPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

/** Autogenerated input type of DeleteLabModelVersion */
export type DeleteLabModelVersionInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** lab model id */
  modelId: Scalars['Int'];
  /** lab model version id */
  versionId: Scalars['Int'];
};

/** Autogenerated return type of DeleteLabModelVersion */
export type DeleteLabModelVersionPayload = {
  __typename?: 'DeleteLabModelVersionPayload';
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

export type GroupActivityMetric = {
  __typename?: 'GroupActivityMetric';
  /** mean of submissions per week over the past 90 days */
  commitFrequency?: Maybe<Scalars['Float']>;
  /** (average of months from the last org code commit to the time of statistics */
  contributionLast?: Maybe<Scalars['Float']>;
  /** number of active D1 developers in the past 90 days */
  contributorCount?: Maybe<Scalars['Float']>;
  /** metric model creatiton time */
  grimoireCreationDate?: Maybe<Scalars['ISO8601DateTime']>;
  /** metric model object identification */
  label?: Maybe<Scalars['String']>;
  /** metric model object level */
  level?: Maybe<Scalars['String']>;
  /** organization count */
  orgCount?: Maybe<Scalars['Float']>;
  /** score of organization activity metric model */
  organizationsActivity?: Maybe<Scalars['Float']>;
  /** metric model object short code */
  shortCode?: Maybe<Scalars['String']>;
  /** metric scores for repositories type, only for community (software-artifact/governance) */
  type?: Maybe<Scalars['String']>;
};

export type GroupActivitySummary = {
  __typename?: 'GroupActivitySummary';
  /** mean of submissions per week over the past 90 days */
  commitFrequency?: Maybe<MetricStat>;
  /** (average of months from the last org code commit to the time of statistics */
  contributionLast?: Maybe<MetricStat>;
  /** number of active D1 developers in the past 90 days */
  contributorCount?: Maybe<MetricStat>;
  /** metric summary creatiton time */
  grimoireCreationDate?: Maybe<Scalars['ISO8601DateTime']>;
  /** organization count */
  orgCount?: Maybe<MetricStat>;
  /** score of organization activity metric model */
  organizationsActivity?: Maybe<MetricStat>;
};

export type Image = {
  __typename?: 'Image';
  filename: Scalars['String'];
  url: Scalars['String'];
};

export type InvitationPage = {
  __typename?: 'InvitationPage';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<LabInvitation>>;
  page?: Maybe<Scalars['Int']>;
  totalPage?: Maybe<Scalars['Int']>;
};

export type LabInvitation = {
  __typename?: 'LabInvitation';
  canExecute: Scalars['Boolean'];
  canRead: Scalars['Boolean'];
  canUpdate: Scalars['Boolean'];
  email: Scalars['String'];
  id: Scalars['Int'];
  sentAt: Scalars['ISO8601DateTime'];
  status: Scalars['String'];
};

export type LabMember = {
  __typename?: 'LabMember';
  avatarUrl?: Maybe<Scalars['String']>;
  canExecute: Scalars['Boolean'];
  canRead: Scalars['Boolean'];
  canUpdate: Scalars['Boolean'];
  id: Scalars['Int'];
  isOwner: Scalars['Boolean'];
  joinedAt: Scalars['ISO8601DateTime'];
  name: Scalars['String'];
};

export type LabModelMetricInput = {
  /** lab model metric id */
  id: Scalars['Int'];
  /** lab model metric threshold */
  threshold: Scalars['Float'];
  /** lab model version, default: latest version */
  versionId?: InputMaybe<Scalars['Int']>;
  /** lab model metric weight */
  weight: Scalars['Float'];
};

export type LabelRow = {
  __typename?: 'LabelRow';
  /** metric model object identification */
  label?: Maybe<Scalars['String']>;
  /** metric model object level (project or repo) */
  level?: Maybe<Scalars['String']>;
  /** metric model object short code */
  shortCode?: Maybe<Scalars['String']>;
};

export type LabelRowInput = {
  /** metric model object identification */
  label: Scalars['String'];
  /** metric model object level (project or repo) */
  level: Scalars['String'];
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
  /** latest score of organizations activity metric model */
  organizationsActivity?: Maybe<Scalars['Float']>;
  /** latest score of organizations activity metric model updated_at */
  organizationsActivityUpdatedAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** repositories origin */
  origin?: Maybe<Scalars['String']>;
  /** repository or community reference url */
  referenceUrl?: Maybe<Scalars['String']>;
  /** repositories count */
  reposCount?: Maybe<Scalars['Float']>;
  /** metric model object short code */
  shortCode?: Maybe<Scalars['String']>;
};

export type LoginBind = {
  __typename?: 'LoginBind';
  account?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
};

export type MemberPage = {
  __typename?: 'MemberPage';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<LabMember>>;
  model?: Maybe<ModelDetail>;
  page?: Maybe<Scalars['Int']>;
  totalPage?: Maybe<Scalars['Int']>;
};

export type MetricStat = {
  __typename?: 'MetricStat';
  /** arithmetic mean */
  mean?: Maybe<Scalars['Float']>;
  /** 50 percentile */
  median?: Maybe<Scalars['Float']>;
};

export type ModelComment = {
  __typename?: 'ModelComment';
  content: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['Int'];
  images?: Maybe<Array<Image>>;
  model: ModelDetail;
  parent?: Maybe<ModelComment>;
  replies?: Maybe<Array<ModelComment>>;
  updatedAt: Scalars['ISO8601DateTime'];
  user: SimpleUser;
};

export type ModelCommentPage = {
  __typename?: 'ModelCommentPage';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<ModelComment>>;
  page?: Maybe<Scalars['Int']>;
  totalPage?: Maybe<Scalars['Int']>;
};

export type ModelDetail = {
  __typename?: 'ModelDetail';
  dimension: Scalars['Int'];
  id: Scalars['Int'];
  isGeneral: Scalars['Boolean'];
  isPublic: Scalars['Boolean'];
  /** Details of the 1000 latest updates */
  latestVersions?: Maybe<Array<ModelVersion>>;
  name: Scalars['String'];
  triggerRemainingCount: Scalars['Int'];
  userId: Scalars['Int'];
};

export type ModelMetric = {
  __typename?: 'ModelMetric';
  category?: Maybe<Scalars['String']>;
  defaultThreshold?: Maybe<Scalars['Float']>;
  defaultWeight?: Maybe<Scalars['Float']>;
  from?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  ident?: Maybe<Scalars['String']>;
  metricId?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  threshold?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
};

export type ModelVersion = {
  __typename?: 'ModelVersion';
  algorithm?: Maybe<Algorithm>;
  dataset: Dataset;
  id: Scalars['Int'];
  metrics: Array<ModelMetric>;
  version?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of ModifyUser */
export type ModifyUserInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** user email */
  email: Scalars['String'];
  /** user language */
  language?: InputMaybe<Scalars['String']>;
  /** user name */
  name: Scalars['String'];
};

/** Autogenerated return type of ModifyUser */
export type ModifyUserPayload = {
  __typename?: 'ModifyUserPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Bind wechat link */
  bindWechatLink?: Maybe<BindWechatLinkPayload>;
  /** Cancel a member invitation */
  cancelMemberInvite?: Maybe<CancelMemberInvitePayload>;
  /** Cancel subscription */
  cancelSubscription?: Maybe<CancelSubscriptionPayload>;
  /** Create a Lab model */
  createLabModel?: Maybe<CreateLabModelPayload>;
  /** Create a comment for a lab model */
  createLabModelComment?: Maybe<CreateLabModelCommentPayload>;
  /** Create a Lab model version */
  createLabModelVersion?: Maybe<CreateLabModelVersionPayload>;
  /** Submit a community analysis task */
  createProjectTask?: Maybe<CreateProjectTaskPayload>;
  /** Submit a repository analysis task */
  createRepoTask?: Maybe<CreateRepoTaskPayload>;
  /** Create subscription */
  createSubscription?: Maybe<CreateSubscriptionPayload>;
  /** Delete a lab member */
  deleteLabMember?: Maybe<DeleteLabMemberPayload>;
  /** Delete a Lab model */
  deleteLabModel?: Maybe<DeleteLabModelPayload>;
  /** Delete a comment for a lab model */
  deleteLabModelComment?: Maybe<DeleteLabModelCommentPayload>;
  /** Delete a Lab model version */
  deleteLabModelVersion?: Maybe<DeleteLabModelVersionPayload>;
  /** Destroy user */
  destroyUser?: Maybe<Scalars['Boolean']>;
  /** Modify user */
  modifyUser?: Maybe<ModifyUserPayload>;
  /** Send email verify */
  sendEmailVerify?: Maybe<SendEmailVerifyPayload>;
  /** Send member invitation */
  sendMemberInvite?: Maybe<SendMemberInvitePayload>;
  /** Sign out */
  signOut?: Maybe<Scalars['Boolean']>;
  /** Update a Lab model */
  updateLabModel?: Maybe<UpdateLabModelPayload>;
  /** Update a comment for a lab model */
  updateLabModelComment?: Maybe<UpdateLabModelCommentPayload>;
  /** Update a Lab model version */
  updateLabModelVersion?: Maybe<UpdateLabModelVersionPayload>;
  /** Update a member permission */
  updateMemberPermission?: Maybe<UpdateMemberPermissionPayload>;
  /** User unbind */
  userUnbind?: Maybe<UserUnbindPayload>;
};

export type MutationBindWechatLinkArgs = {
  input: BindWechatLinkInput;
};

export type MutationCancelMemberInviteArgs = {
  input: CancelMemberInviteInput;
};

export type MutationCancelSubscriptionArgs = {
  input: CancelSubscriptionInput;
};

export type MutationCreateLabModelArgs = {
  input: CreateLabModelInput;
};

export type MutationCreateLabModelCommentArgs = {
  input: CreateLabModelCommentInput;
};

export type MutationCreateLabModelVersionArgs = {
  input: CreateLabModelVersionInput;
};

export type MutationCreateProjectTaskArgs = {
  input: CreateProjectTaskInput;
};

export type MutationCreateRepoTaskArgs = {
  input: CreateRepoTaskInput;
};

export type MutationCreateSubscriptionArgs = {
  input: CreateSubscriptionInput;
};

export type MutationDeleteLabMemberArgs = {
  input: DeleteLabMemberInput;
};

export type MutationDeleteLabModelArgs = {
  input: DeleteLabModelInput;
};

export type MutationDeleteLabModelCommentArgs = {
  input: DeleteLabModelCommentInput;
};

export type MutationDeleteLabModelVersionArgs = {
  input: DeleteLabModelVersionInput;
};

export type MutationModifyUserArgs = {
  input: ModifyUserInput;
};

export type MutationSendEmailVerifyArgs = {
  input: SendEmailVerifyInput;
};

export type MutationSendMemberInviteArgs = {
  input: SendMemberInviteInput;
};

export type MutationUpdateLabModelArgs = {
  input: UpdateLabModelInput;
};

export type MutationUpdateLabModelCommentArgs = {
  input: UpdateLabModelCommentInput;
};

export type MutationUpdateLabModelVersionArgs = {
  input: UpdateLabModelVersionInput;
};

export type MutationUpdateMemberPermissionArgs = {
  input: UpdateMemberPermissionInput;
};

export type MutationUserUnbindArgs = {
  input: UserUnbindInput;
};

export type MyModels = {
  __typename?: 'MyModels';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<ModelDetail>>;
  page?: Maybe<Scalars['Int']>;
  totalPage?: Maybe<Scalars['Int']>;
};

export type ProjectCompletionRow = {
  __typename?: 'ProjectCompletionRow';
  /** metric model object identification */
  label?: Maybe<Scalars['String']>;
  /** metric model object level (project or repo) */
  level?: Maybe<Scalars['String']>;
  /** metric model object short code */
  shortCode?: Maybe<Scalars['String']>;
  /** metric task status (pending/progress/success/error/canceled/unsumbit) */
  status?: Maybe<Scalars['String']>;
  /** metric model last update time */
  updatedAt?: Maybe<Scalars['ISO8601DateTime']>;
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
  /** repo or project analysis status (pending/progress/success/error/canceled/unsumbit) */
  analysisStatusVerify: ProjectCompletionRow;
  /** return beta metric overview */
  betaMetricOverview: BetaMetricOverview;
  /** return beta metrics list */
  betaMetricsIndex: Array<BetaMetric>;
  /** Get bulk label and level by a short code list */
  bulkLabelWithLevel: Array<LabelRow>;
  /** Get bulk reports for a label list */
  bulkOverview: Array<Repo>;
  /** Get bulk shortened id for a label list */
  bulkShortenedLabel: Array<LabelRow>;
  /** Get hottest reports of a collection */
  collectionHottest: Array<ProjectCompletionRow>;
  /** Get collection list by a ident */
  collectionList: CollectionPage;
  /** Get overview data of a community */
  communityOverview: CommunityOverview;
  currentUser?: Maybe<User>;
  /** Fuzzy search dataset by keyword */
  datasetFuzzySearch?: Maybe<Array<DatasetCompletionRow>>;
  /** Get data of Compass Collections */
  datasetOverview?: Maybe<Array<Scalars['String']>>;
  /** Fuzzy search project by keyword */
  fuzzySearch: Array<ProjectCompletionRow>;
  /** Get invitations data of a lab model */
  invitationOverview?: Maybe<InvitationPage>;
  /** Get comment detail data with comment id */
  labModelCommentDetail?: Maybe<ModelComment>;
  /** Get comments data of a lab model */
  labModelComments?: Maybe<ModelCommentPage>;
  /** Get detail data of a lab model */
  labModelDetail?: Maybe<ModelDetail>;
  /** Get detail data of a lab model version */
  labModelVersion?: Maybe<ModelVersion>;
  /** Get latest metrics data of the specified label */
  latestMetrics: LatestMetrics;
  /** Get members data of a lab model */
  memberOverview?: Maybe<MemberPage>;
  /** Get activity metrics data of compass */
  metricActivity: Array<ActivityMetric>;
  /** Get code quality metrics data of compass */
  metricCodequality: Array<CodequalityMetric>;
  /** Get community metrics data of compass */
  metricCommunity: Array<CommunityMetric>;
  /** Get group activity metrics data of compass */
  metricGroupActivity: Array<GroupActivityMetric>;
  /** Get overview data of metrics set on compass lab */
  metricSetOverview?: Maybe<Array<ModelMetric>>;
  /** Get starter project health metrics data of compass */
  metricStarterProjectHealth: Array<StarterProjectHealthMetric>;
  /** Get detail data of my lab models */
  myModels?: Maybe<MyModels>;
  subjectSubscriptionCount: SubjectSubscriptionCount;
  /** Get activity summary data of compass */
  summaryActivity: Array<ActivitySummary>;
  /** Get codequality summary data of compass */
  summaryCodequality: Array<CodequalitySummary>;
  /** Get community summary data of compass */
  summaryCommunity: Array<CommunitySummary>;
  /** Get group activity summary data of compass */
  summaryGroupActivity: Array<GroupActivitySummary>;
  /** Get trending data of compass */
  trending: Array<Trending>;
};

export type QueryAnalysisStatusArgs = {
  label: Scalars['String'];
};

export type QueryAnalysisStatusVerifyArgs = {
  label?: InputMaybe<Scalars['String']>;
  shortCode?: InputMaybe<Scalars['String']>;
};

export type QueryBetaMetricOverviewArgs = {
  id: Scalars['Int'];
  limit?: InputMaybe<Scalars['Int']>;
};

export type QueryBetaMetricsIndexArgs = {
  dimensionality?: InputMaybe<Scalars['String']>;
  metric?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
};

export type QueryBulkLabelWithLevelArgs = {
  shortCodes: Array<Scalars['String']>;
};

export type QueryBulkOverviewArgs = {
  labels: Array<Scalars['String']>;
};

export type QueryBulkShortenedLabelArgs = {
  labels: Array<LabelRowInput>;
};

export type QueryCollectionHottestArgs = {
  ident: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
};

export type QueryCollectionListArgs = {
  ident: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
};

export type QueryCommunityOverviewArgs = {
  label: Scalars['String'];
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
};

export type QueryDatasetFuzzySearchArgs = {
  keyword: Scalars['String'];
};

export type QueryDatasetOverviewArgs = {
  firstIdent?: InputMaybe<Scalars['String']>;
  secondIdent?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type QueryFuzzySearchArgs = {
  keyword: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
};

export type QueryInvitationOverviewArgs = {
  modelId?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
};

export type QueryLabModelCommentDetailArgs = {
  commentId: Scalars['Int'];
  modelId: Scalars['Int'];
};

export type QueryLabModelCommentsArgs = {
  direction?: InputMaybe<Scalars['String']>;
  modelId: Scalars['Int'];
  modelMetricId?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  parentId?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  versionId?: InputMaybe<Scalars['Int']>;
};

export type QueryLabModelDetailArgs = {
  id: Scalars['Int'];
};

export type QueryLabModelVersionArgs = {
  modelId: Scalars['Int'];
  versionId: Scalars['Int'];
};

export type QueryLatestMetricsArgs = {
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
};

export type QueryMemberOverviewArgs = {
  modelId?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
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

export type QueryMetricGroupActivityArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
};

export type QueryMetricStarterProjectHealthArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
};

export type QueryMyModelsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
};

export type QuerySubjectSubscriptionCountArgs = {
  label: Scalars['String'];
  level: Scalars['String'];
};

export type QuerySummaryActivityArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
};

export type QuerySummaryCodequalityArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
};

export type QuerySummaryCommunityArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
};

export type QuerySummaryGroupActivityArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
};

export type QueryTrendingArgs = {
  level?: InputMaybe<Scalars['String']>;
};

export type Repo = {
  __typename?: 'Repo';
  backend?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  forksCount?: Maybe<Scalars['Int']>;
  language?: Maybe<Scalars['String']>;
  metricActivity: Array<ActivityMetric>;
  name?: Maybe<Scalars['String']>;
  openIssuesCount?: Maybe<Scalars['Int']>;
  origin: Scalars['String'];
  path?: Maybe<Scalars['String']>;
  shortCode?: Maybe<Scalars['String']>;
  stargazersCount?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
  watchersCount?: Maybe<Scalars['Int']>;
};

/** Autogenerated input type of SendEmailVerify */
export type SendEmailVerifyInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** Autogenerated return type of SendEmailVerify */
export type SendEmailVerifyPayload = {
  __typename?: 'SendEmailVerifyPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

/** Autogenerated input type of SendMemberInvite */
export type SendMemberInviteInput = {
  /** permission to execute model analysis, `default: false` */
  canExecute?: InputMaybe<Scalars['Boolean']>;
  /** permission to change model properties, `default: false` */
  canUpdate?: InputMaybe<Scalars['Boolean']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** target member emails */
  emails: Array<Scalars['String']>;
  /** lab model id */
  modelId: Scalars['Int'];
};

/** Autogenerated return type of SendMemberInvite */
export type SendMemberInvitePayload = {
  __typename?: 'SendMemberInvitePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

export type SimpleUser = {
  __typename?: 'SimpleUser';
  avatarUrl?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type StarterProjectHealthMetric = {
  __typename?: 'StarterProjectHealthMetric';
  /** the smallest number of people that make 50% of contributions */
  busFactor?: Maybe<Scalars['Float']>;
  /** the change request closure ratio same period */
  changeRequestClosedCountAllPeriod?: Maybe<Scalars['Float']>;
  /** the change request closed count recently */
  changeRequestClosedCountRecently?: Maybe<Scalars['Float']>;
  /** the change request closure ratio all period */
  changeRequestClosureRatioAllPeriod?: Maybe<Scalars['Float']>;
  /** the change request closure ratio recently */
  changeRequestClosureRatioRecently?: Maybe<Scalars['Float']>;
  /** the change request created count all period */
  changeRequestCreatedCountAllPeriod?: Maybe<Scalars['Float']>;
  /** the change request created count recently */
  changeRequestCreatedCountRecently?: Maybe<Scalars['Float']>;
  /** metric model creatiton time */
  grimoireCreationDate?: Maybe<Scalars['ISO8601DateTime']>;
  /** metric model object identification */
  label?: Maybe<Scalars['String']>;
  /** metric model object level */
  level?: Maybe<Scalars['String']>;
  /** mean of pull request time to close */
  prTimeToCloseAvg?: Maybe<Scalars['Float']>;
  /** middle of pull request time to close */
  prTimeToCloseMid?: Maybe<Scalars['Float']>;
  /** mean of pull request time to first response */
  prTimeToFirstResponseAvg?: Maybe<Scalars['Float']>;
  /** middle of pull request time to first response */
  prTimeToFirstResponseMid?: Maybe<Scalars['Float']>;
  /** the frequency of project releases (including point releases with bug fixes) */
  releaseFrequency?: Maybe<Scalars['Float']>;
  /** metric model object short code */
  shortCode?: Maybe<Scalars['String']>;
  /** score of starter project health model */
  starterProjectHealth?: Maybe<Scalars['Float']>;
  /** metric scores for repositories type, only for community (software-artifact/governance) */
  type?: Maybe<Scalars['String']>;
};

export type SubjectSubscriptionCount = {
  __typename?: 'SubjectSubscriptionCount';
  count: Scalars['Int'];
  subscribed: Scalars['Boolean'];
};

export type Subscription = {
  __typename?: 'Subscription';
  collectAt?: Maybe<Scalars['ISO8601DateTime']>;
  completeAt?: Maybe<Scalars['ISO8601DateTime']>;
  count: Scalars['Int'];
  id: Scalars['Int'];
  label: Scalars['String'];
  level: Scalars['String'];
  status: Scalars['String'];
  statusUpdatedAt?: Maybe<Scalars['ISO8601DateTime']>;
};

export type SubscriptionPage = {
  __typename?: 'SubscriptionPage';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<Subscription>>;
  page?: Maybe<Scalars['Int']>;
  totalPage?: Maybe<Scalars['Int']>;
};

export type Trending = {
  __typename?: 'Trending';
  /** repo or community latest activity avg */
  activityScore?: Maybe<Scalars['Float']>;
  /** repo or community full_path, if community: equals name */
  fullPath?: Maybe<Scalars['String']>;
  /** repo or community label */
  label?: Maybe<Scalars['String']>;
  /** repo or community level */
  level?: Maybe<Scalars['String']>;
  /** repo or community name */
  name?: Maybe<Scalars['String']>;
  /** repo or community origin (gitee/github/combine) */
  origin?: Maybe<Scalars['String']>;
  /** repositories count */
  reposCount?: Maybe<Scalars['Float']>;
  /** repo or community short code */
  shortCode?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateLabModelComment */
export type UpdateLabModelCommentInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** lab model comment id */
  commentId: Scalars['Int'];
  /** comment content */
  content: Scalars['String'];
  /** lab model id */
  modelId: Scalars['Int'];
};

/** Autogenerated return type of UpdateLabModelComment */
export type UpdateLabModelCommentPayload = {
  __typename?: 'UpdateLabModelCommentPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  data?: Maybe<ModelComment>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateLabModel */
export type UpdateLabModelInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** lab model dimension: `productivity => 0, robustness => 1, niche_creation => 2, default: 0` */
  dimension?: InputMaybe<Scalars['Int']>;
  /** whether or not a generic domain model, default: true */
  isGeneral?: InputMaybe<Scalars['Boolean']>;
  /** whether or not a public model, default: false */
  isPublic?: InputMaybe<Scalars['Boolean']>;
  /** lab model id */
  modelId: Scalars['Int'];
  /** lab model name */
  name?: InputMaybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateLabModel */
export type UpdateLabModelPayload = {
  __typename?: 'UpdateLabModelPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  data?: Maybe<ModelDetail>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateLabModelVersion */
export type UpdateLabModelVersionInput = {
  /** the ident of algorithm */
  algorithm?: InputMaybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** the collection of the repositories */
  datasets?: InputMaybe<Array<DatasetRowTypeInput>>;
  /** lab model metrics */
  metrics?: InputMaybe<Array<LabModelMetricInput>>;
  /** lab model id */
  modelId: Scalars['Int'];
  /** version string */
  version?: InputMaybe<Scalars['String']>;
  /** lab model version id */
  versionId: Scalars['Int'];
};

/** Autogenerated return type of UpdateLabModelVersion */
export type UpdateLabModelVersionPayload = {
  __typename?: 'UpdateLabModelVersionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  data?: Maybe<ModelVersion>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateMemberPermission */
export type UpdateMemberPermissionInput = {
  /** permission to execute model analysis */
  canExecute?: InputMaybe<Scalars['Boolean']>;
  /** permission to change model properties */
  canUpdate?: InputMaybe<Scalars['Boolean']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** lab member id */
  memberId: Scalars['Int'];
  /** lab model id */
  modelId: Scalars['Int'];
};

/** Autogenerated return type of UpdateMemberPermission */
export type UpdateMemberPermissionPayload = {
  __typename?: 'UpdateMemberPermissionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  data?: Maybe<LabMember>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  id: Scalars['Int'];
  language: Scalars['String'];
  loginBinds?: Maybe<Array<LoginBind>>;
  name: Scalars['String'];
  subscriptions: SubscriptionPage;
};

export type UserSubscriptionsArgs = {
  label?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
};

/** Autogenerated input type of UserUnbind */
export type UserUnbindInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** provider name */
  provider: Scalars['String'];
};

/** Autogenerated return type of UserUnbind */
export type UserUnbindPayload = {
  __typename?: 'UserUnbindPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

export type MyLabModelsQueryVariables = Exact<{
  page: Scalars['Int'];
  per: Scalars['Int'];
}>;

export type MyLabModelsQuery = {
  __typename?: 'Query';
  myModels?: {
    __typename?: 'MyModels';
    count?: number | null;
    page?: number | null;
    totalPage?: number | null;
    items?: Array<{
      __typename?: 'ModelDetail';
      dimension: number;
      id: number;
      isGeneral: boolean;
      isPublic: boolean;
      triggerRemainingCount: number;
      name: string;
      userId: number;
      latestVersions?: Array<{
        __typename?: 'ModelVersion';
        id: number;
        version?: string | null;
        algorithm?: {
          __typename?: 'Algorithm';
          ident: string;
          name: string;
        } | null;
        dataset: {
          __typename?: 'Dataset';
          ident?: string | null;
          name?: string | null;
          items?: Array<{
            __typename?: 'DatasetCompletionRow';
            firstIdent?: string | null;
            label?: string | null;
            level?: string | null;
            secondIdent?: string | null;
          }> | null;
        };
        metrics: Array<{
          __typename?: 'ModelMetric';
          category?: string | null;
          defaultThreshold?: number | null;
          defaultWeight?: number | null;
          from?: string | null;
          id?: number | null;
          metricId?: number | null;
          ident?: string | null;
          name?: string | null;
          threshold?: number | null;
          weight?: number | null;
        }>;
      }> | null;
    }> | null;
  } | null;
};

export type LabModelDetailQueryVariables = Exact<{
  id: Scalars['Int'];
}>;

export type LabModelDetailQuery = {
  __typename?: 'Query';
  labModelDetail?: {
    __typename?: 'ModelDetail';
    dimension: number;
    id: number;
    isGeneral: boolean;
    isPublic: boolean;
    triggerRemainingCount: number;
    name: string;
    userId: number;
    latestVersions?: Array<{
      __typename?: 'ModelVersion';
      id: number;
      version?: string | null;
      algorithm?: {
        __typename?: 'Algorithm';
        ident: string;
        name: string;
      } | null;
      dataset: {
        __typename?: 'Dataset';
        ident?: string | null;
        name?: string | null;
        items?: Array<{
          __typename?: 'DatasetCompletionRow';
          firstIdent?: string | null;
          label?: string | null;
          level?: string | null;
          secondIdent?: string | null;
        }> | null;
      };
      metrics: Array<{
        __typename?: 'ModelMetric';
        category?: string | null;
        defaultThreshold?: number | null;
        defaultWeight?: number | null;
        from?: string | null;
        id?: number | null;
        metricId?: number | null;
        ident?: string | null;
        name?: string | null;
        threshold?: number | null;
        weight?: number | null;
      }>;
    }> | null;
  } | null;
};

export type LabModelVersionQueryVariables = Exact<{
  modelId: Scalars['Int'];
  versionId: Scalars['Int'];
}>;

export type LabModelVersionQuery = {
  __typename?: 'Query';
  labModelVersion?: {
    __typename?: 'ModelVersion';
    id: number;
    version?: string | null;
    algorithm?: {
      __typename?: 'Algorithm';
      ident: string;
      name: string;
    } | null;
    dataset: {
      __typename?: 'Dataset';
      ident?: string | null;
      name?: string | null;
      items?: Array<{
        __typename?: 'DatasetCompletionRow';
        firstIdent?: string | null;
        label?: string | null;
        level?: string | null;
        secondIdent?: string | null;
      }> | null;
    };
    metrics: Array<{
      __typename?: 'ModelMetric';
      category?: string | null;
      defaultThreshold?: number | null;
      defaultWeight?: number | null;
      from?: string | null;
      id?: number | null;
      metricId?: number | null;
      ident?: string | null;
      name?: string | null;
      threshold?: number | null;
      weight?: number | null;
    }>;
  } | null;
};

export type DataSetListQueryVariables = Exact<{
  type?: InputMaybe<Scalars['String']>;
  firstIdent?: InputMaybe<Scalars['String']>;
  secondIdent?: InputMaybe<Scalars['String']>;
}>;

export type DataSetListQuery = {
  __typename?: 'Query';
  datasetOverview?: Array<string> | null;
};

export type MetricSetListQueryVariables = Exact<{ [key: string]: never }>;

export type MetricSetListQuery = {
  __typename?: 'Query';
  metricSetOverview?: Array<{
    __typename?: 'ModelMetric';
    category?: string | null;
    defaultThreshold?: number | null;
    defaultWeight?: number | null;
    from?: string | null;
    id?: number | null;
    ident?: string | null;
    name?: string | null;
    threshold?: number | null;
    weight?: number | null;
  }> | null;
};

export type AlgorithmFragment = {
  __typename?: 'Algorithm';
  ident: string;
  name: string;
};

export type DatasetFragment = {
  __typename?: 'Dataset';
  ident?: string | null;
  name?: string | null;
  items?: Array<{
    __typename?: 'DatasetCompletionRow';
    firstIdent?: string | null;
    label?: string | null;
    level?: string | null;
    secondIdent?: string | null;
  }> | null;
};

export type MetricsFragment = {
  __typename?: 'ModelMetric';
  category?: string | null;
  defaultThreshold?: number | null;
  defaultWeight?: number | null;
  from?: string | null;
  id?: number | null;
  metricId?: number | null;
  ident?: string | null;
  name?: string | null;
  threshold?: number | null;
  weight?: number | null;
};

export type CreateLabModelMutationVariables = Exact<{
  algorithm?: InputMaybe<Scalars['String']>;
  datasets: Array<DatasetRowTypeInput> | DatasetRowTypeInput;
  dimension: Scalars['Int'];
  isGeneral: Scalars['Boolean'];
  isPublic: Scalars['Boolean'];
  metrics: Array<LabModelMetricInput> | LabModelMetricInput;
  name: Scalars['String'];
}>;

export type CreateLabModelMutation = {
  __typename?: 'Mutation';
  createLabModel?: {
    __typename?: 'CreateLabModelPayload';
    clientMutationId?: string | null;
    message?: string | null;
    errors?: Array<{
      __typename?: 'Error';
      message?: string | null;
      path?: Array<string> | null;
    }> | null;
  } | null;
};

export type CreateLabModelVersionMutationVariables = Exact<{
  algorithm?: InputMaybe<Scalars['String']>;
  datasets: Array<DatasetRowTypeInput> | DatasetRowTypeInput;
  metrics: Array<LabModelMetricInput> | LabModelMetricInput;
  modelId: Scalars['Int'];
  version: Scalars['String'];
}>;

export type CreateLabModelVersionMutation = {
  __typename?: 'Mutation';
  createLabModelVersion?: {
    __typename?: 'CreateLabModelVersionPayload';
    clientMutationId?: string | null;
    message?: string | null;
    errors?: Array<{
      __typename?: 'Error';
      message?: string | null;
      path?: Array<string> | null;
    }> | null;
  } | null;
};

export type UpdateLabModelMutationVariables = Exact<{
  dimension?: InputMaybe<Scalars['Int']>;
  isGeneral?: InputMaybe<Scalars['Boolean']>;
  isPublic?: InputMaybe<Scalars['Boolean']>;
  modelId: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
}>;

export type UpdateLabModelMutation = {
  __typename?: 'Mutation';
  updateLabModel?: {
    __typename?: 'UpdateLabModelPayload';
    message?: string | null;
    errors?: Array<{
      __typename?: 'Error';
      message?: string | null;
      path?: Array<string> | null;
    }> | null;
  } | null;
};

export type UpdateLabModelVersionMutationVariables = Exact<{
  modelId: Scalars['Int'];
  versionId: Scalars['Int'];
  version?: InputMaybe<Scalars['String']>;
  algorithm?: InputMaybe<Scalars['String']>;
  datasets: Array<DatasetRowTypeInput> | DatasetRowTypeInput;
  metrics: Array<LabModelMetricInput> | LabModelMetricInput;
}>;

export type UpdateLabModelVersionMutation = {
  __typename?: 'Mutation';
  updateLabModelVersion?: {
    __typename?: 'UpdateLabModelVersionPayload';
    message?: string | null;
    errors?: Array<{
      __typename?: 'Error';
      message?: string | null;
      path?: Array<string> | null;
    }> | null;
  } | null;
};

export type DeleteLabModelMutationVariables = Exact<{
  id: Scalars['Int'];
}>;

export type DeleteLabModelMutation = {
  __typename?: 'Mutation';
  deleteLabModel?: {
    __typename?: 'DeleteLabModelPayload';
    clientMutationId?: string | null;
    message?: string | null;
    status: string;
    errors?: Array<{
      __typename?: 'Error';
      message?: string | null;
      path?: Array<string> | null;
    }> | null;
  } | null;
};

export type DeleteLabModelVersionMutationVariables = Exact<{
  modelId: Scalars['Int'];
  versionId: Scalars['Int'];
}>;

export type DeleteLabModelVersionMutation = {
  __typename?: 'Mutation';
  deleteLabModelVersion?: {
    __typename?: 'DeleteLabModelVersionPayload';
    clientMutationId?: string | null;
    message?: string | null;
    status: string;
    errors?: Array<{
      __typename?: 'Error';
      message?: string | null;
      path?: Array<string> | null;
    }> | null;
  } | null;
};

export type DeleteLabMemberMutationVariables = Exact<{
  modelId: Scalars['Int'];
  memberId: Scalars['Int'];
}>;

export type DeleteLabMemberMutation = {
  __typename?: 'Mutation';
  deleteLabMember?: {
    __typename?: 'DeleteLabMemberPayload';
    message?: string | null;
    status: string;
    errors?: Array<{
      __typename?: 'Error';
      message?: string | null;
      path?: Array<string> | null;
    }> | null;
  } | null;
};

export type LabMemberFragment = {
  __typename?: 'LabMember';
  avatarUrl?: string | null;
  canExecute: boolean;
  canRead: boolean;
  canUpdate: boolean;
  id: number;
  isOwner: boolean;
  joinedAt: any;
  name: string;
};

export type SendMemberInviteMutationVariables = Exact<{
  modelId: Scalars['Int'];
  emails: Array<Scalars['String']> | Scalars['String'];
  canUpdate?: InputMaybe<Scalars['Boolean']>;
  canExecute?: InputMaybe<Scalars['Boolean']>;
}>;

export type SendMemberInviteMutation = {
  __typename?: 'Mutation';
  sendMemberInvite?: {
    __typename?: 'SendMemberInvitePayload';
    clientMutationId?: string | null;
    message?: string | null;
    status: string;
    errors?: Array<{
      __typename?: 'Error';
      message?: string | null;
      path?: Array<string> | null;
    }> | null;
  } | null;
};

export type MemberOverviewQueryVariables = Exact<{
  modelId?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
}>;

export type MemberOverviewQuery = {
  __typename?: 'Query';
  memberOverview?: {
    __typename?: 'MemberPage';
    count?: number | null;
    page?: number | null;
    totalPage?: number | null;
    items?: Array<{
      __typename?: 'LabMember';
      avatarUrl?: string | null;
      canExecute: boolean;
      canRead: boolean;
      canUpdate: boolean;
      id: number;
      isOwner: boolean;
      joinedAt: any;
      name: string;
    }> | null;
    model?: { __typename?: 'ModelDetail'; name: string } | null;
  } | null;
};

export type InvitationOverviewQueryVariables = Exact<{
  modelId?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
}>;

export type InvitationOverviewQuery = {
  __typename?: 'Query';
  invitationOverview?: {
    __typename?: 'InvitationPage';
    count?: number | null;
    page?: number | null;
    totalPage?: number | null;
    items?: Array<{
      __typename?: 'LabInvitation';
      canExecute: boolean;
      canRead: boolean;
      canUpdate: boolean;
      email: string;
      id: number;
      sentAt: any;
      status: string;
    }> | null;
  } | null;
};

export type UpdateMemberPermissionMutationVariables = Exact<{
  modelId: Scalars['Int'];
  memberId: Scalars['Int'];
  canUpdate?: InputMaybe<Scalars['Boolean']>;
  canExecute?: InputMaybe<Scalars['Boolean']>;
}>;

export type UpdateMemberPermissionMutation = {
  __typename?: 'Mutation';
  updateMemberPermission?: {
    __typename?: 'UpdateMemberPermissionPayload';
    clientMutationId?: string | null;
    message?: string | null;
    data?: {
      __typename?: 'LabMember';
      avatarUrl?: string | null;
      canExecute: boolean;
      canRead: boolean;
      canUpdate: boolean;
      id: number;
      isOwner: boolean;
      joinedAt: any;
      name: string;
    } | null;
    errors?: Array<{
      __typename?: 'Error';
      message?: string | null;
      path?: Array<string> | null;
    }> | null;
  } | null;
};

export type CancelMemberInviteMutationVariables = Exact<{
  modelId: Scalars['Int'];
  invitationId: Scalars['Int'];
}>;

export type CancelMemberInviteMutation = {
  __typename?: 'Mutation';
  cancelMemberInvite?: {
    __typename?: 'CancelMemberInvitePayload';
    clientMutationId?: string | null;
    message?: string | null;
    status: string;
    errors?: Array<{
      __typename?: 'Error';
      message?: string | null;
      path?: Array<string> | null;
    }> | null;
  } | null;
};

export type CreateRepoTaskMutationVariables = Exact<{
  repoUrls: Array<Scalars['String']> | Scalars['String'];
  origin: Scalars['String'];
}>;

export type CreateRepoTaskMutation = {
  __typename?: 'Mutation';
  createRepoTask?: {
    __typename?: 'CreateRepoTaskPayload';
    message?: string | null;
    status: string;
    prUrl?: string | null;
    reportUrl?: string | null;
  } | null;
};

export type CreateProjectTaskMutationVariables = Exact<{
  projectName: Scalars['String'];
  projectTypes: Array<ProjectTypeInput> | ProjectTypeInput;
  origin: Scalars['String'];
}>;

export type CreateProjectTaskMutation = {
  __typename?: 'Mutation';
  createProjectTask?: {
    __typename?: 'CreateProjectTaskPayload';
    message?: string | null;
    status: string;
    prUrl?: string | null;
    reportUrl?: string | null;
  } | null;
};

export type ModifyUserMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  language: Scalars['String'];
}>;

export type ModifyUserMutation = {
  __typename?: 'Mutation';
  modifyUser?: {
    __typename?: 'ModifyUserPayload';
    message?: string | null;
    status: string;
  } | null;
};

export type UserUnbindMutationVariables = Exact<{
  provider: Scalars['String'];
}>;

export type UserUnbindMutation = {
  __typename?: 'Mutation';
  userUnbind?: {
    __typename?: 'UserUnbindPayload';
    message?: string | null;
    status: string;
  } | null;
};

export type SendEmailVerifyMutationVariables = Exact<{ [key: string]: never }>;

export type SendEmailVerifyMutation = {
  __typename?: 'Mutation';
  sendEmailVerify?: {
    __typename?: 'SendEmailVerifyPayload';
    message?: string | null;
    status: string;
  } | null;
};

export type SignOutMutationVariables = Exact<{ [key: string]: never }>;

export type SignOutMutation = {
  __typename?: 'Mutation';
  signOut?: boolean | null;
};

export type DeleteUserMutationVariables = Exact<{ [key: string]: never }>;

export type DeleteUserMutation = {
  __typename?: 'Mutation';
  destroyUser?: boolean | null;
};

export type BindWechatLinkMutationVariables = Exact<{ [key: string]: never }>;

export type BindWechatLinkMutation = {
  __typename?: 'Mutation';
  bindWechatLink?: {
    __typename?: 'BindWechatLinkPayload';
    url: string;
    message?: string | null;
  } | null;
};

export type CreateSubscriptionMutationVariables = Exact<{
  label: Scalars['String'];
  level: Scalars['String'];
}>;

export type CreateSubscriptionMutation = {
  __typename?: 'Mutation';
  createSubscription?: {
    __typename?: 'CreateSubscriptionPayload';
    message?: string | null;
    status: string;
  } | null;
};

export type CancelSubscriptionMutationVariables = Exact<{
  label: Scalars['String'];
  level: Scalars['String'];
}>;

export type CancelSubscriptionMutation = {
  __typename?: 'Mutation';
  cancelSubscription?: {
    __typename?: 'CancelSubscriptionPayload';
    message?: string | null;
    status: string;
  } | null;
};

export type UserinfoQueryVariables = Exact<{ [key: string]: never }>;

export type UserinfoQuery = {
  __typename?: 'Query';
  currentUser?: {
    __typename?: 'User';
    id: number;
    name: string;
    email: string;
    language: string;
    emailVerified: boolean;
    loginBinds?: Array<{
      __typename?: 'LoginBind';
      account?: string | null;
      avatarUrl?: string | null;
      nickname?: string | null;
      provider?: string | null;
    }> | null;
  } | null;
};

export type SubscriptionsQueryVariables = Exact<{
  page: Scalars['Int'];
  per: Scalars['Int'];
}>;

export type SubscriptionsQuery = {
  __typename?: 'Query';
  currentUser?: {
    __typename?: 'User';
    subscriptions: {
      __typename?: 'SubscriptionPage';
      count?: number | null;
      page?: number | null;
      totalPage?: number | null;
      items?: Array<{
        __typename?: 'Subscription';
        count: number;
        id: number;
        label: string;
        level: string;
        status: string;
        statusUpdatedAt?: any | null;
        collectAt?: any | null;
        completeAt?: any | null;
      }> | null;
    };
  } | null;
};

export type SubscriptionCountQueryVariables = Exact<{
  label: Scalars['String'];
  level: Scalars['String'];
}>;

export type SubscriptionCountQuery = {
  __typename?: 'Query';
  subjectSubscriptionCount: {
    __typename?: 'SubjectSubscriptionCount';
    count: number;
    subscribed: boolean;
  };
};

export type StatusQueryVariables = Exact<{
  label: Scalars['String'];
}>;

export type StatusQuery = { __typename?: 'Query'; analysisStatus: string };

export type StatusVerifyQueryVariables = Exact<{
  label?: InputMaybe<Scalars['String']>;
  shortCode?: InputMaybe<Scalars['String']>;
}>;

export type StatusVerifyQuery = {
  __typename?: 'Query';
  analysisStatusVerify: {
    __typename?: 'ProjectCompletionRow';
    label?: string | null;
    level?: string | null;
    shortCode?: string | null;
    status?: string | null;
  };
};

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
    status?: string | null;
    shortCode?: string | null;
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
    shortCode?: string | null;
    organizationsActivity?: number | null;
    organizationsActivityUpdatedAt?: any | null;
    reposCount?: number | null;
  };
};

export type CommunityReposQueryVariables = Exact<{
  label: Scalars['String'];
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
}>;

export type CommunityReposQuery = {
  __typename?: 'Query';
  communityOverview: {
    __typename?: 'CommunityOverview';
    projectsCount?: number | null;
    trends?: Array<{
      __typename?: 'Repo';
      backend?: string | null;
      name?: string | null;
      path?: string | null;
      type?: string | null;
      shortCode?: string | null;
      metricActivity: Array<{
        __typename?: 'ActivityMetric';
        activityScore?: number | null;
        grimoireCreationDate?: any | null;
      }>;
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
    shortCode?: string | null;
    type?: string | null;
    linesAddedFrequency?: number | null;
    linesRemovedFrequency?: number | null;
    locFrequency?: number | null;
    prCommitCount?: number | null;
    prCommitLinkedCount?: number | null;
    prCount?: number | null;
    prIssueLinkedCount?: number | null;
    prIssueLinkedRatio?: number | null;
  }>;
  metricCommunity: Array<{
    __typename?: 'CommunityMetric';
    bugIssueOpenTimeAvg?: number | null;
    bugIssueOpenTimeMid?: number | null;
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
    shortCode?: string | null;
    type?: string | null;
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
    orgCount?: number | null;
    closedIssuesCount?: number | null;
    codeReviewCount?: number | null;
    commentFrequency?: number | null;
    commitFrequency?: number | null;
    contributorCount?: number | null;
    grimoireCreationDate?: any | null;
    label?: string | null;
    level?: string | null;
    shortCode?: string | null;
    type?: string | null;
    recentReleasesCount?: number | null;
    updatedIssuesCount?: number | null;
    updatedSince?: number | null;
  }>;
  metricGroupActivity: Array<{
    __typename?: 'GroupActivityMetric';
    commitFrequency?: number | null;
    contributionLast?: number | null;
    contributorCount?: number | null;
    grimoireCreationDate?: any | null;
    label?: string | null;
    level?: string | null;
    shortCode?: string | null;
    type?: string | null;
    orgCount?: number | null;
    organizationsActivity?: number | null;
  }>;
};

export type SummaryQueryVariables = Exact<{
  start?: InputMaybe<Scalars['ISO8601DateTime']>;
  end?: InputMaybe<Scalars['ISO8601DateTime']>;
}>;

export type SummaryQuery = {
  __typename?: 'Query';
  summaryActivity: Array<{
    __typename?: 'ActivitySummary';
    grimoireCreationDate?: any | null;
    activeC1IssueCommentsContributorCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    activeC1IssueCreateContributorCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    activeC1PrCommentsContributorCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    activeC1PrCreateContributorCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    activeC2ContributorCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    activityScore?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    closedIssuesCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    codeReviewCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    commentFrequency?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    commitFrequency?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    contributorCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    orgCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    recentReleasesCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    updatedIssuesCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    updatedSince?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
  }>;
  summaryCodequality: Array<{
    __typename?: 'CodequalitySummary';
    grimoireCreationDate?: any | null;
    activeC1PrCommentsContributorCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    activeC1PrCreateContributorCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    activeC2ContributorCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    codeMergeRatio?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    codeMergedCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    codeQualityGuarantee?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    codeReviewRatio?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    codeReviewedCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    commitFrequency?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    commitFrequencyInside?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    contributorCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    gitPrLinkedRatio?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    isMaintained?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    linesAddedFrequency?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    linesRemovedFrequency?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    locFrequency?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    prCommitCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    prCommitLinkedCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    prCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    prIssueLinkedCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    prIssueLinkedRatio?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
  }>;
  summaryCommunity: Array<{
    __typename?: 'CommunitySummary';
    grimoireCreationDate?: any | null;
    bugIssueOpenTimeAvg?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    bugIssueOpenTimeMid?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    closedPrsCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    codeReviewCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    commentFrequency?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    communitySupportScore?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    issueFirstReponseAvg?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    issueFirstReponseMid?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    issueOpenTimeAvg?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    issueOpenTimeMid?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    prOpenTimeAvg?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    prOpenTimeMid?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    updatedIssuesCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
  }>;
  summaryGroupActivity: Array<{
    __typename?: 'GroupActivitySummary';
    grimoireCreationDate?: any | null;
    commitFrequency?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    contributionLast?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    contributorCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    orgCount?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
    organizationsActivity?: {
      __typename?: 'MetricStat';
      mean?: number | null;
      median?: number | null;
    } | null;
  }>;
};

export type LabMetricQueryVariables = Exact<{
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['ISO8601DateTime']>;
  end?: InputMaybe<Scalars['ISO8601DateTime']>;
}>;

export type LabMetricQuery = {
  __typename?: 'Query';
  metricStarterProjectHealth: Array<{
    __typename?: 'StarterProjectHealthMetric';
    busFactor?: number | null;
    changeRequestClosedCountAllPeriod?: number | null;
    changeRequestClosedCountRecently?: number | null;
    changeRequestClosureRatioAllPeriod?: number | null;
    changeRequestClosureRatioRecently?: number | null;
    changeRequestCreatedCountAllPeriod?: number | null;
    changeRequestCreatedCountRecently?: number | null;
    grimoireCreationDate?: any | null;
    label?: string | null;
    level?: string | null;
    shortCode?: string | null;
    prTimeToCloseAvg?: number | null;
    prTimeToCloseMid?: number | null;
    prTimeToFirstResponseAvg?: number | null;
    prTimeToFirstResponseMid?: number | null;
    releaseFrequency?: number | null;
    starterProjectHealth?: number | null;
    type?: string | null;
  }>;
};

export type MetricStatFragment = {
  __typename?: 'MetricStat';
  mean?: number | null;
  median?: number | null;
};

export type CollectionHottestQueryVariables = Exact<{
  ident: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
}>;

export type CollectionHottestQuery = {
  __typename?: 'Query';
  collectionHottest: Array<{
    __typename?: 'ProjectCompletionRow';
    label?: string | null;
    level?: string | null;
    shortCode?: string | null;
    status?: string | null;
    updatedAt?: any | null;
  }>;
};

export type CollectionListQueryVariables = Exact<{
  ident: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
}>;

export type CollectionListQuery = {
  __typename?: 'Query';
  collectionList: {
    __typename?: 'CollectionPage';
    page?: number | null;
    totalPage?: number | null;
    count?: number | null;
    items?: Array<{
      __typename?: 'Repo';
      backend?: string | null;
      language?: string | null;
      name?: string | null;
      openIssuesCount?: number | null;
      origin: string;
      path?: string | null;
      shortCode?: string | null;
      metricActivity: Array<{
        __typename?: 'ActivityMetric';
        activityScore?: number | null;
      }>;
    }> | null;
  };
};

export type BulkOverviewQueryVariables = Exact<{
  labels: Array<Scalars['String']> | Scalars['String'];
}>;

export type BulkOverviewQuery = {
  __typename?: 'Query';
  bulkOverview: Array<{
    __typename?: 'Repo';
    backend?: string | null;
    forksCount?: number | null;
    language?: string | null;
    name?: string | null;
    openIssuesCount?: number | null;
    path?: string | null;
    shortCode?: string | null;
    stargazersCount?: number | null;
    watchersCount?: number | null;
    metricActivity: Array<{
      __typename?: 'ActivityMetric';
      activityScore?: number | null;
    }>;
  }>;
};

export type TrendingQueryVariables = Exact<{
  level?: InputMaybe<Scalars['String']>;
}>;

export type TrendingQuery = {
  __typename?: 'Query';
  trending: Array<{
    __typename?: 'Trending';
    shortCode?: string | null;
    activityScore?: number | null;
    fullPath?: string | null;
    label?: string | null;
    level?: string | null;
    name?: string | null;
    origin?: string | null;
    reposCount?: number | null;
  }>;
};

export type BetaMetricOverviewQueryVariables = Exact<{
  id: Scalars['Int'];
  limit?: InputMaybe<Scalars['Int']>;
}>;

export type BetaMetricOverviewQuery = {
  __typename?: 'Query';
  betaMetricOverview: {
    __typename?: 'BetaMetricOverview';
    projectsCount?: number | null;
    trends?: Array<{
      __typename?: 'BetaRepo';
      path?: string | null;
      origin: string;
      name?: string | null;
      backend?: string | null;
      shortCode?: string | null;
      betaMetricScores: Array<{
        __typename?: 'BetaMetricScore';
        grimoireCreationDate?: any | null;
        score?: number | null;
      }>;
    }> | null;
  };
};

export type BetaMetricsIndexQueryVariables = Exact<{
  per?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}>;

export type BetaMetricsIndexQuery = {
  __typename?: 'Query';
  betaMetricsIndex: Array<{
    __typename?: 'BetaMetric';
    id?: number | null;
    dimensionality?: string | null;
    desc?: string | null;
    extra?: string | null;
    metric?: string | null;
  }>;
};

export type BulkShortenedLabelQueryVariables = Exact<{
  labels: Array<LabelRowInput> | LabelRowInput;
}>;

export type BulkShortenedLabelQuery = {
  __typename?: 'Query';
  bulkShortenedLabel: Array<{
    __typename?: 'LabelRow';
    label?: string | null;
    level?: string | null;
    shortCode?: string | null;
  }>;
};

export const AlgorithmFragmentDoc = /*#__PURE__*/ `
    fragment algorithm on Algorithm {
  ident
  name
}
    `;
export const DatasetFragmentDoc = /*#__PURE__*/ `
    fragment dataset on Dataset {
  ident
  items {
    firstIdent
    label
    level
    secondIdent
  }
  name
}
    `;
export const MetricsFragmentDoc = /*#__PURE__*/ `
    fragment metrics on ModelMetric {
  category
  defaultThreshold
  defaultWeight
  from
  id
  metricId
  ident
  name
  threshold
  weight
}
    `;
export const LabMemberFragmentDoc = /*#__PURE__*/ `
    fragment labMember on LabMember {
  avatarUrl
  canExecute
  canRead
  canUpdate
  id
  isOwner
  joinedAt
  name
}
    `;
export const MetricStatFragmentDoc = /*#__PURE__*/ `
    fragment metricStat on MetricStat {
  mean
  median
}
    `;
export const MyLabModelsDocument = /*#__PURE__*/ `
    query myLabModels($page: Int!, $per: Int!) {
  myModels(page: $page, per: $per) {
    count
    items {
      dimension
      id
      isGeneral
      isPublic
      triggerRemainingCount
      latestVersions {
        id
        version
        algorithm {
          ...algorithm
        }
        dataset {
          ...dataset
        }
        metrics {
          ...metrics
        }
      }
      name
      userId
    }
    page
    totalPage
  }
}
    ${AlgorithmFragmentDoc}
${DatasetFragmentDoc}
${MetricsFragmentDoc}`;
export const useMyLabModelsQuery = <TData = MyLabModelsQuery, TError = unknown>(
  client: GraphQLClient,
  variables: MyLabModelsQueryVariables,
  options?: UseQueryOptions<MyLabModelsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<MyLabModelsQuery, TError, TData>(
    ['myLabModels', variables],
    fetcher<MyLabModelsQuery, MyLabModelsQueryVariables>(
      client,
      MyLabModelsDocument,
      variables,
      headers
    ),
    options
  );

useMyLabModelsQuery.getKey = (variables: MyLabModelsQueryVariables) => [
  'myLabModels',
  variables,
];
useMyLabModelsQuery.fetcher = (
  client: GraphQLClient,
  variables: MyLabModelsQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<MyLabModelsQuery, MyLabModelsQueryVariables>(
    client,
    MyLabModelsDocument,
    variables,
    headers
  );
export const LabModelDetailDocument = /*#__PURE__*/ `
    query labModelDetail($id: Int!) {
  labModelDetail(id: $id) {
    dimension
    id
    isGeneral
    isPublic
    triggerRemainingCount
    latestVersions {
      id
      version
      algorithm {
        ...algorithm
      }
      dataset {
        ...dataset
      }
      metrics {
        ...metrics
      }
    }
    name
    userId
  }
}
    ${AlgorithmFragmentDoc}
${DatasetFragmentDoc}
${MetricsFragmentDoc}`;
export const useLabModelDetailQuery = <
  TData = LabModelDetailQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: LabModelDetailQueryVariables,
  options?: UseQueryOptions<LabModelDetailQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<LabModelDetailQuery, TError, TData>(
    ['labModelDetail', variables],
    fetcher<LabModelDetailQuery, LabModelDetailQueryVariables>(
      client,
      LabModelDetailDocument,
      variables,
      headers
    ),
    options
  );

useLabModelDetailQuery.getKey = (variables: LabModelDetailQueryVariables) => [
  'labModelDetail',
  variables,
];
useLabModelDetailQuery.fetcher = (
  client: GraphQLClient,
  variables: LabModelDetailQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<LabModelDetailQuery, LabModelDetailQueryVariables>(
    client,
    LabModelDetailDocument,
    variables,
    headers
  );
export const LabModelVersionDocument = /*#__PURE__*/ `
    query labModelVersion($modelId: Int!, $versionId: Int!) {
  labModelVersion(modelId: $modelId, versionId: $versionId) {
    id
    version
    algorithm {
      ...algorithm
    }
    dataset {
      ...dataset
    }
    metrics {
      ...metrics
    }
  }
}
    ${AlgorithmFragmentDoc}
${DatasetFragmentDoc}
${MetricsFragmentDoc}`;
export const useLabModelVersionQuery = <
  TData = LabModelVersionQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: LabModelVersionQueryVariables,
  options?: UseQueryOptions<LabModelVersionQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<LabModelVersionQuery, TError, TData>(
    ['labModelVersion', variables],
    fetcher<LabModelVersionQuery, LabModelVersionQueryVariables>(
      client,
      LabModelVersionDocument,
      variables,
      headers
    ),
    options
  );

useLabModelVersionQuery.getKey = (variables: LabModelVersionQueryVariables) => [
  'labModelVersion',
  variables,
];
useLabModelVersionQuery.fetcher = (
  client: GraphQLClient,
  variables: LabModelVersionQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<LabModelVersionQuery, LabModelVersionQueryVariables>(
    client,
    LabModelVersionDocument,
    variables,
    headers
  );
export const DataSetListDocument = /*#__PURE__*/ `
    query dataSetList($type: String, $firstIdent: String, $secondIdent: String) {
  datasetOverview(type: $type, firstIdent: $firstIdent, secondIdent: $secondIdent)
}
    `;
export const useDataSetListQuery = <TData = DataSetListQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: DataSetListQueryVariables,
  options?: UseQueryOptions<DataSetListQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<DataSetListQuery, TError, TData>(
    variables === undefined ? ['dataSetList'] : ['dataSetList', variables],
    fetcher<DataSetListQuery, DataSetListQueryVariables>(
      client,
      DataSetListDocument,
      variables,
      headers
    ),
    options
  );

useDataSetListQuery.getKey = (variables?: DataSetListQueryVariables) =>
  variables === undefined ? ['dataSetList'] : ['dataSetList', variables];
useDataSetListQuery.fetcher = (
  client: GraphQLClient,
  variables?: DataSetListQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<DataSetListQuery, DataSetListQueryVariables>(
    client,
    DataSetListDocument,
    variables,
    headers
  );
export const MetricSetListDocument = /*#__PURE__*/ `
    query metricSetList {
  metricSetOverview {
    category
    defaultThreshold
    defaultWeight
    from
    id
    ident
    name
    threshold
    weight
  }
}
    `;
export const useMetricSetListQuery = <
  TData = MetricSetListQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables?: MetricSetListQueryVariables,
  options?: UseQueryOptions<MetricSetListQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<MetricSetListQuery, TError, TData>(
    variables === undefined ? ['metricSetList'] : ['metricSetList', variables],
    fetcher<MetricSetListQuery, MetricSetListQueryVariables>(
      client,
      MetricSetListDocument,
      variables,
      headers
    ),
    options
  );

useMetricSetListQuery.getKey = (variables?: MetricSetListQueryVariables) =>
  variables === undefined ? ['metricSetList'] : ['metricSetList', variables];
useMetricSetListQuery.fetcher = (
  client: GraphQLClient,
  variables?: MetricSetListQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<MetricSetListQuery, MetricSetListQueryVariables>(
    client,
    MetricSetListDocument,
    variables,
    headers
  );
export const CreateLabModelDocument = /*#__PURE__*/ `
    mutation createLabModel($algorithm: String, $datasets: [DatasetRowTypeInput!]!, $dimension: Int!, $isGeneral: Boolean!, $isPublic: Boolean!, $metrics: [LabModelMetricInput!]!, $name: String!) {
  createLabModel(
    input: {algorithm: $algorithm, datasets: $datasets, dimension: $dimension, isGeneral: $isGeneral, isPublic: $isPublic, metrics: $metrics, name: $name}
  ) {
    clientMutationId
    errors {
      message
      path
    }
    message
  }
}
    `;
export const useCreateLabModelMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    CreateLabModelMutation,
    TError,
    CreateLabModelMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    CreateLabModelMutation,
    TError,
    CreateLabModelMutationVariables,
    TContext
  >(
    ['createLabModel'],
    (variables?: CreateLabModelMutationVariables) =>
      fetcher<CreateLabModelMutation, CreateLabModelMutationVariables>(
        client,
        CreateLabModelDocument,
        variables,
        headers
      )(),
    options
  );
useCreateLabModelMutation.fetcher = (
  client: GraphQLClient,
  variables: CreateLabModelMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<CreateLabModelMutation, CreateLabModelMutationVariables>(
    client,
    CreateLabModelDocument,
    variables,
    headers
  );
export const CreateLabModelVersionDocument = /*#__PURE__*/ `
    mutation createLabModelVersion($algorithm: String, $datasets: [DatasetRowTypeInput!]!, $metrics: [LabModelMetricInput!]!, $modelId: Int!, $version: String!) {
  createLabModelVersion(
    input: {algorithm: $algorithm, datasets: $datasets, metrics: $metrics, modelId: $modelId, version: $version}
  ) {
    clientMutationId
    errors {
      message
      path
    }
    message
  }
}
    `;
export const useCreateLabModelVersionMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    CreateLabModelVersionMutation,
    TError,
    CreateLabModelVersionMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    CreateLabModelVersionMutation,
    TError,
    CreateLabModelVersionMutationVariables,
    TContext
  >(
    ['createLabModelVersion'],
    (variables?: CreateLabModelVersionMutationVariables) =>
      fetcher<
        CreateLabModelVersionMutation,
        CreateLabModelVersionMutationVariables
      >(client, CreateLabModelVersionDocument, variables, headers)(),
    options
  );
useCreateLabModelVersionMutation.fetcher = (
  client: GraphQLClient,
  variables: CreateLabModelVersionMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<
    CreateLabModelVersionMutation,
    CreateLabModelVersionMutationVariables
  >(client, CreateLabModelVersionDocument, variables, headers);
export const UpdateLabModelDocument = /*#__PURE__*/ `
    mutation updateLabModel($dimension: Int, $isGeneral: Boolean, $isPublic: Boolean, $modelId: Int!, $name: String) {
  updateLabModel(
    input: {dimension: $dimension, isGeneral: $isGeneral, isPublic: $isPublic, modelId: $modelId, name: $name}
  ) {
    errors {
      message
      path
    }
    message
  }
}
    `;
export const useUpdateLabModelMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    UpdateLabModelMutation,
    TError,
    UpdateLabModelMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    UpdateLabModelMutation,
    TError,
    UpdateLabModelMutationVariables,
    TContext
  >(
    ['updateLabModel'],
    (variables?: UpdateLabModelMutationVariables) =>
      fetcher<UpdateLabModelMutation, UpdateLabModelMutationVariables>(
        client,
        UpdateLabModelDocument,
        variables,
        headers
      )(),
    options
  );
useUpdateLabModelMutation.fetcher = (
  client: GraphQLClient,
  variables: UpdateLabModelMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<UpdateLabModelMutation, UpdateLabModelMutationVariables>(
    client,
    UpdateLabModelDocument,
    variables,
    headers
  );
export const UpdateLabModelVersionDocument = /*#__PURE__*/ `
    mutation updateLabModelVersion($modelId: Int!, $versionId: Int!, $version: String, $algorithm: String, $datasets: [DatasetRowTypeInput!]!, $metrics: [LabModelMetricInput!]!) {
  updateLabModelVersion(
    input: {algorithm: $algorithm, datasets: $datasets, metrics: $metrics, modelId: $modelId, versionId: $versionId, version: $version}
  ) {
    errors {
      message
      path
    }
    message
  }
}
    `;
export const useUpdateLabModelVersionMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    UpdateLabModelVersionMutation,
    TError,
    UpdateLabModelVersionMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    UpdateLabModelVersionMutation,
    TError,
    UpdateLabModelVersionMutationVariables,
    TContext
  >(
    ['updateLabModelVersion'],
    (variables?: UpdateLabModelVersionMutationVariables) =>
      fetcher<
        UpdateLabModelVersionMutation,
        UpdateLabModelVersionMutationVariables
      >(client, UpdateLabModelVersionDocument, variables, headers)(),
    options
  );
useUpdateLabModelVersionMutation.fetcher = (
  client: GraphQLClient,
  variables: UpdateLabModelVersionMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<
    UpdateLabModelVersionMutation,
    UpdateLabModelVersionMutationVariables
  >(client, UpdateLabModelVersionDocument, variables, headers);
export const DeleteLabModelDocument = /*#__PURE__*/ `
    mutation deleteLabModel($id: Int!) {
  deleteLabModel(input: {id: $id}) {
    clientMutationId
    errors {
      message
      path
    }
    message
    status
  }
}
    `;
export const useDeleteLabModelMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    DeleteLabModelMutation,
    TError,
    DeleteLabModelMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    DeleteLabModelMutation,
    TError,
    DeleteLabModelMutationVariables,
    TContext
  >(
    ['deleteLabModel'],
    (variables?: DeleteLabModelMutationVariables) =>
      fetcher<DeleteLabModelMutation, DeleteLabModelMutationVariables>(
        client,
        DeleteLabModelDocument,
        variables,
        headers
      )(),
    options
  );
useDeleteLabModelMutation.fetcher = (
  client: GraphQLClient,
  variables: DeleteLabModelMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<DeleteLabModelMutation, DeleteLabModelMutationVariables>(
    client,
    DeleteLabModelDocument,
    variables,
    headers
  );
export const DeleteLabModelVersionDocument = /*#__PURE__*/ `
    mutation deleteLabModelVersion($modelId: Int!, $versionId: Int!) {
  deleteLabModelVersion(input: {modelId: $modelId, versionId: $versionId}) {
    clientMutationId
    errors {
      message
      path
    }
    message
    status
  }
}
    `;
export const useDeleteLabModelVersionMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    DeleteLabModelVersionMutation,
    TError,
    DeleteLabModelVersionMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    DeleteLabModelVersionMutation,
    TError,
    DeleteLabModelVersionMutationVariables,
    TContext
  >(
    ['deleteLabModelVersion'],
    (variables?: DeleteLabModelVersionMutationVariables) =>
      fetcher<
        DeleteLabModelVersionMutation,
        DeleteLabModelVersionMutationVariables
      >(client, DeleteLabModelVersionDocument, variables, headers)(),
    options
  );
useDeleteLabModelVersionMutation.fetcher = (
  client: GraphQLClient,
  variables: DeleteLabModelVersionMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<
    DeleteLabModelVersionMutation,
    DeleteLabModelVersionMutationVariables
  >(client, DeleteLabModelVersionDocument, variables, headers);
export const DeleteLabMemberDocument = /*#__PURE__*/ `
    mutation deleteLabMember($modelId: Int!, $memberId: Int!) {
  deleteLabMember(input: {modelId: $modelId, memberId: $memberId}) {
    errors {
      message
      path
    }
    message
    status
  }
}
    `;
export const useDeleteLabMemberMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    DeleteLabMemberMutation,
    TError,
    DeleteLabMemberMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    DeleteLabMemberMutation,
    TError,
    DeleteLabMemberMutationVariables,
    TContext
  >(
    ['deleteLabMember'],
    (variables?: DeleteLabMemberMutationVariables) =>
      fetcher<DeleteLabMemberMutation, DeleteLabMemberMutationVariables>(
        client,
        DeleteLabMemberDocument,
        variables,
        headers
      )(),
    options
  );
useDeleteLabMemberMutation.fetcher = (
  client: GraphQLClient,
  variables: DeleteLabMemberMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<DeleteLabMemberMutation, DeleteLabMemberMutationVariables>(
    client,
    DeleteLabMemberDocument,
    variables,
    headers
  );
export const SendMemberInviteDocument = /*#__PURE__*/ `
    mutation sendMemberInvite($modelId: Int!, $emails: [String!]!, $canUpdate: Boolean, $canExecute: Boolean) {
  sendMemberInvite(
    input: {modelId: $modelId, emails: $emails, canUpdate: $canUpdate, canExecute: $canExecute}
  ) {
    clientMutationId
    errors {
      message
      path
    }
    message
    status
  }
}
    `;
export const useSendMemberInviteMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    SendMemberInviteMutation,
    TError,
    SendMemberInviteMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    SendMemberInviteMutation,
    TError,
    SendMemberInviteMutationVariables,
    TContext
  >(
    ['sendMemberInvite'],
    (variables?: SendMemberInviteMutationVariables) =>
      fetcher<SendMemberInviteMutation, SendMemberInviteMutationVariables>(
        client,
        SendMemberInviteDocument,
        variables,
        headers
      )(),
    options
  );
useSendMemberInviteMutation.fetcher = (
  client: GraphQLClient,
  variables: SendMemberInviteMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<SendMemberInviteMutation, SendMemberInviteMutationVariables>(
    client,
    SendMemberInviteDocument,
    variables,
    headers
  );
export const MemberOverviewDocument = /*#__PURE__*/ `
    query memberOverview($modelId: Int, $page: Int, $per: Int) {
  memberOverview(modelId: $modelId, page: $page, per: $per) {
    count
    items {
      ...labMember
    }
    model {
      name
    }
    page
    totalPage
  }
}
    ${LabMemberFragmentDoc}`;
export const useMemberOverviewQuery = <
  TData = MemberOverviewQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables?: MemberOverviewQueryVariables,
  options?: UseQueryOptions<MemberOverviewQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<MemberOverviewQuery, TError, TData>(
    variables === undefined
      ? ['memberOverview']
      : ['memberOverview', variables],
    fetcher<MemberOverviewQuery, MemberOverviewQueryVariables>(
      client,
      MemberOverviewDocument,
      variables,
      headers
    ),
    options
  );

useMemberOverviewQuery.getKey = (variables?: MemberOverviewQueryVariables) =>
  variables === undefined ? ['memberOverview'] : ['memberOverview', variables];
useMemberOverviewQuery.fetcher = (
  client: GraphQLClient,
  variables?: MemberOverviewQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<MemberOverviewQuery, MemberOverviewQueryVariables>(
    client,
    MemberOverviewDocument,
    variables,
    headers
  );
export const InvitationOverviewDocument = /*#__PURE__*/ `
    query invitationOverview($modelId: Int, $page: Int, $per: Int) {
  invitationOverview(modelId: $modelId, page: $page, per: $per) {
    count
    items {
      canExecute
      canRead
      canUpdate
      email
      id
      sentAt
      status
    }
    page
    totalPage
  }
}
    `;
export const useInvitationOverviewQuery = <
  TData = InvitationOverviewQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables?: InvitationOverviewQueryVariables,
  options?: UseQueryOptions<InvitationOverviewQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<InvitationOverviewQuery, TError, TData>(
    variables === undefined
      ? ['invitationOverview']
      : ['invitationOverview', variables],
    fetcher<InvitationOverviewQuery, InvitationOverviewQueryVariables>(
      client,
      InvitationOverviewDocument,
      variables,
      headers
    ),
    options
  );

useInvitationOverviewQuery.getKey = (
  variables?: InvitationOverviewQueryVariables
) =>
  variables === undefined
    ? ['invitationOverview']
    : ['invitationOverview', variables];
useInvitationOverviewQuery.fetcher = (
  client: GraphQLClient,
  variables?: InvitationOverviewQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<InvitationOverviewQuery, InvitationOverviewQueryVariables>(
    client,
    InvitationOverviewDocument,
    variables,
    headers
  );
export const UpdateMemberPermissionDocument = /*#__PURE__*/ `
    mutation updateMemberPermission($modelId: Int!, $memberId: Int!, $canUpdate: Boolean, $canExecute: Boolean) {
  updateMemberPermission(
    input: {modelId: $modelId, memberId: $memberId, canUpdate: $canUpdate, canExecute: $canExecute}
  ) {
    clientMutationId
    data {
      ...labMember
    }
    errors {
      message
      path
    }
    message
  }
}
    ${LabMemberFragmentDoc}`;
export const useUpdateMemberPermissionMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    UpdateMemberPermissionMutation,
    TError,
    UpdateMemberPermissionMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    UpdateMemberPermissionMutation,
    TError,
    UpdateMemberPermissionMutationVariables,
    TContext
  >(
    ['updateMemberPermission'],
    (variables?: UpdateMemberPermissionMutationVariables) =>
      fetcher<
        UpdateMemberPermissionMutation,
        UpdateMemberPermissionMutationVariables
      >(client, UpdateMemberPermissionDocument, variables, headers)(),
    options
  );
useUpdateMemberPermissionMutation.fetcher = (
  client: GraphQLClient,
  variables: UpdateMemberPermissionMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<
    UpdateMemberPermissionMutation,
    UpdateMemberPermissionMutationVariables
  >(client, UpdateMemberPermissionDocument, variables, headers);
export const CancelMemberInviteDocument = /*#__PURE__*/ `
    mutation cancelMemberInvite($modelId: Int!, $invitationId: Int!) {
  cancelMemberInvite(input: {modelId: $modelId, invitationId: $invitationId}) {
    clientMutationId
    errors {
      message
      path
    }
    message
    status
  }
}
    `;
export const useCancelMemberInviteMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    CancelMemberInviteMutation,
    TError,
    CancelMemberInviteMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    CancelMemberInviteMutation,
    TError,
    CancelMemberInviteMutationVariables,
    TContext
  >(
    ['cancelMemberInvite'],
    (variables?: CancelMemberInviteMutationVariables) =>
      fetcher<CancelMemberInviteMutation, CancelMemberInviteMutationVariables>(
        client,
        CancelMemberInviteDocument,
        variables,
        headers
      )(),
    options
  );
useCancelMemberInviteMutation.fetcher = (
  client: GraphQLClient,
  variables: CancelMemberInviteMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<CancelMemberInviteMutation, CancelMemberInviteMutationVariables>(
    client,
    CancelMemberInviteDocument,
    variables,
    headers
  );
export const CreateRepoTaskDocument = /*#__PURE__*/ `
    mutation createRepoTask($repoUrls: [String!]!, $origin: String!) {
  createRepoTask(input: {repoUrls: $repoUrls, origin: $origin}) {
    message
    status
    prUrl
    reportUrl
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
    mutation createProjectTask($projectName: String!, $projectTypes: [ProjectTypeInput!]!, $origin: String!) {
  createProjectTask(
    input: {projectName: $projectName, projectTypes: $projectTypes, origin: $origin}
  ) {
    message
    status
    prUrl
    reportUrl
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
export const ModifyUserDocument = /*#__PURE__*/ `
    mutation modifyUser($name: String!, $email: String!, $language: String!) {
  modifyUser(input: {name: $name, email: $email, language: $language}) {
    message
    status
  }
}
    `;
export const useModifyUserMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    ModifyUserMutation,
    TError,
    ModifyUserMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    ModifyUserMutation,
    TError,
    ModifyUserMutationVariables,
    TContext
  >(
    ['modifyUser'],
    (variables?: ModifyUserMutationVariables) =>
      fetcher<ModifyUserMutation, ModifyUserMutationVariables>(
        client,
        ModifyUserDocument,
        variables,
        headers
      )(),
    options
  );
useModifyUserMutation.fetcher = (
  client: GraphQLClient,
  variables: ModifyUserMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<ModifyUserMutation, ModifyUserMutationVariables>(
    client,
    ModifyUserDocument,
    variables,
    headers
  );
export const UserUnbindDocument = /*#__PURE__*/ `
    mutation userUnbind($provider: String!) {
  userUnbind(input: {provider: $provider}) {
    message
    status
  }
}
    `;
export const useUserUnbindMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    UserUnbindMutation,
    TError,
    UserUnbindMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    UserUnbindMutation,
    TError,
    UserUnbindMutationVariables,
    TContext
  >(
    ['userUnbind'],
    (variables?: UserUnbindMutationVariables) =>
      fetcher<UserUnbindMutation, UserUnbindMutationVariables>(
        client,
        UserUnbindDocument,
        variables,
        headers
      )(),
    options
  );
useUserUnbindMutation.fetcher = (
  client: GraphQLClient,
  variables: UserUnbindMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<UserUnbindMutation, UserUnbindMutationVariables>(
    client,
    UserUnbindDocument,
    variables,
    headers
  );
export const SendEmailVerifyDocument = /*#__PURE__*/ `
    mutation sendEmailVerify {
  sendEmailVerify(input: {}) {
    message
    status
  }
}
    `;
export const useSendEmailVerifyMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    SendEmailVerifyMutation,
    TError,
    SendEmailVerifyMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    SendEmailVerifyMutation,
    TError,
    SendEmailVerifyMutationVariables,
    TContext
  >(
    ['sendEmailVerify'],
    (variables?: SendEmailVerifyMutationVariables) =>
      fetcher<SendEmailVerifyMutation, SendEmailVerifyMutationVariables>(
        client,
        SendEmailVerifyDocument,
        variables,
        headers
      )(),
    options
  );
useSendEmailVerifyMutation.fetcher = (
  client: GraphQLClient,
  variables?: SendEmailVerifyMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<SendEmailVerifyMutation, SendEmailVerifyMutationVariables>(
    client,
    SendEmailVerifyDocument,
    variables,
    headers
  );
export const SignOutDocument = /*#__PURE__*/ `
    mutation signOut {
  signOut
}
    `;
export const useSignOutMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    SignOutMutation,
    TError,
    SignOutMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<SignOutMutation, TError, SignOutMutationVariables, TContext>(
    ['signOut'],
    (variables?: SignOutMutationVariables) =>
      fetcher<SignOutMutation, SignOutMutationVariables>(
        client,
        SignOutDocument,
        variables,
        headers
      )(),
    options
  );
useSignOutMutation.fetcher = (
  client: GraphQLClient,
  variables?: SignOutMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<SignOutMutation, SignOutMutationVariables>(
    client,
    SignOutDocument,
    variables,
    headers
  );
export const DeleteUserDocument = /*#__PURE__*/ `
    mutation deleteUser {
  destroyUser
}
    `;
export const useDeleteUserMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    DeleteUserMutation,
    TError,
    DeleteUserMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    DeleteUserMutation,
    TError,
    DeleteUserMutationVariables,
    TContext
  >(
    ['deleteUser'],
    (variables?: DeleteUserMutationVariables) =>
      fetcher<DeleteUserMutation, DeleteUserMutationVariables>(
        client,
        DeleteUserDocument,
        variables,
        headers
      )(),
    options
  );
useDeleteUserMutation.fetcher = (
  client: GraphQLClient,
  variables?: DeleteUserMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<DeleteUserMutation, DeleteUserMutationVariables>(
    client,
    DeleteUserDocument,
    variables,
    headers
  );
export const BindWechatLinkDocument = /*#__PURE__*/ `
    mutation bindWechatLink {
  bindWechatLink(input: {}) {
    url
    message
  }
}
    `;
export const useBindWechatLinkMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    BindWechatLinkMutation,
    TError,
    BindWechatLinkMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    BindWechatLinkMutation,
    TError,
    BindWechatLinkMutationVariables,
    TContext
  >(
    ['bindWechatLink'],
    (variables?: BindWechatLinkMutationVariables) =>
      fetcher<BindWechatLinkMutation, BindWechatLinkMutationVariables>(
        client,
        BindWechatLinkDocument,
        variables,
        headers
      )(),
    options
  );
useBindWechatLinkMutation.fetcher = (
  client: GraphQLClient,
  variables?: BindWechatLinkMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<BindWechatLinkMutation, BindWechatLinkMutationVariables>(
    client,
    BindWechatLinkDocument,
    variables,
    headers
  );
export const CreateSubscriptionDocument = /*#__PURE__*/ `
    mutation createSubscription($label: String!, $level: String!) {
  createSubscription(input: {label: $label, level: $level}) {
    message
    status
  }
}
    `;
export const useCreateSubscriptionMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    CreateSubscriptionMutation,
    TError,
    CreateSubscriptionMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    CreateSubscriptionMutation,
    TError,
    CreateSubscriptionMutationVariables,
    TContext
  >(
    ['createSubscription'],
    (variables?: CreateSubscriptionMutationVariables) =>
      fetcher<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>(
        client,
        CreateSubscriptionDocument,
        variables,
        headers
      )(),
    options
  );
useCreateSubscriptionMutation.fetcher = (
  client: GraphQLClient,
  variables: CreateSubscriptionMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>(
    client,
    CreateSubscriptionDocument,
    variables,
    headers
  );
export const CancelSubscriptionDocument = /*#__PURE__*/ `
    mutation cancelSubscription($label: String!, $level: String!) {
  cancelSubscription(input: {label: $label, level: $level}) {
    message
    status
  }
}
    `;
export const useCancelSubscriptionMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    CancelSubscriptionMutation,
    TError,
    CancelSubscriptionMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    CancelSubscriptionMutation,
    TError,
    CancelSubscriptionMutationVariables,
    TContext
  >(
    ['cancelSubscription'],
    (variables?: CancelSubscriptionMutationVariables) =>
      fetcher<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>(
        client,
        CancelSubscriptionDocument,
        variables,
        headers
      )(),
    options
  );
useCancelSubscriptionMutation.fetcher = (
  client: GraphQLClient,
  variables: CancelSubscriptionMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>(
    client,
    CancelSubscriptionDocument,
    variables,
    headers
  );
export const UserinfoDocument = /*#__PURE__*/ `
    query userinfo {
  currentUser {
    id
    name
    email
    language
    emailVerified
    loginBinds {
      account
      avatarUrl
      nickname
      provider
    }
  }
}
    `;
export const useUserinfoQuery = <TData = UserinfoQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: UserinfoQueryVariables,
  options?: UseQueryOptions<UserinfoQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<UserinfoQuery, TError, TData>(
    variables === undefined ? ['userinfo'] : ['userinfo', variables],
    fetcher<UserinfoQuery, UserinfoQueryVariables>(
      client,
      UserinfoDocument,
      variables,
      headers
    ),
    options
  );

useUserinfoQuery.getKey = (variables?: UserinfoQueryVariables) =>
  variables === undefined ? ['userinfo'] : ['userinfo', variables];
useUserinfoQuery.fetcher = (
  client: GraphQLClient,
  variables?: UserinfoQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<UserinfoQuery, UserinfoQueryVariables>(
    client,
    UserinfoDocument,
    variables,
    headers
  );
export const SubscriptionsDocument = /*#__PURE__*/ `
    query subscriptions($page: Int!, $per: Int!) {
  currentUser {
    subscriptions(page: $page, per: $per) {
      count
      page
      totalPage
      items {
        count
        id
        label
        level
        status
        statusUpdatedAt
        collectAt
        completeAt
      }
    }
  }
}
    `;
export const useSubscriptionsQuery = <
  TData = SubscriptionsQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: SubscriptionsQueryVariables,
  options?: UseQueryOptions<SubscriptionsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<SubscriptionsQuery, TError, TData>(
    ['subscriptions', variables],
    fetcher<SubscriptionsQuery, SubscriptionsQueryVariables>(
      client,
      SubscriptionsDocument,
      variables,
      headers
    ),
    options
  );

useSubscriptionsQuery.getKey = (variables: SubscriptionsQueryVariables) => [
  'subscriptions',
  variables,
];
useSubscriptionsQuery.fetcher = (
  client: GraphQLClient,
  variables: SubscriptionsQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<SubscriptionsQuery, SubscriptionsQueryVariables>(
    client,
    SubscriptionsDocument,
    variables,
    headers
  );
export const SubscriptionCountDocument = /*#__PURE__*/ `
    query subscriptionCount($label: String!, $level: String!) {
  subjectSubscriptionCount(label: $label, level: $level) {
    count
    subscribed
  }
}
    `;
export const useSubscriptionCountQuery = <
  TData = SubscriptionCountQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: SubscriptionCountQueryVariables,
  options?: UseQueryOptions<SubscriptionCountQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<SubscriptionCountQuery, TError, TData>(
    ['subscriptionCount', variables],
    fetcher<SubscriptionCountQuery, SubscriptionCountQueryVariables>(
      client,
      SubscriptionCountDocument,
      variables,
      headers
    ),
    options
  );

useSubscriptionCountQuery.getKey = (
  variables: SubscriptionCountQueryVariables
) => ['subscriptionCount', variables];
useSubscriptionCountQuery.fetcher = (
  client: GraphQLClient,
  variables: SubscriptionCountQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<SubscriptionCountQuery, SubscriptionCountQueryVariables>(
    client,
    SubscriptionCountDocument,
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
export const StatusVerifyDocument = /*#__PURE__*/ `
    query statusVerify($label: String, $shortCode: String) {
  analysisStatusVerify(label: $label, shortCode: $shortCode) {
    label
    level
    shortCode
    status
  }
}
    `;
export const useStatusVerifyQuery = <
  TData = StatusVerifyQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables?: StatusVerifyQueryVariables,
  options?: UseQueryOptions<StatusVerifyQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<StatusVerifyQuery, TError, TData>(
    variables === undefined ? ['statusVerify'] : ['statusVerify', variables],
    fetcher<StatusVerifyQuery, StatusVerifyQueryVariables>(
      client,
      StatusVerifyDocument,
      variables,
      headers
    ),
    options
  );

useStatusVerifyQuery.getKey = (variables?: StatusVerifyQueryVariables) =>
  variables === undefined ? ['statusVerify'] : ['statusVerify', variables];
useStatusVerifyQuery.fetcher = (
  client: GraphQLClient,
  variables?: StatusVerifyQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<StatusVerifyQuery, StatusVerifyQueryVariables>(
    client,
    StatusVerifyDocument,
    variables,
    headers
  );
export const SearchDocument = /*#__PURE__*/ `
    query search($keyword: String!, $level: String) {
  fuzzySearch(keyword: $keyword, level: $level) {
    level
    label
    status
    shortCode
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
    shortCode
    organizationsActivity
    organizationsActivityUpdatedAt
    reposCount
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
export const CommunityReposDocument = /*#__PURE__*/ `
    query communityRepos($label: String!, $page: Int, $per: Int, $type: String) {
  communityOverview(label: $label, page: $page, per: $per, type: $type) {
    projectsCount
    trends {
      backend
      name
      path
      type
      shortCode
      metricActivity {
        activityScore
        grimoireCreationDate
      }
    }
  }
}
    `;
export const useCommunityReposQuery = <
  TData = CommunityReposQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: CommunityReposQueryVariables,
  options?: UseQueryOptions<CommunityReposQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<CommunityReposQuery, TError, TData>(
    ['communityRepos', variables],
    fetcher<CommunityReposQuery, CommunityReposQueryVariables>(
      client,
      CommunityReposDocument,
      variables,
      headers
    ),
    options
  );

useCommunityReposQuery.getKey = (variables: CommunityReposQueryVariables) => [
  'communityRepos',
  variables,
];
useCommunityReposQuery.fetcher = (
  client: GraphQLClient,
  variables: CommunityReposQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<CommunityReposQuery, CommunityReposQueryVariables>(
    client,
    CommunityReposDocument,
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
    shortCode
    type
    linesAddedFrequency
    linesRemovedFrequency
    locFrequency
    prCommitCount
    prCommitLinkedCount
    prCount
    prIssueLinkedCount
    prIssueLinkedRatio
  }
  metricCommunity(label: $label, level: $level, beginDate: $start, endDate: $end) {
    bugIssueOpenTimeAvg
    bugIssueOpenTimeMid
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
    shortCode
    type
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
    orgCount
    closedIssuesCount
    codeReviewCount
    commentFrequency
    commitFrequency
    contributorCount
    grimoireCreationDate
    label
    level
    shortCode
    type
    recentReleasesCount
    updatedIssuesCount
    updatedSince
  }
  metricGroupActivity(
    label: $label
    level: $level
    beginDate: $start
    endDate: $end
  ) {
    commitFrequency
    contributionLast
    contributorCount
    grimoireCreationDate
    label
    level
    shortCode
    type
    orgCount
    organizationsActivity
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
export const SummaryDocument = /*#__PURE__*/ `
    query summary($start: ISO8601DateTime, $end: ISO8601DateTime) {
  summaryActivity(beginDate: $start, endDate: $end) {
    activeC1IssueCommentsContributorCount {
      ...metricStat
    }
    activeC1IssueCreateContributorCount {
      ...metricStat
    }
    activeC1PrCommentsContributorCount {
      ...metricStat
    }
    activeC1PrCreateContributorCount {
      ...metricStat
    }
    activeC2ContributorCount {
      ...metricStat
    }
    activityScore {
      ...metricStat
    }
    closedIssuesCount {
      ...metricStat
    }
    codeReviewCount {
      ...metricStat
    }
    commentFrequency {
      ...metricStat
    }
    commitFrequency {
      ...metricStat
    }
    contributorCount {
      ...metricStat
    }
    grimoireCreationDate
    orgCount {
      ...metricStat
    }
    recentReleasesCount {
      ...metricStat
    }
    updatedIssuesCount {
      ...metricStat
    }
    updatedSince {
      ...metricStat
    }
  }
  summaryCodequality(beginDate: $start, endDate: $end) {
    activeC1PrCommentsContributorCount {
      ...metricStat
    }
    activeC1PrCreateContributorCount {
      ...metricStat
    }
    activeC2ContributorCount {
      ...metricStat
    }
    codeMergeRatio {
      ...metricStat
    }
    codeMergedCount {
      ...metricStat
    }
    codeQualityGuarantee {
      ...metricStat
    }
    codeReviewRatio {
      ...metricStat
    }
    codeReviewedCount {
      ...metricStat
    }
    commitFrequency {
      ...metricStat
    }
    commitFrequencyInside {
      ...metricStat
    }
    contributorCount {
      ...metricStat
    }
    gitPrLinkedRatio {
      ...metricStat
    }
    grimoireCreationDate
    isMaintained {
      ...metricStat
    }
    linesAddedFrequency {
      ...metricStat
    }
    linesRemovedFrequency {
      ...metricStat
    }
    locFrequency {
      ...metricStat
    }
    prCommitCount {
      ...metricStat
    }
    prCommitLinkedCount {
      ...metricStat
    }
    prCount {
      ...metricStat
    }
    prIssueLinkedCount {
      ...metricStat
    }
    prIssueLinkedRatio {
      ...metricStat
    }
  }
  summaryCommunity(beginDate: $start, endDate: $end) {
    bugIssueOpenTimeAvg {
      ...metricStat
    }
    bugIssueOpenTimeMid {
      ...metricStat
    }
    closedPrsCount {
      ...metricStat
    }
    codeReviewCount {
      ...metricStat
    }
    commentFrequency {
      ...metricStat
    }
    communitySupportScore {
      ...metricStat
    }
    grimoireCreationDate
    issueFirstReponseAvg {
      ...metricStat
    }
    issueFirstReponseMid {
      ...metricStat
    }
    issueOpenTimeAvg {
      ...metricStat
    }
    issueOpenTimeMid {
      ...metricStat
    }
    prOpenTimeAvg {
      ...metricStat
    }
    prOpenTimeMid {
      ...metricStat
    }
    updatedIssuesCount {
      ...metricStat
    }
  }
  summaryGroupActivity(beginDate: $start, endDate: $end) {
    commitFrequency {
      ...metricStat
    }
    contributionLast {
      ...metricStat
    }
    contributorCount {
      ...metricStat
    }
    grimoireCreationDate
    orgCount {
      ...metricStat
    }
    organizationsActivity {
      ...metricStat
    }
  }
}
    ${MetricStatFragmentDoc}`;
export const useSummaryQuery = <TData = SummaryQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: SummaryQueryVariables,
  options?: UseQueryOptions<SummaryQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<SummaryQuery, TError, TData>(
    variables === undefined ? ['summary'] : ['summary', variables],
    fetcher<SummaryQuery, SummaryQueryVariables>(
      client,
      SummaryDocument,
      variables,
      headers
    ),
    options
  );

useSummaryQuery.getKey = (variables?: SummaryQueryVariables) =>
  variables === undefined ? ['summary'] : ['summary', variables];
useSummaryQuery.fetcher = (
  client: GraphQLClient,
  variables?: SummaryQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<SummaryQuery, SummaryQueryVariables>(
    client,
    SummaryDocument,
    variables,
    headers
  );
export const LabMetricDocument = /*#__PURE__*/ `
    query labMetric($label: String!, $level: String = "repo", $start: ISO8601DateTime, $end: ISO8601DateTime) {
  metricStarterProjectHealth(
    label: $label
    level: $level
    beginDate: $start
    endDate: $end
  ) {
    busFactor
    changeRequestClosedCountAllPeriod
    changeRequestClosedCountRecently
    changeRequestClosureRatioAllPeriod
    changeRequestClosureRatioRecently
    changeRequestCreatedCountAllPeriod
    changeRequestCreatedCountRecently
    grimoireCreationDate
    label
    level
    shortCode
    prTimeToCloseAvg
    prTimeToCloseMid
    prTimeToFirstResponseAvg
    prTimeToFirstResponseMid
    releaseFrequency
    starterProjectHealth
    type
  }
}
    `;
export const useLabMetricQuery = <TData = LabMetricQuery, TError = unknown>(
  client: GraphQLClient,
  variables: LabMetricQueryVariables,
  options?: UseQueryOptions<LabMetricQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<LabMetricQuery, TError, TData>(
    ['labMetric', variables],
    fetcher<LabMetricQuery, LabMetricQueryVariables>(
      client,
      LabMetricDocument,
      variables,
      headers
    ),
    options
  );

useLabMetricQuery.getKey = (variables: LabMetricQueryVariables) => [
  'labMetric',
  variables,
];
useLabMetricQuery.fetcher = (
  client: GraphQLClient,
  variables: LabMetricQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<LabMetricQuery, LabMetricQueryVariables>(
    client,
    LabMetricDocument,
    variables,
    headers
  );
export const CollectionHottestDocument = /*#__PURE__*/ `
    query collectionHottest($ident: String!, $limit: Int) {
  collectionHottest(ident: $ident, limit: $limit) {
    label
    level
    shortCode
    status
    updatedAt
  }
}
    `;
export const useCollectionHottestQuery = <
  TData = CollectionHottestQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: CollectionHottestQueryVariables,
  options?: UseQueryOptions<CollectionHottestQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<CollectionHottestQuery, TError, TData>(
    ['collectionHottest', variables],
    fetcher<CollectionHottestQuery, CollectionHottestQueryVariables>(
      client,
      CollectionHottestDocument,
      variables,
      headers
    ),
    options
  );

useCollectionHottestQuery.getKey = (
  variables: CollectionHottestQueryVariables
) => ['collectionHottest', variables];
useCollectionHottestQuery.fetcher = (
  client: GraphQLClient,
  variables: CollectionHottestQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<CollectionHottestQuery, CollectionHottestQueryVariables>(
    client,
    CollectionHottestDocument,
    variables,
    headers
  );
export const CollectionListDocument = /*#__PURE__*/ `
    query collectionList($ident: String!, $level: String, $page: Int, $per: Int) {
  collectionList(ident: $ident, level: $level, page: $page, per: $per) {
    page
    totalPage
    count
    items {
      backend
      language
      name
      openIssuesCount
      origin
      path
      shortCode
      metricActivity {
        activityScore
      }
    }
  }
}
    `;
export const useCollectionListQuery = <
  TData = CollectionListQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: CollectionListQueryVariables,
  options?: UseQueryOptions<CollectionListQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<CollectionListQuery, TError, TData>(
    ['collectionList', variables],
    fetcher<CollectionListQuery, CollectionListQueryVariables>(
      client,
      CollectionListDocument,
      variables,
      headers
    ),
    options
  );

useCollectionListQuery.getKey = (variables: CollectionListQueryVariables) => [
  'collectionList',
  variables,
];
useCollectionListQuery.fetcher = (
  client: GraphQLClient,
  variables: CollectionListQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<CollectionListQuery, CollectionListQueryVariables>(
    client,
    CollectionListDocument,
    variables,
    headers
  );
export const BulkOverviewDocument = /*#__PURE__*/ `
    query bulkOverview($labels: [String!]!) {
  bulkOverview(labels: $labels) {
    backend
    forksCount
    language
    name
    openIssuesCount
    path
    shortCode
    stargazersCount
    watchersCount
    metricActivity {
      activityScore
    }
  }
}
    `;
export const useBulkOverviewQuery = <
  TData = BulkOverviewQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: BulkOverviewQueryVariables,
  options?: UseQueryOptions<BulkOverviewQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<BulkOverviewQuery, TError, TData>(
    ['bulkOverview', variables],
    fetcher<BulkOverviewQuery, BulkOverviewQueryVariables>(
      client,
      BulkOverviewDocument,
      variables,
      headers
    ),
    options
  );

useBulkOverviewQuery.getKey = (variables: BulkOverviewQueryVariables) => [
  'bulkOverview',
  variables,
];
useBulkOverviewQuery.fetcher = (
  client: GraphQLClient,
  variables: BulkOverviewQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<BulkOverviewQuery, BulkOverviewQueryVariables>(
    client,
    BulkOverviewDocument,
    variables,
    headers
  );
export const TrendingDocument = /*#__PURE__*/ `
    query trending($level: String = "repo") {
  trending(level: $level) {
    shortCode
    activityScore
    fullPath
    label
    level
    name
    origin
    reposCount
  }
}
    `;
export const useTrendingQuery = <TData = TrendingQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: TrendingQueryVariables,
  options?: UseQueryOptions<TrendingQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<TrendingQuery, TError, TData>(
    variables === undefined ? ['trending'] : ['trending', variables],
    fetcher<TrendingQuery, TrendingQueryVariables>(
      client,
      TrendingDocument,
      variables,
      headers
    ),
    options
  );

useTrendingQuery.getKey = (variables?: TrendingQueryVariables) =>
  variables === undefined ? ['trending'] : ['trending', variables];
useTrendingQuery.fetcher = (
  client: GraphQLClient,
  variables?: TrendingQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<TrendingQuery, TrendingQueryVariables>(
    client,
    TrendingDocument,
    variables,
    headers
  );
export const BetaMetricOverviewDocument = /*#__PURE__*/ `
    query betaMetricOverview($id: Int!, $limit: Int) {
  betaMetricOverview(id: $id, limit: $limit) {
    projectsCount
    trends {
      path
      origin
      name
      backend
      shortCode
      betaMetricScores {
        grimoireCreationDate
        score
      }
    }
  }
}
    `;
export const useBetaMetricOverviewQuery = <
  TData = BetaMetricOverviewQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: BetaMetricOverviewQueryVariables,
  options?: UseQueryOptions<BetaMetricOverviewQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<BetaMetricOverviewQuery, TError, TData>(
    ['betaMetricOverview', variables],
    fetcher<BetaMetricOverviewQuery, BetaMetricOverviewQueryVariables>(
      client,
      BetaMetricOverviewDocument,
      variables,
      headers
    ),
    options
  );

useBetaMetricOverviewQuery.getKey = (
  variables: BetaMetricOverviewQueryVariables
) => ['betaMetricOverview', variables];
useBetaMetricOverviewQuery.fetcher = (
  client: GraphQLClient,
  variables: BetaMetricOverviewQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<BetaMetricOverviewQuery, BetaMetricOverviewQueryVariables>(
    client,
    BetaMetricOverviewDocument,
    variables,
    headers
  );
export const BetaMetricsIndexDocument = /*#__PURE__*/ `
    query betaMetricsIndex($per: Int, $page: Int) {
  betaMetricsIndex(per: $per, page: $page) {
    id
    dimensionality
    desc
    extra
    metric
  }
}
    `;
export const useBetaMetricsIndexQuery = <
  TData = BetaMetricsIndexQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables?: BetaMetricsIndexQueryVariables,
  options?: UseQueryOptions<BetaMetricsIndexQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<BetaMetricsIndexQuery, TError, TData>(
    variables === undefined
      ? ['betaMetricsIndex']
      : ['betaMetricsIndex', variables],
    fetcher<BetaMetricsIndexQuery, BetaMetricsIndexQueryVariables>(
      client,
      BetaMetricsIndexDocument,
      variables,
      headers
    ),
    options
  );

useBetaMetricsIndexQuery.getKey = (
  variables?: BetaMetricsIndexQueryVariables
) =>
  variables === undefined
    ? ['betaMetricsIndex']
    : ['betaMetricsIndex', variables];
useBetaMetricsIndexQuery.fetcher = (
  client: GraphQLClient,
  variables?: BetaMetricsIndexQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<BetaMetricsIndexQuery, BetaMetricsIndexQueryVariables>(
    client,
    BetaMetricsIndexDocument,
    variables,
    headers
  );
export const BulkShortenedLabelDocument = /*#__PURE__*/ `
    query bulkShortenedLabel($labels: [LabelRowInput!]!) {
  bulkShortenedLabel(labels: $labels) {
    label
    level
    shortCode
  }
}
    `;
export const useBulkShortenedLabelQuery = <
  TData = BulkShortenedLabelQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: BulkShortenedLabelQueryVariables,
  options?: UseQueryOptions<BulkShortenedLabelQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<BulkShortenedLabelQuery, TError, TData>(
    ['bulkShortenedLabel', variables],
    fetcher<BulkShortenedLabelQuery, BulkShortenedLabelQueryVariables>(
      client,
      BulkShortenedLabelDocument,
      variables,
      headers
    ),
    options
  );

useBulkShortenedLabelQuery.getKey = (
  variables: BulkShortenedLabelQueryVariables
) => ['bulkShortenedLabel', variables];
useBulkShortenedLabelQuery.fetcher = (
  client: GraphQLClient,
  variables: BulkShortenedLabelQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<BulkShortenedLabelQuery, BulkShortenedLabelQueryVariables>(
    client,
    BulkShortenedLabelDocument,
    variables,
    headers
  );
