import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import { makeStyles } from '@material-ui/core/styles';
import { GameContext } from '../context/GameContext';

const useStyles = makeStyles((theme) => ({
  startButton: {
    marginRight: theme.spacing(1),
    textTransform: 'none',
  },
}));

const HelpButton = function HelpButton() {
  const gameContext = useContext(GameContext);
  const classes = useStyles();
  const [isPlaying, setIsPlaying] = useState(
    gameContext.gameStats.isPlaying,
  );

  const handleStart = () => {
    const newGameStats = { ...gameContext.gameStats };
    newGameStats.isPlaying = !newGameStats.isPlaying;

    gameContext.setGameStats(newGameStats);
    setIsPlaying(newGameStats.isPlaying);
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      className={classes.startButton}
      startIcon={
        isPlaying ? (
          <PauseCircleOutlineIcon />
        ) : (
          <PlayCircleOutlineIcon />
        )
      }
      onClick={handleStart}
    >
      {isPlaying ? 'Pause' : 'Start'}
    </Button>
  );
};

export default HelpButton;
