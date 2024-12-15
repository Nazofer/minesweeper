import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CellData } from '@/core/typings/cell-data';
import Cell from './cell';
import { Coordinate } from '@/core/typings/cell-data';
import { TRANSITION_SPEED } from '@/core/constants/transitionSpeed';
import { getDistance } from '@/core/utils/get-distance';

interface BoardProps {
  board: CellData[][];
  isGameOver?: boolean;
  lastClickedCell?: Coordinate | null;
  setLastClickedCell?: React.Dispatch<React.SetStateAction<Coordinate | null>>;
  onReveal: (r: number, c: number) => void;
  onFlag: (r: number, c: number) => void;
}

const Board: React.FC<BoardProps> = ({
  board,
  onReveal,
  onFlag,
  isGameOver,
  lastClickedCell,
  setLastClickedCell,
}) => {
  useEffect(() => {
    if (lastClickedCell) {
      onReveal(...lastClickedCell);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastClickedCell]);

  return (
    <div
      className='grid relative'
      style={{
        gridTemplateColumns: `repeat(${board[0].length}, auto)`,
        gap: '2px',
      }}
    >
      {isGameOver && (
        <motion.div
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 0,
          }}
          transition={{
            delay: 1.2,
          }}
          className='absolute inset-0 bg-black/50 z-10 rounded-lg'
        />
      )}
      {board.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          return (
            <motion.div
              key={`${rowIndex}-${cellIndex}`}
              className='size-8'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Cell
                cell={cell}
                revealDelay={
                  lastClickedCell
                    ? getDistance([rowIndex, cellIndex], lastClickedCell) *
                      TRANSITION_SPEED
                    : undefined
                }
                showExplosion={
                  rowIndex === lastClickedCell?.[0] &&
                  cellIndex === lastClickedCell?.[1] &&
                  isGameOver
                }
                onClick={() => {
                  setLastClickedCell?.([rowIndex, cellIndex]);
                }}
                onRightClick={(e) => {
                  e.preventDefault();
                  onFlag(rowIndex, cellIndex);
                }}
              />
            </motion.div>
          );
        })
      )}
    </div>
  );
};

export default Board;
