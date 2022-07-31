import { PostAttachment as PostAttachmentModel } from './model/post-attachment.model';
import { POST_ATTACHMENT_REPOSITORY } from '../../core/constants';

export const postAttachmentsProviders = [
    {
        provide: POST_ATTACHMENT_REPOSITORY,
        useValue: PostAttachmentModel,
    },
];
