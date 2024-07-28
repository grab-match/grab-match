import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TokenService } from './services/token.service';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [
    UsersModule,
  ],
  providers: [
    JwtStrategy,
    AuthService,
    TokenService,
  ],
  controllers: [AuthController],
})
export class AuthModule { }
