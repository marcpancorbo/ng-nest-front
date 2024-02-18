import { CharacterRace } from '../enums/character-race';

export interface Character {
  id: string;
  name: string;
  race: CharacterRace;
  power: number;
}
