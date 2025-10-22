export type ContinentKey =
  | "northAmerica";

export interface Continent {
  id: string;
  name: ContinentKey;
  path: string;
  color: string;
  hoverColor: string;
  countries: string[];
  description: string;
}
