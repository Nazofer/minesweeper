import React from 'react';
import { Button } from './common/button';
import { twMerge } from 'tailwind-merge';
import { CellData } from '@/core/typings/cell-data';
// @ts-expect-error js module without types
import Explosion from 'react-explode/Mindoro';
import { motion, AnimatePresence } from 'framer-motion';
import { TRANSITION_SPEED } from '@/core/constants/transitionSpeed';

interface CellProps {
  revealDelay?: number;
  cell: CellData;
  showExplosion?: boolean;
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

const Cell: React.FC<CellProps> = ({
  cell,
  onClick,
  onRightClick,
  showExplosion,
  revealDelay,
}) => {
  let content = '';
  let cellClasses =
    'bg-gray-200 w-8 h-8 flex items-center justify-center font-bold';

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
      cellClasses = twMerge(cellClasses, 'text-transparent cursor-pointer');
    }
  }

  return (
    <Button
      variant='default'
      className={twMerge(
        cellClasses,
        'relative transition-colors duration-200 ease-in-out select-none disabled:opacity-1 hover:bg-gray-300'
      )}
      disabled={cell.isRevealed}
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      <AnimatePresence>
        {!cell.isRevealed && (
          <motion.div
            exit={{
              rotateY: 360,
              opacity: 0,
            }}
            transition={{
              delay: revealDelay,
              duration: TRANSITION_SPEED,
            }}
            className='absolute z-[2] inset-0 bg-gray-400 rounded-lg hover:bg-gray-300'
          />
        )}
      </AnimatePresence>
      <div className={twMerge(cell.isFlagged && 'z-[3]')}>{content}</div>
      {showExplosion && (
        <div className='z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Explosion size='200' delay={0} repeatDelay={0} repeat={0} />
        </div>
      )}
    </Button>
  );
};

export default Cell;
