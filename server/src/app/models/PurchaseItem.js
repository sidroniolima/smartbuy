import Sequelize, { Model } from 'sequelize';

class PurchaseItem extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        orderQty: Sequelize.INTEGER,
        unitPrice: Sequelize.DECIMAL(10, 2),
        lineTotal: {
          type: Sequelize.VIRTUAL(Sequelize.DECIMAL(10, 2)),
          get() {
            return (
              this.getDataValue('orderQty') * this.getDataValue('unitPrice')
            );
          },
        },
      },
      {
        sequelize,
        modelName: 'PurchaseItem',
        timestamps: true,
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

export default PurchaseItem;
