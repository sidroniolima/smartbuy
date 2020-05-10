module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('inventory', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      last_purchase_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      last_selling_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      qty: Sequelize.INTEGER,
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('inventory');
  },
};
