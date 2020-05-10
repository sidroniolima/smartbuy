import request from 'supertest';
import bcrypt from 'bcryptjs';

import app from '../../src/app';
import truncate from '../util/truncate';
import factory from '../factories';

describe('User Post', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('it should encrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });
});

describe('User Update', () => {
  let token;
  let userSaved;

  beforeEach(async () => {
    await truncate();

    const user = await factory.attrs('User');

    const responseUser = await request(app)
      .post('/users')
      .send(user);

    userSaved = responseUser.body;

    const response = await request(app)
      .post('/sessions')
      .send({
        email: responseUser.body.email,
        password: responseUser.body.password,
      });

    token = response.body.token;
  });

  it('should be able to update a user name', async () => {
    const { id, email } = userSaved;

    const responseUserPut = await request(app)
      .put('/users')
      .set('authorization', `Bearer ${token}`)
      .send({ email, name: 'Sidronio' });

    expect(responseUserPut.status).toBe(200);
    expect(responseUserPut.body.id).toBe(id);
    expect(responseUserPut.body.email).toBe(email);
    expect(responseUserPut.body.name).toBe('Sidronio');
  });

  it('should be able to update a user email', async () => {
    const { name } = userSaved;

    const responseUserPut = await request(app)
      .put('/users')
      .set('authorization', `Bearer ${token}`)
      .send({ email: 'sidronio@hotmail.com', name });

    expect(responseUserPut.status).toBe(200);
    expect(responseUserPut.body.email).toBe('sidronio@hotmail.com');
  });

  it('should NOT be able to update a email user that already exists', async () => {
    const { name } = userSaved;

    const user = await factory.attrs('User', { email: 'sidronio@hotmail.com' });

    await request(app)
      .post('/users')
      .send(user);

    const responseUserPut = await request(app)
      .put('/users')
      .set('authorization', `Bearer ${token}`)
      .send({ email: 'sidronio@hotmail.com', name });

    expect(responseUserPut.status).toBe(400);
  });

  it('should NOT be able to update the password', async () => {
    const { name } = userSaved;

    const user = await factory.attrs('User', { email: 'sidronio@hotmail.com' });

    await request(app)
      .post('/users')
      .send(user);

    const responseUserPut = await request(app)
      .put('/users')
      .set('authorization', `Bearer ${token}`)
      .send({
        email: 'sidronio@hotmail.com',
        name,
        password: '132456',
        oldPassword: '123456',
        confirmPassword: '123456',
      });

    expect(responseUserPut.status).toBe(400);
  });

  it('should be able to update the password', async () => {
    const { email, password } = userSaved;

    const responseUserPut = await request(app)
      .put('/users')
      .set('authorization', `Bearer ${token}`)
      .send({
        email,
        password: '123456',
        oldPassword: password,
        confirmPassword: '123456',
      });

    expect(responseUserPut.status).toBe(200);
  });

  it('should be able to update the password cause confirm is not equal', async () => {
    const { password } = userSaved;

    const responseUserPut = await request(app)
      .put('/users')
      .set('authorization', `Bearer ${token}`)
      .send({
        password: '123456',
        oldPassword: password,
        confirmPassword: '1234567',
      });

    expect(responseUserPut.status).toBe(400);
  });
});
