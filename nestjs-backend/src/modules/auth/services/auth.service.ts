require('dotenv').config();

import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import { AuthLoginDto } from '../dto/auth-login.dto';
import { TokenService } from './token.service';
import { AuthRegisterDto } from '../dto/auth-register.dto';

const oauthClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
);

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private tokenService: TokenService,
    ) { }

    async login(dto: AuthLoginDto) {
        const validatedUser = await this.userService.validateUser(dto.email, dto.password);
        const token = await this.tokenService.signJwtToken(validatedUser.id.toString());

        return {
            user: validatedUser,
            token: token,
        };
    }

    async register(dto: AuthRegisterDto) {
        const user = await this.userService.create(new UserEntity(dto));
        const token = await this.tokenService.signJwtToken(user.id.toString());

        return {
            user: user,
            token: token,
        };
    }

    async get(user) {
        const token = await this.tokenService.signJwtToken(user.id.toString());

        return {
            user: user,
            token: token,
        }
    }

    async verifyGoogleIdToken(idToken: string) {
        try {
            const response = await oauthClient.verifyIdToken({
                idToken,
                audience: [
                    '520895525376-1jsqpgnstq70j485v85bp6q1vmoem0q4.apps.googleusercontent.com',
                    '318421369758-d1ant30jc0u7on9jie2ve043m028b23l.apps.googleusercontent.com',
                ],
            });
            const payload = response.getPayload();

            if (payload) {
                const { email, name, picture } = payload;
                const user = await this.logInOrRegister(email, name, picture);
                const token = await this.tokenService.signJwtToken(user.id.toString());

                return {
                    user,
                    token,
                };
            } else {
                throw new ForbiddenException('Invalid token');
            }
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async logInOrRegister(email: string, name: string, picture: string) {
        let user = await this.userService.findOneByEmail(email);

        if (!user) {
            user = await this.userService.create(new UserEntity({
                email,
                name,
                picture,
            }));
        }

        return user;

    }
}
