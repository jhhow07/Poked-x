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

  currentIndex = 0;
  pokemonList: any[] = [];
  filteredList: any[] = [];
  showList = false;
  blurTimeout: any;
  selectedPokemon: any;

  constructor(public pokemonService: PokemonServiceService, private modalService: ModalService) {}

  ngOnInit() {
    this.getPokemonList();
  }

  changeIndex(offset: number) {
    const lastIndex = this.pokemonService.most_wanted_pokemons.length - 1;
    let newIndex = this.currentIndex + offset;

    if (newIndex < 0) {
      newIndex = lastIndex;
    } else if (newIndex > lastIndex) {
      newIndex = 0;
    }

    if (newIndex !== this.currentIndex) {
      this.currentIndex = newIndex;
    }
  }

  calculateIndex(offset: number): number {
    const lastIndex = this.pokemonService.most_wanted_pokemons.length - 1;
    let newIndex = this.currentIndex + offset;

    if (newIndex > lastIndex) {
      newIndex = newIndex - lastIndex - 1;
    }

    return newIndex;
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
    const index = this.pokemonService.most_wanted_pokemons.findIndex((p: any) => p.name === pokemon.name);
    if (index !== -1) {
      this.pokemonService.most_wanted_pokemons[index].quantity++;
    } else {
      this.pokemonService.most_wanted_pokemons.push({ ...pokemon, quantity: 1 });
    }

    this.pokemonService.most_wanted_pokemons.sort((a: any, b: any) => b.quantity - a.quantity );
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
