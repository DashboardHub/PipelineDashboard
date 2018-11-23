import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: DataTypes) => {
      return queryInterface.createTable('environments', {
          id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
          ownerId: { type: Sequelize.UUID, allowNull: false },
          type: { type: Sequelize.STRING(32), allowNull: false, defaultValue: 'build-deploy' },
          isPrivate: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
          name: { type: Sequelize.STRING(128), unique: true, allowNull: false },
          description: { type: Sequelize.STRING(1024), allowNull: true },
          url: { type: Sequelize.STRING(1024) },
          logo: { type: Sequelize.STRING(1024) },
          pings: { type: Sequelize.BIGINT, defaultValue: 0 },
          views: { type: Sequelize.BIGINT, defaultValue: 0 },
          creationDate: { type: Sequelize.DATE, allowNull: false },
          updatedOn: { type: Sequelize.DATE, allowNull: false },
      });
  }
};
