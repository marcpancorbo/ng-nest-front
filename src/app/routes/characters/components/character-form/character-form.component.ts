import { KeyValuePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {
  NzUploadChangeParam,
  NzUploadFile,
  NzUploadModule,
} from 'ng-zorro-antd/upload';
import { Subject, exhaustMap, filter, takeUntil } from 'rxjs';
import {
  CharacterRace,
  characterRaceLabels,
} from '../../../../core/enums/character-race';
import { Character } from '../../../../core/models/character';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { CharacterDetailService } from '../../services/character-detail.service';
import { CharacterValidationService } from '../../services/character-validation.service';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    KeyValuePipe,
    NzUploadModule,
  ],
  providers: [AutoDestroyService],
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.scss',
})
export class CharacterFormComponent implements OnInit {
  character: Character | null = null;
  fileList: NzUploadFile[] = [];
  form: FormGroup = this.fb.group({});
  characterRaceLabels = characterRaceLabels;
  submit$: Subject<void> = new Subject<void>();
  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };
  constructor(
    private readonly fb: FormBuilder,
    private readonly destroy$: AutoDestroyService,
    private readonly charactersService: CharactersService,
    private readonly modal: NzModalRef,
    private readonly messageService: NzMessageService,
    private readonly characterDetailService: CharacterDetailService,
    private readonly characterValidationService: CharacterValidationService,
    @Inject(NZ_MODAL_DATA) private readonly data: Character
  ) {}

  ngOnInit(): void {
    this.character = this.data;
    this.initForm(this.character);
    this.subscribeToSubmit();
  }

  initForm(character?: Character) {
    this.form = this.fb.group({
      name: [
        character?.name ?? '',
        [Validators.required],
        [this.characterValidationService.existsCharacter(this.character?.id)],
      ],
      power: [
        character?.power ?? 25,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      race: [character?.race ?? CharacterRace.Saiyan, [Validators.required]],
    });
  }

  handleChange(upload: NzUploadChangeParam): void {
    if (upload.file.status !== 'uploading') {
      console.log(upload.file, upload.fileList);
    }
    if (upload.file.status === 'done') {
      console.log(`${upload.file.name} file uploaded successfully`);
    } else if (upload.file.status === 'error') {
      console.error(`${upload.file.name} file upload failed.`);
    }
  }
  subscribeToSubmit(): void {
    this.submit$
      .pipe(
        filter(() => this.form.valid),
        exhaustMap(() => {
          if (this.character?.id) {
            return this.charactersService.update(
              this.character.id,
              this.form.value,
              this.fileList[0]
            );
          } else {
            return this.charactersService.create(
              this.form.value,
              this.fileList[0]
            );
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((character: Character) => {
        this.messageService.success(
          `Character ${character.name} created successfully`
        );
        this.characterDetailService.updateCharacter(character);
        this.modal.triggerOk();
      });
  }
}
