export type TopItems<T> = {
  href: string;
  limi: number;
  total: number;
  items: T[];
};
