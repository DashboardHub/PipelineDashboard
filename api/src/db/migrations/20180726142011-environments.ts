'use strict';

import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: DataTypes) => {
      return queryInterface.createTable('environments', {
          name: Sequelize.STRING
      });
  }
};
