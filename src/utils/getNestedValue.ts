export function getNestedValue(obj: any, path: string): string {
  return path
    .split(".")
    .reduce((o, k) => (o && o[k] !== undefined ? o[k] : ""), obj) as string;
}