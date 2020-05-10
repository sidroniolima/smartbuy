import request from 'supertest';
import factory from '../factories';
import app from '../../src/app';
import truncate, { truncateByKey } from '../util/truncate';

describe('Purchase', () => {
  let token;
  let productOneId;
  let productTwoId;
  let vendorId;
  let purchaseItemOne;
  let purchaseItemTwo;

  beforeAll(async () => {
    await truncate();
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
    await truncateByKey('PurchaseItem');
    await truncateByKey('Purchase');
    await truncateByKey('Product');

    const productOne = await factory.attrs('Product');
    const responseProductOne = await request(app)
      .post('/products')
      .set('authorization', `Bearer ${token}`)
      .send(productOne);

    productOneId = responseProductOne.body.id;

    const productTwo = await factory.attrs('Product');
    const responseProductTwo = await request(app)
      .post('/products')
      .set('authorization', `Bearer ${token}`)
      .send(productTwo);

    productTwoId = responseProductTwo.body.id;

    const vendor = await factory.attrs('Vendor');
    const responseVendor = await request(app)
      .post('/vendors')
      .set('authorization', `Bearer ${token}`)
      .send(vendor);

    vendorId = responseVendor.body.id;

    purchaseItemOne = await factory.attrs('PurchaseItem', {
      product_id: productOneId,
    });
    purchaseItemTwo = await factory.attrs('PurchaseItem', {
      product_id: productTwoId,
    });

    const purchaseOne = await factory.attrs('Purchase', {
      items: [purchaseItemOne, purchaseItemTwo],
      orderDate: new Date('2020-01-01'),
      vendor_id: vendorId,
    });

    const purchaseTwo = await factory.attrs('Purchase', {
      items: [purchaseItemOne],
      orderDate: new Date('2019-01-01'),
      vendor_id: vendorId,
    });

    await request(app)
      .post('/purchases')
      .set('authorization', `Bearer ${token}`)
      .send(purchaseOne);

    await request(app)
      .post('/purchases')
      .set('authorization', `Bearer ${token}`)
      .send(purchaseTwo);
  });

  it('should return latests purchases', async () => {
    const response = await request(app)
      .get('/latests-purchases')
      .set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).not.toBe([]);
    expect(response.body[0].orderDate).toBe(
      new Date('2020-01-01').toISOString()
    );
    expect(response.body[1].orderDate).toBe(
      new Date('2019-01-01').toISOString()
    );
  });
});
