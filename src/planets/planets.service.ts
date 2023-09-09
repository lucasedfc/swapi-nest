import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
import { Planet, Planets } from './interfaces/planets.interfaces';

@Injectable()
export class PlanetsService {
  constructor(
    private http: AxiosAdapter,
    private readonly configService: ConfigService,
  ) {}

  async findAll(): Promise<Planets> {
    const data = this.http.get<Planets>(
      `${this.configService.get('SWAPI_URL')}/planets`,
    );
    return data;
  }

  async findOne(term: string): Promise<Planet> {
    // if term is a number
    if (!isNaN(Number(term))) {
      console.log(term);
      return this.http.get<Planet>(
        `${this.configService.get('SWAPI_URL')}/planets/${term}`,
      );
    }
    const search = await this.http.get<Planets>(
      `${this.configService.get('SWAPI_URL')}/planets?search=${term}`,
    );
    return search.results[0];
  }
}
