import { Routes } from '@angular/router';
import { CharactersComponent } from './pages/characters/characters.component';
import { CharacterComponent } from './pages/character/character.component';

export const CHARACTERS_ROUTES: Routes = [
  {
    path: '',
    component: CharactersComponent,
    children: [
      {
        path: ':id',
        component: CharacterComponent,
      },
    ],
  },
];
