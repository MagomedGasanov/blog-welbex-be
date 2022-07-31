import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/model/user.model';
import { Post } from '../../modules/posts/model/post.model';
import { PostAttachment } from 'src/modules/post-attachments/model/post-attachment.model';

export const databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async () => {
            let config: SequelizeOptions;
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
            const sequelize = new Sequelize(config);
            sequelize.addModels([User, Post, PostAttachment]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
