import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Portfolio  } from '@prisma/client';

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) { }


  async create(assistantID: string): Promise<Portfolio> {
    const portfolio = this.prisma.portfolio.create({ data: { assistantId: assistantID } })
    return portfolio
  }


  async getPortfolioByAssistantId(assistantId: string){
    const portfolio = await this.prisma.portfolio.findUnique({
      where:  {
        assistantId: assistantId
      }
    });

    return portfolio;
  }

}
