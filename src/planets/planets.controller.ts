import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Planets')
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  findAll() {
    return this.planetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.planetsService.findOne(id);
  }
}
