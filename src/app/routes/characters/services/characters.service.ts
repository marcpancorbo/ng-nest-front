import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../../core/models/base-api-service';
import { Character } from '../../../core/models/character';

@Injectable({
  providedIn: 'root',
})
export class CharactersService extends BaseApiService {
  constructor() {
    super('character');
  }

  getCharacters(): Observable<Character[]> {
    return super.get('');
  }

  getCharacterById(id: string): Observable<Character> {
    return super.get(`/${id}`);
  }

  deleteCharacterById(id: string): Observable<void> {
    return super.delete(`/${id}`);
  }

  create(character: Character): Observable<Character> {
    return super.post('', character);
  }
}
