import { DataTypes, QueryInterface } from 'sequelize';
import { SIZE_LARGE, SIZE_SMALL, SIZE_XXLARGE } from '../validation';

module.exports = {
  up: (queryInterface: QueryInterface, sequelize: DataTypes): any => queryInterface.createTable('environments', {
    creationDate: { type: sequelize.DATE, allowNull: false },
    description: { type: sequelize.STRING(SIZE_XXLARGE), allowNull: true },
    id: { type: sequelize.UUID, primaryKey: true, defaultValue: sequelize.UUIDV4 },
    isPrivate: { type: sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    logo: { type: sequelize.STRING(SIZE_XXLARGE) },
    name: { type: sequelize.STRING(SIZE_LARGE), unique: true, allowNull: false },
    ownerId: { type: sequelize.UUID, allowNull: false },
    pings: { type: sequelize.BIGINT, defaultValue: 0 },
    type: { type: sequelize.STRING(SIZE_SMALL), allowNull: false, defaultValue: 'build-deploy' },
    updatedOn: { type: sequelize.DATE, allowNull: false },
    url: { type: sequelize.STRING(SIZE_XXLARGE) },
    views: { type: sequelize.BIGINT, defaultValue: 0 },
  }),
};
