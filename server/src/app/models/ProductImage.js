import Sequelize, { Model } from 'sequelize';

class ProductImage extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
        productId: Sequelize.INTEGER,
      },
      {
        sequelize,
        modelName: 'ProductImage',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      as: 'product',
      foreignKey: { name: 'product_id', fieldName: 'productId' },
    });
  }
}

export default ProductImage;
