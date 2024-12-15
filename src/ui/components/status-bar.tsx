// src/components/StatusBar.tsx
import React, { useEffect, useState } from 'react';
import { Button } from './common/button';

interface StatusBarProps {
  gameOver: boolean;
  gameWon: boolean;
  onReset: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({
  gameOver,
  gameWon,
  onReset,
}) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (gameOver || gameWon) return;
    const interval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [gameOver, gameWon]);

  let message = `Time: ${time}s`;
  if (gameOver) message = 'Game Over';
  if (gameWon) message = 'You Win!';

  return (
    <div className='flex items-center justify-between bg-gray-800 p-2 text-white w-full max-w-xs'>
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
