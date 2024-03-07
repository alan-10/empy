import { Module } from '@nestjs/common';
import { AssistantController } from './assistant.controller';
import { AssistantService } from './assistant.service';
import { PrismaService } from '../../prisma.service'
import { PortfolioModule } from '../portfolio/portfolio.module'

@Module({
  imports: [PortfolioModule],
  controllers: [AssistantController],
  providers: [AssistantService, PrismaService]
})
export class AssistantModule {
  constructor(){}
}
