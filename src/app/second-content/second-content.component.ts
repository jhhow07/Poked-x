import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { PokemonServiceService } from '../services/pokemon-service.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-second-content',
  templateUrl: './second-content.component.html',
  styleUrls: ['./second-content.component.css'],
})
export class SecondContentComponent {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

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

  currentIndex = 0;
  pokemonList: any[] = [];
  filteredList: any[] = [];
  showList = false;
  blurTimeout: any;
  selectedPokemon: any;

  constructor(private pokemonService: PokemonServiceService, private modalService: ModalService) {}

  ngOnInit() {
    this.getPokemonList();
  }

  changeIndex(offset: number) {
    const lastIndex = this.most_wanted_pokemons.length - 1;

    let newIndex = this.currentIndex + offset;
    if (newIndex < 0) {
      newIndex = lastIndex;
    } else if (newIndex > lastIndex) {
      newIndex = 0;
    }

    this.currentIndex = newIndex;
  }

  getPokemonList() {
    this.pokemonService.getPokemonsList().subscribe(
      (response: any) => {
        const results = response.results;
        for (const result of results) {
          const pokemonId = result.url.split('/')[6];
          this.getPokemonDetails(pokemonId);
        }
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  getPokemonDetails(id: number) {
    this.pokemonService.getPokemonDetails(id).subscribe(
      (response: any) => {
        const pokemon = response;
        this.pokemonList.push(pokemon);
        this.filteredList = this.pokemonList;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  getPokemonImg(pokemonId: number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  }

  formatMeasure(value: number, unit: string): string {
    if (unit === 'height') {
      return value * 10 + 'cm';
    } else if (unit === 'weight') {
      return value / 10 + 'kg';
    } else {
      return '';
    }
  }

  filterPokemonList(searchText: string) {
    if (searchText) {
      this.filteredList = this.pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      this.filteredList = this.pokemonList;
    }
  }

  openPokemonList() {
    this.showList = true;
  }

closePokemonList() {
  this.showList = false;
}

@HostListener('document:click', ['$event.target'])
  onClick(target: any) {
    if (target !== this.input.nativeElement) {
      this.closePokemonList();
    }
  }

  selectPokemon(pokemon: any) {
    this.selectedPokemon = pokemon;
    this.input.nativeElement.value = pokemon.name;
    const index = this.most_wanted_pokemons.findIndex((p: any) => p.name === pokemon.name);
    if (index !== -1) {
      this.most_wanted_pokemons[index].quantity++;
    } else {
      this.most_wanted_pokemons.push({ ...pokemon, quantity: 1 });
    }

    this.most_wanted_pokemons.sort((a: any, b: any) => b.quantity - a.quantity );
    this.closePokemonList();
  }

  searchPokemon() {
    // console.log(this.input);
      this.modalService.openModal(this.selectedPokemon);
  }

  openModal(pokemon: any) {
    this.modalService.openModal(pokemon);
  }

}
