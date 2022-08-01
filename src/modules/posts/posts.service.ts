import { Injectable, Inject } from '@nestjs/common';

import { v4 as uuidV4 } from 'uuid';

import { Post as PostModel } from './model/post.model';
import { PostDto } from './dto/post.dto';
import { User as UserModel } from '../users/model/user.model';
import { POST_REPOSITORY } from '../../core/constants';
import { PostAttachment } from '../post-attachments/model/post-attachment.model';

@Injectable()
export class PostsService {
    constructor(
        @Inject(POST_REPOSITORY)
        private readonly postRepository: typeof PostModel,
    ) {}

    async create(post: PostDto, userId: string): Promise<PostModel> {
        const uuid = uuidV4();
        return await this.postRepository.create<PostModel>({
            ...post,
            id: uuid,
            userId,
        });
    }

    async findAll(): Promise<PostModel[]> {
        return await this.postRepository.findAll<PostModel>({
            include: [
                { model: UserModel, attributes: { exclude: ['password'] } },
                { model: PostAttachment },
            ],
        });
    }

    async findOne(id: string): Promise<PostModel> {
        return await this.postRepository.findOne({
            where: { id },
            include: [
                { model: UserModel, attributes: { exclude: ['password'] } },
                { model: PostAttachment },
            ],
        });
    }

    // async findPostsByUserId(userId: string): Promise<Post[]> {
    //     return await this.postRepository.findAll<Post>();
    // }

    async delete(id: string, userId: string) {
        return await this.postRepository.destroy({ where: { id, userId } });
    }

    async update(id: string, data: PostDto, userId: string) {
        const [numberOfAffectedRows, [updatedPost]] =
            await this.postRepository.update(
                { ...data },
                { where: { id, userId }, returning: true },
            );
        return { numberOfAffectedRows, updatedPost };
    }
}
