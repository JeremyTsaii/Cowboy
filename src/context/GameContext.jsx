import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const GameContext = createContext({
  playerAmmo: 0,
  playerLives: 3,
  botAmmo: 0,
  botLives: 3,
  isPlaying: false,
});

export const GameContextProvider = function GameContextProvider({
  children,
}) {
  const [gameStats, setGameStats] = useState({
    playerAmmo: 0,
    playerLives: 3,
    botAmmo: 0,
    botLives: 3,
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
