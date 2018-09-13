import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface, Sequelize: DataTypes) => {
      return queryInterface.bulkInsert('users', [
        {
            id: 'ce4b330e-5be8-4aa3-a7b5-a6c2802c6b88',
            email: 'test1@test.com',
            hash: '$2b$08$3GCXpPyjjgXE4RRYvIg12OHMXws0CRxPjbuDid/QRF.s0hEzCoNn2'
        },
        {
            id: 'f9bfc87f-e36d-4422-b5f1-f90d49eb4a16',
            email: 'test2@test.com',
            hash: '$2b$08$U6dOmdUVBhD/CXE6nnj8k.2AeSrpFlxGSPK3nkWwU7FiQP1Nqgwe6'
        }
    ], {});
  }
};
