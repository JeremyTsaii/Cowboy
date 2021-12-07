import React, { useContext, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { GameContext } from '../context/GameContext';

const useStyles = makeStyles((theme) => ({
  startButton: {
    marginRight: theme.spacing(1),
    textTransform: 'none',
  },
}));

const StartButton = function StartButton() {
  const { gameStats, setGameStats } = useContext(GameContext);
  const classes = useStyles();

  // After 3 second countdown, allow time for capturing the pose
  const [isCapturing, setIsCapturing] = useState(false);

  const [timeLeft, setTimeLeft] = useState(3);
  // 3 second countdown
  useEffect(() => {
    if (gameStats.isPlaying && !isCapturing) {
      if (timeLeft > 0) {
        setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      } else {
        setIsCapturing(true);
        const newGameStats = { ...gameStats };
        newGameStats.capturePose = true;
        setGameStats(newGameStats);
        setTimeout(() => {
          setTimeLeft(3);
          setIsCapturing(false);
        }, 2000);
      }
    }
  });

  const handleStart = () => {
    const newGameStats = { ...gameStats };
    newGameStats.isPlaying = !newGameStats.isPlaying;
    setGameStats(newGameStats);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        className={classes.startButton}
        startIcon={
          gameStats.isPlaying ? (
            <PauseCircleOutlineIcon />
          ) : (
            <PlayCircleOutlineIcon />
          )
        }
        onClick={handleStart}
      >
        {gameStats.isPlaying ? 'Pause' : 'Start'}
      </Button>
      <Typography color="primary" variant="subtitle1">
        {`Time Left for Pose: ${timeLeft}`}
      </Typography>
      {isCapturing ? (
        <Typography color="primary" variant="subtitle1">
          Capturing pose...
        </Typography>
      ) : null}
    </div>
  );
};

export default StartButton;
