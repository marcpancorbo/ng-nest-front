import { Injectable } from '@angular/core';
import { Character } from '../../../core/models/character';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterDetailService {
  private updated: Subject<Character> = new Subject<Character>();
  public updated$: Observable<Character> = this.updated.asObservable();

  constructor() {}

  updateCharacter(character: Character): void {
    this.updated.next(character);
  }
}
