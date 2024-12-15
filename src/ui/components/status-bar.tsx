import React, { useEffect, useState } from 'react';
import { Button } from './common/button';

interface StatusBarProps {
  gameOver: boolean;
  gameWon: boolean;
  width?: number;
  isGameStarted?: boolean;
  onReset: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({
  gameOver,
  gameWon,
  onReset,
  width,
  isGameStarted,
}) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (gameOver || gameWon || !isGameStarted) return;
    const interval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [gameOver, gameWon, isGameStarted]);

  let message = `Time: ${time}s`;
  if (gameOver) message = 'Game Over';
  if (gameWon) message = 'You Win!';

  return (
    <div
      style={{
        width: `${width}px`,
      }}
      className='flex items-center justify-between bg-gray-800 p-2 text-white w-full rounded-lg'
    >
      <span>{message}</span>
      <Button
        onClick={() => {
          setTime(0);
          onReset();
        }}
      >
        Reset
      </Button>
    </div>
  );
};

export default StatusBar;
