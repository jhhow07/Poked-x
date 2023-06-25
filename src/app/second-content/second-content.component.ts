import { Component } from '@angular/core';

@Component({
  selector: 'app-second-content',
  templateUrl: './second-content.component.html',
  styleUrls: ['./second-content.component.css'],
})
export class SecondContentComponent {
  most_wanted_pokemons: any = [
    {
      name: 'Charizard',
      weight: '19kg',
      height: '1.10cm',
      code: '#0256',
      img: '../../assets/images/charmeleon.png',
    },
    {
      name: 'Pidgeotto',
      weight: '29kg',
      height: '2.10cm',
      code: '#0346',
      img: '../../assets/images/pidgeotto.png',
    },
    {
      name: 'Charizard',
      weight: '19kg',
      height: '1.10cm',
      code: '#0256',
      img: '../../assets/images/charmeleon.png',
    },
    {
      name: 'Pidgeotto',
      weight: '29kg',
      height: '2.10cm',
      code: '#0346',
      img: '../../assets/images/pidgeotto.png',
    },
    {
      name: 'Charizard',
      weight: '19kg',
      height: '1.10cm',
      code: '#0256',
      img: '../../assets/images/charmeleon.png',
    },
    {
      name: 'Pidgeotto',
      weight: '29kg',
      height: '2.10cm',
      code: '#0346',
      img: '../../assets/images/pidgeotto.png',
    },
    {
      name: 'Charizard',
      weight: '19kg',
      height: '1.10cm',
      code: '#0256',
      img: '../../assets/images/charmeleon.png',
    },
    {
      name: 'Pidgeotto',
      weight: '29kg',
      height: '2.10cm',
      code: '#0346',
      img: '../../assets/images/pidgeotto.png',
    },
    {
      name: 'Charizard',
      weight: '19kg',
      height: '1.10cm',
      code: '#0256',
      img: '../../assets/images/charmeleon.png',
    },
    {
      name: 'Pidgeotto',
      weight: '29kg',
      height: '2.10cm',
      code: '#0346',
      img: '../../assets/images/pidgeotto.png',
    },
  ];

  currentIndex = 0;

  constructor() {}

  ngOnInit() {}

  changeIndex(offset: number) {
    const lastIndex = this.most_wanted_pokemons.length - 1;

    let newIndex = this.currentIndex + offset;
    if (newIndex < 0) {
      newIndex = lastIndex; // Go to the last Pokémon if on the first one and clicking left
    } else if (newIndex > lastIndex) {
      newIndex = 0; // Go to the first Pokémon if on the last one and clicking right
    }

    this.currentIndex = newIndex;
  }


}
