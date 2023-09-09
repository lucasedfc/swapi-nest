import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(searchTerm: string): Promise<Starship> {
    const swapiUrl = this.configService.get('SWAPI_URL');

    if (isNaN(Number(searchTerm))) {
      const search = await this.http.get<Starships>(
        `${swapiUrl}/starships?search=${searchTerm}`,
      );
      if (!search.results[0]) {
        throw new NotFoundException('Starship not found');
      }
      return search.results[0];
    }

    const res = await this.http.get<Starship>(
      `${swapiUrl}/starships/${searchTerm}`,
    );
    if (!res) {
      throw new NotFoundException('Starship not found');
    }
    return res;
  }
}
