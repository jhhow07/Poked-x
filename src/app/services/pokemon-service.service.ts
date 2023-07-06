import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {
  apiUrl = "https://pokeapi.co/api/v2";
  speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/';

  most_wanted_pokemons: any[] = [
    {
    "name": "Bulbasaur",
    "base_experience": 64,
    "forms": [{}],
    "height": 7,
    "held_items": [],
    "id": 1,
    "is_default": true,
    "location_area_encounters": "https://pokeapi.co/api/v2/pokemon/1/encounters",
    "order": 1,
    "past_types": [],
    "species": {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon-species/1/"
    },
    "stats": [
      {
        "base_stat": 45,
        "effort": 0,
        "stat": {
          "name": "hp",
          "url": "https://pokeapi.co/api/v2/stat/1/"
        }
      },
      {
        "base_stat": 49,
        "effort": 0,
        "stat": {
          "name": "attack",
          "url": "https://pokeapi.co/api/v2/stat/2/"
        }
      },
      {
        "base_stat": 49,
        "effort": 0,
        "stat": {
          "name": "defense",
          "url": "https://pokeapi.co/api/v2/stat/3/"
        }
      },
      {
        "base_stat": 65,
        "effort": 1,
        "stat": {
          "name": "special-attack",
          "url": "https://pokeapi.co/api/v2/stat/4/"
        }
      },
      {
        "base_stat": 65,
        "effort": 0,
        "stat": {
          "name": "special-defense",
          "url": "https://pokeapi.co/api/v2/stat/5/"
        }
      },
      {
        "base_stat": 45,
        "effort": 0,
        "stat": {
          "name": "speed",
          "url": "https://pokeapi.co/api/v2/stat/6/"
        }
      }
    ],
    "types": [
      {
        "slot": 1,
        "type": {
          "name": "grass",
          "url": "https://pokeapi.co/api/v2/type/12/"
        }
      },
      {
        "slot": 2,
        "type": {
          "name": "poison",
          "url": "https://pokeapi.co/api/v2/type/4/"
        }
      }
    ],
    "weight": 69
    },
    {
      "name": "Pikachu",
      "base_experience": 112,
      "forms": [{}],
      "height": 4,
      "held_items": [
        {},
        {}
      ],
      "id": 25,
      "is_default": true,
      "location_area_encounters": "https://pokeapi.co/api/v2/pokemon/25/encounters",
      "order": 35,
      "past_types": [],
      "species": {
        "name": "pikachu",
        "url": "https://pokeapi.co/api/v2/pokemon-species/25/"
      },
      "stats": [
        {
          "base_stat": 35,
          "effort": 0,
          "stat": {
            "name": "hp",
            "url": "https://pokeapi.co/api/v2/stat/1/"
          }
        },
        {
          "base_stat": 55,
          "effort": 0,
          "stat": {
            "name": "attack",
            "url": "https://pokeapi.co/api/v2/stat/2/"
          }
        },
        {
          "base_stat": 40,
          "effort": 0,
          "stat": {
            "name": "defense",
            "url": "https://pokeapi.co/api/v2/stat/3/"
          }
        },
        {
          "base_stat": 50,
          "effort": 0,
          "stat": {
            "name": "special-attack",
            "url": "https://pokeapi.co/api/v2/stat/4/"
          }
        },
        {
          "base_stat": 50,
          "effort": 0,
          "stat": {
            "name": "special-defense",
            "url": "https://pokeapi.co/api/v2/stat/5/"
          }
        },
        {
          "base_stat": 90,
          "effort": 2,
          "stat": {
            "name": "speed",
            "url": "https://pokeapi.co/api/v2/stat/6/"
          }
        }
      ],
      "types": [
        {
          "slot": 1,
          "type": {
            "name": "electric",
            "url": "https://pokeapi.co/api/v2/type/13/"
          }
        }
      ],
      "weight": 60
    },
    {
      "name": "Charizard",
      "base_experience": 267,
      "forms": [{}],
      "height": 17,
      "held_items": [],
      "id": 6,
      "is_default": true,
      "location_area_encounters": "https://pokeapi.co/api/v2/pokemon/6/encounters",
      "order": 7,
      "past_types": [],
      "species": {
        "name": "charizard",
        "url": "https://pokeapi.co/api/v2/pokemon-species/6/"
      },
      "stats": [
        {
          "base_stat": 78,
          "effort": 0,
          "stat": {
            "name": "hp",
            "url": "https://pokeapi.co/api/v2/stat/1/"
          }
        },
        {
          "base_stat": 84,
          "effort": 0,
          "stat": {
            "name": "attack",
            "url": "https://pokeapi.co/api/v2/stat/2/"
          }
        },
        {
          "base_stat": 78,
          "effort": 0,
          "stat": {
            "name": "defense",
            "url": "https://pokeapi.co/api/v2/stat/3/"
          }
        },
        {
          "base_stat": 109,
          "effort": 3,
          "stat": {
            "name": "special-attack",
            "url": "https://pokeapi.co/api/v2/stat/4/"
          }
        },
        {
          "base_stat": 85,
          "effort": 0,
          "stat": {
            "name": "special-defense",
            "url": "https://pokeapi.co/api/v2/stat/5/"
          }
        },
        {
          "base_stat": 100,
          "effort": 0,
          "stat": {
            "name": "speed",
            "url": "https://pokeapi.co/api/v2/stat/6/"
          }
        }
      ],
      "types": [
        {
          "slot": 1,
          "type": {
            "name": "fire",
            "url": "https://pokeapi.co/api/v2/type/10/"
          }
        },
        {
          "slot": 2,
          "type": {
            "name": "flying",
            "url": "https://pokeapi.co/api/v2/type/3/"
          }
        }
      ],
      "weight": 905
    },
    {
      "name": "Blastoise",
      "base_experience": 265,
      "forms": [{}],
      "height": 16,
      "held_items": [],
      "id": 9,
      "is_default": true,
      "location_area_encounters": "https://pokeapi.co/api/v2/pokemon/9/encounters",
      "order": 12,
      "past_types": [],
      "species": {
        "name": "blastoise",
        "url": "https://pokeapi.co/api/v2/pokemon-species/9/"
      },
      "stats": [
        {
          "base_stat": 79,
          "effort": 0,
          "stat": {
            "name": "hp",
            "url": "https://pokeapi.co/api/v2/stat/1/"
          }
        },
        {
          "base_stat": 83,
          "effort": 0,
          "stat": {
            "name": "attack",
            "url": "https://pokeapi.co/api/v2/stat/2/"
          }
        },
        {
          "base_stat": 100,
          "effort": 0,
          "stat": {
            "name": "defense",
            "url": "https://pokeapi.co/api/v2/stat/3/"
          }
        },
        {
          "base_stat": 85,
          "effort": 0,
          "stat": {
            "name": "special-attack",
            "url": "https://pokeapi.co/api/v2/stat/4/"
          }
        },
        {
          "base_stat": 105,
          "effort": 3,
          "stat": {
            "name": "special-defense",
            "url": "https://pokeapi.co/api/v2/stat/5/"
          }
        },
        {
          "base_stat": 78,
          "effort": 0,
          "stat": {
            "name": "speed",
            "url": "https://pokeapi.co/api/v2/stat/6/"
          }
        }
      ],
      "types": [
        {
          "slot": 1,
          "type": {
            "name": "water",
            "url": "https://pokeapi.co/api/v2/type/11/"
          }
        }
      ],
      "weight": 855
    },
    {
      "name": "Meowth",
      "base_experience": 58,
      "forms": [{}],
      "height": 4,
      "held_items": [
        {},
        {}
      ],
      "id": 52,
      "is_default": true,
      "location_area_encounters": "https://pokeapi.co/api/v2/pokemon/52/encounters",
      "order": 88,
      "past_types": [],
      "species": {
        "name": "meowth",
        "url": "https://pokeapi.co/api/v2/pokemon-species/52/"
      },
      "stats": [
        {
          "base_stat": 40,
          "effort": 0,
          "stat": {
            "name": "hp",
            "url": "https://pokeapi.co/api/v2/stat/1/"
          }
        },
        {
          "base_stat": 45,
          "effort": 0,
          "stat": {
            "name": "attack",
            "url": "https://pokeapi.co/api/v2/stat/2/"
          }
        },
        {
          "base_stat": 35,
          "effort": 0,
          "stat": {
            "name": "defense",
            "url": "https://pokeapi.co/api/v2/stat/3/"
          }
        },
        {
          "base_stat": 40,
          "effort": 0,
          "stat": {
            "name": "special-attack",
            "url": "https://pokeapi.co/api/v2/stat/4/"
          }
        },
        {
          "base_stat": 40,
          "effort": 0,
          "stat": {
            "name": "special-defense",
            "url": "https://pokeapi.co/api/v2/stat/5/"
          }
        },
        {
          "base_stat": 90,
          "effort": 1,
          "stat": {
            "name": "speed",
            "url": "https://pokeapi.co/api/v2/stat/6/"
          }
        }
      ],
      "types": [
        {
          "slot": 1,
          "type": {
            "name": "normal",
            "url": "https://pokeapi.co/api/v2/type/1/"
          }
        }
      ],
      "weight": 42
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
