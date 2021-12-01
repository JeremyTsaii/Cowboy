import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const GameContext = createContext({
  ammo: 0,
  lives: 0,
  isPlaying: false,
});

export const GameContextProvider = function GameContextProvider({
  children,
}) {
  const [gameStats, setGameStats] = useState({
    ammo: 0,
    lives: 0,
    isPlaying: false,
  });

  const value = useMemo(
    () => ({
      gameStats,
      setGameStats,
    }),
    [gameStats],
  );

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

GameContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
