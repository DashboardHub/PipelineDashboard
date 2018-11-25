/* tslint:disable */
import { Sequelize } from 'sequelize-typescript';
import { config, stage } from '../config';

export const db: Sequelize = new Sequelize({
    database: config[stage].database,
    dialect: config[stage].dialect,
    modelPaths: [`${__dirname}/db/models`],
    operatorsAliases: Sequelize.Op as any,
    password: config[stage].password,
    username: config[stage].username,
});
