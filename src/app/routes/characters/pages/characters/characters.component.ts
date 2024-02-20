import { Component, WritableSignal, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi } from 'ag-grid-community';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { finalize, takeUntil } from 'rxjs';
import { Character } from '../../../../core/models/character';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { CharactersColConfigService } from '../../services/characters-col-config.service';
import { CharactersService } from '../../services/characters.service';
import { CharacterFormComponent } from '../../components/character-form/character-form.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [RouterOutlet, AgGridAngular, NzButtonModule],
  providers: [AutoDestroyService, NzModalService, NzMessageService],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
})
export class CharactersComponent {
  $characters: WritableSignal<Character[]> = signal([]);
  colDef: ColDef[] = this.charactersColConfigService.charactersColumns;
  gridApi: GridApi | null;
  constructor(
    private readonly destroy$: AutoDestroyService,
    private readonly charactersService: CharactersService,
    private readonly charactersColConfigService: CharactersColConfigService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly modalService: NzModalService,
    private readonly messageService: NzMessageService
  ) {}
  ngOnInit(): void {}

  getCharacters(): void {
    this.gridApi?.showLoadingOverlay();
    this.charactersService
      .getCharacters()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.gridApi?.hideOverlay())
      )
      .subscribe((characters) => {
        this.$characters.set(characters);
      });
  }
  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.getCharacters();
  }

  onModelUpdated(): void {
    this.gridApi?.sizeColumnsToFit();
  }
  editCharacter(): void {
    const selectedNodes = this.gridApi?.getSelectedNodes() || [];
    if (selectedNodes.length === 1) {
      this.modalService.create({
        nzTitle: 'Edit Character',
        nzContent: CharacterFormComponent,
        nzMaskClosable: false,
        nzFooter: null,
        nzData: selectedNodes[0].data,
        nzOnOk: () => this.getCharacters(),
      });
    } else {
      this.messageService.error('Please select a character to edit');
    }
  }
  createCharacter(): void {
    this.modalService.create({
      nzTitle: 'Create Character',
      nzContent: CharacterFormComponent,
      nzMaskClosable: false,
      nzFooter: null,
      nzOnOk: () => this.getCharacters(),
    });
  }
  deleteCharacter(): void {
    const selectedNodes = this.gridApi?.getSelectedNodes() || [];
    if (selectedNodes.length === 1) {
      this.modalService.confirm({
        nzTitle: 'Are you sure you want to delete this character?',
        nzContent: 'This action cannot be undone',
        nzOnOk: () => {
          this.charactersService
            .deleteCharacterById(selectedNodes[0].data.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
              this.messageService.success('Character deleted successfully');
              this.router.navigate(['.'], { relativeTo: this.route });
              this.getCharacters();
            });
        },
      });
    } else {
      this.messageService.error('Please select a character to delete');
    }
  }

  navigateToDetail(character: Character): void {
    this.router.navigate([character.id], { relativeTo: this.route });
  }

  onSelectionChanged(): void {}
}
