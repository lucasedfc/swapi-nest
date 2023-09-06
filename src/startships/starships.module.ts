import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [ConfigModule, CommonModule],
  controllers: [StarshipsController],
  providers: [StarshipsService],
})
export class StarshipsModule {}
