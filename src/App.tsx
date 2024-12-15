import React from 'react';
import Game from './ui/pages/game';
import { Route, Routes } from 'react-router-dom';
import Home from './ui/pages/home';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.key}>
        <Route path='/' element={<Home />} />
        <Route path='/game' element={<Game />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
