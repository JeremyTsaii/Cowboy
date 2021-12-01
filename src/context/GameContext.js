import React, { createContext } from 'react';

export const GameContext = createContext({
  ammo: 0,
  lives: 0,
  isPlaying: false,
});

export var GameContextProvider = function ({ children }) {
  const gameStats = {
    ammo: 0,
    lives: 0,
    isPlaying: false,
  };

  return (
    <GameContext.Provider value={gameStats}>
      {children}
    </GameContext.Provider>
  );
};
