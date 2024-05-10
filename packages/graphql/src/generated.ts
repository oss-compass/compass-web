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
  ISO8601Date: any;
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
  /** image id */
  id?: InputMaybe<Scalars['Int']>;
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
  communityOrgUrl?: Maybe<Scalars['String']>;
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

export type Contribution = {
  __typename?: 'Contribution';
  contribution?: Maybe<Scalars['Int']>;
  contributionType?: Maybe<Scalars['String']>;
};

export type Contributor = {
  __typename?: 'Contributor';
  name?: Maybe<Scalars['String']>;
  origin?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type ContributorDetail = {
  __typename?: 'ContributorDetail';
  contribution?: Maybe<Scalars['Int']>;
  contributionTypeList?: Maybe<Array<Contribution>>;
  contributionWithoutObserve?: Maybe<Scalars['Int']>;
  contributor?: Maybe<Scalars['String']>;
  ecologicalType?: Maybe<Scalars['String']>;
  isBot?: Maybe<Scalars['Boolean']>;
  mileageType?: Maybe<Scalars['String']>;
  organization?: Maybe<Scalars['String']>;
};

export type ContributorDetailOverview = {
  __typename?: 'ContributorDetailOverview';
  contributorAllCount?: Maybe<Scalars['Float']>;
  highestContributionContributor?: Maybe<Contributor>;
  highestContributionOrganization?: Maybe<Contributor>;
  orgAllCount?: Maybe<Scalars['Float']>;
};

export type ContributorDetailPage = {
  __typename?: 'ContributorDetailPage';
  count?: Maybe<Scalars['Int']>;
  items: Array<ContributorDetail>;
  /** contributors origin */
  origin: Scalars['String'];
  page?: Maybe<Scalars['Int']>;
  totalPage?: Maybe<Scalars['Int']>;
};

export type ContributorOrg = {
  __typename?: 'ContributorOrg';
  /** time of begin of service by the organization */
  firstDate?: Maybe<Scalars['ISO8601DateTime']>;
  /** time of end of service by the organization */
  lastDate?: Maybe<Scalars['ISO8601DateTime']>;
  /** organization's name */
  orgName?: Maybe<Scalars['String']>;
  /** platform type of the organization */
  platformType?: Maybe<Scalars['String']>;
};

export type ContributorOrgInput = {
  /** time of begin of service by the organization */
  firstDate: Scalars['ISO8601Date'];
  /** time of end of service by the organization */
  lastDate: Scalars['ISO8601Date'];
  /** organization's name */
  orgName: Scalars['String'];
};

export type ContributorTopOverview = {
  __typename?: 'ContributorTopOverview';
  overviewName?: Maybe<Scalars['String']>;
  subTypeName?: Maybe<Scalars['String']>;
  subTypePercentage?: Maybe<Scalars['Float']>;
  topContributorDistribution?: Maybe<Array<Distribution>>;
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
  /** project logo url */
  projectLogoUrl?: InputMaybe<Scalars['String']>;
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
  /** short code of metric model object label */
  shortCode?: Maybe<Scalars['String']>;
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

export type Diagram = {
  __typename?: 'Diagram';
  /** metric model creatiton time */
  dates?: Maybe<Array<Maybe<Scalars['ISO8601DateTime']>>>;
  /** Tab ident for this diagram */
  tabIdent?: Maybe<Scalars['String']>;
  /** Type of this diagram, default: `line` */
  type?: Maybe<Scalars['String']>;
  /** y-axis values for this diagram */
  values?: Maybe<Array<Maybe<Scalars['Float']>>>;
};

export type Distribution = {
  __typename?: 'Distribution';
  subBelong?: Maybe<Scalars['String']>;
  subCount?: Maybe<Scalars['Int']>;
  subName?: Maybe<Scalars['String']>;
  subRatio?: Maybe<Scalars['Float']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type DomainPersonaMetric = {
  __typename?: 'DomainPersonaMetric';
  /** activity code contribution per person */
  activityCodeContributionPerPerson?: Maybe<Scalars['Float']>;
  /** activity code contributor count */
  activityCodeContributorCount?: Maybe<Scalars['Float']>;
  /** activity issue contribution per person */
  activityIssueContributionPerPerson?: Maybe<Scalars['Float']>;
  /** activity issue contributor count */
  activityIssueContributorCount?: Maybe<Scalars['Float']>;
  /** activity observation contribution per person */
  activityObservationContributionPerPerson?: Maybe<Scalars['Float']>;
  /** activity observation contributor count */
  activityObservationContributorCount?: Maybe<Scalars['Float']>;
  /** role persona score */
  domainPersonaScore?: Maybe<Scalars['Float']>;
  /** metric model creatiton time */
  grimoireCreationDate?: Maybe<Scalars['ISO8601DateTime']>;
  /** metric model object identification */
  label?: Maybe<Scalars['String']>;
  /** metric model object level */
  level?: Maybe<Scalars['String']>;
  /** metric model object short code */
  shortCode?: Maybe<Scalars['String']>;
  /** metric scores for repositories type, only for community (software-artifact/governance) */
  type?: Maybe<Scalars['String']>;
};

export type Error = {
  __typename?: 'Error';
  /** 错误信息 */
  message?: Maybe<Scalars['String']>;
  /** 错误路径 */
  path?: Maybe<Array<Scalars['String']>>;
};

export type FilterOptionInput = {
  /** filter option type */
  type: Scalars['String'];
  /** filter option value */
  values: Array<Scalars['String']>;
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
  id: Scalars['Int'];
  url: Scalars['String'];
};

export type InvitationPage = {
  __typename?: 'InvitationPage';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<LabInvitation>>;
  page?: Maybe<Scalars['Int']>;
  totalPage?: Maybe<Scalars['Int']>;
};

export type IssueDetail = {
  __typename?: 'IssueDetail';
  assigneeLogin?: Maybe<Scalars['String']>;
  closedAt?: Maybe<Scalars['ISO8601DateTime']>;
  createdAt?: Maybe<Scalars['ISO8601DateTime']>;
  idInRepo?: Maybe<Scalars['Int']>;
  labels?: Maybe<Array<Scalars['String']>>;
  numOfCommentsWithoutBot?: Maybe<Scalars['Int']>;
  repository?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  timeToCloseDays?: Maybe<Scalars['Float']>;
  timeToFirstAttentionWithoutBot?: Maybe<Scalars['Float']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  userLogin?: Maybe<Scalars['String']>;
};

export type IssueDetailOverview = {
  __typename?: 'IssueDetailOverview';
  issueCommentDistribution?: Maybe<Array<Distribution>>;
  issueCommentFrequencyMean?: Maybe<Scalars['Float']>;
  issueCompletionCount?: Maybe<Scalars['Int']>;
  issueCompletionRatio?: Maybe<Scalars['Float']>;
  issueCount?: Maybe<Scalars['Int']>;
  issueStateDistribution?: Maybe<Array<Distribution>>;
  issueUnresponsiveCount?: Maybe<Scalars['Int']>;
  issueUnresponsiveRatio?: Maybe<Scalars['Float']>;
};

export type IssueDetailPage = {
  __typename?: 'IssueDetailPage';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<IssueDetail>>;
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

/** Autogenerated input type of ManageUserOrgs */
export type ManageUserOrgsInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** name of the contributor */
  contributor: Scalars['String'];
  /** repo or community label */
  label: Scalars['String'];
  /** repo or community level */
  level?: InputMaybe<Scalars['String']>;
  /** contributor organizations */
  organizations: Array<ContributorOrgInput>;
  /** platform of the organization */
  platform: Scalars['String'];
};

/** Autogenerated return type of ManageUserOrgs */
export type ManageUserOrgsPayload = {
  __typename?: 'ManageUserOrgsPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
  prUrl?: Maybe<Scalars['String']>;
  status: Scalars['String'];
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

export type MilestonePersonaMetric = {
  __typename?: 'MilestonePersonaMetric';
  /** casual contributors per person */
  activityCasualContributionPerPerson?: Maybe<Scalars['Float']>;
  /** number of casual contributors */
  activityCasualContributorCount?: Maybe<Scalars['Float']>;
  /** core contributors per person */
  activityCoreContributionPerPerson?: Maybe<Scalars['Float']>;
  /** number of core contributors */
  activityCoreContributorCount?: Maybe<Scalars['Float']>;
  /** regular contributors per person */
  activityRegularContributionPerPerson?: Maybe<Scalars['Float']>;
  /** number of regular contributors */
  activityRegularContributorCount?: Maybe<Scalars['Float']>;
  /** metric model creatiton time */
  grimoireCreationDate?: Maybe<Scalars['ISO8601DateTime']>;
  /** metric model object identification */
  label?: Maybe<Scalars['String']>;
  /** metric model object level */
  level?: Maybe<Scalars['String']>;
  /** milestone persona score */
  milestonePersonaScore?: Maybe<Scalars['Float']>;
  /** metric model object short code */
  shortCode?: Maybe<Scalars['String']>;
  /** metric scores for repositories type, only for community (software-artifact/governance) */
  type?: Maybe<Scalars['String']>;
};

export type Model = {
  __typename?: 'Model';
  /** dimension of metric model */
  dimension?: Maybe<Scalars['String']>;
  /** metric model create or update time */
  grimoireCreationDate?: Maybe<Scalars['ISO8601DateTime']>;
  /** metric model ident */
  ident: Scalars['String'];
  /** metric model object identification */
  label?: Maybe<Scalars['String']>;
  /** metric model object level */
  level?: Maybe<Scalars['String']>;
  /** metric model main score */
  mainScore?: Maybe<Scalars['Float']>;
  /** repositories count */
  reposCount?: Maybe<Scalars['Float']>;
  /** scope of metric model */
  scope?: Maybe<Scalars['String']>;
  /** metric model object short code */
  shortCode?: Maybe<Scalars['String']>;
  /** metric model transformed score */
  transformedScore?: Maybe<Scalars['Float']>;
  /** metric scores for repositories type, only for community (software-artifact/governance) */
  type?: Maybe<Scalars['String']>;
  /** metric model update time */
  updatedAt?: Maybe<Scalars['ISO8601DateTime']>;
};

export type ModelComment = {
  __typename?: 'ModelComment';
  content: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['Int'];
  images?: Maybe<Array<Image>>;
  metric?: Maybe<ModelMetric>;
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
  defaultVersion?: Maybe<ModelVersion>;
  dimension: Scalars['Int'];
  id: Scalars['Int'];
  isGeneral: Scalars['Boolean'];
  isPublic: Scalars['Boolean'];
  /** Details of the 1000 latest updates */
  latestVersions?: Maybe<Array<ModelVersion>>;
  name: Scalars['String'];
  permissions?: Maybe<Permission>;
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

export type ModelPublicOverview = {
  __typename?: 'ModelPublicOverview';
  dataset?: Maybe<Dataset>;
  dimension?: Maybe<Scalars['Int']>;
  modelId?: Maybe<Scalars['Int']>;
  modelName?: Maybe<Scalars['String']>;
  reports?: Maybe<Array<SimpleReport>>;
  version?: Maybe<Scalars['String']>;
  versionId?: Maybe<Scalars['Int']>;
};

export type ModelPublicPage = {
  __typename?: 'ModelPublicPage';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<ModelPublicOverview>>;
  page?: Maybe<Scalars['Int']>;
  totalPage?: Maybe<Scalars['Int']>;
};

export type ModelVersion = {
  __typename?: 'ModelVersion';
  algorithm?: Maybe<Algorithm>;
  dataset: Dataset;
  id: Scalars['Int'];
  metrics: Array<ModelMetric>;
  triggerStatus?: Maybe<Scalars['String']>;
  triggerUpdatedAt?: Maybe<Scalars['ISO8601DateTime']>;
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

/** Autogenerated input type of ModifyUserOrgs */
export type ModifyUserOrgsInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** contributor organizations */
  organizations: Array<ContributorOrgInput>;
  /** platform of the organization */
  platform: Scalars['String'];
};

/** Autogenerated return type of ModifyUserOrgs */
export type ModifyUserOrgsPayload = {
  __typename?: 'ModifyUserOrgsPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
  status: Scalars['String'];
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
  /** Manage user organizations */
  manageUserOrgs?: Maybe<ManageUserOrgsPayload>;
  /** Modify user */
  modifyUser?: Maybe<ModifyUserPayload>;
  /** Modify user organizations */
  modifyUserOrgs?: Maybe<ModifyUserOrgsPayload>;
  /** Send email verify */
  sendEmailVerify?: Maybe<SendEmailVerifyPayload>;
  /** Send member invitation */
  sendMemberInvite?: Maybe<SendMemberInvitePayload>;
  /** Sign out */
  signOut?: Maybe<Scalars['Boolean']>;
  /** Trigger the analysis of a Lab model version */
  triggerLabModelVersion?: Maybe<TriggerLabModelVersionPayload>;
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

export type MutationManageUserOrgsArgs = {
  input: ManageUserOrgsInput;
};

export type MutationModifyUserArgs = {
  input: ModifyUserInput;
};

export type MutationModifyUserOrgsArgs = {
  input: ModifyUserOrgsInput;
};

export type MutationSendEmailVerifyArgs = {
  input: SendEmailVerifyInput;
};

export type MutationSendMemberInviteArgs = {
  input: SendMemberInviteInput;
};

export type MutationTriggerLabModelVersionArgs = {
  input: TriggerLabModelVersionInput;
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

export type OrgCompletionRow = {
  __typename?: 'OrgCompletionRow';
  /** organization name */
  orgName?: Maybe<Scalars['String']>;
};

export type Panel = {
  __typename?: 'Panel';
  /** specific fields and chart types for metric data */
  diagrams?: Maybe<Array<Diagram>>;
  /** panel corresponding metric data */
  metric?: Maybe<ModelMetric>;
};

export type Permission = {
  __typename?: 'Permission';
  canDestroy: Scalars['Boolean'];
  canExecute: Scalars['Boolean'];
  canRead: Scalars['Boolean'];
  canUpdate: Scalars['Boolean'];
};

export type ProjectCompletionRow = {
  __typename?: 'ProjectCompletionRow';
  /** second collections of this label */
  collections?: Maybe<Array<Scalars['String']>>;
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

export type PullDetail = {
  __typename?: 'PullDetail';
  closedAt?: Maybe<Scalars['ISO8601DateTime']>;
  createdAt?: Maybe<Scalars['ISO8601DateTime']>;
  idInRepo?: Maybe<Scalars['Int']>;
  labels?: Maybe<Array<Scalars['String']>>;
  mergeAuthorLogin?: Maybe<Scalars['String']>;
  numReviewComments?: Maybe<Scalars['Int']>;
  repository?: Maybe<Scalars['String']>;
  reviewersLogin?: Maybe<Array<Scalars['String']>>;
  state?: Maybe<Scalars['String']>;
  timeToCloseDays?: Maybe<Scalars['Float']>;
  timeToFirstAttentionWithoutBot?: Maybe<Scalars['Float']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  userLogin?: Maybe<Scalars['String']>;
};

export type PullDetailOverview = {
  __typename?: 'PullDetailOverview';
  commitCount?: Maybe<Scalars['Int']>;
  pullCommentDistribution?: Maybe<Array<Distribution>>;
  pullCompletionCount?: Maybe<Scalars['Int']>;
  pullCompletionRatio?: Maybe<Scalars['Float']>;
  pullCount?: Maybe<Scalars['Int']>;
  pullStateDistribution?: Maybe<Array<Distribution>>;
  pullUnresponsiveCount?: Maybe<Scalars['Int']>;
  pullUnresponsiveRatio?: Maybe<Scalars['Float']>;
};

export type PullDetailPage = {
  __typename?: 'PullDetailPage';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<PullDetail>>;
  page?: Maybe<Scalars['Int']>;
  totalPage?: Maybe<Scalars['Int']>;
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
  /** Get repos list of a community */
  communityRepos: RepoPage;
  /** Get contributors detail list of a repo or community */
  contributorsDetailList: ContributorDetailPage;
  /** Get overview data of a contributor detail */
  contributorsDetailOverview: ContributorDetailOverview;
  currentUser?: Maybe<User>;
  /** Get custom lab model analysis status (pending/progress/success/error/canceled/unsumbit) */
  customAnalysisStatus: Scalars['String'];
  /** Fuzzy search dataset by keyword */
  datasetFuzzySearch?: Maybe<Array<DatasetCompletionRow>>;
  /** Get data of Compass Collections */
  datasetOverview?: Maybe<Array<Scalars['String']>>;
  /** Get contributors overview by ecological type */
  ecoContributorsOverview: Array<ContributorTopOverview>;
  /** Fuzzy search project by keyword */
  fuzzySearch: Array<ProjectCompletionRow>;
  /** Get invitations data of a lab model */
  invitationOverview?: Maybe<InvitationPage>;
  /** Get issues detail list of a repo or community */
  issuesDetailList: IssueDetailPage;
  /** Get overview data of a issue detail */
  issuesDetailOverview: IssueDetailOverview;
  /** Get comment detail data with comment id */
  labModelCommentDetail?: Maybe<ModelComment>;
  /** Get comments data of a lab model */
  labModelComments?: Maybe<ModelCommentPage>;
  /** Get detail data of a lab model */
  labModelDetail?: Maybe<ModelDetail>;
  /** Get public lab model data of OSS Compass */
  labModelPublicOverview?: Maybe<ModelPublicPage>;
  /** Get detail data of a lab model version */
  labModelVersion?: Maybe<ModelVersion>;
  /** Get thumbnail data of a lab model version reports */
  labModelVersionReportDetail?: Maybe<Report>;
  /** Get thumbnail data of a lab model version reports */
  labModelVersionReportList?: Maybe<Array<SimpleReport>>;
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
  /** Get domain persona metrics */
  metricDomainPersona: Array<DomainPersonaMetric>;
  /** Get group activity metrics data of compass */
  metricGroupActivity: Array<GroupActivityMetric>;
  /** Get milestone persona metrics */
  metricMilestonePersona: Array<MilestonePersonaMetric>;
  /** Metric models graph */
  metricModelsOverview: Array<Model>;
  /** Get role persona metrics */
  metricRolePersona: Array<RolePersonaMetric>;
  /** Get overview data of metrics set on compass lab */
  metricSetOverview?: Maybe<Array<ModelMetric>>;
  /** Get my member permissions of a lab model */
  myMemberPermission?: Maybe<Permission>;
  /** Get detail data of my lab models */
  myModels?: Maybe<MyModels>;
  /** Get organization contributors distribution */
  orgContributionDistribution: Array<ContributorTopOverview>;
  /** Get organization contributors distribution */
  orgContributorsDistribution: Array<ContributorTopOverview>;
  /** Get organization contributors overview */
  orgContributorsOverview: Array<ContributorTopOverview>;
  /** Fuzzy search organization by keyword */
  orgFuzzySearch: Array<OrgCompletionRow>;
  /** Get overview data of a repo */
  pullsDetailList: PullDetailPage;
  /** Get overview data of a pull detail */
  pullsDetailOverview: PullDetailOverview;
  /** Search for community where specifical repos are included */
  repoBelongsTo: Array<ProjectCompletionRow>;
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
  /** Check if the data range is valid */
  verifyDetailDataRange: ValidDataRange;
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
  keyword?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
  sortOpts?: InputMaybe<Array<SortOptionInput>>;
};

export type QueryCommunityOverviewArgs = {
  label: Scalars['String'];
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
};

export type QueryCommunityReposArgs = {
  label: Scalars['String'];
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
};

export type QueryContributorsDetailListArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  filterOpts?: InputMaybe<Array<FilterOptionInput>>;
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
  sortOpts?: InputMaybe<Array<SortOptionInput>>;
};

export type QueryContributorsDetailOverviewArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
};

export type QueryCustomAnalysisStatusArgs = {
  modelId: Scalars['Int'];
  versionId: Scalars['Int'];
};

export type QueryDatasetFuzzySearchArgs = {
  keyword: Scalars['String'];
};

export type QueryDatasetOverviewArgs = {
  firstIdent?: InputMaybe<Scalars['String']>;
  secondIdent?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type QueryEcoContributorsOverviewArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  filterOpts?: InputMaybe<Array<FilterOptionInput>>;
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
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

export type QueryIssuesDetailListArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  filterOpts?: InputMaybe<Array<FilterOptionInput>>;
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
  sortOpts?: InputMaybe<Array<SortOptionInput>>;
};

export type QueryIssuesDetailOverviewArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
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
  modelId: Scalars['Int'];
};

export type QueryLabModelPublicOverviewArgs = {
  direction?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
};

export type QueryLabModelVersionArgs = {
  modelId: Scalars['Int'];
  versionId: Scalars['Int'];
};

export type QueryLabModelVersionReportDetailArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  label?: InputMaybe<Scalars['String']>;
  modelId: Scalars['Int'];
  shortCode?: InputMaybe<Scalars['String']>;
  versionId: Scalars['Int'];
};

export type QueryLabModelVersionReportListArgs = {
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
  repoType?: InputMaybe<Scalars['String']>;
};

export type QueryMetricCodequalityArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  repoType?: InputMaybe<Scalars['String']>;
};

export type QueryMetricCommunityArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  repoType?: InputMaybe<Scalars['String']>;
};

export type QueryMetricDomainPersonaArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  repoType?: InputMaybe<Scalars['String']>;
};

export type QueryMetricGroupActivityArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  repoType?: InputMaybe<Scalars['String']>;
};

export type QueryMetricMilestonePersonaArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  repoType?: InputMaybe<Scalars['String']>;
};

export type QueryMetricModelsOverviewArgs = {
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  repoType?: InputMaybe<Scalars['String']>;
};

export type QueryMetricRolePersonaArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  repoType?: InputMaybe<Scalars['String']>;
};

export type QueryMyMemberPermissionArgs = {
  modelId?: InputMaybe<Scalars['Int']>;
};

export type QueryMyModelsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
};

export type QueryOrgContributionDistributionArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  filterOpts?: InputMaybe<Array<FilterOptionInput>>;
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
};

export type QueryOrgContributorsDistributionArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  filterOpts?: InputMaybe<Array<FilterOptionInput>>;
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
};

export type QueryOrgContributorsOverviewArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  filterOpts?: InputMaybe<Array<FilterOptionInput>>;
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
};

export type QueryOrgFuzzySearchArgs = {
  keyword: Scalars['String'];
};

export type QueryPullsDetailListArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  filterOpts?: InputMaybe<Array<FilterOptionInput>>;
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
  sortOpts?: InputMaybe<Array<SortOptionInput>>;
};

export type QueryPullsDetailOverviewArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
};

export type QueryRepoBelongsToArgs = {
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

export type QueryVerifyDetailDataRangeArgs = {
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  label?: InputMaybe<Scalars['String']>;
  shortCode?: InputMaybe<Scalars['String']>;
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

export type RepoPage = {
  __typename?: 'RepoPage';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<SubRepo>>;
  page?: Maybe<Scalars['Int']>;
  totalPage?: Maybe<Scalars['Int']>;
};

export type Report = {
  __typename?: 'Report';
  /** metric model object identification */
  label?: Maybe<Scalars['String']>;
  /** metric model object level */
  level?: Maybe<Scalars['String']>;
  /** main score diagram for metric model */
  mainScore?: Maybe<Diagram>;
  /** metric panels data of lab model */
  panels?: Maybe<Array<Panel>>;
  /** metric model object short code */
  shortCode?: Maybe<Scalars['String']>;
  /** metric scores for repositories type, only for community (software-artifact/governance) */
  type?: Maybe<Scalars['String']>;
};

export type RolePersonaMetric = {
  __typename?: 'RolePersonaMetric';
  /** activity individual contribution per person */
  activityIndividualContributionPerPerson?: Maybe<Scalars['Float']>;
  /** activity individual contributor count */
  activityIndividualContributorCount?: Maybe<Scalars['Float']>;
  /** activity organization contribution per person */
  activityOrganizationContributionPerPerson?: Maybe<Scalars['Float']>;
  /** activity organization contributor count */
  activityOrganizationContributorCount?: Maybe<Scalars['Float']>;
  /** metric model creatiton time */
  grimoireCreationDate?: Maybe<Scalars['ISO8601DateTime']>;
  /** metric model object identification */
  label?: Maybe<Scalars['String']>;
  /** metric model object level */
  level?: Maybe<Scalars['String']>;
  /** role persona score */
  rolePersonaScore?: Maybe<Scalars['Float']>;
  /** metric model object short code */
  shortCode?: Maybe<Scalars['String']>;
  /** metric scores for repositories type, only for community (software-artifact/governance) */
  type?: Maybe<Scalars['String']>;
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

export type SimpleReport = {
  __typename?: 'SimpleReport';
  /** metric model object identification */
  label?: Maybe<Scalars['String']>;
  /** metric model object level */
  level?: Maybe<Scalars['String']>;
  /** main score diagram for metric model */
  mainScore?: Maybe<Diagram>;
  /** metric model object short code */
  shortCode?: Maybe<Scalars['String']>;
  /** metric scores for repositories type, only for community (software-artifact/governance) */
  type?: Maybe<Scalars['String']>;
};

export type SimpleUser = {
  __typename?: 'SimpleUser';
  avatarUrl?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type SortOptionInput = {
  /** sort direction, optional: desc, asc, default: desc */
  direction: Scalars['String'];
  /** sort type value */
  type: Scalars['String'];
};

export type SubRepo = {
  __typename?: 'SubRepo';
  label?: Maybe<Scalars['String']>;
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
  /** second collections of this label */
  collections?: Maybe<Array<Scalars['String']>>;
  /** repo or community full_path, if community: equals name */
  fullPath?: Maybe<Scalars['String']>;
  /** repo or community label */
  label?: Maybe<Scalars['String']>;
  /** repo or community level */
  level?: Maybe<Scalars['String']>;
  /** repo or community logo_url */
  logoUrl?: Maybe<Scalars['String']>;
  /** repo or community name */
  name?: Maybe<Scalars['String']>;
  /** repo or community origin (gitee/github/combine) */
  origin?: Maybe<Scalars['String']>;
  /** repositories count */
  reposCount?: Maybe<Scalars['Float']>;
  /** repo or community short code */
  shortCode?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of TriggerLabModelVersion */
export type TriggerLabModelVersionInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** lab model id */
  modelId: Scalars['Int'];
  /** lab model version id */
  versionId: Scalars['Int'];
};

/** Autogenerated return type of TriggerLabModelVersion */
export type TriggerLabModelVersionPayload = {
  __typename?: 'TriggerLabModelVersionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Errors encountered during execution of the mutation. */
  errors?: Maybe<Array<Error>>;
  message?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

/** Autogenerated input type of UpdateLabModelComment */
export type UpdateLabModelCommentInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** lab model comment id */
  commentId: Scalars['Int'];
  /** comment content */
  content?: InputMaybe<Scalars['String']>;
  /** related images under this comment */
  images?: InputMaybe<Array<Base64ImageInput>>;
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
  /** update the default version with pass version id */
  defaultVersionId?: InputMaybe<Scalars['Int']>;
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
  contributingOrgs?: Maybe<Array<ContributorOrg>>;
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  id: Scalars['Int'];
  language: Scalars['String'];
  loginBinds?: Maybe<Array<LoginBind>>;
  name: Scalars['String'];
  roleLevel: Scalars['Int'];
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

export type ValidDataRange = {
  __typename?: 'ValidDataRange';
  /** metric model object identification */
  label?: Maybe<Scalars['String']>;
  /** whether current is a repo admin for this label */
  labelAdmin?: Maybe<Scalars['Boolean']>;
  /** metric model object level (project or repo) */
  level?: Maybe<Scalars['String']>;
  /** max valid date */
  max?: Maybe<Scalars['ISO8601DateTime']>;
  /** min valid date */
  min?: Maybe<Scalars['ISO8601DateTime']>;
  /** metric model object short code */
  shortCode?: Maybe<Scalars['String']>;
  /** whether it is a valid data range */
  status?: Maybe<Scalars['Boolean']>;
};

export type CommentFragment = {
  __typename?: 'ModelComment';
  content: string;
  createdAt: any;
  id: number;
  updatedAt: any;
  metric?: {
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
  } | null;
  images?: Array<{
    __typename?: 'Image';
    filename: string;
    url: string;
    id: number;
  }> | null;
  model: {
    __typename?: 'ModelDetail';
    dimension: number;
    id: number;
    isGeneral: boolean;
    isPublic: boolean;
    name: string;
    triggerRemainingCount: number;
    userId: number;
  };
  parent?: {
    __typename?: 'ModelComment';
    content: string;
    createdAt: any;
    id: number;
    updatedAt: any;
    images?: Array<{
      __typename?: 'Image';
      filename: string;
      url: string;
      id: number;
    }> | null;
  } | null;
  replies?: Array<{
    __typename?: 'ModelComment';
    content: string;
    createdAt: any;
    id: number;
    updatedAt: any;
    images?: Array<{
      __typename?: 'Image';
      filename: string;
      url: string;
      id: number;
    }> | null;
    user: {
      __typename?: 'SimpleUser';
      avatarUrl?: string | null;
      id: number;
      name: string;
    };
    replies?: Array<{
      __typename?: 'ModelComment';
      content: string;
      createdAt: any;
      id: number;
      updatedAt: any;
      images?: Array<{
        __typename?: 'Image';
        id: number;
        filename: string;
        url: string;
      }> | null;
    }> | null;
    model: {
      __typename?: 'ModelDetail';
      dimension: number;
      id: number;
      isGeneral: boolean;
      isPublic: boolean;
      name: string;
      triggerRemainingCount: number;
      userId: number;
    };
  }> | null;
  user: {
    __typename?: 'SimpleUser';
    avatarUrl?: string | null;
    id: number;
    name: string;
  };
};

export type ReplyFragment = {
  __typename?: 'ModelComment';
  content: string;
  createdAt: any;
  id: number;
  updatedAt: any;
  images?: Array<{
    __typename?: 'Image';
    filename: string;
    url: string;
    id: number;
  }> | null;
  user: {
    __typename?: 'SimpleUser';
    avatarUrl?: string | null;
    id: number;
    name: string;
  };
  replies?: Array<{
    __typename?: 'ModelComment';
    content: string;
    createdAt: any;
    id: number;
    updatedAt: any;
    images?: Array<{
      __typename?: 'Image';
      id: number;
      filename: string;
      url: string;
    }> | null;
  }> | null;
  model: {
    __typename?: 'ModelDetail';
    dimension: number;
    id: number;
    isGeneral: boolean;
    isPublic: boolean;
    name: string;
    triggerRemainingCount: number;
    userId: number;
  };
};

export type ParentCommentFragment = {
  __typename?: 'ModelComment';
  content: string;
  createdAt: any;
  id: number;
  updatedAt: any;
  images?: Array<{
    __typename?: 'Image';
    filename: string;
    url: string;
    id: number;
  }> | null;
};

export type ModelDetailFragment = {
  __typename?: 'ModelDetail';
  dimension: number;
  id: number;
  isGeneral: boolean;
  isPublic: boolean;
  name: string;
  triggerRemainingCount: number;
  userId: number;
};

export type UserFragment = {
  __typename?: 'SimpleUser';
  avatarUrl?: string | null;
  id: number;
  name: string;
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
    shortCode?: string | null;
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

export type ModelVersionFragment = {
  __typename?: 'ModelVersion';
  id: number;
  version?: string | null;
  algorithm?: { __typename?: 'Algorithm'; ident: string; name: string } | null;
  dataset: {
    __typename?: 'Dataset';
    ident?: string | null;
    name?: string | null;
    items?: Array<{
      __typename?: 'DatasetCompletionRow';
      firstIdent?: string | null;
      label?: string | null;
      shortCode?: string | null;
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

export type DatasetFuzzySearchQueryVariables = Exact<{
  keyword: Scalars['String'];
}>;

export type DatasetFuzzySearchQuery = {
  __typename?: 'Query';
  datasetFuzzySearch?: Array<{
    __typename?: 'DatasetCompletionRow';
    firstIdent?: string | null;
    label?: string | null;
    level?: string | null;
    secondIdent?: string | null;
    shortCode?: string | null;
  }> | null;
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
        triggerStatus?: string | null;
        triggerUpdatedAt?: any | null;
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
            shortCode?: string | null;
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
      defaultVersion?: {
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
            shortCode?: string | null;
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
      permissions?: {
        __typename?: 'Permission';
        canDestroy: boolean;
        canExecute: boolean;
        canRead: boolean;
        canUpdate: boolean;
      } | null;
    }> | null;
  } | null;
};

export type LabModelDetailQueryVariables = Exact<{
  modelId: Scalars['Int'];
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
    }> | null;
    defaultVersion?: {
      __typename?: 'ModelVersion';
      id: number;
      version?: string | null;
    } | null;
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
    triggerStatus?: string | null;
    triggerUpdatedAt?: any | null;
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
        shortCode?: string | null;
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

export type LabModelCommentsQueryVariables = Exact<{
  direction?: InputMaybe<Scalars['String']>;
  modelId: Scalars['Int'];
  modelMetricId?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  parentId?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  versionId?: InputMaybe<Scalars['Int']>;
}>;

export type LabModelCommentsQuery = {
  __typename?: 'Query';
  labModelComments?: {
    __typename?: 'ModelCommentPage';
    count?: number | null;
    page?: number | null;
    totalPage?: number | null;
    items?: Array<{
      __typename?: 'ModelComment';
      content: string;
      createdAt: any;
      id: number;
      updatedAt: any;
      metric?: {
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
      } | null;
      images?: Array<{
        __typename?: 'Image';
        filename: string;
        url: string;
        id: number;
      }> | null;
      model: {
        __typename?: 'ModelDetail';
        dimension: number;
        id: number;
        isGeneral: boolean;
        isPublic: boolean;
        name: string;
        triggerRemainingCount: number;
        userId: number;
      };
      parent?: {
        __typename?: 'ModelComment';
        content: string;
        createdAt: any;
        id: number;
        updatedAt: any;
        images?: Array<{
          __typename?: 'Image';
          filename: string;
          url: string;
          id: number;
        }> | null;
      } | null;
      replies?: Array<{
        __typename?: 'ModelComment';
        content: string;
        createdAt: any;
        id: number;
        updatedAt: any;
        images?: Array<{
          __typename?: 'Image';
          filename: string;
          url: string;
          id: number;
        }> | null;
        user: {
          __typename?: 'SimpleUser';
          avatarUrl?: string | null;
          id: number;
          name: string;
        };
        replies?: Array<{
          __typename?: 'ModelComment';
          content: string;
          createdAt: any;
          id: number;
          updatedAt: any;
          images?: Array<{
            __typename?: 'Image';
            id: number;
            filename: string;
            url: string;
          }> | null;
        }> | null;
        model: {
          __typename?: 'ModelDetail';
          dimension: number;
          id: number;
          isGeneral: boolean;
          isPublic: boolean;
          name: string;
          triggerRemainingCount: number;
          userId: number;
        };
      }> | null;
      user: {
        __typename?: 'SimpleUser';
        avatarUrl?: string | null;
        id: number;
        name: string;
      };
    }> | null;
  } | null;
};

export type LabModelCommentDetailQueryVariables = Exact<{
  modelId: Scalars['Int'];
  commentId: Scalars['Int'];
}>;

export type LabModelCommentDetailQuery = {
  __typename?: 'Query';
  labModelCommentDetail?: {
    __typename?: 'ModelComment';
    content: string;
    createdAt: any;
    id: number;
    updatedAt: any;
    images?: Array<{
      __typename?: 'Image';
      filename: string;
      url: string;
      id: number;
    }> | null;
    model: {
      __typename?: 'ModelDetail';
      dimension: number;
      id: number;
      isGeneral: boolean;
      isPublic: boolean;
      name: string;
      triggerRemainingCount: number;
      userId: number;
    };
    parent?: {
      __typename?: 'ModelComment';
      content: string;
      createdAt: any;
      id: number;
      updatedAt: any;
      metric?: {
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
      } | null;
      images?: Array<{
        __typename?: 'Image';
        filename: string;
        url: string;
        id: number;
      }> | null;
      model: {
        __typename?: 'ModelDetail';
        dimension: number;
        id: number;
        isGeneral: boolean;
        isPublic: boolean;
        name: string;
        triggerRemainingCount: number;
        userId: number;
      };
      parent?: {
        __typename?: 'ModelComment';
        content: string;
        createdAt: any;
        id: number;
        updatedAt: any;
        images?: Array<{
          __typename?: 'Image';
          filename: string;
          url: string;
          id: number;
        }> | null;
      } | null;
      replies?: Array<{
        __typename?: 'ModelComment';
        content: string;
        createdAt: any;
        id: number;
        updatedAt: any;
        images?: Array<{
          __typename?: 'Image';
          filename: string;
          url: string;
          id: number;
        }> | null;
        user: {
          __typename?: 'SimpleUser';
          avatarUrl?: string | null;
          id: number;
          name: string;
        };
        replies?: Array<{
          __typename?: 'ModelComment';
          content: string;
          createdAt: any;
          id: number;
          updatedAt: any;
          images?: Array<{
            __typename?: 'Image';
            id: number;
            filename: string;
            url: string;
          }> | null;
        }> | null;
        model: {
          __typename?: 'ModelDetail';
          dimension: number;
          id: number;
          isGeneral: boolean;
          isPublic: boolean;
          name: string;
          triggerRemainingCount: number;
          userId: number;
        };
      }> | null;
      user: {
        __typename?: 'SimpleUser';
        avatarUrl?: string | null;
        id: number;
        name: string;
      };
    } | null;
    replies?: Array<{
      __typename?: 'ModelComment';
      content: string;
      createdAt: any;
      id: number;
      updatedAt: any;
      metric?: {
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
      } | null;
      images?: Array<{
        __typename?: 'Image';
        filename: string;
        url: string;
        id: number;
      }> | null;
      model: {
        __typename?: 'ModelDetail';
        dimension: number;
        id: number;
        isGeneral: boolean;
        isPublic: boolean;
        name: string;
        triggerRemainingCount: number;
        userId: number;
      };
      parent?: {
        __typename?: 'ModelComment';
        content: string;
        createdAt: any;
        id: number;
        updatedAt: any;
        images?: Array<{
          __typename?: 'Image';
          filename: string;
          url: string;
          id: number;
        }> | null;
      } | null;
      replies?: Array<{
        __typename?: 'ModelComment';
        content: string;
        createdAt: any;
        id: number;
        updatedAt: any;
        images?: Array<{
          __typename?: 'Image';
          filename: string;
          url: string;
          id: number;
        }> | null;
        user: {
          __typename?: 'SimpleUser';
          avatarUrl?: string | null;
          id: number;
          name: string;
        };
        replies?: Array<{
          __typename?: 'ModelComment';
          content: string;
          createdAt: any;
          id: number;
          updatedAt: any;
          images?: Array<{
            __typename?: 'Image';
            id: number;
            filename: string;
            url: string;
          }> | null;
        }> | null;
        model: {
          __typename?: 'ModelDetail';
          dimension: number;
          id: number;
          isGeneral: boolean;
          isPublic: boolean;
          name: string;
          triggerRemainingCount: number;
          userId: number;
        };
      }> | null;
      user: {
        __typename?: 'SimpleUser';
        avatarUrl?: string | null;
        id: number;
        name: string;
      };
    }> | null;
    user: {
      __typename?: 'SimpleUser';
      avatarUrl?: string | null;
      id: number;
      name: string;
    };
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

export type MyMemberPermissionQueryVariables = Exact<{
  modelId?: InputMaybe<Scalars['Int']>;
}>;

export type MyMemberPermissionQuery = {
  __typename?: 'Query';
  myMemberPermission?: {
    __typename?: 'Permission';
    canDestroy: boolean;
    canExecute: boolean;
    canRead: boolean;
    canUpdate: boolean;
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

export type SimpleReportFragment = {
  __typename?: 'SimpleReport';
  label?: string | null;
  level?: string | null;
  shortCode?: string | null;
  type?: string | null;
  mainScore?: {
    __typename?: 'Diagram';
    dates?: Array<any | null> | null;
    tabIdent?: string | null;
    type?: string | null;
    values?: Array<number | null> | null;
  } | null;
};

export type LabModelPublicOverviewQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']>;
  direction?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
}>;

export type LabModelPublicOverviewQuery = {
  __typename?: 'Query';
  labModelPublicOverview?: {
    __typename?: 'ModelPublicPage';
    page?: number | null;
    totalPage?: number | null;
    count?: number | null;
    items?: Array<{
      __typename?: 'ModelPublicOverview';
      dimension?: number | null;
      modelId?: number | null;
      modelName?: string | null;
      version?: string | null;
      versionId?: number | null;
      dataset?: {
        __typename?: 'Dataset';
        ident?: string | null;
        name?: string | null;
        items?: Array<{
          __typename?: 'DatasetCompletionRow';
          firstIdent?: string | null;
          label?: string | null;
          shortCode?: string | null;
          level?: string | null;
          secondIdent?: string | null;
        }> | null;
      } | null;
    }> | null;
  } | null;
};

export type LabModelVersionReportDetailQueryVariables = Exact<{
  modelId: Scalars['Int'];
  versionId: Scalars['Int'];
  label?: InputMaybe<Scalars['String']>;
  shortCode?: InputMaybe<Scalars['String']>;
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
}>;

export type LabModelVersionReportDetailQuery = {
  __typename?: 'Query';
  labModelVersionReportDetail?: {
    __typename?: 'Report';
    label?: string | null;
    level?: string | null;
    shortCode?: string | null;
    type?: string | null;
    mainScore?: {
      __typename?: 'Diagram';
      dates?: Array<any | null> | null;
      tabIdent?: string | null;
      type?: string | null;
      values?: Array<number | null> | null;
    } | null;
    panels?: Array<{
      __typename?: 'Panel';
      diagrams?: Array<{
        __typename?: 'Diagram';
        dates?: Array<any | null> | null;
        tabIdent?: string | null;
        type?: string | null;
        values?: Array<number | null> | null;
      }> | null;
      metric?: {
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
      } | null;
    }> | null;
  } | null;
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
  defaultVersionId?: InputMaybe<Scalars['Int']>;
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

export type DeleteLabModelCommentMutationVariables = Exact<{
  modelId: Scalars['Int'];
  commentId: Scalars['Int'];
}>;

export type DeleteLabModelCommentMutation = {
  __typename?: 'Mutation';
  deleteLabModelComment?: {
    __typename?: 'DeleteLabModelCommentPayload';
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

export type CreateLabModelCommentMutationVariables = Exact<{
  modelId: Scalars['Int'];
  versionId: Scalars['Int'];
  modelMetricId?: InputMaybe<Scalars['Int']>;
  replyTo?: InputMaybe<Scalars['Int']>;
  content: Scalars['String'];
  images?: InputMaybe<Array<Base64ImageInput> | Base64ImageInput>;
}>;

export type CreateLabModelCommentMutation = {
  __typename?: 'Mutation';
  createLabModelComment?: {
    __typename?: 'CreateLabModelCommentPayload';
    clientMutationId?: string | null;
    message?: string | null;
    errors?: Array<{
      __typename?: 'Error';
      message?: string | null;
      path?: Array<string> | null;
    }> | null;
  } | null;
};

export type UpdateLabModelCommentMutationVariables = Exact<{
  commentId: Scalars['Int'];
  content: Scalars['String'];
  modelId: Scalars['Int'];
  images?: InputMaybe<Array<Base64ImageInput> | Base64ImageInput>;
}>;

export type UpdateLabModelCommentMutation = {
  __typename?: 'Mutation';
  updateLabModelComment?: {
    __typename?: 'UpdateLabModelCommentPayload';
    clientMutationId?: string | null;
    message?: string | null;
    errors?: Array<{
      __typename?: 'Error';
      message?: string | null;
      path?: Array<string> | null;
    }> | null;
  } | null;
};

export type TriggerLabModelVersionMutationVariables = Exact<{
  modelId: Scalars['Int'];
  versionId: Scalars['Int'];
}>;

export type TriggerLabModelVersionMutation = {
  __typename?: 'Mutation';
  triggerLabModelVersion?: {
    __typename?: 'TriggerLabModelVersionPayload';
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
  projectUrl?: InputMaybe<Scalars['String']>;
  projectLogoUrl?: InputMaybe<Scalars['String']>;
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
  language?: InputMaybe<Scalars['String']>;
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

export type ModifyUserOrgsMutationVariables = Exact<{
  platform: Scalars['String'];
  organizations: Array<ContributorOrgInput> | ContributorOrgInput;
}>;

export type ModifyUserOrgsMutation = {
  __typename?: 'Mutation';
  modifyUserOrgs?: {
    __typename?: 'ModifyUserOrgsPayload';
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

export type ManageUserOrgsMutationVariables = Exact<{
  platform: Scalars['String'];
  organizations: Array<ContributorOrgInput> | ContributorOrgInput;
  contributor: Scalars['String'];
  label: Scalars['String'];
  level: Scalars['String'];
}>;

export type ManageUserOrgsMutation = {
  __typename?: 'Mutation';
  manageUserOrgs?: {
    __typename?: 'ManageUserOrgsPayload';
    clientMutationId?: string | null;
    message?: string | null;
    prUrl?: string | null;
    status: string;
    errors?: Array<{
      __typename?: 'Error';
      message?: string | null;
      path?: Array<string> | null;
    }> | null;
  } | null;
};

export type UserinfoQueryVariables = Exact<{ [key: string]: never }>;

export type UserinfoQuery = {
  __typename?: 'Query';
  currentUser?: {
    __typename?: 'User';
    id: number;
    name: string;
    roleLevel: number;
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
    contributingOrgs?: Array<{
      __typename?: 'ContributorOrg';
      firstDate?: any | null;
      lastDate?: any | null;
      orgName?: string | null;
      platformType?: string | null;
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
    collections?: Array<string> | null;
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
    collections?: Array<string> | null;
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
    communityOrgUrl?: string | null;
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

export type CommunityReposSearchQueryVariables = Exact<{
  label: Scalars['String'];
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
}>;

export type CommunityReposSearchQuery = {
  __typename?: 'Query';
  communityRepos: {
    __typename?: 'RepoPage';
    count?: number | null;
    page?: number | null;
    totalPage?: number | null;
    items?: Array<{ __typename?: 'SubRepo'; label?: string | null }> | null;
  };
};

export type MetricQueryVariables = Exact<{
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['ISO8601DateTime']>;
  end?: InputMaybe<Scalars['ISO8601DateTime']>;
  repoType?: InputMaybe<Scalars['String']>;
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

export type OrgSearchQueryVariables = Exact<{
  keyword: Scalars['String'];
}>;

export type OrgSearchQuery = {
  __typename?: 'Query';
  orgFuzzySearch: Array<{
    __typename?: 'OrgCompletionRow';
    orgName?: string | null;
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
  keyword?: InputMaybe<Scalars['String']>;
  sortOpts?: InputMaybe<Array<SortOptionInput> | SortOptionInput>;
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
    activityScore?: number | null;
    collections?: Array<string> | null;
    fullPath?: string | null;
    label?: string | null;
    level?: string | null;
    logoUrl?: string | null;
    name?: string | null;
    origin?: string | null;
    reposCount?: number | null;
    shortCode?: string | null;
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

export type MetricDashboardQueryVariables = Exact<{
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
}>;

export type MetricDashboardQuery = {
  __typename?: 'Query';
  contributorsDetailOverview: {
    __typename?: 'ContributorDetailOverview';
    contributorAllCount?: number | null;
    orgAllCount?: number | null;
    highestContributionContributor?: {
      __typename?: 'Contributor';
      name?: string | null;
      origin?: string | null;
      type?: string | null;
      value?: number | null;
    } | null;
    highestContributionOrganization?: {
      __typename?: 'Contributor';
      name?: string | null;
      origin?: string | null;
      type?: string | null;
      value?: number | null;
    } | null;
  };
  issuesDetailOverview: {
    __typename?: 'IssueDetailOverview';
    issueCommentFrequencyMean?: number | null;
    issueCompletionCount?: number | null;
    issueCompletionRatio?: number | null;
    issueCount?: number | null;
    issueUnresponsiveCount?: number | null;
    issueUnresponsiveRatio?: number | null;
  };
  pullsDetailOverview: {
    __typename?: 'PullDetailOverview';
    commitCount?: number | null;
    pullCompletionCount?: number | null;
    pullCompletionRatio?: number | null;
    pullCount?: number | null;
    pullUnresponsiveCount?: number | null;
    pullUnresponsiveRatio?: number | null;
  };
};

export type ContributorsDetailListQueryVariables = Exact<{
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
  filterOpts?: InputMaybe<Array<FilterOptionInput> | FilterOptionInput>;
  sortOpts?: InputMaybe<Array<SortOptionInput> | SortOptionInput>;
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
}>;

export type ContributorsDetailListQuery = {
  __typename?: 'Query';
  contributorsDetailList: {
    __typename?: 'ContributorDetailPage';
    count?: number | null;
    origin: string;
    page?: number | null;
    totalPage?: number | null;
    items: Array<{
      __typename?: 'ContributorDetail';
      contribution?: number | null;
      contributionWithoutObserve?: number | null;
      contributor?: string | null;
      ecologicalType?: string | null;
      isBot?: boolean | null;
      mileageType?: string | null;
      organization?: string | null;
      contributionTypeList?: Array<{
        __typename?: 'Contribution';
        contribution?: number | null;
        contributionType?: string | null;
      }> | null;
    }>;
  };
};

export type EcoContributorsOverviewQueryVariables = Exact<{
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  filterOpts?: InputMaybe<Array<FilterOptionInput> | FilterOptionInput>;
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
}>;

export type EcoContributorsOverviewQuery = {
  __typename?: 'Query';
  ecoContributorsOverview: Array<{
    __typename?: 'ContributorTopOverview';
    overviewName?: string | null;
    subTypeName?: string | null;
    subTypePercentage?: number | null;
    topContributorDistribution?: Array<{
      __typename?: 'Distribution';
      subCount?: number | null;
      subName?: string | null;
      subRatio?: number | null;
      totalCount?: number | null;
      subBelong?: string | null;
    }> | null;
  }>;
};

export type OrgContributionDistributionQueryVariables = Exact<{
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  filterOpts?: InputMaybe<Array<FilterOptionInput> | FilterOptionInput>;
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
}>;

export type OrgContributionDistributionQuery = {
  __typename?: 'Query';
  orgContributionDistribution: Array<{
    __typename?: 'ContributorTopOverview';
    overviewName?: string | null;
    subTypeName?: string | null;
    subTypePercentage?: number | null;
    topContributorDistribution?: Array<{
      __typename?: 'Distribution';
      subCount?: number | null;
      subName?: string | null;
      subRatio?: number | null;
      totalCount?: number | null;
      subBelong?: string | null;
    }> | null;
  }>;
};

export type OrgContributorsOverviewQueryVariables = Exact<{
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  filterOpts?: InputMaybe<Array<FilterOptionInput> | FilterOptionInput>;
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
}>;

export type OrgContributorsOverviewQuery = {
  __typename?: 'Query';
  orgContributorsOverview: Array<{
    __typename?: 'ContributorTopOverview';
    overviewName?: string | null;
    subTypeName?: string | null;
    subTypePercentage?: number | null;
    topContributorDistribution?: Array<{
      __typename?: 'Distribution';
      subCount?: number | null;
      subName?: string | null;
      subRatio?: number | null;
      totalCount?: number | null;
    }> | null;
  }>;
};

export type ContributorsOverviewQueryVariables = Exact<{
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  filterOpts?: InputMaybe<Array<FilterOptionInput> | FilterOptionInput>;
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
}>;

export type ContributorsOverviewQuery = {
  __typename?: 'Query';
  orgContributorsDistribution: Array<{
    __typename?: 'ContributorTopOverview';
    overviewName?: string | null;
    subTypeName?: string | null;
    subTypePercentage?: number | null;
    topContributorDistribution?: Array<{
      __typename?: 'Distribution';
      subCount?: number | null;
      subName?: string | null;
      subRatio?: number | null;
      totalCount?: number | null;
      subBelong?: string | null;
    }> | null;
  }>;
};

export type IssuesDetailListQueryVariables = Exact<{
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
  filterOpts?: InputMaybe<Array<FilterOptionInput> | FilterOptionInput>;
  sortOpts?: InputMaybe<Array<SortOptionInput> | SortOptionInput>;
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
}>;

export type IssuesDetailListQuery = {
  __typename?: 'Query';
  issuesDetailList: {
    __typename?: 'IssueDetailPage';
    count?: number | null;
    page?: number | null;
    totalPage?: number | null;
    items?: Array<{
      __typename?: 'IssueDetail';
      assigneeLogin?: string | null;
      closedAt?: any | null;
      createdAt?: any | null;
      idInRepo?: number | null;
      labels?: Array<string> | null;
      numOfCommentsWithoutBot?: number | null;
      repository?: string | null;
      state?: string | null;
      timeToCloseDays?: number | null;
      timeToFirstAttentionWithoutBot?: number | null;
      title?: string | null;
      url?: string | null;
      userLogin?: string | null;
    }> | null;
  };
};

export type IssueCompletionQueryVariables = Exact<{
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
}>;

export type IssueCompletionQuery = {
  __typename?: 'Query';
  issuesDetailOverview: {
    __typename?: 'IssueDetailOverview';
    issueStateDistribution?: Array<{
      __typename?: 'Distribution';
      subCount?: number | null;
      subName?: string | null;
      subRatio?: number | null;
      totalCount?: number | null;
    }> | null;
  };
};

export type IssueCommentQueryVariables = Exact<{
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
}>;

export type IssueCommentQuery = {
  __typename?: 'Query';
  issuesDetailOverview: {
    __typename?: 'IssueDetailOverview';
    issueCommentDistribution?: Array<{
      __typename?: 'Distribution';
      subCount?: number | null;
      subName?: string | null;
      subRatio?: number | null;
      totalCount?: number | null;
    }> | null;
  };
};

export type PullsDetailListQueryVariables = Exact<{
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
  filterOpts?: InputMaybe<Array<FilterOptionInput> | FilterOptionInput>;
  sortOpts?: InputMaybe<Array<SortOptionInput> | SortOptionInput>;
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
}>;

export type PullsDetailListQuery = {
  __typename?: 'Query';
  pullsDetailList: {
    __typename?: 'PullDetailPage';
    count?: number | null;
    page?: number | null;
    totalPage?: number | null;
    items?: Array<{
      __typename?: 'PullDetail';
      closedAt?: any | null;
      createdAt?: any | null;
      idInRepo?: number | null;
      labels?: Array<string> | null;
      mergeAuthorLogin?: string | null;
      numReviewComments?: number | null;
      repository?: string | null;
      reviewersLogin?: Array<string> | null;
      state?: string | null;
      timeToCloseDays?: number | null;
      timeToFirstAttentionWithoutBot?: number | null;
      title?: string | null;
      url?: string | null;
      userLogin?: string | null;
    }> | null;
  };
};

export type PullsCompletionQueryVariables = Exact<{
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
}>;

export type PullsCompletionQuery = {
  __typename?: 'Query';
  pullsDetailOverview: {
    __typename?: 'PullDetailOverview';
    pullStateDistribution?: Array<{
      __typename?: 'Distribution';
      subCount?: number | null;
      subName?: string | null;
      subRatio?: number | null;
      totalCount?: number | null;
    }> | null;
  };
};

export type PullsCommentQueryVariables = Exact<{
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
}>;

export type PullsCommentQuery = {
  __typename?: 'Query';
  pullsDetailOverview: {
    __typename?: 'PullDetailOverview';
    pullCommentDistribution?: Array<{
      __typename?: 'Distribution';
      subCount?: number | null;
      subName?: string | null;
      subRatio?: number | null;
      totalCount?: number | null;
    }> | null;
  };
};

export type VerifyDetailDataRangeQueryVariables = Exact<{
  label?: InputMaybe<Scalars['String']>;
  shortCode?: InputMaybe<Scalars['String']>;
  beginDate?: InputMaybe<Scalars['ISO8601DateTime']>;
  endDate?: InputMaybe<Scalars['ISO8601DateTime']>;
}>;

export type VerifyDetailDataRangeQuery = {
  __typename?: 'Query';
  verifyDetailDataRange: {
    __typename?: 'ValidDataRange';
    status?: boolean | null;
    labelAdmin?: boolean | null;
  };
};

export type MetricModelsOverviewQueryVariables = Exact<{
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  repoType?: InputMaybe<Scalars['String']>;
}>;

export type MetricModelsOverviewQuery = {
  __typename?: 'Query';
  metricModelsOverview: Array<{
    __typename?: 'Model';
    dimension?: string | null;
    grimoireCreationDate?: any | null;
    ident: string;
    label?: string | null;
    level?: string | null;
    mainScore?: number | null;
    scope?: string | null;
    transformedScore?: number | null;
    type?: string | null;
    updatedAt?: any | null;
    reposCount?: number | null;
    shortCode?: string | null;
  }>;
};

export type MetricContributorQueryVariables = Exact<{
  label: Scalars['String'];
  level?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['ISO8601DateTime']>;
  end?: InputMaybe<Scalars['ISO8601DateTime']>;
  repoType?: InputMaybe<Scalars['String']>;
}>;

export type MetricContributorQuery = {
  __typename?: 'Query';
  metricDomainPersona: Array<{
    __typename?: 'DomainPersonaMetric';
    activityCodeContributionPerPerson?: number | null;
    activityCodeContributorCount?: number | null;
    activityIssueContributionPerPerson?: number | null;
    activityIssueContributorCount?: number | null;
    activityObservationContributionPerPerson?: number | null;
    activityObservationContributorCount?: number | null;
    domainPersonaScore?: number | null;
    grimoireCreationDate?: any | null;
    label?: string | null;
    level?: string | null;
    shortCode?: string | null;
    type?: string | null;
  }>;
  metricMilestonePersona: Array<{
    __typename?: 'MilestonePersonaMetric';
    activityCasualContributionPerPerson?: number | null;
    activityCasualContributorCount?: number | null;
    activityCoreContributionPerPerson?: number | null;
    activityCoreContributorCount?: number | null;
    activityRegularContributionPerPerson?: number | null;
    activityRegularContributorCount?: number | null;
    milestonePersonaScore?: number | null;
    grimoireCreationDate?: any | null;
    label?: string | null;
    level?: string | null;
    shortCode?: string | null;
    type?: string | null;
  }>;
  metricRolePersona: Array<{
    __typename?: 'RolePersonaMetric';
    activityIndividualContributionPerPerson?: number | null;
    activityIndividualContributorCount?: number | null;
    activityOrganizationContributionPerPerson?: number | null;
    activityOrganizationContributorCount?: number | null;
    rolePersonaScore?: number | null;
    grimoireCreationDate?: any | null;
    label?: string | null;
    level?: string | null;
    shortCode?: string | null;
    type?: string | null;
  }>;
};

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
export const ModelDetailFragmentDoc = /*#__PURE__*/ `
    fragment modelDetail on ModelDetail {
  dimension
  id
  isGeneral
  isPublic
  name
  triggerRemainingCount
  userId
}
    `;
export const ParentCommentFragmentDoc = /*#__PURE__*/ `
    fragment parentComment on ModelComment {
  content
  createdAt
  id
  images {
    filename
    url
    id
  }
  updatedAt
}
    `;
export const ReplyFragmentDoc = /*#__PURE__*/ `
    fragment reply on ModelComment {
  content
  createdAt
  id
  images {
    filename
    url
    id
  }
  updatedAt
  user {
    avatarUrl
    id
    name
  }
  replies {
    content
    createdAt
    id
    images {
      id
      filename
      url
    }
    updatedAt
  }
  model {
    dimension
    id
    isGeneral
    isPublic
    name
    triggerRemainingCount
    userId
  }
}
    `;
export const CommentFragmentDoc = /*#__PURE__*/ `
    fragment comment on ModelComment {
  content
  createdAt
  id
  metric {
    ...metrics
  }
  images {
    filename
    url
    id
  }
  model {
    ...modelDetail
  }
  parent {
    ...parentComment
  }
  replies {
    ...reply
  }
  updatedAt
  user {
    avatarUrl
    id
    name
  }
}
    ${MetricsFragmentDoc}
${ModelDetailFragmentDoc}
${ParentCommentFragmentDoc}
${ReplyFragmentDoc}`;
export const UserFragmentDoc = /*#__PURE__*/ `
    fragment user on SimpleUser {
  avatarUrl
  id
  name
}
    `;
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
    shortCode
    level
    secondIdent
  }
  name
}
    `;
export const ModelVersionFragmentDoc = /*#__PURE__*/ `
    fragment modelVersion on ModelVersion {
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
    ${AlgorithmFragmentDoc}
${DatasetFragmentDoc}
${MetricsFragmentDoc}`;
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
export const SimpleReportFragmentDoc = /*#__PURE__*/ `
    fragment simpleReport on SimpleReport {
  label
  level
  mainScore {
    dates
    tabIdent
    type
    values
  }
  shortCode
  type
}
    `;
export const MetricStatFragmentDoc = /*#__PURE__*/ `
    fragment metricStat on MetricStat {
  mean
  median
}
    `;
export const DatasetFuzzySearchDocument = /*#__PURE__*/ `
    query datasetFuzzySearch($keyword: String!) {
  datasetFuzzySearch(keyword: $keyword) {
    firstIdent
    label
    level
    secondIdent
    shortCode
  }
}
    `;
export const useDatasetFuzzySearchQuery = <
  TData = DatasetFuzzySearchQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: DatasetFuzzySearchQueryVariables,
  options?: UseQueryOptions<DatasetFuzzySearchQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<DatasetFuzzySearchQuery, TError, TData>(
    ['datasetFuzzySearch', variables],
    fetcher<DatasetFuzzySearchQuery, DatasetFuzzySearchQueryVariables>(
      client,
      DatasetFuzzySearchDocument,
      variables,
      headers
    ),
    options
  );

useDatasetFuzzySearchQuery.getKey = (
  variables: DatasetFuzzySearchQueryVariables
) => ['datasetFuzzySearch', variables];
useDatasetFuzzySearchQuery.fetcher = (
  client: GraphQLClient,
  variables: DatasetFuzzySearchQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<DatasetFuzzySearchQuery, DatasetFuzzySearchQueryVariables>(
    client,
    DatasetFuzzySearchDocument,
    variables,
    headers
  );
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
        triggerStatus
        triggerUpdatedAt
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
      defaultVersion {
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
      permissions {
        canDestroy
        canExecute
        canRead
        canUpdate
      }
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
    query labModelDetail($modelId: Int!) {
  labModelDetail(modelId: $modelId) {
    dimension
    id
    isGeneral
    isPublic
    triggerRemainingCount
    latestVersions {
      id
      version
    }
    defaultVersion {
      id
      version
    }
    name
    userId
  }
}
    `;
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
    triggerStatus
    triggerUpdatedAt
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
export const LabModelCommentsDocument = /*#__PURE__*/ `
    query labModelComments($direction: String, $modelId: Int!, $modelMetricId: Int, $page: Int, $parentId: Int, $per: Int, $sort: String, $versionId: Int) {
  labModelComments(
    direction: $direction
    modelId: $modelId
    modelMetricId: $modelMetricId
    page: $page
    parentId: $parentId
    per: $per
    sort: $sort
    versionId: $versionId
  ) {
    count
    items {
      ...comment
    }
    page
    totalPage
  }
}
    ${CommentFragmentDoc}`;
export const useLabModelCommentsQuery = <
  TData = LabModelCommentsQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: LabModelCommentsQueryVariables,
  options?: UseQueryOptions<LabModelCommentsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<LabModelCommentsQuery, TError, TData>(
    ['labModelComments', variables],
    fetcher<LabModelCommentsQuery, LabModelCommentsQueryVariables>(
      client,
      LabModelCommentsDocument,
      variables,
      headers
    ),
    options
  );

useLabModelCommentsQuery.getKey = (
  variables: LabModelCommentsQueryVariables
) => ['labModelComments', variables];
useLabModelCommentsQuery.fetcher = (
  client: GraphQLClient,
  variables: LabModelCommentsQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<LabModelCommentsQuery, LabModelCommentsQueryVariables>(
    client,
    LabModelCommentsDocument,
    variables,
    headers
  );
export const LabModelCommentDetailDocument = /*#__PURE__*/ `
    query labModelCommentDetail($modelId: Int!, $commentId: Int!) {
  labModelCommentDetail(modelId: $modelId, commentId: $commentId) {
    content
    createdAt
    id
    images {
      filename
      url
      id
    }
    model {
      ...modelDetail
    }
    parent {
      ...comment
    }
    replies {
      ...comment
    }
    updatedAt
    user {
      ...user
    }
  }
}
    ${ModelDetailFragmentDoc}
${CommentFragmentDoc}
${UserFragmentDoc}`;
export const useLabModelCommentDetailQuery = <
  TData = LabModelCommentDetailQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: LabModelCommentDetailQueryVariables,
  options?: UseQueryOptions<LabModelCommentDetailQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<LabModelCommentDetailQuery, TError, TData>(
    ['labModelCommentDetail', variables],
    fetcher<LabModelCommentDetailQuery, LabModelCommentDetailQueryVariables>(
      client,
      LabModelCommentDetailDocument,
      variables,
      headers
    ),
    options
  );

useLabModelCommentDetailQuery.getKey = (
  variables: LabModelCommentDetailQueryVariables
) => ['labModelCommentDetail', variables];
useLabModelCommentDetailQuery.fetcher = (
  client: GraphQLClient,
  variables: LabModelCommentDetailQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<LabModelCommentDetailQuery, LabModelCommentDetailQueryVariables>(
    client,
    LabModelCommentDetailDocument,
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
export const MyMemberPermissionDocument = /*#__PURE__*/ `
    query myMemberPermission($modelId: Int) {
  myMemberPermission(modelId: $modelId) {
    canDestroy
    canExecute
    canRead
    canUpdate
  }
}
    `;
export const useMyMemberPermissionQuery = <
  TData = MyMemberPermissionQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables?: MyMemberPermissionQueryVariables,
  options?: UseQueryOptions<MyMemberPermissionQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<MyMemberPermissionQuery, TError, TData>(
    variables === undefined
      ? ['myMemberPermission']
      : ['myMemberPermission', variables],
    fetcher<MyMemberPermissionQuery, MyMemberPermissionQueryVariables>(
      client,
      MyMemberPermissionDocument,
      variables,
      headers
    ),
    options
  );

useMyMemberPermissionQuery.getKey = (
  variables?: MyMemberPermissionQueryVariables
) =>
  variables === undefined
    ? ['myMemberPermission']
    : ['myMemberPermission', variables];
useMyMemberPermissionQuery.fetcher = (
  client: GraphQLClient,
  variables?: MyMemberPermissionQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<MyMemberPermissionQuery, MyMemberPermissionQueryVariables>(
    client,
    MyMemberPermissionDocument,
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
export const LabModelPublicOverviewDocument = /*#__PURE__*/ `
    query labModelPublicOverview($sort: String, $direction: String, $page: Int, $per: Int) {
  labModelPublicOverview(
    sort: $sort
    direction: $direction
    page: $page
    per: $per
  ) {
    page
    totalPage
    count
    items {
      dimension
      modelId
      modelName
      dataset {
        ...dataset
      }
      version
      versionId
    }
  }
}
    ${DatasetFragmentDoc}`;
export const useLabModelPublicOverviewQuery = <
  TData = LabModelPublicOverviewQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables?: LabModelPublicOverviewQueryVariables,
  options?: UseQueryOptions<LabModelPublicOverviewQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<LabModelPublicOverviewQuery, TError, TData>(
    variables === undefined
      ? ['labModelPublicOverview']
      : ['labModelPublicOverview', variables],
    fetcher<LabModelPublicOverviewQuery, LabModelPublicOverviewQueryVariables>(
      client,
      LabModelPublicOverviewDocument,
      variables,
      headers
    ),
    options
  );

useLabModelPublicOverviewQuery.getKey = (
  variables?: LabModelPublicOverviewQueryVariables
) =>
  variables === undefined
    ? ['labModelPublicOverview']
    : ['labModelPublicOverview', variables];
useLabModelPublicOverviewQuery.fetcher = (
  client: GraphQLClient,
  variables?: LabModelPublicOverviewQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<LabModelPublicOverviewQuery, LabModelPublicOverviewQueryVariables>(
    client,
    LabModelPublicOverviewDocument,
    variables,
    headers
  );
export const LabModelVersionReportDetailDocument = /*#__PURE__*/ `
    query labModelVersionReportDetail($modelId: Int!, $versionId: Int!, $label: String, $shortCode: String, $beginDate: ISO8601DateTime, $endDate: ISO8601DateTime) {
  labModelVersionReportDetail(
    modelId: $modelId
    versionId: $versionId
    label: $label
    shortCode: $shortCode
    beginDate: $beginDate
    endDate: $endDate
  ) {
    label
    level
    mainScore {
      dates
      tabIdent
      type
      values
    }
    panels {
      diagrams {
        dates
        tabIdent
        type
        values
      }
      metric {
        ...metrics
      }
    }
    shortCode
    type
  }
}
    ${MetricsFragmentDoc}`;
export const useLabModelVersionReportDetailQuery = <
  TData = LabModelVersionReportDetailQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: LabModelVersionReportDetailQueryVariables,
  options?: UseQueryOptions<LabModelVersionReportDetailQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<LabModelVersionReportDetailQuery, TError, TData>(
    ['labModelVersionReportDetail', variables],
    fetcher<
      LabModelVersionReportDetailQuery,
      LabModelVersionReportDetailQueryVariables
    >(client, LabModelVersionReportDetailDocument, variables, headers),
    options
  );

useLabModelVersionReportDetailQuery.getKey = (
  variables: LabModelVersionReportDetailQueryVariables
) => ['labModelVersionReportDetail', variables];
useLabModelVersionReportDetailQuery.fetcher = (
  client: GraphQLClient,
  variables: LabModelVersionReportDetailQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<
    LabModelVersionReportDetailQuery,
    LabModelVersionReportDetailQueryVariables
  >(client, LabModelVersionReportDetailDocument, variables, headers);
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
    mutation updateLabModel($dimension: Int, $defaultVersionId: Int, $isGeneral: Boolean, $isPublic: Boolean, $modelId: Int!, $name: String) {
  updateLabModel(
    input: {defaultVersionId: $defaultVersionId, dimension: $dimension, isGeneral: $isGeneral, isPublic: $isPublic, modelId: $modelId, name: $name}
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
export const DeleteLabModelCommentDocument = /*#__PURE__*/ `
    mutation deleteLabModelComment($modelId: Int!, $commentId: Int!) {
  deleteLabModelComment(input: {modelId: $modelId, commentId: $commentId}) {
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
export const useDeleteLabModelCommentMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    DeleteLabModelCommentMutation,
    TError,
    DeleteLabModelCommentMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    DeleteLabModelCommentMutation,
    TError,
    DeleteLabModelCommentMutationVariables,
    TContext
  >(
    ['deleteLabModelComment'],
    (variables?: DeleteLabModelCommentMutationVariables) =>
      fetcher<
        DeleteLabModelCommentMutation,
        DeleteLabModelCommentMutationVariables
      >(client, DeleteLabModelCommentDocument, variables, headers)(),
    options
  );
useDeleteLabModelCommentMutation.fetcher = (
  client: GraphQLClient,
  variables: DeleteLabModelCommentMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<
    DeleteLabModelCommentMutation,
    DeleteLabModelCommentMutationVariables
  >(client, DeleteLabModelCommentDocument, variables, headers);
export const CreateLabModelCommentDocument = /*#__PURE__*/ `
    mutation createLabModelComment($modelId: Int!, $versionId: Int!, $modelMetricId: Int, $replyTo: Int, $content: String!, $images: [Base64ImageInput!]) {
  createLabModelComment(
    input: {modelId: $modelId, versionId: $versionId, modelMetricId: $modelMetricId, replyTo: $replyTo, content: $content, images: $images}
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
export const useCreateLabModelCommentMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    CreateLabModelCommentMutation,
    TError,
    CreateLabModelCommentMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    CreateLabModelCommentMutation,
    TError,
    CreateLabModelCommentMutationVariables,
    TContext
  >(
    ['createLabModelComment'],
    (variables?: CreateLabModelCommentMutationVariables) =>
      fetcher<
        CreateLabModelCommentMutation,
        CreateLabModelCommentMutationVariables
      >(client, CreateLabModelCommentDocument, variables, headers)(),
    options
  );
useCreateLabModelCommentMutation.fetcher = (
  client: GraphQLClient,
  variables: CreateLabModelCommentMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<
    CreateLabModelCommentMutation,
    CreateLabModelCommentMutationVariables
  >(client, CreateLabModelCommentDocument, variables, headers);
export const UpdateLabModelCommentDocument = /*#__PURE__*/ `
    mutation updateLabModelComment($commentId: Int!, $content: String!, $modelId: Int!, $images: [Base64ImageInput!]) {
  updateLabModelComment(
    input: {modelId: $modelId, content: $content, commentId: $commentId, images: $images}
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
export const useUpdateLabModelCommentMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    UpdateLabModelCommentMutation,
    TError,
    UpdateLabModelCommentMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    UpdateLabModelCommentMutation,
    TError,
    UpdateLabModelCommentMutationVariables,
    TContext
  >(
    ['updateLabModelComment'],
    (variables?: UpdateLabModelCommentMutationVariables) =>
      fetcher<
        UpdateLabModelCommentMutation,
        UpdateLabModelCommentMutationVariables
      >(client, UpdateLabModelCommentDocument, variables, headers)(),
    options
  );
useUpdateLabModelCommentMutation.fetcher = (
  client: GraphQLClient,
  variables: UpdateLabModelCommentMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<
    UpdateLabModelCommentMutation,
    UpdateLabModelCommentMutationVariables
  >(client, UpdateLabModelCommentDocument, variables, headers);
export const TriggerLabModelVersionDocument = /*#__PURE__*/ `
    mutation triggerLabModelVersion($modelId: Int!, $versionId: Int!) {
  triggerLabModelVersion(input: {modelId: $modelId, versionId: $versionId}) {
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
export const useTriggerLabModelVersionMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    TriggerLabModelVersionMutation,
    TError,
    TriggerLabModelVersionMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    TriggerLabModelVersionMutation,
    TError,
    TriggerLabModelVersionMutationVariables,
    TContext
  >(
    ['triggerLabModelVersion'],
    (variables?: TriggerLabModelVersionMutationVariables) =>
      fetcher<
        TriggerLabModelVersionMutation,
        TriggerLabModelVersionMutationVariables
      >(client, TriggerLabModelVersionDocument, variables, headers)(),
    options
  );
useTriggerLabModelVersionMutation.fetcher = (
  client: GraphQLClient,
  variables: TriggerLabModelVersionMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<
    TriggerLabModelVersionMutation,
    TriggerLabModelVersionMutationVariables
  >(client, TriggerLabModelVersionDocument, variables, headers);
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
    mutation createProjectTask($projectName: String!, $projectTypes: [ProjectTypeInput!]!, $origin: String!, $projectUrl: String, $projectLogoUrl: String) {
  createProjectTask(
    input: {projectName: $projectName, projectTypes: $projectTypes, origin: $origin, projectUrl: $projectUrl, projectLogoUrl: $projectLogoUrl}
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
    mutation modifyUser($name: String!, $email: String!, $language: String) {
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
export const ModifyUserOrgsDocument = /*#__PURE__*/ `
    mutation modifyUserOrgs($platform: String!, $organizations: [ContributorOrgInput!]!) {
  modifyUserOrgs(input: {platform: $platform, organizations: $organizations}) {
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
export const useModifyUserOrgsMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    ModifyUserOrgsMutation,
    TError,
    ModifyUserOrgsMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    ModifyUserOrgsMutation,
    TError,
    ModifyUserOrgsMutationVariables,
    TContext
  >(
    ['modifyUserOrgs'],
    (variables?: ModifyUserOrgsMutationVariables) =>
      fetcher<ModifyUserOrgsMutation, ModifyUserOrgsMutationVariables>(
        client,
        ModifyUserOrgsDocument,
        variables,
        headers
      )(),
    options
  );
useModifyUserOrgsMutation.fetcher = (
  client: GraphQLClient,
  variables: ModifyUserOrgsMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<ModifyUserOrgsMutation, ModifyUserOrgsMutationVariables>(
    client,
    ModifyUserOrgsDocument,
    variables,
    headers
  );
export const ManageUserOrgsDocument = /*#__PURE__*/ `
    mutation manageUserOrgs($platform: String!, $organizations: [ContributorOrgInput!]!, $contributor: String!, $label: String!, $level: String!) {
  manageUserOrgs(
    input: {platform: $platform, contributor: $contributor, label: $label, level: $level, organizations: $organizations}
  ) {
    clientMutationId
    errors {
      message
      path
    }
    message
    prUrl
    status
  }
}
    `;
export const useManageUserOrgsMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    ManageUserOrgsMutation,
    TError,
    ManageUserOrgsMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    ManageUserOrgsMutation,
    TError,
    ManageUserOrgsMutationVariables,
    TContext
  >(
    ['manageUserOrgs'],
    (variables?: ManageUserOrgsMutationVariables) =>
      fetcher<ManageUserOrgsMutation, ManageUserOrgsMutationVariables>(
        client,
        ManageUserOrgsDocument,
        variables,
        headers
      )(),
    options
  );
useManageUserOrgsMutation.fetcher = (
  client: GraphQLClient,
  variables: ManageUserOrgsMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<ManageUserOrgsMutation, ManageUserOrgsMutationVariables>(
    client,
    ManageUserOrgsDocument,
    variables,
    headers
  );
export const UserinfoDocument = /*#__PURE__*/ `
    query userinfo {
  currentUser {
    id
    name
    roleLevel
    email
    language
    emailVerified
    loginBinds {
      account
      avatarUrl
      nickname
      provider
    }
    contributingOrgs {
      firstDate
      lastDate
      orgName
      platformType
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
    collections
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
    collections
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
    communityOrgUrl
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
export const CommunityReposSearchDocument = /*#__PURE__*/ `
    query communityReposSearch($label: String!, $page: Int, $per: Int, $type: String) {
  communityRepos(label: $label, page: $page, per: $per, type: $type) {
    count
    items {
      label
    }
    page
    totalPage
  }
}
    `;
export const useCommunityReposSearchQuery = <
  TData = CommunityReposSearchQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: CommunityReposSearchQueryVariables,
  options?: UseQueryOptions<CommunityReposSearchQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<CommunityReposSearchQuery, TError, TData>(
    ['communityReposSearch', variables],
    fetcher<CommunityReposSearchQuery, CommunityReposSearchQueryVariables>(
      client,
      CommunityReposSearchDocument,
      variables,
      headers
    ),
    options
  );

useCommunityReposSearchQuery.getKey = (
  variables: CommunityReposSearchQueryVariables
) => ['communityReposSearch', variables];
useCommunityReposSearchQuery.fetcher = (
  client: GraphQLClient,
  variables: CommunityReposSearchQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<CommunityReposSearchQuery, CommunityReposSearchQueryVariables>(
    client,
    CommunityReposSearchDocument,
    variables,
    headers
  );
export const MetricDocument = /*#__PURE__*/ `
    query metric($label: String!, $level: String = "repo", $start: ISO8601DateTime, $end: ISO8601DateTime, $repoType: String) {
  metricCodequality(
    label: $label
    level: $level
    beginDate: $start
    endDate: $end
    repoType: $repoType
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
  metricCommunity(
    label: $label
    level: $level
    beginDate: $start
    endDate: $end
    repoType: $repoType
  ) {
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
  metricActivity(
    label: $label
    level: $level
    beginDate: $start
    endDate: $end
    repoType: $repoType
  ) {
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
    repoType: $repoType
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
export const OrgSearchDocument = /*#__PURE__*/ `
    query orgSearch($keyword: String!) {
  orgFuzzySearch(keyword: $keyword) {
    orgName
  }
}
    `;
export const useOrgSearchQuery = <TData = OrgSearchQuery, TError = unknown>(
  client: GraphQLClient,
  variables: OrgSearchQueryVariables,
  options?: UseQueryOptions<OrgSearchQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<OrgSearchQuery, TError, TData>(
    ['orgSearch', variables],
    fetcher<OrgSearchQuery, OrgSearchQueryVariables>(
      client,
      OrgSearchDocument,
      variables,
      headers
    ),
    options
  );

useOrgSearchQuery.getKey = (variables: OrgSearchQueryVariables) => [
  'orgSearch',
  variables,
];
useOrgSearchQuery.fetcher = (
  client: GraphQLClient,
  variables: OrgSearchQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<OrgSearchQuery, OrgSearchQueryVariables>(
    client,
    OrgSearchDocument,
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
    query collectionList($ident: String!, $level: String, $page: Int, $per: Int, $keyword: String, $sortOpts: [SortOptionInput!]) {
  collectionList(
    ident: $ident
    level: $level
    page: $page
    per: $per
    keyword: $keyword
    sortOpts: $sortOpts
  ) {
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
    activityScore
    collections
    fullPath
    label
    level
    logoUrl
    name
    origin
    reposCount
    shortCode
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
export const MetricDashboardDocument = /*#__PURE__*/ `
    query metricDashboard($label: String!, $level: String = "repo", $beginDate: ISO8601DateTime, $endDate: ISO8601DateTime) {
  contributorsDetailOverview(
    label: $label
    level: $level
    beginDate: $beginDate
    endDate: $endDate
  ) {
    contributorAllCount
    highestContributionContributor {
      name
      origin
      type
      value
    }
    highestContributionOrganization {
      name
      origin
      type
      value
    }
    orgAllCount
  }
  issuesDetailOverview(
    label: $label
    level: $level
    beginDate: $beginDate
    endDate: $endDate
  ) {
    issueCommentFrequencyMean
    issueCompletionCount
    issueCompletionRatio
    issueCount
    issueUnresponsiveCount
    issueUnresponsiveRatio
  }
  pullsDetailOverview(
    label: $label
    level: $level
    beginDate: $beginDate
    endDate: $endDate
  ) {
    commitCount
    pullCompletionCount
    pullCompletionRatio
    pullCount
    pullUnresponsiveCount
    pullUnresponsiveRatio
  }
}
    `;
export const useMetricDashboardQuery = <
  TData = MetricDashboardQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: MetricDashboardQueryVariables,
  options?: UseQueryOptions<MetricDashboardQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<MetricDashboardQuery, TError, TData>(
    ['metricDashboard', variables],
    fetcher<MetricDashboardQuery, MetricDashboardQueryVariables>(
      client,
      MetricDashboardDocument,
      variables,
      headers
    ),
    options
  );

useMetricDashboardQuery.getKey = (variables: MetricDashboardQueryVariables) => [
  'metricDashboard',
  variables,
];
useMetricDashboardQuery.fetcher = (
  client: GraphQLClient,
  variables: MetricDashboardQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<MetricDashboardQuery, MetricDashboardQueryVariables>(
    client,
    MetricDashboardDocument,
    variables,
    headers
  );
export const ContributorsDetailListDocument = /*#__PURE__*/ `
    query contributorsDetailList($label: String!, $level: String = "repo", $page: Int, $per: Int, $filterOpts: [FilterOptionInput!], $sortOpts: [SortOptionInput!], $beginDate: ISO8601DateTime, $endDate: ISO8601DateTime) {
  contributorsDetailList(
    label: $label
    level: $level
    page: $page
    per: $per
    filterOpts: $filterOpts
    sortOpts: $sortOpts
    beginDate: $beginDate
    endDate: $endDate
  ) {
    count
    items {
      contribution
      contributionTypeList {
        contribution
        contributionType
      }
      contributionWithoutObserve
      contributor
      ecologicalType
      isBot
      mileageType
      organization
    }
    origin
    page
    totalPage
  }
}
    `;
export const useContributorsDetailListQuery = <
  TData = ContributorsDetailListQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: ContributorsDetailListQueryVariables,
  options?: UseQueryOptions<ContributorsDetailListQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<ContributorsDetailListQuery, TError, TData>(
    ['contributorsDetailList', variables],
    fetcher<ContributorsDetailListQuery, ContributorsDetailListQueryVariables>(
      client,
      ContributorsDetailListDocument,
      variables,
      headers
    ),
    options
  );

useContributorsDetailListQuery.getKey = (
  variables: ContributorsDetailListQueryVariables
) => ['contributorsDetailList', variables];
useContributorsDetailListQuery.fetcher = (
  client: GraphQLClient,
  variables: ContributorsDetailListQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<ContributorsDetailListQuery, ContributorsDetailListQueryVariables>(
    client,
    ContributorsDetailListDocument,
    variables,
    headers
  );
export const EcoContributorsOverviewDocument = /*#__PURE__*/ `
    query ecoContributorsOverview($label: String!, $level: String = "repo", $filterOpts: [FilterOptionInput!], $beginDate: ISO8601DateTime, $endDate: ISO8601DateTime) {
  ecoContributorsOverview(
    label: $label
    level: $level
    filterOpts: $filterOpts
    beginDate: $beginDate
    endDate: $endDate
  ) {
    overviewName
    subTypeName
    subTypePercentage
    topContributorDistribution {
      subCount
      subName
      subRatio
      totalCount
      subBelong
    }
  }
}
    `;
export const useEcoContributorsOverviewQuery = <
  TData = EcoContributorsOverviewQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: EcoContributorsOverviewQueryVariables,
  options?: UseQueryOptions<EcoContributorsOverviewQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<EcoContributorsOverviewQuery, TError, TData>(
    ['ecoContributorsOverview', variables],
    fetcher<
      EcoContributorsOverviewQuery,
      EcoContributorsOverviewQueryVariables
    >(client, EcoContributorsOverviewDocument, variables, headers),
    options
  );

useEcoContributorsOverviewQuery.getKey = (
  variables: EcoContributorsOverviewQueryVariables
) => ['ecoContributorsOverview', variables];
useEcoContributorsOverviewQuery.fetcher = (
  client: GraphQLClient,
  variables: EcoContributorsOverviewQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<EcoContributorsOverviewQuery, EcoContributorsOverviewQueryVariables>(
    client,
    EcoContributorsOverviewDocument,
    variables,
    headers
  );
export const OrgContributionDistributionDocument = /*#__PURE__*/ `
    query orgContributionDistribution($label: String!, $level: String = "repo", $filterOpts: [FilterOptionInput!], $beginDate: ISO8601DateTime, $endDate: ISO8601DateTime) {
  orgContributionDistribution(
    label: $label
    level: $level
    filterOpts: $filterOpts
    beginDate: $beginDate
    endDate: $endDate
  ) {
    overviewName
    subTypeName
    subTypePercentage
    topContributorDistribution {
      subCount
      subName
      subRatio
      totalCount
      subBelong
    }
  }
}
    `;
export const useOrgContributionDistributionQuery = <
  TData = OrgContributionDistributionQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: OrgContributionDistributionQueryVariables,
  options?: UseQueryOptions<OrgContributionDistributionQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<OrgContributionDistributionQuery, TError, TData>(
    ['orgContributionDistribution', variables],
    fetcher<
      OrgContributionDistributionQuery,
      OrgContributionDistributionQueryVariables
    >(client, OrgContributionDistributionDocument, variables, headers),
    options
  );

useOrgContributionDistributionQuery.getKey = (
  variables: OrgContributionDistributionQueryVariables
) => ['orgContributionDistribution', variables];
useOrgContributionDistributionQuery.fetcher = (
  client: GraphQLClient,
  variables: OrgContributionDistributionQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<
    OrgContributionDistributionQuery,
    OrgContributionDistributionQueryVariables
  >(client, OrgContributionDistributionDocument, variables, headers);
export const OrgContributorsOverviewDocument = /*#__PURE__*/ `
    query orgContributorsOverview($label: String!, $level: String = "repo", $filterOpts: [FilterOptionInput!], $beginDate: ISO8601DateTime, $endDate: ISO8601DateTime) {
  orgContributorsOverview(
    label: $label
    level: $level
    filterOpts: $filterOpts
    beginDate: $beginDate
    endDate: $endDate
  ) {
    overviewName
    subTypeName
    subTypePercentage
    topContributorDistribution {
      subCount
      subName
      subRatio
      totalCount
    }
  }
}
    `;
export const useOrgContributorsOverviewQuery = <
  TData = OrgContributorsOverviewQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: OrgContributorsOverviewQueryVariables,
  options?: UseQueryOptions<OrgContributorsOverviewQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<OrgContributorsOverviewQuery, TError, TData>(
    ['orgContributorsOverview', variables],
    fetcher<
      OrgContributorsOverviewQuery,
      OrgContributorsOverviewQueryVariables
    >(client, OrgContributorsOverviewDocument, variables, headers),
    options
  );

useOrgContributorsOverviewQuery.getKey = (
  variables: OrgContributorsOverviewQueryVariables
) => ['orgContributorsOverview', variables];
useOrgContributorsOverviewQuery.fetcher = (
  client: GraphQLClient,
  variables: OrgContributorsOverviewQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<OrgContributorsOverviewQuery, OrgContributorsOverviewQueryVariables>(
    client,
    OrgContributorsOverviewDocument,
    variables,
    headers
  );
export const ContributorsOverviewDocument = /*#__PURE__*/ `
    query contributorsOverview($label: String!, $level: String = "repo", $filterOpts: [FilterOptionInput!], $beginDate: ISO8601DateTime, $endDate: ISO8601DateTime) {
  orgContributorsDistribution(
    label: $label
    level: $level
    filterOpts: $filterOpts
    beginDate: $beginDate
    endDate: $endDate
  ) {
    overviewName
    subTypeName
    subTypePercentage
    topContributorDistribution {
      subCount
      subName
      subRatio
      totalCount
      subBelong
    }
  }
}
    `;
export const useContributorsOverviewQuery = <
  TData = ContributorsOverviewQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: ContributorsOverviewQueryVariables,
  options?: UseQueryOptions<ContributorsOverviewQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<ContributorsOverviewQuery, TError, TData>(
    ['contributorsOverview', variables],
    fetcher<ContributorsOverviewQuery, ContributorsOverviewQueryVariables>(
      client,
      ContributorsOverviewDocument,
      variables,
      headers
    ),
    options
  );

useContributorsOverviewQuery.getKey = (
  variables: ContributorsOverviewQueryVariables
) => ['contributorsOverview', variables];
useContributorsOverviewQuery.fetcher = (
  client: GraphQLClient,
  variables: ContributorsOverviewQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<ContributorsOverviewQuery, ContributorsOverviewQueryVariables>(
    client,
    ContributorsOverviewDocument,
    variables,
    headers
  );
export const IssuesDetailListDocument = /*#__PURE__*/ `
    query issuesDetailList($label: String!, $level: String = "repo", $page: Int, $per: Int, $filterOpts: [FilterOptionInput!], $sortOpts: [SortOptionInput!], $beginDate: ISO8601DateTime, $endDate: ISO8601DateTime) {
  issuesDetailList(
    label: $label
    level: $level
    page: $page
    per: $per
    filterOpts: $filterOpts
    sortOpts: $sortOpts
    beginDate: $beginDate
    endDate: $endDate
  ) {
    count
    items {
      assigneeLogin
      closedAt
      createdAt
      idInRepo
      labels
      numOfCommentsWithoutBot
      repository
      state
      timeToCloseDays
      timeToFirstAttentionWithoutBot
      title
      url
      userLogin
    }
    page
    totalPage
  }
}
    `;
export const useIssuesDetailListQuery = <
  TData = IssuesDetailListQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: IssuesDetailListQueryVariables,
  options?: UseQueryOptions<IssuesDetailListQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IssuesDetailListQuery, TError, TData>(
    ['issuesDetailList', variables],
    fetcher<IssuesDetailListQuery, IssuesDetailListQueryVariables>(
      client,
      IssuesDetailListDocument,
      variables,
      headers
    ),
    options
  );

useIssuesDetailListQuery.getKey = (
  variables: IssuesDetailListQueryVariables
) => ['issuesDetailList', variables];
useIssuesDetailListQuery.fetcher = (
  client: GraphQLClient,
  variables: IssuesDetailListQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IssuesDetailListQuery, IssuesDetailListQueryVariables>(
    client,
    IssuesDetailListDocument,
    variables,
    headers
  );
export const IssueCompletionDocument = /*#__PURE__*/ `
    query issueCompletion($label: String!, $level: String = "repo", $beginDate: ISO8601DateTime, $endDate: ISO8601DateTime) {
  issuesDetailOverview(
    label: $label
    level: $level
    beginDate: $beginDate
    endDate: $endDate
  ) {
    issueStateDistribution {
      subCount
      subName
      subRatio
      totalCount
    }
  }
}
    `;
export const useIssueCompletionQuery = <
  TData = IssueCompletionQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: IssueCompletionQueryVariables,
  options?: UseQueryOptions<IssueCompletionQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IssueCompletionQuery, TError, TData>(
    ['issueCompletion', variables],
    fetcher<IssueCompletionQuery, IssueCompletionQueryVariables>(
      client,
      IssueCompletionDocument,
      variables,
      headers
    ),
    options
  );

useIssueCompletionQuery.getKey = (variables: IssueCompletionQueryVariables) => [
  'issueCompletion',
  variables,
];
useIssueCompletionQuery.fetcher = (
  client: GraphQLClient,
  variables: IssueCompletionQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IssueCompletionQuery, IssueCompletionQueryVariables>(
    client,
    IssueCompletionDocument,
    variables,
    headers
  );
export const IssueCommentDocument = /*#__PURE__*/ `
    query issueComment($label: String!, $level: String = "repo", $beginDate: ISO8601DateTime, $endDate: ISO8601DateTime) {
  issuesDetailOverview(
    label: $label
    level: $level
    beginDate: $beginDate
    endDate: $endDate
  ) {
    issueCommentDistribution {
      subCount
      subName
      subRatio
      totalCount
    }
  }
}
    `;
export const useIssueCommentQuery = <
  TData = IssueCommentQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: IssueCommentQueryVariables,
  options?: UseQueryOptions<IssueCommentQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<IssueCommentQuery, TError, TData>(
    ['issueComment', variables],
    fetcher<IssueCommentQuery, IssueCommentQueryVariables>(
      client,
      IssueCommentDocument,
      variables,
      headers
    ),
    options
  );

useIssueCommentQuery.getKey = (variables: IssueCommentQueryVariables) => [
  'issueComment',
  variables,
];
useIssueCommentQuery.fetcher = (
  client: GraphQLClient,
  variables: IssueCommentQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<IssueCommentQuery, IssueCommentQueryVariables>(
    client,
    IssueCommentDocument,
    variables,
    headers
  );
export const PullsDetailListDocument = /*#__PURE__*/ `
    query pullsDetailList($label: String!, $level: String = "repo", $page: Int, $per: Int, $filterOpts: [FilterOptionInput!], $sortOpts: [SortOptionInput!], $beginDate: ISO8601DateTime, $endDate: ISO8601DateTime) {
  pullsDetailList(
    label: $label
    level: $level
    page: $page
    per: $per
    filterOpts: $filterOpts
    sortOpts: $sortOpts
    beginDate: $beginDate
    endDate: $endDate
  ) {
    count
    items {
      closedAt
      createdAt
      idInRepo
      labels
      mergeAuthorLogin
      numReviewComments
      repository
      reviewersLogin
      state
      timeToCloseDays
      timeToFirstAttentionWithoutBot
      title
      url
      userLogin
    }
    page
    totalPage
  }
}
    `;
export const usePullsDetailListQuery = <
  TData = PullsDetailListQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: PullsDetailListQueryVariables,
  options?: UseQueryOptions<PullsDetailListQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<PullsDetailListQuery, TError, TData>(
    ['pullsDetailList', variables],
    fetcher<PullsDetailListQuery, PullsDetailListQueryVariables>(
      client,
      PullsDetailListDocument,
      variables,
      headers
    ),
    options
  );

usePullsDetailListQuery.getKey = (variables: PullsDetailListQueryVariables) => [
  'pullsDetailList',
  variables,
];
usePullsDetailListQuery.fetcher = (
  client: GraphQLClient,
  variables: PullsDetailListQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<PullsDetailListQuery, PullsDetailListQueryVariables>(
    client,
    PullsDetailListDocument,
    variables,
    headers
  );
export const PullsCompletionDocument = /*#__PURE__*/ `
    query pullsCompletion($label: String!, $level: String = "repo", $beginDate: ISO8601DateTime, $endDate: ISO8601DateTime) {
  pullsDetailOverview(
    label: $label
    level: $level
    beginDate: $beginDate
    endDate: $endDate
  ) {
    pullStateDistribution {
      subCount
      subName
      subRatio
      totalCount
    }
  }
}
    `;
export const usePullsCompletionQuery = <
  TData = PullsCompletionQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: PullsCompletionQueryVariables,
  options?: UseQueryOptions<PullsCompletionQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<PullsCompletionQuery, TError, TData>(
    ['pullsCompletion', variables],
    fetcher<PullsCompletionQuery, PullsCompletionQueryVariables>(
      client,
      PullsCompletionDocument,
      variables,
      headers
    ),
    options
  );

usePullsCompletionQuery.getKey = (variables: PullsCompletionQueryVariables) => [
  'pullsCompletion',
  variables,
];
usePullsCompletionQuery.fetcher = (
  client: GraphQLClient,
  variables: PullsCompletionQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<PullsCompletionQuery, PullsCompletionQueryVariables>(
    client,
    PullsCompletionDocument,
    variables,
    headers
  );
export const PullsCommentDocument = /*#__PURE__*/ `
    query pullsComment($label: String!, $level: String = "repo", $beginDate: ISO8601DateTime, $endDate: ISO8601DateTime) {
  pullsDetailOverview(
    label: $label
    level: $level
    beginDate: $beginDate
    endDate: $endDate
  ) {
    pullCommentDistribution {
      subCount
      subName
      subRatio
      totalCount
    }
  }
}
    `;
export const usePullsCommentQuery = <
  TData = PullsCommentQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: PullsCommentQueryVariables,
  options?: UseQueryOptions<PullsCommentQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<PullsCommentQuery, TError, TData>(
    ['pullsComment', variables],
    fetcher<PullsCommentQuery, PullsCommentQueryVariables>(
      client,
      PullsCommentDocument,
      variables,
      headers
    ),
    options
  );

usePullsCommentQuery.getKey = (variables: PullsCommentQueryVariables) => [
  'pullsComment',
  variables,
];
usePullsCommentQuery.fetcher = (
  client: GraphQLClient,
  variables: PullsCommentQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<PullsCommentQuery, PullsCommentQueryVariables>(
    client,
    PullsCommentDocument,
    variables,
    headers
  );
export const VerifyDetailDataRangeDocument = /*#__PURE__*/ `
    query verifyDetailDataRange($label: String, $shortCode: String, $beginDate: ISO8601DateTime, $endDate: ISO8601DateTime) {
  verifyDetailDataRange(
    label: $label
    shortCode: $shortCode
    beginDate: $beginDate
    endDate: $endDate
  ) {
    status
    labelAdmin
  }
}
    `;
export const useVerifyDetailDataRangeQuery = <
  TData = VerifyDetailDataRangeQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables?: VerifyDetailDataRangeQueryVariables,
  options?: UseQueryOptions<VerifyDetailDataRangeQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<VerifyDetailDataRangeQuery, TError, TData>(
    variables === undefined
      ? ['verifyDetailDataRange']
      : ['verifyDetailDataRange', variables],
    fetcher<VerifyDetailDataRangeQuery, VerifyDetailDataRangeQueryVariables>(
      client,
      VerifyDetailDataRangeDocument,
      variables,
      headers
    ),
    options
  );

useVerifyDetailDataRangeQuery.getKey = (
  variables?: VerifyDetailDataRangeQueryVariables
) =>
  variables === undefined
    ? ['verifyDetailDataRange']
    : ['verifyDetailDataRange', variables];
useVerifyDetailDataRangeQuery.fetcher = (
  client: GraphQLClient,
  variables?: VerifyDetailDataRangeQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<VerifyDetailDataRangeQuery, VerifyDetailDataRangeQueryVariables>(
    client,
    VerifyDetailDataRangeDocument,
    variables,
    headers
  );
export const MetricModelsOverviewDocument = /*#__PURE__*/ `
    query metricModelsOverview($label: String!, $level: String = "repo", $repoType: String) {
  metricModelsOverview(label: $label, level: $level, repoType: $repoType) {
    dimension
    grimoireCreationDate
    ident
    label
    level
    mainScore
    scope
    transformedScore
    type
    updatedAt
    reposCount
    shortCode
  }
}
    `;
export const useMetricModelsOverviewQuery = <
  TData = MetricModelsOverviewQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: MetricModelsOverviewQueryVariables,
  options?: UseQueryOptions<MetricModelsOverviewQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<MetricModelsOverviewQuery, TError, TData>(
    ['metricModelsOverview', variables],
    fetcher<MetricModelsOverviewQuery, MetricModelsOverviewQueryVariables>(
      client,
      MetricModelsOverviewDocument,
      variables,
      headers
    ),
    options
  );

useMetricModelsOverviewQuery.getKey = (
  variables: MetricModelsOverviewQueryVariables
) => ['metricModelsOverview', variables];
useMetricModelsOverviewQuery.fetcher = (
  client: GraphQLClient,
  variables: MetricModelsOverviewQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<MetricModelsOverviewQuery, MetricModelsOverviewQueryVariables>(
    client,
    MetricModelsOverviewDocument,
    variables,
    headers
  );
export const MetricContributorDocument = /*#__PURE__*/ `
    query metricContributor($label: String!, $level: String = "repo", $start: ISO8601DateTime, $end: ISO8601DateTime, $repoType: String) {
  metricDomainPersona(
    label: $label
    level: $level
    beginDate: $start
    endDate: $end
    repoType: $repoType
  ) {
    activityCodeContributionPerPerson
    activityCodeContributorCount
    activityIssueContributionPerPerson
    activityIssueContributorCount
    activityObservationContributionPerPerson
    activityObservationContributorCount
    domainPersonaScore
    grimoireCreationDate
    label
    level
    shortCode
    type
  }
  metricMilestonePersona(
    label: $label
    level: $level
    beginDate: $start
    endDate: $end
    repoType: $repoType
  ) {
    activityCasualContributionPerPerson
    activityCasualContributorCount
    activityCoreContributionPerPerson
    activityCoreContributorCount
    activityRegularContributionPerPerson
    activityRegularContributorCount
    milestonePersonaScore
    grimoireCreationDate
    label
    level
    shortCode
    type
  }
  metricRolePersona(
    label: $label
    level: $level
    beginDate: $start
    endDate: $end
    repoType: $repoType
  ) {
    activityIndividualContributionPerPerson
    activityIndividualContributorCount
    activityOrganizationContributionPerPerson
    activityOrganizationContributorCount
    rolePersonaScore
    grimoireCreationDate
    label
    level
    shortCode
    type
  }
}
    `;
export const useMetricContributorQuery = <
  TData = MetricContributorQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: MetricContributorQueryVariables,
  options?: UseQueryOptions<MetricContributorQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<MetricContributorQuery, TError, TData>(
    ['metricContributor', variables],
    fetcher<MetricContributorQuery, MetricContributorQueryVariables>(
      client,
      MetricContributorDocument,
      variables,
      headers
    ),
    options
  );

useMetricContributorQuery.getKey = (
  variables: MetricContributorQueryVariables
) => ['metricContributor', variables];
useMetricContributorQuery.fetcher = (
  client: GraphQLClient,
  variables: MetricContributorQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<MetricContributorQuery, MetricContributorQueryVariables>(
    client,
    MetricContributorDocument,
    variables,
    headers
  );
