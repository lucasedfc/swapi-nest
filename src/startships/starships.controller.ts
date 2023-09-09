import { Controller, Get, Param } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Starships')
@Controller('starships')
export class StarshipsController {
  constructor(private readonly startshipsService: StarshipsService) {}

  @Get()
  findAll() {
    return this.startshipsService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.startshipsService.findOne(term);
  }
}
