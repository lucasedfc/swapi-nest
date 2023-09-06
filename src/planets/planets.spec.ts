import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { CommonModule } from '../common/common.module';
import { PlanetsService } from './planets.service';
import { Planet, Planets } from './interfaces/planets.interfaces';
import { PlanetsModule } from './planets.module';

describe('StarshipsService', () => {
  let service: PlanetsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CommonModule],
      providers: [
        PlanetsService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => 'https://swapi.dev/api'),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<PlanetsService>(PlanetsService);
  });

  describe('findAll', () => {
    it('should return a list of planets', async () => {
      const expectedData: Planets = {
        count: 60,
        next: 'https://swapi.dev/api/planets/?page=2',
        previous: null,
        results: [
          {
            name: 'Tatooine',
            rotation_period: '23',
            orbital_period: '304',
            diameter: '10465',
            climate: 'arid',
            gravity: '1 standard',
            terrain: 'desert',
            surface_water: '1',
            population: '200000',
            residents: [
              'https://swapi.dev/api/people/1/',
              'https://swapi.dev/api/people/2/',
              'https://swapi.dev/api/people/4/',
              'https://swapi.dev/api/people/6/',
              'https://swapi.dev/api/people/7/',
              'https://swapi.dev/api/people/8/',
              'https://swapi.dev/api/people/9/',
              'https://swapi.dev/api/people/11/',
              'https://swapi.dev/api/people/43/',
              'https://swapi.dev/api/people/62/',
            ],
            films: [
              'https://swapi.dev/api/films/1/',
              'https://swapi.dev/api/films/3/',
              'https://swapi.dev/api/films/4/',
              'https://swapi.dev/api/films/5/',
              'https://swapi.dev/api/films/6/',
            ],
            created: '2014-12-09T13:50:49.641000Z',
            edited: '2014-12-20T20:58:18.411000Z',
            url: 'https://swapi.dev/api/planets/1/',
          },
        ],
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedData);

      const result = await service.findAll();

      expect(result).toEqual(expectedData);
    });
  });

  describe('findOne', () => {
    it('should return a planet', async () => {
      const expectedData: Planet = {
        name: 'Yavin IV',
        rotation_period: '24',
        orbital_period: '4818',
        diameter: '10200',
        climate: 'temperate, tropical',
        gravity: '1 standard',
        terrain: 'jungle, rainforests',
        surface_water: '8',
        population: '1000',
        residents: [],
        films: ['https://swapi.dev/api/films/1/'],
        created: '2014-12-10T11:37:19.144000Z',
        edited: '2014-12-20T20:58:18.421000Z',
        url: 'https://swapi.dev/api/planets/3/',
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedData);

      const result = await service.findOne('3');

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
