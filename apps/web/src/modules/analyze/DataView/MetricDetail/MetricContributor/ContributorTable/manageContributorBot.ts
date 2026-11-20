import type { GraphQLClient } from 'graphql-request';

export type ManageContributorBotVariables = {
  label: string;
  level: string;
  platform: string;
  contributor: string;
  isBot: boolean;
};

type ManageContributorBotResponse = {
  manageContributorBot?: {
    message?: string | null;
    status: string;
  } | null;
};

const manageContributorBotDocument = `
  mutation manageContributorBot(
    $label: String!
    $level: String!
    $platform: String!
    $contributor: String!
    $isBot: Boolean!
  ) {
    manageContributorBot(
      input: {
        label: $label
        level: $level
        platform: $platform
        contributor: $contributor
        isBot: $isBot
      }
    ) {
      message
      status
    }
  }
`;

export const isManageableBotOrigin = (origin: string) =>
  ['github', 'gitee', 'gitcode'].includes(origin);

export const manageContributorBot = (
  client: Pick<GraphQLClient, 'request'>,
  variables: ManageContributorBotVariables
) =>
  client.request<ManageContributorBotResponse>(
    manageContributorBotDocument,
    variables
  );
