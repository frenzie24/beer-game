// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Login';  // Import Login component
import Registration from './views/Registration';  // Import Registration component
import Profile from './views/Profile';  // Import UserProfile component
import Game from "./views/Game";
import GameSettings from './views/GameSettings';

import Behavior from './views/Behavior';

const App = () => {
  return (
    <div className="w-screen h-screen bg-slate-900 text-slate-100">
      <Router>
        <Routes>
          <Route path="/login" element={<Game />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/gamesettings" element={<GameSettings />} />
          <Route path="/game" element={<Game />} />
          <Route path="/" element={<Game />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
