import { Post as PostModel } from './model/post.model';
import { POST_REPOSITORY } from '../../core/constants';

export const postsProviders = [
    {
        provide: POST_REPOSITORY,
        useValue: PostModel,
    },
];
