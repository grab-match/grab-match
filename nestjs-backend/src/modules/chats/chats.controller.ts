import { Body, Controller, Post } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

class Dto { }

@Controller({
    version: '1',
    path: 'chats',
})
@ApiTags('v1/chats')
export class ChatsController {

    constructor(
        private readonly chatsService: ChatsService,
    ) { }

    @Post('recommendation')
    async getRecommendation(
        @Body() body: Dto,
    ) {
        return await this.chatsService.getRecommendation(body);
    }
}
