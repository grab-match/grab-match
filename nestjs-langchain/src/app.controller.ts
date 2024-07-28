import { Body, Controller, Get, Post } from '@nestjs/common';
import { LlmService } from './modules/llm/services/llm-destinations.service';

@Controller()
export class AppController {
  constructor(private readonly appService: LlmService) { }

}
