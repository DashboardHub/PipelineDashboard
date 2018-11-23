import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface, Sequelize: DataTypes) => {
      return queryInterface.bulkInsert('users', [
        {
            email: 'test1@test.com',
            hash: '$2a$08$TfnVPTyeV9AukMdclysDpOqHpR62h/VkXEyrrzJT0j31dw07UYE0S',
            id: 'ce4b330e-5be8-4aa3-a7b5-a6c2802c6b88',
        },
        {
            email: 'test2@test.com',
            hash: '$2a$08$TfnVPTyeV9AukMdclysDpOqHpR62h/VkXEyrrzJT0j31dw07UYE0S',
            id: 'f9bfc87f-e36d-4422-b5f1-f90d49eb4a16',
        },
    ], {});
  },
};
