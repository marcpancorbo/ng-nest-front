import { CharacterRace } from '../enums/character-race';

export interface Character {
  id: string;
  name: string;
  race: CharacterRace;
  power: number;
  imageUrl: string;
  createdBy: string;
  createdOn: Date;
  updatedOn: Date;
}
