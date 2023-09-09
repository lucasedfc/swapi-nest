import { Injectable, NotFoundException } from '@nestjs/common';
import { People } from './interfaces/people.interface';
import { ConfigService } from '@nestjs/config';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
import * as swapi from 'swapi-node';
import { Film } from '../films/interfaces/films.interfaces';
import { Starship } from '../startships/interfaces/starships.interface';

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

  async findOne(term: string) {

    try {
      if (isNaN(Number(term))) {
        const swapiUrl = this.configService.get('SWAPI_URL');
        const search = await this.http.get<People>(
          `${swapiUrl}/people?search=${term}`,
        );
        if (!search.results[0]) {
          throw new NotFoundException('Character not found');
        }
        const id = search.results[0].url.match(/\d+/)[0];
        return this.getCharacter(id);
      }
      return await this.getCharacter(term);
    } catch (error) {
      throw new NotFoundException('Character not found');
    }
  }

  private async getCharacter(id: string) {
    const character = await swapi.people({ id: id });
    const homeWorld = await character.getHomeworld({ id: character.homeworld });
    character.homeworld = homeWorld.name;

    const films = await character.getFilms();
    const _character_films = this.getFilms(films);
    character.films = _character_films;

    const species = await character.getSpecies();
    const _character_species = this.getSpecies(species);
    character.species = _character_species;

    const vehicles = await character.getVehicles();
    const _character_vehicles = this.getVehicles(vehicles);
    character.vehicles = _character_vehicles;

    const character_starships = await character.getStarships();
    const _character_starships = this.getStarships(character_starships);
    character.starships = _character_starships;

    return character ?? new NotFoundException('Character not found');
  }

  private getSpecies(species: any[]) {
    const _species = [];
    species.forEach((s) => {
      _species.push({
        name: s.name,
        average_lifespan: s.average_lifespan,
        classification: s.classification,
        language: s.language,
      });
    });
    return _species;
  }

  private getVehicles(vehicles: any[]) {
    const _vehicles = [];
    vehicles.forEach((v) => {
      _vehicles.push({
        name: v.name,
        model: v.model,
        manufacturer: v.manufacturer,
        cost_in_credits: v.cost_in_credits,
        length: v.length,
        max_atmosphering_speed: v.max_atmosphering_speed,
        crew: v.crew,
        passengers: v.passengers,
        cargo_capacity: v.cargo_capacity,
        consumables: v.consumables,
        vehicle_class: v.vehicle_class,
      });
    });
    return _vehicles;
  }

  private getFilms(films: Film[]) {
    const _films = [];
    films.forEach((f) => {
      _films.push({
        title: f.title,
        episode_id: f.episode_id,
        release_date: f.release_date,
        director: f.director,
      });
    });
    return _films;
  }

  private getStarships(starships: Starship[]) {
    const _starships = [];
    starships.forEach((s) => {
      _starships.push({
        name: s.name,
        model: s.model,
        manufacturer: s.manufacturer,
        cost_in_credits: s.cost_in_credits,
        length: s.length,
        max_atmosphering_speed: s.max_atmosphering_speed,
        crew: s.crew,
        passengers: s.passengers,
        cargo_capacity: s.cargo_capacity,
        consumables: s.consumables,
        hyperdrive_rating: s.hyperdrive_rating,
        MGLT: s.MGLT,
        starship_class: s.starship_class,
      });
    });
    return _starships;
  }
}
