import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Films')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  findAll() {
    return this.filmsService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.filmsService.findOne(term);
  }
}
