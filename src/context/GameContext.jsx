import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const DefaultContext = {
  playerAmmo: 3,
  playerLives: 3,
  botAmmo: 3,
  botLives: 3,
  botMove: null,
  isPlaying: false,
  capturePose: false,
  isGameOver: false,
};

export const GameContext = createContext(DefaultContext);

export const GameContextProvider = function GameContextProvider({
  children,
}) {
  const [gameStats, setGameStats] = useState(DefaultContext);

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
