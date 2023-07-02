import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { PokemonServiceService } from 'src/app/services/pokemon-service.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  showModal: boolean = false;
  pokemon: any;
  evolutionChain: any;
  firstPokemonName: string = '';
  firstPokemonUrl: string = '';
  preloadedPokemonData: { [name: string]: any } = {};
  pokemonStats: any;
  chartHeights: string[] = ['0', '0', '0', '0', '0', '0']
  chartLabels: string[] = ['80%', '50%', '20%',];

  constructor(
    public modalService: ModalService,
    private pokemonService: PokemonServiceService
  ) {}

  ngOnInit() {
    this.modalService.modalState$.subscribe((state: boolean) => {
      this.showModal = state;
      if (state == true) {
        this.pokemon = this.modalService.selectedPokemon;
        this.getPokemonDetails(this.pokemon.name);
        this.pokemonStats = this.pokemon.stats;
        this.setChartHeights();
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    });
  }

  close() {
    this.modalService.closeModal();
  }

  changeTypeColor(type: string) {
    let color: string = '';
    switch (type) {
      case 'normal':
        color = '#A8A77A';
        break;
      case 'fire':
        color = '#EE8130';
        break;
      case 'water':
        color = '#6390F0';
        break;
      case 'electric':
        color = '#F7D02C';
        break;
      case 'grass':
        color = '#7AC74C';
        break;
      case 'ice':
        color = '#96D9D6';
        break;
      case 'fighting':
        color = '#C22E28';
        break;
      case 'poison':
        color = '#A33EA1';
        break;
      case 'ground':
        color = '#E2BF65';
        break;
      case 'flying':
        color = '#A98FF3';
        break;
      case 'psychic':
        color = '#F95587';
        break;
      case 'bug':
        color = '#A6B91A';
        break;
      case 'rock':
        color = '#B6A136';
        break;
      case 'ghost':
        color = '#735797';
        break;
      case 'dragon':
        color = '#6F35FC';
        break;
      case 'dark':
        color = '#705746';
        break;
      case 'steel':
        color = '#B7B7CE';
        break;
      case 'fairy':
        color = '#D685AD';
        break;
    }
    return color;
  }

  getPokemonImg(pokemonId: number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  }

  getPokemonDetails(pokemonName: string) {
    this.pokemonService
      .getPokemonSpecie(this.pokemon.id)
      .subscribe((pokemon) => {
        // console.log(pokemon);
        this.getPokemonThree(pokemon['evolution_chain'].url);
      });
  }

  getPokemonThree(pokemonUrl: string) {
    this.pokemonService
      .getPokemonChain(pokemonUrl)
      .subscribe((pokemon_three) => {
        this.evolutionChain = pokemon_three.chain;
        this.preloadPokemonData();
      });
  }

  preloadPokemonData() {
    const pokemonNames = this.getPokemonNames(this.evolutionChain);
    const requests = pokemonNames.map((name) => this.getPokemon(name));
    forkJoin(requests).subscribe((data) => {
      data.forEach((pokemon) => {
        this.preloadedPokemonData[pokemon.name] = {
          image: this.getPokemonImg(pokemon.id),
        };
      });
    });
  }

  getPokemonNames(evolutionChain: any): string[] {
    const pokemonNames = [evolutionChain.species.name];
    evolutionChain.evolves_to.forEach((evolution: any) => {
      pokemonNames.push(evolution.species.name);
      evolution.evolves_to.forEach((evo: any) => {
        pokemonNames.push(evo.species.name);
      });
    });
    return pokemonNames;
  }

  getPokemon(name: string) {
    return this.pokemonService.getPokemon(name);
  }

  getPokemonImgByName(pokemonName: string) {
    const preloadedData = this.preloadedPokemonData[pokemonName];
    if (preloadedData) {
      return preloadedData.image;
    } else {
      this.pokemonService.getPokemon(pokemonName).subscribe((pokemon) => {
        this.preloadedPokemonData[pokemonName] = {
          image: this.getPokemonImg(pokemon.id),
        };
      });
    }
  }

  setChartHeights() {
    const maxStatValue = 100;
    for (let i = 0; i < this.pokemonStats.length; i++) {
      if (i !== 3 && i !== 4) {
        const stat = this.pokemonStats[i].base_stat;
        const height = (stat / maxStatValue) * 100;
        this.chartHeights[i] = `${height}%`;
      }
    }
    this.updateChartLabels();
  }

  updateChartLabels() {
    const chartHeight = 17; // Total height of the chart in vh
    const chartHeight20 = chartHeight * 0.8;
    const chartHeight50 = chartHeight * 0.5;
    const chartHeight80 = chartHeight * 0.2;
    this.chartLabels[2] = `${chartHeight80}vh`;
    this.chartLabels[1] = `${chartHeight50}vh`;
    this.chartLabels[0] = `${chartHeight20}vh`;
  }

}

  // generateChart() {
  //   const statsLabels = this.pokemonStats.map((stat: any) => stat.stat.name);
  //   const statsData = this.pokemonStats.map((stat: any) => stat.base_stat);

  //   const chartContainer = document.getElementById('chart-container');
  //   if (chartContainer) {
  //     chartContainer.innerHTML = '';

  //     for (let i = 0; i < statsLabels.length; i++) {
  //       const label = statsLabels[i];
  //       const value = statsData[i];

  //       const bar = document.createElement('div');
  //       bar.classList.add('bar');
  //       bar.style.width = `${value * 2}px`;

  //       const barLabel = document.createElement('div');
  //       barLabel.classList.add('bar-label');
  //       barLabel.textContent = `${label} (${value})`;

  //       const chartItem = document.createElement('div');
  //       chartItem.classList.add('chart-item');
  //       chartItem.appendChild(bar);
  //       chartItem.appendChild(barLabel);

  //       chartContainer?.appendChild(chartItem);
  //     }
  //   }
  // }
