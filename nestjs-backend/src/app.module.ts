import { Module } from '@nestjs/common';
import { DestinationsModule } from './modules/destinations/destinations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/database/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ChatsModule } from './modules/chats/chats.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => typeormConfig,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION,
      },
    }),
    DestinationsModule,
    AuthModule,
    UsersModule,
    ChatsModule,
  ],
})
export class AppModule { }
