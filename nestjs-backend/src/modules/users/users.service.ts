import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { PasswordHashHelper } from 'src/common/helper/hash/password-hash.helper';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import { UserGender, UserStatus, UserZodiac, UserReligion, UserShortBio } from './enums/user-data.enum';
import { UserInterest } from './enums/user-interest.enum';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) { }

    async create(user: UserEntity): Promise<UserEntity> {
        const gender = faker.helpers.arrayElement(Object.values(UserGender));
        const status = faker.helpers.arrayElement(Object.values(UserStatus));
        const zodiac = faker.helpers.arrayElement(Object.values(UserZodiac));
        const religion = faker.helpers.arrayElement(Object.values(UserReligion));

        return await this.userRepository.save(new UserEntity({
            age: faker.number.int({ min: 18, max: 35 }),
            short_bio: faker.helpers.arrayElement(Object.values(UserShortBio)),
            about: `I am a ${gender}, currently ${status}, my zodiac sign is ${zodiac}, and I am a ${religion}`,
            interests: faker.helpers.shuffle(Object.values(UserInterest)).slice(0, 5).join(', '),
            ...user,
            password: user.password ? await PasswordHashHelper.hash(user.password) : undefined,
        }));
    }

    async findOneById(id: number): Promise<UserEntity> {
        return await this.userRepository.findOneBy({ id });
    }

    async findOneByEmail(email: string): Promise<UserEntity> {
        return await this.userRepository.findOneBy({ email });
    }

    async validateUser(email: string, currentPassword: string) {
        const builder = this.userRepository
            .createQueryBuilder('u')
            .where('u.email = :email', { email })
            .addSelect('u.password');

        const user = await builder.getOne();

        if (!user) {
            throw new UnauthorizedException('Email or password is incorrect');
        }

        const isPasswordCorrect = await PasswordHashHelper.comparePassword(currentPassword, user.password);
        if (!isPasswordCorrect) {
            throw new UnauthorizedException('Email or password is incorrect');
        }

        delete user.password;
        return user;
    }

    async matchPercentage(id: number, user: any, retry = 0) {
        const matchUser = await this.userRepository.findOneBy({ id });

        try {
            const response = await axios.post(`${process.env.LLM_API_URL}/llm/match`, {
                me: user,
                match: matchUser,
            });
            return response.data;
        } catch (error) {
            console.error('Error when calling LLM', error, retry);
            if (retry >= 3) {
                throw new Error('Failed to get recommendation from LLM');
            } else {
                return this.matchPercentage(id, user, retry + 1);
            }
        }
    }
}
