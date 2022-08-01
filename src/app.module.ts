import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostsModule } from './modules/posts/posts.module';
import { PostAttachmentsModule } from './modules/post-attachments/post-attachments.module';
import * as path from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        DatabaseModule,
        UsersModule,
        AuthModule,
        PostsModule,
        PostAttachmentsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
