import { Controller, Get, Param } from '@nestjs/common';
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

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.planetsService.findOne(term);
  }
}
