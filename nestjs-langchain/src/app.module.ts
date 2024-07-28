import { Module } from '@nestjs/common';
import { LlmModule } from './modules/llm/llm.module';
import { GeminiModule } from './modules/gemini/gemini.module';

@Module({
  imports: [LlmModule, GeminiModule],
})
export class AppModule { }
