import { Body, Controller, Post } from '@nestjs/common';
import { LlmService } from './services/llm-destinations.service';
import { LlmMatchService } from './services/llm-match.service';

@Controller('llm')
export class LlmController {

    constructor(
        private readonly llmService: LlmService,
        private readonly llmMatchService: LlmMatchService,
    ) { }

    @Post('destinations')
    getLlm(
        @Body('data') data: any,
        @Body('start_time') startTime: string,
        @Body('duration') duration: string,
        @Body('longitude') longitude: number,
        @Body('latitude') latitude: number,
    ) {
        return this.llmService.generateItenary(
            data,
            startTime,
            duration,
            longitude,
            latitude,
        );
    }

    @Post('match')
    getMatchPercentage(
        @Body('me') me: any,
        @Body('match') match: any,
    ) {
        return this.llmMatchService.getMatchPercentage(me, match);
    }
}
