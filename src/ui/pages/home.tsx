import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/button';
import { difficultyTypes } from '@/core/constants/difficultyTypes';
import { DifficultyType } from '@/core/typings/difficulty';

const getDifficultyParams = (type: DifficultyType) => {
  const difficultyParams = difficultyTypes[type];

  const paramsString = Object.entries(difficultyParams).map(
    ([key, value]) => `${key}=${value}`
  );

  return paramsString.join('&');
};

const Home: React.FC = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='max-w-[400px] w-full mb-4 flex flex-col items-center gap-4'>
        <h1>Select difficulty</h1>
        <Link className='w-full' to={`/game?${getDifficultyParams('easy')}`}>
          <Button className='w-full'>Easy</Button>
        </Link>
        <Link className='w-full' to={`/game?${getDifficultyParams('medium')}`}>
          <Button className='w-full'>Medium</Button>
        </Link>
        <Link className='w-full' to={`/game?${getDifficultyParams('hard')}`}>
          <Button className='w-full'>Hard</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
