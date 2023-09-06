import axios, { AxiosError, AxiosInstance } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private logger: Logger = new Logger('AxiosAdapter');
  private axios: AxiosInstance = axios;
  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      this.handleAxiosException(error as AxiosError);
    }
  }

  private handleAxiosException(error: AxiosError): never {
    const { response } = error;
    this.logger.error(error);
    if (response.status === 404) throw new NotFoundException(error.message);

    throw new InternalServerErrorException('Unexpected error');
  }
}
