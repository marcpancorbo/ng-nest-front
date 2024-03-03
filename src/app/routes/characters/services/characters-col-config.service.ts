import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import {
  CharacterRace,
  characterRaceLabels,
} from '../../../core/enums/character-race';
import { DatePipe } from '@angular/common';
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
    {
      headerName: 'Created by',
      field: 'createdBy',
    },
    {
      headerName: 'Created on',
      field: 'createdOn',
      valueFormatter: (params) =>
        params.value
          ? this.datePipe.transform(params.value, 'dd.MM.yyyy HH:mm:ss') || ''
          : '',
    },
    {
      headerName: 'Updated on',
      field: 'updatedOn',
      valueFormatter: (params) =>
        params.value
          ? this.datePipe.transform(params.value, 'dd.MM.yyyy HH:mm:ss') || ''
          : '',
    },
  ];
  constructor(private readonly datePipe: DatePipe) {}
}
