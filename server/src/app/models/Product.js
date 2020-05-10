import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        vendorCode: {
          type: Sequelize.INTEGER,
          unique: true,
        },
        description: Sequelize.STRING,
        groupId: Sequelize.INTEGER,
      },
      {
        sequelize,
        modelName: 'Product',
        timestamps: false,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Vendor, {
      foreignKey: 'vendor_id',
      as: 'vendor',
    });
    this.belongsTo(models.Group, {
      foreignKey: { name: 'group_id', fieldName: 'groupId' },
      as: 'group',
    });
  }
}

export default Product;
