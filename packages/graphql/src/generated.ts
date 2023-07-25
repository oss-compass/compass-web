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

export type MetricStat = {
  __typename?: 'MetricStat';
  /** arithmetic mean */
  mean?: Maybe<Scalars['Float']>;
  /** 50 percentile */
  median?: Maybe<Scalars['Float']>;
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
  /** Cancel subscription */
  cancelSubscription?: Maybe<CancelSubscriptionPayload>;
  /** Submit a community analysis task */
  createProjectTask?: Maybe<CreateProjectTaskPayload>;
  /** Submit a repository analysis task */
  createRepoTask?: Maybe<CreateRepoTaskPayload>;
  /** Create subscription */
  createSubscription?: Maybe<CreateSubscriptionPayload>;
  /** Destroy user */
  destroyUser?: Maybe<Scalars['Boolean']>;
  /** Modify user */
  modifyUser?: Maybe<ModifyUserPayload>;
  /** Send email verify */
  sendEmailVerify?: Maybe<SendEmailVerifyPayload>;
  /** Sign out */
  signOut?: Maybe<Scalars['Boolean']>;
  /** User unbind */
  userUnbind?: Maybe<UserUnbindPayload>;
};

export type MutationBindWechatLinkArgs = {
  input: BindWechatLinkInput;
};

export type MutationCancelSubscriptionArgs = {
  input: CancelSubscriptionInput;
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

export type MutationModifyUserArgs = {
  input: ModifyUserInput;
};

export type MutationSendEmailVerifyArgs = {
  input: SendEmailVerifyInput;
};

export type MutationUserUnbindArgs = {
  input: UserUnbindInput;
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
  /** Get group activity metrics data of compass */
  metricGroupActivity: Array<GroupActivityMetric>;
  /** Get starter project health metrics data of compass */
  metricStarterProjectHealth: Array<StarterProjectHealthMetric>;
  /** Recent update reports */
  recentUpdates: Array<ProjectCompletionRow>;
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

export type OverviewQueryVariables = Exact<{ [key: string]: never }>;

export type OverviewQuery = {
  __typename?: 'Query';
  recentUpdates: Array<{
    __typename?: 'ProjectCompletionRow';
    label?: string | null;
    level?: string | null;
    updatedAt?: any | null;
  }>;
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

export const MetricStatFragmentDoc = /*#__PURE__*/ `
    fragment metricStat on MetricStat {
  mean
  median
}
    `;
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
export const OverviewDocument = /*#__PURE__*/ `
    query overview {
  recentUpdates {
    label
    level
    updatedAt
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
