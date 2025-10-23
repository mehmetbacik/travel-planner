export type ContinentKey =
  | "nameNorthAmerica"
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
  description: string;
}
