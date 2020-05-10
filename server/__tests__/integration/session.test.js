import request from 'supertest';

import app from '../../src/app';
import truncate from '../util/truncate';
import factory from '../factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to session', async () => {
    const user = await factory.attrs('User');

    const responseUser = await request(app)
      .post('/users')
      .send(user);

    const responseSession = await request(app)
      .post('/sessions')
      .send({
        email: responseUser.body.email,
        password: responseUser.body.password,
      });

    expect(responseSession.status).toBe(200);

    expect(responseSession.body).toHaveProperty('user');

    expect(responseSession.body.user).toStrictEqual({
      id: responseUser.body.id,
      name: responseUser.body.name,
      email: responseUser.body.email,
    });

    expect(responseSession.body).toHaveProperty('token');
  });
});
