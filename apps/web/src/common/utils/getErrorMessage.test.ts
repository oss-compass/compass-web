import { ClientError, GraphQLClient } from 'graphql-request';
import getErrorMessage from './getErrorMessage';

const endpoint = 'https://example.invalid/graphql';
const mutation = 'mutation SubmitApplication { submitApplication { id } }';

describe('getErrorMessage', () => {
  it.each([
    {
      name: 'Error',
      error: new Error('Network request failed'),
      message: 'Network request failed',
    },
    {
      name: 'TypeError',
      error: new TypeError('Failed to fetch'),
      message: 'Failed to fetch',
    },
  ])('preserves a transport $name rejected by GraphQLClient', async ({
    error,
    message,
  }) => {
    // Only the fetch boundary is controlled; the client and helper are real.
    const fetch = jest.fn().mockRejectedValue(error);
    const client = new GraphQLClient(endpoint, { fetch });
    const request = client.request(mutation);

    await expect(request).rejects.toBe(error);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      endpoint,
      expect.objectContaining({ method: 'POST' })
    );
    await expect(request.catch(getErrorMessage)).resolves.toBe(message);
  });

  it('preserves an ordinary Error message', () => {
    expect(getErrorMessage(new Error('Connection closed'))).toBe(
      'Connection closed'
    );
  });

  it('preserves a string message on an error-like object', () => {
    expect(getErrorMessage({ message: 'Request was cancelled' })).toBe(
      'Request was cancelled'
    );
  });

  it('uses the ordinary message when the GraphQL errors list is empty', () => {
    expect(
      getErrorMessage({
        response: { errors: [] },
        message: 'Gateway unavailable',
      })
    ).toBe('Gateway unavailable');
  });

  it.each([
    {
      name: 'one server error',
      errors: [{ message: 'Application rejected' }],
    },
    {
      name: 'multiple server errors',
      errors: [
        { message: 'Application rejected' },
        { message: 'A later server message' },
      ],
    },
  ])('prefers the first GraphQL message for $name', ({ errors }) => {
    const error = new ClientError({ status: 400, errors }, { query: mutation });

    expect(error.message).not.toBe('Application rejected');
    expect(getErrorMessage(error)).toBe('Application rejected');
  });

  it.each([
    ['undefined', undefined],
    ['null', null],
    ['an empty object', {}],
    ['an Error without a message', new Error()],
    ['a numeric message', { message: 503 }],
    ['a null message', { message: null }],
    ['an empty GraphQL errors list', { response: { errors: [] } }],
    ['a plain string', 'Network request failed'],
  ])('returns an empty string for %s', (_name, error) => {
    expect(getErrorMessage(error)).toBe('');
  });
});
