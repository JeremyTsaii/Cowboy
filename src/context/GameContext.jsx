import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const DefaultContext = {
  playerAmmo: 0,
  playerLives: 3,
  playerMove: null,
  botAmmo: 0,
  botLives: 3,
  botMove: null,
  isPlaying: false,
  capturePose: false,
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
