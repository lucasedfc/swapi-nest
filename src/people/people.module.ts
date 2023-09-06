import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [ConfigModule, CommonModule],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}
