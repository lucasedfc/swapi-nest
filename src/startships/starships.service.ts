import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
import { Starships, Starship } from './interfaces/starships.interface';

@Injectable()
export class StarshipsService {
  constructor(
    private http: AxiosAdapter,
    private readonly configService: ConfigService,
  ) {}
  async findAll(): Promise<Starships> {
    const data = this.http.get<Starships>(
      `${this.configService.get('SWAPI_URL')}/starships`,
    );
    return data;
  }

  findOne(id: string): Promise<Starship> {
    const data = this.http.get<Starship>(
      `${this.configService.get('SWAPI_URL')}/starships/${id}`,
    );
    return data;
  }
}
