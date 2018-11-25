/* tslint:disable */
import { DataTypes, QueryInterface } from 'sequelize';
import { SIZE_LARGE, SIZE_MEDIUM } from '../Validation';

module.exports = {
    up: (queryInterface: QueryInterface, sequelize: DataTypes): any => queryInterface.createTable('users', {
        creationDate: { type: sequelize.DATE, allowNull: false },
        email: { type: sequelize.STRING(SIZE_LARGE), unique: true, allowNull: false },
        hash: { type: sequelize.STRING(SIZE_MEDIUM), allowNull: false },
        id: { type: sequelize.UUID, primaryKey: true, defaultValue: sequelize.UUIDV4 },
        updatedOn: { type: sequelize.DATE, allowNull: false },
    }),
};
