import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Post } from 'src/modules/posts/model/post.model';

@Table
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.ENUM,
        values: ['male', 'female'],
        allowNull: false,
    })
    gender: string;

    @Column({
        type: DataType.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
    })
    id: string;

    @HasMany(() => Post)
    posts: Post[];
}
