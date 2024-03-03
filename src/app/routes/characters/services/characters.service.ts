import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { BaseApiService } from '../../../core/models/base-api-service';
import { Character } from '../../../core/models/character';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { HttpParams } from '@angular/common/http';

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

  create(character: Character, image?: NzUploadFile): Observable<Character> {
    const formData = new FormData();
    if (image) {
      formData.append('image', image as unknown as File, image.name);
    }
    formData.append('name', character.name);
    formData.append('power', character.power.toString());
    formData.append('race', character.race.toString());
    return super.post<Character>('', formData).pipe(catchError(() => EMPTY));
  }
  update(
    id: string,
    character: Character,
    image?: NzUploadFile
  ): Observable<Character> {
    const formData = new FormData();
    if (image) {
      formData.append('image', image as unknown as File, image.name);
    }
    formData.append('name', character.name);
    formData.append('power', character.power.toString());
    formData.append('race', character.race.toString());
    return super.put<Character>(`/${id}`, formData).pipe(
      catchError(() => {
        return EMPTY;
      })
    );
  }

  exists(name: string, id?: string): Observable<boolean> {
    let params = new HttpParams();
    if (id) {
      params = params.set('id', id);
    }
    return super.get(`/exists/${name}`, { params });
  }
}
