import React from 'react';
import StatusBar from '@/ui/components/status-bar';
import Board from '@/ui/components/board';
import { useGameMechanics } from '@/ui/hooks/useGameMechanics';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/common/button';
import { ChevronLeft } from 'lucide-react';
import ConfettiExplosion from 'react-confetti-explosion';
import AnimatedRoute from '@/ui/components/animatedRoute';

const Game: React.FC = () => {
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const rows = searchParams.get('rows');
  const cols = searchParams.get('cols');
  const mines = searchParams.get('mines');

  const {
    board,
    gameOver,
    gameWon,
    handleReveal,
    handleFlag,
    reset,
    isGameStarted,
    lastClickedCell,
    setLastClickedCell,
  } = useGameMechanics(Number(rows), Number(cols), Number(mines));

  const boardWidth = board[0].length;

  const boardsPixels = boardWidth * 32 + (boardWidth - 1) * 2;

  const onGoBack = () => {
    reset();
    navigation('/');
  };

  return (
    <AnimatedRoute className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
      <Button onClick={onGoBack} className='mb-4'>
        <ChevronLeft />
      </Button>
      <StatusBar
        width={boardsPixels}
        isGameStarted={isGameStarted}
        gameOver={gameOver}
        gameWon={gameWon}
        onReset={reset}
      />
      <div className='mt-4 flex'>
        {gameWon && <ConfettiExplosion />}
        <Board
          isGameOver={gameOver}
          isGameWon={gameWon}
          isGameStarted={isGameStarted}
          board={board}
          onReveal={handleReveal}
          onFlag={handleFlag}
          lastClickedCell={lastClickedCell}
          setLastClickedCell={setLastClickedCell}
        />
        {gameWon && <ConfettiExplosion />}
      </div>
    </AnimatedRoute>
  );
};

export default Game;
