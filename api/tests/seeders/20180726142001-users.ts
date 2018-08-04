import { DataTypes, QueryInterface } from 'sequelize';
import { v4 as uuid } from 'uuid';

module.exports = {
    up: (queryInterface: QueryInterface, Sequelize: DataTypes) => {
      return queryInterface.bulkInsert('users', [
        {
            id: uuid(),
            email: 'test1@test.com',
            password: 'test1test'
        },
        {
            id: uuid(),
            email: 'test2@test.com',
            password: 'test2test'
        }
    ], {});
  }
};
