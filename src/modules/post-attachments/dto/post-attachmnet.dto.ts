import { IsNotEmpty } from 'class-validator';

export class PostAttachmentDto {
    @IsNotEmpty()
    postId: string;
}
