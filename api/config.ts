interface IConfig {
    database: string;
    dialect: string;
    host: string;
    password: string;
    salt: number;
    secret: string;
    username: string;
}

export const stage: string = process.env.NODE_ENV || 'development';

export const config: { [key: string]: IConfig } = {
    development: {
        database: 'dashboardhub',
        dialect: 'mysql',
        host: '127.0.0.1',
        password: '',
        salt: 8,
        secret: 'your_jwt_secret',
        username: 'root',
    },

    production: {
        database: 'dashboardhub-prod',
        dialect: 'mysql',
        host: '127.0.0.1',
        password: 'root',
        salt: 8,
        secret: 'asd£$%£@egf324sadf@!',
        username: 'root',
    },

    test: {
        database: 'dashboardhub-test',
        dialect: 'mysql',
        host: '127.0.0.1',
        password: 'root',
        salt: 8,
        secret: 'your_jwt_secret',
        username: 'root',
    },
};
