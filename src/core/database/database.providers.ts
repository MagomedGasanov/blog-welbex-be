import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/model/user.model';
import { Post } from '../../modules/posts/model/post.model';
import { PostAttachment } from 'src/modules/post-attachments/model/post-attachment.model';

export const databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async () => {
            let config;
            switch (process.env.NODE_ENV) {
                case DEVELOPMENT:
                    config = databaseConfig.development;
                    break;
                case TEST:
                    config = databaseConfig.test;
                    break;
                case PRODUCTION:
                    config = databaseConfig.production;
                    break;
                default:
                    config = databaseConfig.development;
            }
            const sequelize = new Sequelize(
                'postgres://jxmyhuuacachds:bf78c1bbf3891e41e3424fd0ab843df2c2d406583c76fa7142a587108727a388@ec2-44-193-178-122.compute-1.amazonaws.com:5432/d89bklbvl7h6pe',
                {
                    dialectOptions: {
                        ssl: {
                            require: true,
                            rejectUnauthorized: false,
                        },
                    },
                },
            );
            sequelize.addModels([User, Post, PostAttachment]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
