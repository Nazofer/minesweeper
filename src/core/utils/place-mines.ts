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

    // Перевіряємо, чи це безпечна зона — клітинка, де клікнув користувач, або її сусіди
    if (isInSafeZone(r, c, safeRow, safeCol) || newBoard[r][c].isMine) {
      continue;
    }

    newBoard[r][c].isMine = true;
    placed++;
  }

  return newBoard;
}

function isInSafeZone(
  r: number,
  c: number,
  safeRow: number,
  safeCol: number
): boolean {
  // Зона в радіусі 1 клітинки: включає саму safeRow,safeCol та
  // всі суміжні клітинки навколо неї (3x3 блок)
  return Math.abs(r - safeRow) <= 1 && Math.abs(c - safeCol) <= 1;
}
