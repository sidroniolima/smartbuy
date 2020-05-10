import request from 'supertest';
import factory from '../factories';
import app from '../../src/app';
import truncate, { truncateByKey } from '../util/truncate';

describe('Inventory', () => {
  let token;
  let product;
  let productId;

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

  beforeEach(async () => {
    await truncateByKey('Product');
    await truncateByKey('Inventory');

    product = await factory.attrs('Product', {
      vendorCode: 'XYZ',
    });

    const response = await request(app)
      .post('/products')
      .set('authorization', `Bearer ${token}`)
      .send(product);

    productId = response.body.id;
  });

  it('should create a inventory item', async () => {
    const inventoryItem = await factory.attrs('Inventory', {
      product_id: productId,
    });

    const response = await request(app)
      .post('/inventory/')
      .set('authorization', `Bearer ${token}`)
      .send(inventoryItem);

    expect(response.status).toBe(200);
  });

  it('should return a inventory item by product vendor code', async () => {
    const inventoryItem = await factory.attrs('Inventory', {
      product_id: productId,
    });

    await request(app)
      .post('/inventory/')
      .set('authorization', `Bearer ${token}`)
      .send(inventoryItem);

    const response = await request(app)
      .get(`/inventory/${product.vendorCode}`)
      .set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.product.id).toBe(productId);
  });
});
