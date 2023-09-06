import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsService } from './planets.service';
import { Planet, Planets } from './interfaces/planets.interfaces';
import { PlanetsModule } from './planets.module';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
import {
  PlanetMockedData,
  PlanetsMockedData,
} from '../../test/mock/planets.mock';

describe('PlanetsService', () => {
  let planetService: PlanetsService;
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
        PlanetsService,
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

    planetService = module.get<PlanetsService>(PlanetsService);
  });

  describe('findAll', () => {
    it('should return a list of planets', async () => {
      const expectedData: Planets = PlanetsMockedData;
      axiosAdapterMock.get.mockResolvedValue(expectedData);
      configServiceMock.get.mockReturnValue('swapi_url');

      const result = await planetService.findAll();
      expect(result).toEqual(expectedData);
      expect(axiosAdapterMock.get).toHaveBeenCalledWith('swapi_url/planets');
    });
  });

  describe('findOne', () => {
    it('should return a planet', async () => {
      const expectedData: Planet = PlanetMockedData;
      axiosAdapterMock.get.mockResolvedValue(expectedData);
      configServiceMock.get.mockReturnValue('swapi_url');

      const result = await planetService.findOne('3');
      expect(result).toEqual(expectedData);
      expect(axiosAdapterMock.get).toHaveBeenCalledWith('swapi_url/planets/3');

      expect(result).toEqual(expectedData);
    });
  });

  describe('PlanetsModule', () => {
    it('should compile the module', async () => {
      const module = await Test.createTestingModule({
        imports: [PlanetsModule],
      }).compile();

      expect(module).toBeDefined();
    });
  });
});
