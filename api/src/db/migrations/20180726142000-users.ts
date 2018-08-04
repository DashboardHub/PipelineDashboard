'use strict';

import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: DataTypes) => {
      return queryInterface.createTable('users', {
          id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
          email: { type: Sequelize.STRING(128), unique: true, allowNull: false },
          hash: { type: Sequelize.STRING(64), allowNull: false },
      });
  }
};
