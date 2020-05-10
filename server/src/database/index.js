import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Product from '../app/models/Product';
import Vendor from '../app/models/Vendor';
import Purchase from '../app/models/Purchase';
import PurchaseItem from '../app/models/PurchaseItem';
import Inventory from '../app/models/Inventory';
import Group from '../app/models/Group';
import ProductImage from '../app/models/ProductImage';

const models = [
  User,
  Product,
  Vendor,
  Purchase,
  PurchaseItem,
  Inventory,
  Group,
  ProductImage,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
