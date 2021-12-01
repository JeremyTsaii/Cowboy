import React, { useContext } from 'react';
import Webcam from 'react-webcam';
import Typography from '@material-ui/core/Typography';
import { GameContext } from '../context/GameContext';
import StartButton from './StartButton';

const PlayerCard = function PlayerCard() {
  const gameStats = useContext(GameContext);

  return (
    <div>
      <StartButton />
      <Typography color="primary" variant="h4">
        Lives: {gameStats.lives}
      </Typography>
      <Typography color="primary" variant="h4">
        Ammo: {gameStats.ammo}
      </Typography>
      <Typography color="primary" variant="h4">
        Game Status: {gameStats.isPlaying ? 'Playing' : 'Not Started'}
      </Typography>
      <Webcam />
    </div>
  );
};

export default PlayerCard;
