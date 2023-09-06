import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.filmsService.findOne(id);
  }
}
