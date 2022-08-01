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
            'postgres://jxmyhuuacachds:bf78c1bbf3891e41e3424fd0ab843df2c2d406583c76fa7142a587108727a388@ec2-44-193-178-122.compute-1.amazonaws.com:5432/d89bklbvl7h6pe',
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
