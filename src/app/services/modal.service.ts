import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalSubject = new Subject<boolean>();
  public modalState$ = this.modalSubject.asObservable();
  selectedPokemon: any;

  constructor() { }

  openModal(pokemon: any) {
    this.selectedPokemon = pokemon;
    this.modalSubject.next(true);
  }

  closeModal() {
    this.modalSubject.next(false);
  }
}
