import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [ConfigModule, CommonModule],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
