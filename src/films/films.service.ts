import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(searchTerm: string): Promise<Film> {
    const apiUrl = this.configService.get('SWAPI_URL');

    if (isNaN(Number(searchTerm))) {
      const search = await this.http.get<Films>(
        `${apiUrl}/films?search=${searchTerm}`,
      );
      if (!search.results[0]) {
        throw new NotFoundException('Film not found');
      }
      return search.results[0];
    }

    const res = await this.http.get<Film>(`${apiUrl}/films/${searchTerm}`);
    if (!res) {
      throw new NotFoundException('Film not found');
    }
    return res;
  }
}
