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

  findOne(id: string): Promise<Film> {
    return this.http.get<Film>(
      `${this.configService.get('SWAPI_URL')}/films/${id}`,
    );
  }
}
