import {
    Controller,
    Post,
    Body,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Param,
    Delete,
    Get,
    Query,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostAttachmentDto } from './dto/post-attachmnet.dto';

import { PostAttachmentsService } from './post-attachments.service';

@Controller('post-attachments')
export class PostAttachmentsController {
    constructor(
        private readonly postAttachmentsService: PostAttachmentsService,
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('image')
    @UseInterceptors(FileInterceptor('file'))
    async createAttachedImage(
        @Body() body: PostAttachmentDto,
        @UploadedFile() image: Express.Multer.File,
    ) {
        return this.postAttachmentsService.saveImage(image, body.postId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':key')
    async getImage(
        @Param('key') key: string,
        @Query('type') type: 'video' | 'image',
    ) {
        if (type === 'image') {
            return this.postAttachmentsService.getImage(key);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('video')
    @UseInterceptors(FileInterceptor('file'))
    async createAttachedVideo(
        @Body() body: PostAttachmentDto,
        @UploadedFile() video: Express.Multer.File,
    ) {
        return this.postAttachmentsService.saveVideo(video, body.postId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':key')
    async deleteAttachment(@Param('key') key: string) {
        return this.postAttachmentsService.deleteAttachmentData(key);
    }
}
