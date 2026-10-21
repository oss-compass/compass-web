import {
  isManageableBotOrigin,
  manageContributorBot,
} from './manageContributorBot';

describe('manageContributorBot', () => {
  it('sends the selected contributor and scope to the mutation', async () => {
    const response = {
      manageContributorBot: { message: '', status: 'true' },
    };
    const client = { request: jest.fn().mockResolvedValue(response) };
    const variables = {
      label: 'https://github.com/oss-compass/compass-web',
      level: 'repo',
      platform: 'github',
      contributor: 'dependabot',
      isBot: true,
    };

    await expect(manageContributorBot(client, variables)).resolves.toBe(
      response
    );
    expect(client.request).toHaveBeenCalledWith(expect.anything(), variables);
  });

  it.each(['github', 'gitee', 'gitcode'])(
    'allows the supported %s contributor source',
    (origin) => {
      expect(isManageableBotOrigin(origin)).toBe(true);
    }
  );

  it.each(['', 'combine', 'atomgit'])(
    'rejects the unsupported %s contributor source',
    (origin) => {
      expect(isManageableBotOrigin(origin)).toBe(false);
    }
  );
});
