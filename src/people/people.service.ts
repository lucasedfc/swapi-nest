import { Injectable } from '@nestjs/common';
import { Character, People } from './interfaces/people.interface';
import { ConfigService } from '@nestjs/config';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class PeopleService {
  constructor(
    private http: AxiosAdapter,
    private readonly configService: ConfigService,
  ) {}
  async findAll(): Promise<People> {
    const data = this.http.get<People>(
      `${this.configService.get('SWAPI_URL')}/people`,
    );
    return data;
  }

  findOne(id: string): Promise<Character> {
    const data = this.http.get<Character>(
      `${this.configService.get('SWAPI_URL')}/people/${id}`,
    );
    return data;
  }
}
