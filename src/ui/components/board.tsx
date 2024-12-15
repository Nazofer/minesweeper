import React from 'react';
import { motion } from 'framer-motion';
import { CellData } from '@/core/typings/cell-data';
import Cell from './cell';

interface BoardProps {
  board: CellData[][];
  onReveal: (r: number, c: number) => void;
  onFlag: (r: number, c: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onReveal, onFlag }) => {
  return (
    <div className='inline-block'>
      <div
        className='grid'
        style={{
          gridTemplateColumns: `repeat(${board[0].length}, 2rem)`,
          gap: '2px',
        }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => {
            return (
              <motion.div
                key={`${r}-${c}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Cell
                  cell={cell}
                  onClick={() => onReveal(r, c)}
                  onRightClick={(e) => {
                    e.preventDefault();
                    onFlag(r, c);
                  }}
                />
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Board;
