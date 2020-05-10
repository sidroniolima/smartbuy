import Sequelize, { Model } from 'sequelize';

class Purchase extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        orderDate: Sequelize.DATE,
        totalPrice: Sequelize.DECIMAL(10, 2),
      },
      {
        sequelize,
        modelName: 'Purchase',
        timestamps: true,
      }
    );

    this.addHook('beforeSave', async purchase => {
      purchase.totalPrice = await purchase.items
        .map(lineItem => parseFloat(lineItem.lineTotal))
        .reduce((total, value) => total + value, 0);
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'creator',
    });

    this.belongsTo(models.Vendor, {
      foreignKey: 'vendor_id',
      as: 'vendor',
    });

    this.hasMany(models.PurchaseItem, {
      foreignKey: 'purchase_id',
      as: 'items',
    });
  }
}

export default Purchase;
