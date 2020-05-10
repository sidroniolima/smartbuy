import Sequelize, { Model } from 'sequelize';

class Vendor extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: Sequelize.STRING,
        erpCode: Sequelize.STRING,
      },
      {
        sequelize,
        modelName: 'Vendor',
        timestamps: false,
      }
    );

    return this;
  }
}

export default Vendor;
