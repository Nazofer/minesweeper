import { CellData } from '../typings/cell-data';

export function calculateAdjacents(board: CellData[][]): CellData[][] {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
  for (let r = 0; r < newBoard.length; r++) {
    for (let c = 0; c < newBoard[0].length; c++) {
      if (!newBoard[r][c].isMine) {
        newBoard[r][c].adjacentMines = countAdjacentMines(newBoard, r, c);
      }
    }
  }
  return newBoard;
}

function countAdjacentMines(
  board: CellData[][],
  row: number,
  col: number
): number {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const r = row + dr;
      const c = col + dc;
      if (r >= 0 && r < board.length && c >= 0 && c < board[0].length) {
        if (board[r][c].isMine) count++;
      }
    }
  }
  return count;
}
