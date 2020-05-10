import Sequelize, { Model } from 'sequelize';

class Group extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        description: Sequelize.STRING,
      },
      {
        sequelize,
        modelName: 'Group',
        timestamps: false,
      }
    );

    return this;
  }
}

export default Group;
