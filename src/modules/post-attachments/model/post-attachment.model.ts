import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';

import { Post as PostModel } from '../../posts/model/post.model';

@Table
export class PostAttachment extends Model<PostAttachment> {
    @ForeignKey(() => PostModel)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    postId: string;

    @BelongsTo(() => PostModel)
    post: PostModel;

    @Column({
        type: DataType.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
    })
    key: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    fileName: string;

    @Column({
        type: DataType.ENUM,
        values: ['image', 'video'],
        allowNull: false,
    })
    type: string;
}
