import { Module } from '@nestjs/common';
import { LlmService } from './services/llm-destinations.service';
import { LlmController } from './llm.controller';
import { LlmMatchService } from './services/llm-match.service';

@Module({
  providers: [
    LlmService,
    LlmMatchService,
  ],
  controllers: [LlmController]
})
export class LlmModule { }
