import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { CommonModule } from '../common/common.module';
import { Starship, Starships } from './interfaces/starships.interface';
import { StarshipsService } from './starships.service';

describe('StarshipsService', () => {
  let service: StarshipsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CommonModule],
      providers: [
        StarshipsService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => 'https://swapi.dev/api'),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<StarshipsService>(StarshipsService);
  });

  describe('findAll', () => {
    it('should return a list of starships', async () => {
      const expectedData: Starships = {
        count: 36,
        next: 'https://swapi.dev/api/starships/?page=2',
        previous: null,
        results: [
          {
            name: 'CR90 corvette',
            model: 'CR90 corvette',
            manufacturer: 'Corellian Engineering Corporation',
            cost_in_credits: '3500000',
            length: '150',
            max_atmosphering_speed: '950',
            crew: '30-165',
            passengers: '600',
            cargo_capacity: '3000000',
            consumables: '1 year',
            hyperdrive_rating: '2.0',
            MGLT: '60',
            starship_class: 'corvette',
            pilots: [],
            films: [
              'https://swapi.dev/api/films/1/',
              'https://swapi.dev/api/films/3/',
              'https://swapi.dev/api/films/6/',
            ],
            created: '2014-12-10T14:20:33.369000Z',
            edited: '2014-12-20T21:23:49.867000Z',
            url: 'https://swapi.dev/api/starships/2/',
          },
        ],
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedData);

      const result = await service.findAll();

      expect(result).toEqual(expectedData);
    });
  });

  describe('findOne', () => {
    it('should return a starship', async () => {
      const expectedData: Starship = {
        name: 'Death Star',
        model: 'DS-1 Orbital Battle Station',
        manufacturer:
          'Imperial Department of Military Research, Sienar Fleet Systems',
        cost_in_credits: '1000000000000',
        length: '120000',
        max_atmosphering_speed: 'n/a',
        crew: '342,953',
        passengers: '843,342',
        cargo_capacity: '1000000000000',
        consumables: '3 years',
        hyperdrive_rating: '4.0',
        MGLT: '10',
        starship_class: 'Deep Space Mobile Battlestation',
        pilots: [],
        films: ['https://swapi.dev/api/films/1/'],
        created: '2014-12-10T16:36:50.509000Z',
        edited: '2014-12-20T21:26:24.783000Z',
        url: 'https://swapi.dev/api/starships/9/',
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedData);

      const result = await service.findOne('9');

      expect(result).toEqual(expectedData);
    });
  });
});
