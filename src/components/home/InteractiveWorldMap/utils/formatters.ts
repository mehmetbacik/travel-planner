export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};

export const formatArea = (area: number): string => {
  return `${formatNumber(area)} km²`;
};
