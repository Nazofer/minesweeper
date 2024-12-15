import { Coordinate } from '../typings/cell-data';

export const getDistance = (a: Coordinate, b: Coordinate) => {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};
