import { Injectable } from '@nestjs/common';
import { Film, Films } from './interfaces/films.interfaces';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilmsService {
  constructor(
    private http: AxiosAdapter,
    private readonly configService: ConfigService,
  ) {}
  async findAll(): Promise<Films> {
    return this.http.get<Films>(`${this.configService.get('SWAPI_URL')}/films`);
  }

  async findOne(term: string): Promise<Film> {
    // if term is a number
    if (!isNaN(Number(term))) {
      console.log(term);
      return this.http.get<Film>(
        `${this.configService.get('SWAPI_URL')}/films/${term}`,
      );
    }
    const search = await this.http.get<Films>(
      `${this.configService.get('SWAPI_URL')}/films?search=${term}`,
    );
    return search.results[0];
  }
}
