export enum CharacterRace {
  Saiyan,
  Human,
  Namekian,
  Majin,
  Frieza,
}
export const characterRaceLabels: Record<CharacterRace, string> = {
  [CharacterRace.Saiyan]: 'Saiyan',
  [CharacterRace.Human]: 'Human',
  [CharacterRace.Namekian]: 'Namekian',
  [CharacterRace.Majin]: 'Majin',
  [CharacterRace.Frieza]: 'Frieza',
};

export const characterRaceValues: { name: string; value: CharacterRace }[] = [
  {
    name: 'Saiyan',
    value: CharacterRace.Saiyan,
  },
  {
    name: 'Human',
    value: CharacterRace.Human,
  },
  {
    name: 'Namekian',
    value: CharacterRace.Namekian,
  },
  {
    name: 'Majin',
    value: CharacterRace.Majin,
  },
  {
    name: 'Frieza',
    value: CharacterRace.Frieza,
  },
];
