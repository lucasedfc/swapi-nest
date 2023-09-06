import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.startshipsService.findOne(id);
  }
}
