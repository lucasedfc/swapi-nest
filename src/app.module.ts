import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PlanetsModule } from './planets/planets.module';
import { FilmsModule } from './films/films.module';
import { StarshipsModule } from './startships/starships.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PeopleModule,
    HttpModule,
    PlanetsModule,
    StarshipsModule,
    FilmsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
