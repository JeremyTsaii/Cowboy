import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { GameContext } from '../context/GameContext';
import robotIMG from '../images/robot.jpg';

const useStyles = makeStyles(() => ({
  container: {
    alignItems: 'center',
  },
}));

const BotCard = function BotCard() {
  const classes = useStyles();
  const gameContext = useContext(GameContext);
  console.log(gameContext.gameStats.playerMove);
  return (
    <Grid container className={classes.container}>
      <Grid item xs={3}>
        <Typography color="primary" variant="subtitle1">
          Bot Lives: {gameContext.gameStats.botLives}
        </Typography>
        <Typography color="primary" variant="subtitle1">
          Bot Ammo: {gameContext.gameStats.botAmmo}
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <img alt="bot" className="bot" src={robotIMG} />
      </Grid>
    </Grid>
  );
};

export default BotCard;
