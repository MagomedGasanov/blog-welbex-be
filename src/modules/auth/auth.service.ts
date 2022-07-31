import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { v4 as uuidV4 } from 'uuid';

import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string) {
        const user = await this.userService.findOneByEmail(username);
        if (!user) {
            return null;
        }

        const match = await this.comparePassword(pass, user.password);

        if (!match) {
            return null;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user['dataValues'];
        return result;
    }

    public async login(user) {
        const token = await this.generateToken(user);
        return { user, token };
    }

    public async create(user: UserDto) {
        const hashPass = await this.hashPassword(user.password);

        const uuid = uuidV4();

        const newUser = await this.userService.create({
            ...user,
            id: uuid,
            password: hashPass,
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = newUser['dataValues'];

        const token = await this.generateToken(result);

        return { user: result, token };
    }

    private async generateToken(user) {
        const token = await this.jwtService.signAsync(user);
        return token;
    }

    private async hashPassword(password: string) {
        const SALT = 10;
        const hash = await bcrypt.hash(password, SALT);
        return hash;
    }

    private async comparePassword(enteredPassword: string, dbPassword: string) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
}
