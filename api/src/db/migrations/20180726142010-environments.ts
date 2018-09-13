'use strict';

import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: DataTypes) => {
      return queryInterface.createTable('environments', {
          id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
          ownerId: { type: Sequelize.UUID, allowNull: false },
          name: { type: Sequelize.STRING(128), unique: true, allowNull: false }
      });
  }
};
