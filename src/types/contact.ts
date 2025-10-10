export type titleKey =
  | "email"
  | "phone"
  | "address";

export interface ContactItem  {
  icon: string;
  titleContact: titleKey;
  value: string;
}