import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PeopleService } from './people.service';
import { People } from './interfaces/people.interface';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
import { PeopleMockedData } from '../../test/mock/people.mock';
import { PeopleModule } from './people.module';

describe('PeopleService', () => {
  let peopleService: PeopleService;
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
        PeopleService,
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

    peopleService = module.get<PeopleService>(PeopleService);
  });

  describe('findAll', () => {
    it('should return a list of people', async () => {
      const expectedData: People = PeopleMockedData;
      axiosAdapterMock.get.mockResolvedValue(expectedData);
      configServiceMock.get.mockReturnValue('swapi_url');

      const result = await peopleService.findAll();
      expect(result).toEqual(expectedData);
      expect(axiosAdapterMock.get).toHaveBeenCalledWith('swapi_url/people');
    });
  });
});

describe('PeopleModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [PeopleModule],
    }).compile();

    expect(module).toBeDefined();
  });
});
