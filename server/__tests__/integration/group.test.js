import request from 'supertest';
import factory from '../factories';
import app from '../../src/app';
import truncate from '../util/truncate';

describe('Group', () => {
  let token;
  let group;

  beforeEach(async () => {
    await truncate();
  });

  beforeAll(async () => {
    const user = await factory.attrs('User');

    const responseUser = await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/sessions')
      .send({
        email: responseUser.body.email,
        password: responseUser.body.password,
      });

    token = response.body.token;
  });

  it('should create a group', async () => {
    const response = await request(app)
      .post('/groups')
      .set('authorization', `Bearer ${token}`)
      .send({
        description: 'Brinco',
      });

    group = response.body;
    console.log(group);

    expect(response.status).toBe(200);
    expect(group.description).toBe('Brinco');
  });
});
