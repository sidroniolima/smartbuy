import request from 'supertest';
import fs from 'fs';
import factory from '../factories';
import app from '../../src/app';
import truncate from '../util/truncate';

describe('Group', () => {
  let token;
  let product;
  let group;

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
    await truncate();

    const groupResponse = await request(app)
      .post('/groups')
      .set('authorization', `Bearer ${token}`)
      .send({
        description: 'Brinco',
      });

    group = groupResponse.body;

    const productFactory = await factory.attrs('Product', {
      groupId: group.id,
    });

    const responseForProduct = await request(app)
      .post('/products')
      .set('authorization', `Bearer ${token}`)
      .send(productFactory);

    product = responseForProduct.body;
  });

  it('should create (uploads) images for a product', async () => {
    const image1 = Buffer.from(
      fs.readFileSync('__tests__/images/1.jpg')
    ).toString('base64');

    const image2 = Buffer.from(
      fs.readFileSync('__tests__/images/2.jpg')
    ).toString('base64');

    const images = [image1, image2];

    const data = {
      images,
      productId: product.id,
    };

    const response = await request(app)
      .post('/product-images')
      .set('authorization', `Bearer ${token}`)
      .send(data);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});
