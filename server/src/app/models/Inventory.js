import Sequelize, { Model } from 'sequelize';

class Inventory extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        qty: Sequelize.INTEGER,
        lastPurchaseDate: Sequelize.DATEONLY,
        lastSellingDate: Sequelize.DATEONLY,
      },
      {
        sequelize,
        modelName: 'Inventory',
        tableName: 'inventory',
        timestamps: false,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'product_id',
    });
  }
}

export default Inventory;
