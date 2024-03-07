import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { PrismaService } from '../../prisma.service'
import { ClientService } from './client.service'
@Module({
  imports:[PortfolioModule],
  controllers: [ClientController],
  providers: [ClientService, PrismaService]
})
export class ClientModule { }
