import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PeopleService } from './people.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  findAll() {
    return this.peopleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.peopleService.findOne(id);
  }
}
