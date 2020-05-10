module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('vendors', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: Sequelize.STRING,
      erp_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('vendors');
  },
};
