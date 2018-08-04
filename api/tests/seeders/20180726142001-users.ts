import { DataTypes, QueryInterface } from 'sequelize';
import { v4 as uuid } from 'uuid';

module.exports = {
    up: (queryInterface: QueryInterface, Sequelize: DataTypes) => {
      return queryInterface.bulkInsert('users', [
        {
            id: uuid(),
            email: 'test1@test.com',
            hash: '$2b$08$3GCXpPyjjgXE4RRYvIg12OHMXws0CRxPjbuDid/QRF.s0hEzCoNn2'
        },
        {
            id: uuid(),
            email: 'test2@test.com',
            hash: '$2b$08$U6dOmdUVBhD/CXE6nnj8k.2AeSrpFlxGSPK3nkWwU7FiQP1Nqgwe6'
        }
    ], {});
  }
};
