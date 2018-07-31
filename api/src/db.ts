import { Sequelize } from 'sequelize-typescript';
const config = require('../config.json');

const stage: string = process.env.NODE_ENV || 'development';

export const db = new Sequelize({
    dialect: config[stage].dialect,
    operatorsAliases: Sequelize.Op as any,
    database: config[stage].database,
    username: config[stage].username,
    password: config[stage].password,
    modelPaths: [__dirname + '/db/models']
});
