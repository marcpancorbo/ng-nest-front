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
