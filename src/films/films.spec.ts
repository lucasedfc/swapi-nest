import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { FilmsService } from './films.service';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
import { Film, Films } from './interfaces/films.interfaces';
import { FilmMockedData, FilmsMockData } from '../../test/mock/films.mock';
import { FilmsModule } from './films.module';

describe('FilmsService', () => {
  let filmsService: FilmsService;
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
        FilmsService,
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

    filmsService = module.get<FilmsService>(FilmsService);
  });

  describe('findAll', () => {
    it('should return a list of films', async () => {
      const expectedFilms: Films = FilmsMockData;
      axiosAdapterMock.get.mockResolvedValue(expectedFilms);
      configServiceMock.get.mockReturnValue('swapi_url');

      const result = await filmsService.findAll();

      expect(result).toEqual(expectedFilms);
      expect(axiosAdapterMock.get).toHaveBeenCalledWith('swapi_url/films');
    });
  });

  describe('findOne', () => {
    it('should return a single film', async () => {
      const filmId = '1';
      const expectedFilm: Film = FilmMockedData;
      axiosAdapterMock.get.mockResolvedValue(expectedFilm);
      configServiceMock.get.mockReturnValue('swapi_url');

      const result = await filmsService.findOne(filmId);

      expect(result).toEqual(expectedFilm);
      expect(axiosAdapterMock.get).toHaveBeenCalledWith('swapi_url/films/1');
    });
  });
});

describe('FilmsModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [FilmsModule],
    }).compile();

    expect(module).toBeDefined();
  });
});
