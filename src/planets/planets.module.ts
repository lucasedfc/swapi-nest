import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [ConfigModule, CommonModule],
  controllers: [PlanetsController],
  providers: [PlanetsService],
})
export class PlanetsModule {}
