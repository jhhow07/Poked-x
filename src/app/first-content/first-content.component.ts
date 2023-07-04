import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { PokemonServiceService } from '../services/pokemon-service.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-first-content',
  templateUrl: './first-content.component.html',
  styleUrls: ['./first-content.component.css']
})
export class FirstContentComponent {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  showList = false;
  filteredList: any[] = [];
  pokemonList: any[] = [];
  selectedPokemon: any;

  constructor(private pokemonService: PokemonServiceService, private modalService: ModalService) {
  }

  ngOnInit() {
    this.getPokemonList();
  }

  @HostListener('document:click', ['$event.target'])
  onClick(target: any) {
    if (target !== this.input.nativeElement) {
      this.closePokemonList();
    }
  }

  openPokemonList() {
    this.showList = true;
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
      this.modalService.openModal(this.selectedPokemon);
  }

  closePokemonList() {
    this.showList = false;
  }

  getPokemonImg(pokemonId: number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  }

}
