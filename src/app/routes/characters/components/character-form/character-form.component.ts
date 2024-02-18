import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {
  CharacterRace,
  characterRaceValues,
} from '../../../../core/enums/character-race';
import { Subject, exhaustMap, filter, takeUntil } from 'rxjs';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../../../core/models/character';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
  ],
  providers: [AutoDestroyService],
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.scss',
})
export class CharacterFormComponent implements OnInit {
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    power: [25, [Validators.required, Validators.min(0), Validators.max(100)]],
    race: [CharacterRace.Saiyan, [Validators.required]],
  });
  characterRaceValues = characterRaceValues;
  submit$: Subject<void> = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly destroy$: AutoDestroyService,
    private readonly charactersService: CharactersService,
    private readonly modal: NzModalRef,
    private readonly messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.subscribeToSubmit();
  }

  subscribeToSubmit(): void {
    this.submit$
      .pipe(
        filter(() => this.form.valid),
        exhaustMap(() => this.charactersService.create(this.form.value)),
        takeUntil(this.destroy$)
      )
      .subscribe((character: Character) => {
        this.messageService.success(
          `Character ${character.name} created successfully`
        );
        this.modal.triggerOk();
      });
  }
}
