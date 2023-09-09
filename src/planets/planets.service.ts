import { Injectable, NotFoundException } from '@nestjs/common';
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
    if (!isNaN(Number(term))) {
      const planetById = await this.fetchPlanetById(term);
      return planetById;
    }

    const planetBySearch = await this.fetchPlanetBySearch(term);
    if (!planetBySearch) {
      throw new NotFoundException('Planet not found');
    }

    return planetBySearch;
  }

  private async fetchPlanetById(id: string): Promise<Planet> {
    const url = `${this.configService.get('SWAPI_URL')}/planets/${id}`;
    const planet = await this.http.get<Planet>(url);
    return planet;
  }

  private async fetchPlanetBySearch(term: string): Promise<Planet> {
    const url = `${this.configService.get('SWAPI_URL')}/planets?search=${term}`;
    const searchResults = await this.http.get<Planets>(url);
    if (!searchResults.results[0]) {
      throw new NotFoundException('Planet not found');
    }
    const planet = searchResults.results[0];
    return planet;
  }
}
