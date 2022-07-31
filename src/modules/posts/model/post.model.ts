import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';

import { User as UserModel } from '../../users/model/user.model';

@Table
export class Post extends Model<Post> {
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    body: string;

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    userId: string;

    @BelongsTo(() => UserModel)
    user: UserModel;

    @Column({
        type: DataType.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
    })
    id: string;
}
