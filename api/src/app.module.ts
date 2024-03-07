import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './domain/client/client.module';
import { AssistantModule } from './domain/assistant/assistant.module';
import { PortfolioModule } from './domain/portfolio/portfolio.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      isGlobal: true,
    }),
    ClientModule,
    AssistantModule,
    PortfolioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
