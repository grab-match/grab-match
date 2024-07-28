import { Body, Controller, Post } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('gemini')
export class GeminiController {

    constructor(
        private readonly geminiService: GeminiService,
    ) { }

    @Post('chat')
    async startChat(
        @Body() data: any,
    ): Promise<any> {
        return this.geminiService.startChat(data.data);
    }
}
