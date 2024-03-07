import { Controller, Get } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { Portfolio } from '@prisma/client';

@Controller('portfolio')
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}



}
