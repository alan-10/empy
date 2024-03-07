import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Assistant, Prisma } from '@prisma/client';
import { PortfolioService } from '../portfolio/portfolio.service'

@Injectable()
export class AssistantService {

  constructor(
    private prisma: PrismaService,
    private portfolioService: PortfolioService
  ) { }

  async create(assistantDTO: Prisma.AssistantCreateInput): Promise<Assistant> {

    const assistantCreated = await this.prisma.assistant.create({ data: assistantDTO })

    await this.portfolioService.create(assistantCreated.id)

    return assistantCreated;
  }


  async list() {
    const assistants = await this.prisma.assistant.findMany();
    return assistants;
  }


  async getByIdAssitantBYId(id: string): Promise<Assistant> {
    const assistant = await this.prisma.assistant.findUnique({ where: { id } });

    return assistant;
  }

}
