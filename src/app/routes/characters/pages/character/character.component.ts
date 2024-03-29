import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { EMPTY, Observable, catchError, concatMap, takeUntil } from 'rxjs';
import { Character } from '../../../../core/models/character';
import { CharactersService } from '../../services/characters.service';
import { JsonPipe } from '@angular/common';
import { CharacterDetailService } from '../../services/character-detail.service';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [JsonPipe],
  providers: [AutoDestroyService],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
})
export class CharacterComponent implements OnInit {
  $character: WritableSignal<Character | null> = signal(null);
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly destroy$: AutoDestroyService,
    private readonly characterService: CharactersService,
    private readonly characterDetailService: CharacterDetailService
  ) {}

  ngOnInit(): void {
    this.subscribeToRouteParams();
    this.subscribeToCharacterUpdated();
  }

  subscribeToRouteParams(): void {
    this.route.params
      .pipe(
        concatMap((params) =>
          this.getCharacter(params['id']).pipe(
            catchError((error) => {
              this.router.navigate(['/not-found']);
              return EMPTY;
            })
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((character: Character) => this.$character.set(character));
  }

  subscribeToCharacterUpdated(): void {
    this.characterDetailService.updated$
      .pipe(takeUntil(this.destroy$))
      .subscribe((character: Character) => {
        if (character.id === this.$character()?.id) {
          this.$character.set(character);
        }
      });
  }
  getCharacter(id: string): Observable<Character> {
    return this.characterService
      .getCharacterById(id)
      .pipe(takeUntil(this.destroy$));
  }
}
