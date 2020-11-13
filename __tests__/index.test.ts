import { testRequest, apiPrefix } from './util/jest-setup';

describe('Index test', () => {
  it('should test WELCOME message', async () => {
    const { status, body } = await testRequest.get(apiPrefix);
    expect(status).toBe(200);
    expect(body).toEqual({
      message: 'Welcome to QueroEducação API!',
      version: 'v.1.0.0',
    });
  });
});
