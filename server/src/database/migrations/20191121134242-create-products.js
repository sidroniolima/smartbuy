module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      vendor_code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      group_id: {
        type: Sequelize.INTEGER,
        references: { model: 'groups', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      vendor_id: {
        type: Sequelize.INTEGER,
        references: { model: 'vendors', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      description: Sequelize.STRING,
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('products');
  },
};
