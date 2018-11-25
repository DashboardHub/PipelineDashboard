import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface, Sequelize: DataTypes) => {
      return queryInterface.bulkInsert('environments', [
        {
            id: '549e8b5e-35dd-473a-b33b-42ce9b15f15a',
            isPrivate: false,
            logo: 'https://cdn.dashboardhub.io/icon-only-orange-120x120.png',
            name: 'Environment 1',
            ownerId: 'ce4b330e-5be8-4aa3-a7b5-a6c2802c6b88',
            pings: 1234,
            type: 'build-deploy',
            url: 'https://dashboardhub.io',
            views: 5678,
        },
        {
            id: '00258853-feff-45c8-a078-88416a2edb18',
            isPrivate: true,
            name: 'Environment 2',
            ownerId: 'ce4b330e-5be8-4aa3-a7b5-a6c2802c6b88',
        },
        {
            id: '90fc3454-71ec-469b-a636-c8c9186a1ba2',
            name: 'Environment 3',
            ownerId: 'f9bfc87f-e36d-4422-b5f1-f90d49eb4a16',
        },
    ], {});
  },
};
