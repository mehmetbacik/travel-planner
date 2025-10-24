export type ContinentKey =
  | "nameNorthAmerica"
  | "descriptionNorthAmerica"
  | "nameSouthAmerica"
  | "descriptionSouthAmerica"
  | "nameEurope"
  | "descriptionEurope"
  | "nameAfrica"
  | "descriptionAfrica"
  | "nameAsia"
  | "descriptionAsia"
  | "nameOceania"
  | "descriptionOceania";

export interface Continent {
  id: string;
  name: ContinentKey;
  path: string;
  color: string;
  hoverColor: string;
  countries: string[];
  description: ContinentKey;
}
