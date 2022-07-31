import { Inject, Injectable } from '@nestjs/common';
import { POST_ATTACHMENT_REPOSITORY } from 'src/core/constants';
import { FilesService } from 'src/core/files/files.service';
import { PostAttachment as PostAttachmentModel } from './model/post-attachment.model';

@Injectable()
export class PostAttachmentsService {
    constructor(
        @Inject(POST_ATTACHMENT_REPOSITORY)
        private readonly postAttachmentRepository: typeof PostAttachmentModel,
        private fileService: FilesService,
    ) {}

    async saveImage(image: Express.Multer.File, postId: string) {
        const originalName = image.originalname;
        const fileExtension = this.getExtension(originalName);
        const fileKey = await this.fileService.createFile(
            image,
            fileExtension,
            'images',
        );
        return this.saveAttachmentDataInDB(
            fileKey,
            originalName,
            'image',
            postId,
        );
    }

    async saveVideo(video: Express.Multer.File, postId: string) {
        const originalName = video.originalname;
        const fileExtension = this.getExtension(originalName);
        const fileKey = await this.fileService.createFile(
            video,
            fileExtension,
            'video',
        );
        return this.saveAttachmentDataInDB(
            fileKey,
            originalName,
            'video',
            postId,
        );
    }

    async saveAttachmentDataInDB(
        fileKey: string,
        originalName: string,
        type: 'image' | 'video',
        postId: string,
    ) {
        const data = {
            postId,
            key: fileKey,
            fileName: originalName,
            type,
        };
        return this.postAttachmentRepository.create<PostAttachmentModel>(data);
    }

    async deleteAttachmentData(key: string) {
        return this.postAttachmentRepository.destroy<PostAttachmentModel>({
            where: { key },
        });
    }

    private getExtension(str: string): string {
        return str.slice(str.lastIndexOf('.'));
    }
}
