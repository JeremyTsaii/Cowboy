import React, { useContext } from 'react';
import Webcam from 'react-webcam';
import Typography from '@material-ui/core/Typography';
import { GameContext } from '../context/GameContext';
import StartButton from './StartButton';

const PlayerCard = function PlayerCard() {
  const gameContext = useContext(GameContext);

  return (
    <div>
      <StartButton />
      <Typography color="primary" variant="h4">
        Player Lives: {gameContext.gameStats.playerLives}
      </Typography>
      <Typography color="primary" variant="h4">
        Player Ammo: {gameContext.gameStats.playerAmmo}
      </Typography>
      <Typography color="primary" variant="h4">
        Game Status:{' '}
        {gameContext.gameStats.isPlaying ? 'Playing' : 'Not Started'}
      </Typography>
      <Webcam />
    </div>
  );
};

export default PlayerCard;
