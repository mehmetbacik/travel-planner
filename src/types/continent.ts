export type ContinentKey =
  | "nameNorthAmerica"
  | "descriptionNorthAmerica"
  | "nameSouthAmerica"
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
