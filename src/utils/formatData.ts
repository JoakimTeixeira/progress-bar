import { nanoid } from 'nanoid';

export const getArrayWithId = <T>(array: T[]): T[] =>
  array.map((item: T) => ({
    ...item,
    id: nanoid(),
  }));
