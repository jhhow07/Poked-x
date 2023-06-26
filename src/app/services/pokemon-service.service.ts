import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {
  apiUrl = "https://pokeapi.co/api/v2";

  constructor(private httpClient: HttpClient) { }

  // getPokemonSpecie(pokemonName: string) {
  //   return this.httpClient.get<any>(`${this.speciesUrl}${pokemonName}`);
  // }

  getPokemonsList() {
    return this.httpClient.get<any>(`${this.apiUrl}/pokemon/?limit=100&offset=0`);
  }

  getPokemonDetails(id: number) {
    const url = `${this.apiUrl}/pokemon/${id}`;
    return this.httpClient.get<any>(url);
  }


  // getPokemonChain(specieUrl: string) {
  //   return this.httpClient.get<any>(specieUrl);
  // }

  // getPokemon(url: string) {
  //   return this.httpClient.get<any>(url);
  // }

}
