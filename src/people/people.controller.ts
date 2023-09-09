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

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.peopleService.findOne(term);
  }
}
