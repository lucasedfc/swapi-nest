import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Starship, Starships } from './interfaces/starships.interface';
import { StarshipsService } from './starships.service';
import { StarshipsModule } from './starships.module';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
import {
  starshipsMockedData,
  StarshipMockedData,
} from '../../test/mock/starships.mock';

describe('StarshipsService', () => {
  let starshipsService: StarshipsService;
  let axiosAdapterMock: jest.Mocked<AxiosAdapter>;
  let configServiceMock: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    axiosAdapterMock = {
      get: jest.fn(),
    } as unknown as jest.Mocked<AxiosAdapter>;

    configServiceMock = {
      get: jest.fn(),
    } as unknown as jest.Mocked<ConfigService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StarshipsService,
        {
          provide: AxiosAdapter,
          useValue: axiosAdapterMock,
        },
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();

    starshipsService = module.get<StarshipsService>(StarshipsService);
  });

  describe('findAll', () => {
    it('should return a list of starships', async () => {
      const expectedData: Starships = starshipsMockedData;
      axiosAdapterMock.get.mockResolvedValue(expectedData);
      configServiceMock.get.mockReturnValue('swapi_url');

      const result = await starshipsService.findAll();
      expect(result).toEqual(expectedData);
      expect(axiosAdapterMock.get).toHaveBeenCalledWith('swapi_url/starships');
    });
  });

  describe('findOne', () => {
    it('should return a starship', async () => {
      const expectedData: Starship = StarshipMockedData;
      axiosAdapterMock.get.mockResolvedValue(expectedData);
      configServiceMock.get.mockReturnValue('swapi_url');

      const result = await starshipsService.findOne('9');
      expect(result).toEqual(expectedData);
      expect(axiosAdapterMock.get).toHaveBeenCalledWith(
        'swapi_url/starships/9',
      );
    });
  });

  describe('StarshipsModule', () => {
    it('should compile the module', async () => {
      const module = await Test.createTestingModule({
        imports: [StarshipsModule],
      }).compile();

      expect(module).toBeDefined();
    });
  });
});
