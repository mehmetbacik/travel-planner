export type ContinentKey =
  | "nameNorthAmerica"
  | "descriptionNorthAmerica"
  | "nameSouthAmerica"
  | "descriptionSouthAmerica"
  | "nameEurope"
  | "nameAfrica"
  | "nameAsia"
  | "nameOceania";

export interface Continent {
  id: string;
  name: ContinentKey;
  path: string;
  color: string;
  hoverColor: string;
  countries: string[];
  description: ContinentKey;
}
