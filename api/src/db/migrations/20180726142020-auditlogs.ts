import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: DataTypes) => {
      return queryInterface.createTable('auditlogs', {
          id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
          userId: { type: Sequelize.UUID, allowNull: false },
          namespace: { type: Sequelize.STRING(32), allowNull: false },
          type: { type: Sequelize.STRING(32), allowNull: false },
          details: { type: Sequelize.STRING(255), allowNull: false },
          client: { type: Sequelize.STRING(255), allowNull: false },
          creationDate: { type: Sequelize.DATE, allowNull: false },
          updatedOn: { type: Sequelize.DATE, allowNull: false },
      });
  }
};
