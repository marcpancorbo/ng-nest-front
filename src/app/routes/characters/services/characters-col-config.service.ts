import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import {
  CharacterRace,
  characterRaceLabels,
} from '../../../core/enums/character-race';
@Injectable({
  providedIn: 'root',
})
export class CharactersColConfigService {
  charactersColumns: ColDef[] = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
      filter: true,
      checkboxSelection: true,
    },
    {
      headerName: 'Name',
      field: 'name',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Race',
      field: 'race',
      sortable: true,
      filter: true,
      valueFormatter: (params) =>
        characterRaceLabels[params.value as CharacterRace],
    },
    {
      headerName: 'Power',
      field: 'power',
      sortable: true,
      filter: true,
    },
  ];
  constructor() {}
}
