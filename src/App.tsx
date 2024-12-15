import React from 'react';
import Game from './ui/pages/game';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './ui/pages/home';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game' element={<Game />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
