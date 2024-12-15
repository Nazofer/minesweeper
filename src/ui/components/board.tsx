import React, { useEffect, useCallback } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { CellData } from '@/core/typings/cell-data';
import Cell from './cell';
import { Coordinate } from '@/core/typings/cell-data';
import { TRANSITION_SPEED } from '@/core/constants/transitionSpeed';
import { getDistance } from '@/core/utils/get-distance';
import useUpdateEffect from '../hooks/useUpdateEffect';

interface BoardProps {
  board: CellData[][];
  isGameOver?: boolean;
  isGameWon?: boolean;
  isGameStarted: boolean;
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
  isGameWon,
  isGameStarted,
  lastClickedCell,
  setLastClickedCell,
}) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (lastClickedCell) {
      onReveal(...lastClickedCell);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastClickedCell]);

  const resetAnimation = useCallback(async () => {
    await animate(scope.current, {
      opacity: 0,
      scale: 1.1,
    });

    await animate(scope.current, {
      opacity: 1,
      scale: 1,
    });
  }, [scope, animate]);

  useUpdateEffect(() => {
    if (!isGameStarted) {
      resetAnimation();
    }
  }, [isGameStarted]);

  return (
    <motion.div
      ref={scope}
      initial={{
        opacity: 0,
        scale: 1.1,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
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
      {isGameWon && (
        <div className='absolute inset-0 opacity-0 z-10 rounded-lg' />
      )}
      {board.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          return (
            <div key={`${rowIndex}-${cellIndex}`} className='size-8'>
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
            </div>
          );
        })
      )}
    </motion.div>
  );
};

export default Board;
