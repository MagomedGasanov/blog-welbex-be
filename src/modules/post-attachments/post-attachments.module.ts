import { Module } from '@nestjs/common';
import { FilesService } from 'src/core/files/files.service';
import { PostAttachmentsController } from './post-attachments.controller';
import { postAttachmentsProviders } from './post-attachments.providers';
import { PostAttachmentsService } from './post-attachments.service';

@Module({
    controllers: [PostAttachmentsController],
    providers: [
        PostAttachmentsService,
        FilesService,
        ...postAttachmentsProviders,
    ],
})
export class PostAttachmentsModule {}
