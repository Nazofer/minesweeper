import { CellData } from '../typings/cell-data';

export function placeMines(
  board: CellData[][],
  mines: number,
  safeRow: number,
  safeCol: number
): CellData[][] {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

  let placed = 0;
  const rows = newBoard.length;
  const cols = newBoard[0].length;

  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    // Переконаємося, що не розміщуємо міну у безпечній клітинці
    if ((r === safeRow && c === safeCol) || newBoard[r][c].isMine) continue;
    newBoard[r][c].isMine = true;
    placed++;
  }

  return newBoard;
}
