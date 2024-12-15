import { DifficultyParams, DifficultyType } from '../typings/difficulty';

export const difficultyTypes: Record<DifficultyType, DifficultyParams> = {
  easy: {
    rows: 10,
    cols: 10,
    mines: 20,
  },
  medium: {
    rows: 16,
    cols: 16,
    mines: 40,
  },
  hard: {
    rows: 16,
    cols: 30,
    mines: 99,
  },
};
