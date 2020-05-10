import request from 'supertest';
import factory from '../factories';
import app from '../../src/app';
import truncate, { truncateByKey } from '../util/truncate';

describe('Purchase', () => {
  let token;
  let productOneId;
  let productTwoId;
  let productThreeId;
  let vendorId;
  let purchaseItemOne;
  let purchaseItemTwo;
  let group;

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

    const groupResponse = await request(app)
      .post('/groups')
      .send({
        description: 'Brinco',
      });

    group = groupResponse.body;
  });

  beforeEach(async () => {
    await truncateByKey('PurchaseItem');
    await truncateByKey('Purchase');
    await truncateByKey('Product');

    const productOne = await factory.attrs('Product', { group_id: group.id });
    const responseProductOne = await request(app)
      .post('/products')
      .set('authorization', `Bearer ${token}`)
      .send(productOne);

    productOneId = responseProductOne.body.id;

    const productTwo = await factory.attrs('Product', { group_id: group.id });
    const responseProductTwo = await request(app)
      .post('/products')
      .set('authorization', `Bearer ${token}`)
      .send(productTwo);

    productTwoId = responseProductTwo.body.id;

    const productThree = await factory.attrs('Product', { group_id: group.id });
    const responseProductThree = await request(app)
      .post('/products')
      .set('authorization', `Bearer ${token}`)
      .send(productThree);

    productThreeId = responseProductThree.body.id;

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
  });

  it('should create a purchase', async () => {
    const purchase = await factory.attrs('Purchase', {
      items: [purchaseItemOne, purchaseItemTwo],
      vendor_id: vendorId,
    });

    const purchaseTotalValue =
      purchaseItemOne.orderQty * purchaseItemOne.unitPrice +
      purchaseItemTwo.orderQty * purchaseItemTwo.unitPrice;

    const response = await request(app)
      .post('/purchases')
      .set('authorization', `Bearer ${token}`)
      .send(purchase);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');

    const { items } = response.body;

    expect(items.length).toBe(2);
    expect(response.body.totalPrice).toBe(purchaseTotalValue);

    const { product_id } = items[0];
    expect(product_id).toBe(productOneId);
  });

  it('should update a purchase, removing a item, changing the other and including a new one', async () => {
    const purchase = await factory.attrs('Purchase', {
      items: [purchaseItemOne, purchaseItemTwo],
      vendor_id: vendorId,
    });

    const response = await request(app)
      .post('/purchases')
      .set('authorization', `Bearer ${token}`)
      .send(purchase);

    const purchaseSaved = response.body;

    const { items } = purchaseSaved;

    const itemOneChanged = { ...items[0], unitPrice: 666 };

    const purchaseItemThree = await factory.attrs('PurchaseItem', {
      product_id: productThreeId,
      purchase_id: purchaseSaved.id,
    });

    const purchaseChanged = {
      ...purchaseSaved,
      items: [itemOneChanged, purchaseItemThree],
    };

    const responseUpdate = await request(app)
      .put('/purchases')
      .set('authorization', `Bearer ${token}`)
      .send(purchaseChanged);

    expect(responseUpdate.body.id).toBe(purchaseSaved.id);
    expect(responseUpdate.body.items.length).toBe(2);
    expect(responseUpdate.body.items[0].product_id).toBe(productOneId);
    expect(responseUpdate.body.items[0].unitPrice).toBe(666);
    expect(responseUpdate.body.items[1].product_id).toBe(productThreeId);

    expect(responseUpdate.body.updatedAt).not.toBe(purchaseSaved.updatedAt);
  });

  it('should delete a purchase', async () => {
    const purchase = await factory.attrs('Purchase', {
      items: [purchaseItemOne, purchaseItemTwo],
      vendor_id: vendorId,
    });

    await request(app)
      .post('/purchases')
      .set('authorization', `Bearer ${token}`)
      .send(purchase);

    const getResponse = await request(app)
      .get('/purchases')
      .set('authorization', `Bearer ${token}`);

    expect(getResponse.body.length).toBe(1);

    const deleteResponse = await request(app)
      .delete(`/purchases/${getResponse.body[0].id}`)
      .set('authorization', `Bearer ${token}`);

    expect(deleteResponse.status).toBe(200);

    const anotherGetResponse = await request(app)
      .get('/purchases')
      .set('authorization', `Bearer ${token}`);

    expect(anotherGetResponse.body.length).toBe(0);
  });
});
