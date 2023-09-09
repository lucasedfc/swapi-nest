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

  async findOne(term: string): Promise<Starship> {
    // if term is a number
    if (!isNaN(Number(term))) {
      console.log(term);
      return this.http.get<Starship>(
        `${this.configService.get('SWAPI_URL')}/starships/${term}`,
      );
    }
    const search = await this.http.get<Starships>(
      `${this.configService.get('SWAPI_URL')}/starships?search=${term}`,
    );
    return search.results[0];
  }
}
