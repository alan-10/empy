import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ClientService } from './client.service';
import { Prisma, Client } from '@prisma/client';
import { VinculatePortfolioUserDTO } from './dtos/vinculatePortfolioUser.tdo'

@Controller('client')
export class ClientController {

  constructor(private clientService: ClientService) { }

  @Post()
  async create(@Body() clientDTO: Prisma.ClientCreateInput): Promise<Client> {
    const clientCreated = await this.clientService.create(clientDTO);
    return clientCreated;
  }

  @Get()
  async list() {
    const clients = await this.clientService.list();
    return clients;
  }


  @Get('/withoutPortifolio')
  async listClienteWithoutPortfolio() {
    const clientes = await this.clientService.clientWithoutPortifolio()
    return clientes;
  }

  @Put('/vinculatePortfolio')
  async vinculatePortfolioClient(
    @Body() { assistantId, clientIds }: VinculatePortfolioUserDTO,

  ) {

    const userWithPorfolio = this.clientService.vinculatePortfolioClient({ assistantId, clientIds: clientIds });
    return userWithPorfolio;
  }

  @Put('/removePortfolio')
  async removePortfolio(
    @Body() { assistantId, clientIds }: VinculatePortfolioUserDTO
  ) {

    const client = await this.clientService.removePortfolioUserByAssistant({ assistantId, clientIds });
    return client;
  }

  @Get('/listClientsByPortfolioAssistant/:id')
  async listClientsByPortfolioAssistant(@Param('id') id: string) {

    const clients = await this.clientService.listClientsByPortfolioAssistant(id)

    return clients;

  }

}
