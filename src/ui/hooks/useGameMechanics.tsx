import { useState } from 'react';
import { CellData } from '@/core/typings/cell-data';

import { revealCell } from '@/core/utils/reveal-cell';
import { generateEmptyBoard } from '@/core/utils/generate-empty-board';
import { placeMines } from '@/core/utils/place-mines';
import { calculateAdjacents } from '@/core/utils/calculate-adjacents';

export function useGameMechanics(rows = 10, cols = 10, mines = 20) {
  const [board, setBoard] = useState<CellData[][]>(
    () => generateEmptyBoard(rows, cols) // без мін
  );
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [isFirstMove, setIsFirstMove] = useState(true);

  const handleReveal = (r: number, c: number) => {
    if (gameOver || gameWon) return;

    let newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

    // Якщо це перший клік, розміщуємо міни так, щоб (r,c) не була міною
    if (isFirstMove) {
      newBoard = placeMines(newBoard, mines, r, c);
      newBoard = calculateAdjacents(newBoard);
      setIsFirstMove(false);
    }

    newBoard = revealCell(newBoard, r, c);
    setBoard(newBoard);

    // Перевірка на міну після розкриття
    if (newBoard[r][c].isMine) {
      setGameOver(true);
      // Розкриємо усі міни для наочності
      const revealedMines = newBoard.map((row) =>
        row.map((cell) => (cell.isMine ? { ...cell, isRevealed: true } : cell))
      );
      setBoard(revealedMines);
      return;
    }

    // Перевірка на виграш
    const allSafeRevealed =
      newBoard.flat().filter((cell) => !cell.isMine && !cell.isRevealed)
        .length === 0;
    if (allSafeRevealed) {
      setGameWon(true);
    }
  };

  const handleFlag = (r: number, c: number) => {
    if (gameOver || gameWon) return;
    const newBoard = board.map((row, ri) =>
      row.map((cell, ci) => {
        if (ri === r && ci === c && !cell.isRevealed) {
          return { ...cell, isFlagged: !cell.isFlagged };
        }
        return cell;
      })
    );
    setBoard(newBoard);
  };

  const reset = () => {
    setBoard(generateEmptyBoard(rows, cols));
    setGameOver(false);
    setGameWon(false);
    setIsFirstMove(true);
  };

  return { board, gameOver, gameWon, handleReveal, handleFlag, reset };
}
