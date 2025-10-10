export type titleKey =
  | "email"
  | "phone"
  | "adress";

export interface ContactItem  {
  icon: string;
  titleContact: titleKey;
  value: string;
}