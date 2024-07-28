import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/config/guard/jwt-auth.guard';

@Controller({
    version: '1',
    path: 'users',
})
@ApiTags('v1/users')
export class UsersController {

    constructor(
        private usersService: UsersService,
    ) { }

    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.usersService.findOneById(+id);
    }

    @Get(':id/match_percentage')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    matchPercentage(
        @Param('id') id: string,
        @Request() req: any,
    ) {
        return this.usersService.matchPercentage(+id, req.user);
    }
}
