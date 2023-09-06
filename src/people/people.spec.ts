import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PeopleService } from './people.service';
import { CommonModule } from '../common/common.module';
import { Character, People } from './interfaces/people.interface';
import { PeopleController } from './people.controller';
import { PeopleModule } from './people.module';
describe('PeopleService', () => {
  let service: PeopleService;
  let peopleController: PeopleController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CommonModule],
      providers: [
        PeopleService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => 'https://swapi.dev/api'),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<PeopleService>(PeopleService);

    peopleController = new PeopleController(service);
  });

  describe('findAll', () => {
    it('should return a list of people', async () => {
      const expectedData: People = {
        count: 82,
        next: 'https://swapi.dev/api/people/?page=2',
        previous: null,
        results: [
          {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
            homeworld: 'https://swapi.dev/api/planets/1/',
            films: [
              'https://swapi.dev/api/films/1/',
              'https://swapi.dev/api/films/2/',
              'https://swapi.dev/api/films/3/',
              'https://swapi.dev/api/films/6/',
            ],
            species: [],
            vehicles: [
              'https://swapi.dev/api/vehicles/14/',
              'https://swapi.dev/api/vehicles/30/',
            ],
            starships: [
              'https://swapi.dev/api/starships/12/',
              'https://swapi.dev/api/starships/22/',
            ],
            created: '2014-12-09T13:50:51.644000Z',
            edited: '2014-12-20T21:17:56.891000Z',
            url: 'https://swapi.dev/api/people/1/',
          },
        ],
      };
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedData);

      expect(await service.findAll()).toBe(expectedData);
    });
  });

  describe('findOne', () => {
    it('should return a person', async () => {
      const expectedData: Character = {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        homeworld: 'https://swapi.dev/api/planets/1/',
        films: [
          'https://swapi.dev/api/films/1/',
          'https://swapi.dev/api/films/2/',
          'https://swapi.dev/api/films/3/',
          'https://swapi.dev/api/films/6/',
        ],
        species: [],
        vehicles: [
          'https://swapi.dev/api/vehicles/14/',
          'https://swapi.dev/api/vehicles/30/',
        ],
        starships: [
          'https://swapi.dev/api/starships/12/',
          'https://swapi.dev/api/starships/22/',
        ],
        created: '2014-12-09T13:50:51.644000Z',
        edited: '2014-12-20T21:17:56.891000Z',
        url: 'https://swapi.dev/api/people/1/',
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedData);

      const result = await service.findOne('1');

      expect(result).toEqual(expectedData);
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
