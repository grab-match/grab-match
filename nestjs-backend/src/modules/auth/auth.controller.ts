import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './services/auth.service';
import { SocialAuthLoginDto } from './dto/social-auth-login.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from 'src/config/guard/jwt-auth.guard';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Controller({
    version: '1',
    path: 'auth',
})
@ApiTags('v1/auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) { }

    @Post('login')
    async login(@Body() dto: AuthLoginDto) {
        return await this.authService.login(dto);
    }

    @Post('register')
    async register(@Body() dto: AuthRegisterDto) {
        return await this.authService.register(dto);
    }

    @Post('social')
    async social(
        @Body() dto: SocialAuthLoginDto,
    ) {
        return await this.authService.verifyGoogleIdToken(dto.token_id);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async me(@Request() req,) {
        return await this.authService.get(req.user);
    }
}
