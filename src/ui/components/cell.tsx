// src/components/Cell.tsx
import { CellData } from '@/core/typings/cell-data';
import React from 'react';

interface CellProps {
  cell: CellData;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
}

const Cell: React.FC<CellProps> = ({ cell, onClick, onRightClick }) => {
  let content = '';
  if (cell.isRevealed) {
    if (cell.isMine) content = '💣';
    else if (cell.adjacentMines > 0) content = String(cell.adjacentMines);
  } else if (cell.isFlagged) {
    content = '🚩';
  }

  return (
    <button
      className={`w-8 h-8 flex items-center justify-center text-sm border ${
        cell.isRevealed
          ? 'bg-gray-200 border-gray-300'
          : 'bg-gray-400 border-gray-500'
      }`}
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      {content}
    </button>
  );
};

export default Cell;
