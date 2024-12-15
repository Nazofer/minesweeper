import React from 'react';
import StatusBar from './ui/components/status-bar';
import Board from './ui/components/board';
import { useGameMechanics } from './ui/hooks/useGameMechanics';

const App: React.FC = () => {
  const { board, gameOver, gameWon, handleReveal, handleFlag, reset } =
    useGameMechanics();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
      <StatusBar gameOver={gameOver} gameWon={gameWon} onReset={reset} />
      <div className='mt-4'>
        <Board board={board} onReveal={handleReveal} onFlag={handleFlag} />
      </div>
    </div>
  );
};

export default App;
