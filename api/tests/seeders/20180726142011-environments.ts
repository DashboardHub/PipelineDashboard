import { DataTypes, QueryInterface } from 'sequelize';
import { v4 as uuid } from 'uuid';

module.exports = {
    up: (queryInterface: QueryInterface, Sequelize: DataTypes) => {
      return queryInterface.bulkInsert('environments', [
        {
            id: uuid(),
            name: 'Environment 1'
        },
        {
            id: uuid(),
            name: 'Environment 2'
        }
    ], {});
  }
};
