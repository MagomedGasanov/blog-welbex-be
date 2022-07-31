import { Injectable, Inject } from '@nestjs/common';

import { User as UserModel } from './model/user.model';
import { USER_REPOSITORY } from '../../core/constants';
import { CreateUserType } from './types/user.type';

@Injectable()
export class UsersService {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: typeof UserModel,
    ) {}

    async create(user: CreateUserType): Promise<UserModel> {
        return await this.userRepository.create<UserModel>(user);
    }

    async findOneByEmail(email: string): Promise<UserModel> {
        return await this.userRepository.findOne<UserModel>({
            where: { email },
        });
    }

    async findOneById(id: number): Promise<UserModel> {
        return await this.userRepository.findOne<UserModel>({ where: { id } });
    }
}
