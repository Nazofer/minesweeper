import React from 'react';
import { Button } from './common/button';
import { twMerge } from 'tailwind-merge';
import { CellData } from '@/core/typings/cell-data';

interface CellProps {
  cell: CellData;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
}

// Кольори для чисел
const numberColors: Record<number, string> = {
  1: 'text-blue-600',
  2: 'text-green-600',
  3: 'text-red-600',
  4: 'text-purple-700',
  5: 'text-yellow-700',
  6: 'text-pink-700',
  7: 'text-orange-700',
  8: 'text-gray-700',
};

const Cell: React.FC<CellProps> = ({ cell, onClick, onRightClick }) => {
  let content = '';
  let cellClasses = 'w-8 h-8 flex items-center justify-center font-bold';

  if (cell.isRevealed) {
    if (cell.isMine) {
      // Якщо міна розкрита
      content = '💣';
      cellClasses = twMerge(cellClasses, 'bg-red-500 text-white');
    } else {
      // Клітинка без міни
      cellClasses = twMerge(cellClasses, 'bg-gray-200');
      if (cell.adjacentMines > 0) {
        content = String(cell.adjacentMines);
        cellClasses = twMerge(
          cellClasses,
          numberColors[cell.adjacentMines] || 'text-black'
        );
      } else {
        // Порожня клітинка
        cellClasses = twMerge(cellClasses, 'text-gray-700');
      }
    }
  } else {
    // Клітинка ще не розкрита
    if (cell.isFlagged) {
      content = '🚩';
      cellClasses = twMerge(cellClasses, 'bg-gray-400 text-red-600');
    } else {
      cellClasses = twMerge(
        cellClasses,
        'bg-gray-400 text-transparent cursor-pointer'
      );
    }
  }

  return (
    <Button
      variant='default'
      className={twMerge(
        cellClasses,
        'transition-colors duration-200 ease-in-out select-none disabled:opacity-1 hover:bg-gray-300'
      )}
      disabled={cell.isRevealed}
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      {content}
    </Button>
  );
};

export default Cell;
