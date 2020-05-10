import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Vendor from '../src/app/models/Vendor';
import Purchase from '../src/app/models/Purchase';
import PurchaseItem from '../src/app/models/PurchaseItem';
import Product from '../src/app/models/Product';
import Inventory from '../src/app/models/Inventory';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Vendor', Vendor, {
  name: faker.company.companyName(),
  erpCode: faker.random.word(),
});

factory.define('Purchase', Purchase, {
  orderDate: faker.date.recent(),
  items: [0, 1, 2].map(() => ({
    orderQty: faker.random.number(10),
    unitPrice: faker.commerce.price(),
    lineTotal: faker.commerce.price(),
  })),
});

factory.define('PurchaseItem', PurchaseItem, {
  orderQty: faker.random.number(10),
  unitPrice: faker.commerce.price(),
  lineTotal: faker.commerce.price(),
});

factory.define('Product', Product, {
  vendorCode: faker.commerce.productAdjective(),
  description: faker.commerce.productName(),
});

factory.define('Inventory', Inventory, {
  qty: faker.random.number(100),
  lastPurchaseDate: faker.date.recent(),
  lastSellingDate: faker.date.recent(),
});

export default factory;
