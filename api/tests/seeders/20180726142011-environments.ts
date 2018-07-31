import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface, Sequelize: DataTypes) => {
      return queryInterface.bulkInsert('environments', [
        {
            name: 'Environment 1'
        },
        {
            name: 'Environment 2'
        }
    ], {});
  }
};
