import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Client, Prisma, User } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';
import { VinculatePortfolioUserDTO } from './dtos/vinculatePortfolioUser.tdo';
import { PortfolioService } from '../portfolio/portfolio.service'




@Injectable()
export class ClientService {
  constructor(
    private prisma: PrismaService,
    private portfolioService: PortfolioService
  ) { }

  async create(clientDTO: Prisma.ClientCreateInput): Promise<Client> {

    const alreadyUsedCode = await this.prisma.client.findFirst({
      where: { AND: [{ code: clientDTO.code }, { merchant: clientDTO.merchant }] }
    })

    if (alreadyUsedCode) {
      throw new HttpException('Code alredy used', HttpStatus.CONFLICT);
    }

    const clientCreated = await this.prisma.client.create({ data: clientDTO });

    return clientCreated;
  }


  async list() {
    return await this.prisma.client.findMany()
  }



  async clientWithoutPortifolio() {
    const clientes = await this.prisma.client.findMany({
      where: {
        portfolioId: null
      }
    })

    return clientes
  }


  async vinculatePortfolioClient({ assistantId, clientIds }: VinculatePortfolioUserDTO): Promise<Prisma.BatchPayload> {

    const portfolio = await this.portfolioService.getPortfolioByAssistantId(assistantId);

    if (!portfolio) {
      throw new HttpException('Error associete Client in portfiolio', HttpStatus.NOT_FOUND)
    }

    const addedPortfolioUser = await this.prisma.client.updateMany({
      where: {
        id: { in: clientIds },
      },
      data: {
        portfolioId: portfolio.id
      }
    })
    return addedPortfolioUser;

  }


  async removePortfolioUserByAssistant({ assistantId, clientIds}: VinculatePortfolioUserDTO): Promise<Prisma.BatchPayload> {


    const addedPortfolioUser = await this.prisma.client.updateMany({
      where: {
        id: { in: clientIds },
        portifolio: {
          assistantId: assistantId
        }
      },
      data: {
        portfolioId: null
      }
    })
    return addedPortfolioUser;
    
  }






  async listClientsByPortfolioAssistant(assistantId: string): Promise<Client[]> {

    const clients = await this.prisma.client.findMany({
      include: {
        portifolio: true,
      },
      where: {
        portifolio: {
          assistantId: assistantId,
        },
      }
    })

    return clients;
  }


}
