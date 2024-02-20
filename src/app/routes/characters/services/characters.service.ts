import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../../core/models/base-api-service';
import { Character } from '../../../core/models/character';
import { NzUploadFile } from 'ng-zorro-antd/upload';

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

  create(character: Character, image: NzUploadFile): Observable<Character> {
    const formData = new FormData();
    formData.append('image', image as unknown as File, image.name);
    formData.append('name', character.name);
    formData.append('power', character.power.toString());
    formData.append('race', character.race.toString());
    return super.post('', formData);
  }
}
