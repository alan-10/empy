import { Controller, Post, Body, Get } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { Assistant, Prisma } from '@prisma/client'

@Controller('assistant')
export class AssistantController {
  constructor(private assistantService: AssistantService) { }

  @Post()
  async create(@Body() assistantDTO: Prisma.AssistantCreateInput): Promise<Assistant> {
    return this.assistantService.create(assistantDTO);
  }

  @Get()
  async list() {
    return await this.assistantService.list()
  }


}
