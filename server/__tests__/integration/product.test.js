import request from 'supertest';
import factory from '../factories';
import app from '../../src/app';
import truncate from '../util/truncate';

describe('Product', () => {
  let token;
  let group;

  beforeEach(async () => {
    await truncate();

    const groupResponse = await request(app)
      .post('/groups')
      .set('authorization', `Bearer ${token}`)
      .send({
        description: 'Brinco',
      });

    group = groupResponse.body;
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

  it('should create a product', async () => {
    const product = await factory.attrs('Product', {
      groupId: group.id,
    });

    const responseProduct = await request(app)
      .post('/products')
      .set('authorization', `Bearer ${token}`)
      .send(product);

    expect(responseProduct.status).toBe(200);
    expect(responseProduct.body.erpCode).toBe(product.erpCode);

    const responseInventory = await request(app)
      .get(`/inventory/${responseProduct.body.vendorCode}`)
      .set('authorization', `Bearer ${token}`);

    expect(responseInventory.status).toBe(200);
    expect(responseInventory.body.product.id).toBe(responseProduct.body.id);
  });

  it('should update a product', async () => {
    const product = await factory.attrs('Product');

    const postResponse = await request(app)
      .post('/products')
      .set('authorization', `Bearer ${token}`)
      .send(product);

    const response = await request(app)
      .put('/products')
      .set('authorization', `Bearer ${token}`)
      .send({
        ...postResponse.body,
        vendorCode: '000006',
        description: 'another description',
      });

    expect(response.status).toBe(200);
    expect(response.body.vendorCode).toBe('000006');
    expect(response.body.description).toBe('another description');
  });

  it('should return a product by ID', async () => {
    const product = await factory.attrs('Product');

    const postResponse = await request(app)
      .post('/products')
      .set('authorization', `Bearer ${token}`)
      .send(product);

    const response = await request(app)
      .get(`/products/${postResponse.body.id}`)
      .set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should return all products', async () => {
    const firstProduct = await factory.attrs('Product');
    const secondProduct = await factory.attrs('Product');

    await request(app)
      .post('/products')
      .set('authorization', `Bearer ${token}`)
      .send(firstProduct);

    await request(app)
      .post('/products')
      .set('authorization', `Bearer ${token}`)
      .send(secondProduct);

    const response = await request(app)
      .get(`/products`)
      .set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it('should delete a product by ID', async () => {
    const firstProduct = await factory.attrs('Product');
    const secondProduct = await factory.attrs('Product');

    await request(app)
      .post('/products')
      .set('authorization', `Bearer ${token}`)
      .send(firstProduct);

    const postResponse = await request(app)
      .post('/products')
      .set('authorization', `Bearer ${token}`)
      .send(secondProduct);

    await request(app)
      .delete(`/products/${postResponse.body.id}`)
      .set('authorization', `Bearer ${token}`);

    const responseGet = await request(app)
      .get(`/products`)
      .set('authorization', `Bearer ${token}`);

    const responseDeleted = await request(app)
      .get(`/products/${postResponse.body.id}`)
      .set('authorization', `Bearer ${token}`);

    expect(responseDeleted.status).toBe(404);
    expect(responseGet.body.length).toBe(1);
  });
});
