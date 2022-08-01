import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_DEVELOPMENT,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: 'postgres',
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_TEST,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: 'postgres',
    },
    production: {
        use_env_variable:
            'postgres://umfavwsjrevjgo:1cbe4cfcd355d74c7b3bd16b537c910d910c5dc2fbe86760de8477ac1557a67f@ec2-107-22-122-106.compute-1.amazonaws.com:5432/d91pfq3b46ndmv',
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
};
