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
    const data = this.http.get<Films>(
      `${this.configService.get('SWAPI_URL')}/films`,
    );
    return data;
  }

  findOne(id: string): Promise<Film> {
    const data = this.http.get<Film>(
      `${this.configService.get('SWAPI_URL')}/films/${id}`,
    );
    return data;
  }
}
