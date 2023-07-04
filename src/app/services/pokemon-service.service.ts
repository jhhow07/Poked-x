import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {
  apiUrl = "https://pokeapi.co/api/v2";
  speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/';

  most_wanted_pokemons: any[] = [{
    abilities: [],
    base_experience: 64,
    forms: [],
    game_indices: [],
    height: 7,
    held_items: [],
    id: 1,
    is_default: true,
    location_area_encounters: "https://pokeapi.co/api/v2/pokemon/1/encounters",
    name: "bulbasaur",
    order: 1,
    past_types: [],
    quantity: 1,
    species: {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon-species/1/"
    },
    sprites: {
      back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
      back_female: null,
      back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
      back_shiny_female: null,
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",},
    stats: [],
    types: [],
    weight: 69
  }
  ];

  constructor(private httpClient: HttpClient) { }

  getPokemonSpecie(pokemonName: string) {
    return this.httpClient.get<any>(`${this.speciesUrl}${pokemonName}`);
  }

  getPokemonsList() {
    return this.httpClient.get<any>(`${this.apiUrl}/pokemon/?limit=100&offset=0`);
  }

  getPokemonDetails(id: number) {
    const url = `${this.apiUrl}/pokemon/${id}`;
    return this.httpClient.get<any>(url);
  }


  getPokemonChain(specieUrl: string) {
    return this.httpClient.get<any>(specieUrl);
  }

  getPokemon(pokemonName: string) {
    const url = `${this.apiUrl}/pokemon/${pokemonName}`;
    return this.httpClient.get<any>(url);
  }

}
