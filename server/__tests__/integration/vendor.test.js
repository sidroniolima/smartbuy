import request from 'supertest';
import factory from '../factories';
import app from '../../src/app';
import truncate from '../util/truncate';

describe('Vendor', () => {
  let token;

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

  it('should create a vendor', async () => {
    const vendor = await factory.attrs('Vendor');

    const response = await request(app)
      .post('/vendors')
      .set('authorization', `Bearer ${token}`)
      .send(vendor);

    expect(response.status).toBe(200);
    expect(response.body.erpCode).toBe(vendor.erpCode);
  });

  it('should update a vendor', async () => {
    const vendor = await factory.attrs('Vendor');

    const postResponse = await request(app)
      .post('/vendors')
      .set('authorization', `Bearer ${token}`)
      .send(vendor);

    const response = await request(app)
      .put('/vendors')
      .set('authorization', `Bearer ${token}`)
      .send({ ...postResponse.body, erpCode: '000006' });

    expect(response.status).toBe(200);
    expect(response.body.erpCode).toBe('000006');
  });

  it('should return a vendor by ID', async () => {
    const vendor = await factory.attrs('Vendor');

    const postResponse = await request(app)
      .post('/vendors')
      .set('authorization', `Bearer ${token}`)
      .send(vendor);

    const response = await request(app)
      .get(`/vendors/${postResponse.body.id}`)
      .set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should return all vendors', async () => {
    const firstVendor = await factory.attrs('Vendor');
    const secondVendor = await factory.attrs('Vendor');

    await request(app)
      .post('/vendors')
      .set('authorization', `Bearer ${token}`)
      .send(firstVendor);

    await request(app)
      .post('/vendors')
      .set('authorization', `Bearer ${token}`)
      .send(secondVendor);

    const response = await request(app)
      .get(`/vendors`)
      .set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it('should delete a vendor by ID', async () => {
    const firstVendor = await factory.attrs('Vendor');
    const secondVendor = await factory.attrs('Vendor');

    await request(app)
      .post('/vendors')
      .set('authorization', `Bearer ${token}`)
      .send(firstVendor);

    const postResponse = await request(app)
      .post('/vendors')
      .set('authorization', `Bearer ${token}`)
      .send(secondVendor);

    await request(app)
      .delete(`/vendors/${postResponse.body.id}`)
      .set('authorization', `Bearer ${token}`);

    const responseGet = await request(app)
      .get(`/vendors`)
      .set('authorization', `Bearer ${token}`);

    const responseDeleted = await request(app)
      .get(`/vendors/${postResponse.body.id}`)
      .set('authorization', `Bearer ${token}`);

    expect(responseDeleted.status).toBe(404);
    expect(responseGet.body.length).toBe(1);
  });
});
