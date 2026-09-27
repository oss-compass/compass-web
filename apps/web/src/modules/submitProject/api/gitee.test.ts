import axios from 'axios';
import { getRepos } from './gitee';
import { defaultPageSize } from './common';

jest.mock('axios');
const get = jest.mocked(axios.get);

describe('Gitee user repository pagination', () => {
  beforeEach(() => {
    get.mockReset();
    get.mockResolvedValue({ data: [] });
  });

  it('requests the page size used by the repository selector', async () => {
    await getRepos({ username: 'example', page: 1 });
    expect(get).toHaveBeenCalledWith(
      'https://gitee.com/api/v5/users/example/repos',
      expect.objectContaining({
        params: expect.objectContaining({ page: 1, per_page: defaultPageSize }),
      })
    );
  });

  it('forwards later pages and explicit page sizes without dropping filters', async () => {
    await getRepos({
      username: 'example',
      page: 2,
      per_page: 25,
      sort: 'created',
      q: 'compass',
    });
    expect(get).toHaveBeenCalledWith(
      'https://gitee.com/api/v5/users/example/repos',
      expect.objectContaining({
        params: {
          page: 2,
          per_page: 25,
          sort: 'created',
          q: 'compass',
          type: 'all',
        },
      })
    );
  });
});
