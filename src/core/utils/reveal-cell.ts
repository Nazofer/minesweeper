import { CellData } from '../typings/cell-data';

export function revealCell(
  board: CellData[][],
  row: number,
  col: number
): CellData[][] {
  const newBoard = board.map((r) => r.map((cell) => ({ ...cell })));

  // Якщо клітинка вже розкрита або позначена прапорцем – нічого не робимо
  if (newBoard[row][col].isRevealed || newBoard[row][col].isFlagged) {
    return newBoard;
  }

  // Розкриваємо поточну клітинку
  newBoard[row][col].isRevealed = true;

  // Якщо ця клітинка порожня (adjacentMines === 0) та не міна, ми хочемо відкрити цілу область
  if (newBoard[row][col].adjacentMines === 0 && !newBoard[row][col].isMine) {
    // Використовуємо стек для поширення розкриття
    const stack = [[row, col]];

    while (stack.length > 0) {
      const [cr, cc] = stack.pop()!;

      // Перевіряємо всіх 8 сусідів
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue; // пропускаємо саму клітинку
          const nr = cr + dr;
          const nc = cc + dc;
          // Перевірка меж дошки
          if (
            nr >= 0 &&
            nr < newBoard.length &&
            nc >= 0 &&
            nc < newBoard[0].length
          ) {
            const neighbor = newBoard[nr][nc];
            // Якщо сусідня клітинка не розкрита, не міна і не прапорець – розкриваємо її
            if (
              !neighbor.isRevealed &&
              !neighbor.isMine &&
              !neighbor.isFlagged
            ) {
              neighbor.isRevealed = true;
              // Якщо і сусідня клітинка теж порожня, додаємо її координати до стеку
              // щоб продовжити "розливання"
              if (neighbor.adjacentMines === 0) {
                stack.push([nr, nc]);
              }
            }
          }
        }
      }
    }
  }

  return newBoard;
}
