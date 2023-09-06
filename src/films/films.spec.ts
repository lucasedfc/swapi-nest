import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { CommonModule } from '../common/common.module';
import { FilmsService } from './films.service';
import { Film, Films } from './interfaces/films.interfaces';
describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CommonModule],
      providers: [
        FilmsService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => 'https://swapi.dev/api'),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<FilmsService>(FilmsService);
  });

  describe('findAll', () => {
    it('should return a list of people', async () => {
      // Arrange
      const expectedData: Films = {
        count: 6,
        next: null,
        previous: null,
        results: [
          {
            title: 'A New Hope',
            episode_id: 4,
            opening_crawl:
              "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
            director: 'George Lucas',
            producer: 'Gary Kurtz, Rick McCallum',
            release_date: '1977-05-25',
            characters: [
              'https://swapi.dev/api/people/1/',
              'https://swapi.dev/api/people/2/',
              'https://swapi.dev/api/people/3/',
              'https://swapi.dev/api/people/4/',
              'https://swapi.dev/api/people/5/',
              'https://swapi.dev/api/people/6/',
              'https://swapi.dev/api/people/7/',
              'https://swapi.dev/api/people/8/',
              'https://swapi.dev/api/people/9/',
              'https://swapi.dev/api/people/10/',
              'https://swapi.dev/api/people/12/',
              'https://swapi.dev/api/people/13/',
              'https://swapi.dev/api/people/14/',
              'https://swapi.dev/api/people/15/',
              'https://swapi.dev/api/people/16/',
              'https://swapi.dev/api/people/18/',
              'https://swapi.dev/api/people/19/',
              'https://swapi.dev/api/people/81/',
            ],
            planets: [
              'https://swapi.dev/api/planets/1/',
              'https://swapi.dev/api/planets/2/',
              'https://swapi.dev/api/planets/3/',
            ],
            starships: [
              'https://swapi.dev/api/starships/2/',
              'https://swapi.dev/api/starships/3/',
              'https://swapi.dev/api/starships/5/',
              'https://swapi.dev/api/starships/9/',
              'https://swapi.dev/api/starships/10/',
              'https://swapi.dev/api/starships/11/',
              'https://swapi.dev/api/starships/12/',
              'https://swapi.dev/api/starships/13/',
            ],
            vehicles: [
              'https://swapi.dev/api/vehicles/4/',
              'https://swapi.dev/api/vehicles/6/',
              'https://swapi.dev/api/vehicles/7/',
              'https://swapi.dev/api/vehicles/8/',
            ],
            species: [
              'https://swapi.dev/api/species/1/',
              'https://swapi.dev/api/species/2/',
              'https://swapi.dev/api/species/3/',
              'https://swapi.dev/api/species/4/',
              'https://swapi.dev/api/species/5/',
            ],
            created: '2014-12-10T14:23:31.880000Z',
            edited: '2014-12-20T19:49:45.256000Z',
            url: 'https://swapi.dev/api/films/1/',
          },
        ],
      };
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedData);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual(expectedData);
    });
  });

  describe('findOne', () => {
    it('should return a person', async () => {
      const expectedData: Film = {
        title: 'A New Hope',
        episode_id: 4,
        opening_crawl:
          "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
        director: 'George Lucas',
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1977-05-25',
        characters: [
          'https://swapi.dev/api/people/1/',
          'https://swapi.dev/api/people/2/',
          'https://swapi.dev/api/people/3/',
          'https://swapi.dev/api/people/4/',
          'https://swapi.dev/api/people/5/',
          'https://swapi.dev/api/people/6/',
          'https://swapi.dev/api/people/7/',
          'https://swapi.dev/api/people/8/',
          'https://swapi.dev/api/people/9/',
          'https://swapi.dev/api/people/10/',
          'https://swapi.dev/api/people/12/',
          'https://swapi.dev/api/people/13/',
          'https://swapi.dev/api/people/14/',
          'https://swapi.dev/api/people/15/',
          'https://swapi.dev/api/people/16/',
          'https://swapi.dev/api/people/18/',
          'https://swapi.dev/api/people/19/',
          'https://swapi.dev/api/people/81/',
        ],
        planets: [
          'https://swapi.dev/api/planets/1/',
          'https://swapi.dev/api/planets/2/',
          'https://swapi.dev/api/planets/3/',
        ],
        starships: [
          'https://swapi.dev/api/starships/2/',
          'https://swapi.dev/api/starships/3/',
          'https://swapi.dev/api/starships/5/',
          'https://swapi.dev/api/starships/9/',
          'https://swapi.dev/api/starships/10/',
          'https://swapi.dev/api/starships/11/',
          'https://swapi.dev/api/starships/12/',
          'https://swapi.dev/api/starships/13/',
        ],
        vehicles: [
          'https://swapi.dev/api/vehicles/4/',
          'https://swapi.dev/api/vehicles/6/',
          'https://swapi.dev/api/vehicles/7/',
          'https://swapi.dev/api/vehicles/8/',
        ],
        species: [
          'https://swapi.dev/api/species/1/',
          'https://swapi.dev/api/species/2/',
          'https://swapi.dev/api/species/3/',
          'https://swapi.dev/api/species/4/',
          'https://swapi.dev/api/species/5/',
        ],
        created: '2014-12-10T14:23:31.880000Z',
        edited: '2014-12-20T19:49:45.256000Z',
        url: 'https://swapi.dev/api/films/1/',
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedData);

      const result = await service.findOne('1');

      expect(result).toEqual(expectedData);
    });
  });
});
