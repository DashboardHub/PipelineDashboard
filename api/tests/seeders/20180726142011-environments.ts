import { DataTypes, QueryInterface } from 'sequelize';
import { v4 as uuid } from 'uuid';

module.exports = {
    up: (queryInterface: QueryInterface, Sequelize: DataTypes) => {
      return queryInterface.bulkInsert('environments', [
        {
            id: uuid(),
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
            id: uuid(),
            isPrivate: true,
            name: 'Environment 2',
            ownerId: 'ce4b330e-5be8-4aa3-a7b5-a6c2802c6b88',
        },
        {
            id: uuid(),
            name: 'Environment 3',
            ownerId: 'f9bfc87f-e36d-4422-b5f1-f90d49eb4a16',
        },
    ], {});
  },
};
