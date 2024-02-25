import { Injectable } from '@angular/core';
import { CharactersService } from './characters.service';
import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import {
  Observable,
  of,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  catchError,
  delay,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterValidationService {
  constructor(private readonly charactersService: CharactersService) {}

  existsCharacter(id?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return of(control.value).pipe(
        delay(500),
        distinctUntilChanged(),
        switchMap((value) =>
          this.charactersService.exists(value, id).pipe(
            map((exists: boolean) => {
              return exists ? { exists: true } : null;
            }),
            catchError((err) => {
              return of({ exists: true });
            })
          )
        )
      );
    };
  }
}
