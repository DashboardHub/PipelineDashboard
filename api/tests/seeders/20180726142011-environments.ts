import { DataTypes, QueryInterface } from 'sequelize';
import { v4 as uuid } from 'uuid';

module.exports = {
    up: (queryInterface: QueryInterface, Sequelize: DataTypes) => {
      return queryInterface.bulkInsert('environments', [
        {
            id: uuid(),
            ownerId: 'ce4b330e-5be8-4aa3-a7b5-a6c2802c6b88',
            name: 'Environment 1'
        },
        {
            id: uuid(),
            ownerId: 'f9bfc87f-e36d-4422-b5f1-f90d49eb4a16',
            name: 'Environment 2'
        }
    ], {});
  }
};
