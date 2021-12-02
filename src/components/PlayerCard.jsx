import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { GameContext } from '../context/GameContext';
import StartButton from './StartButton';
import PlayerCamera from './PlayerCamera';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  container: {
    alignItems: 'center',
  },
  card: {
    background: theme.palette.info.dark,
    borderTopLeftRadius: theme.spacing(1),
    borderBottomLeftRadius: theme.spacing(1),
    borderTopRightRadius: theme.spacing(1),
    borderBottomRightRadius: theme.spacing(1),
  },
}));

const PlayerCard = function PlayerCard() {
  const classes = useStyles();
  const gameContext = useContext(GameContext);

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Grid container className={classes.container}>
          <Grid item xs={3}>
            <div>
              <Typography color="primary" variant="subtitle1">
                Player Lives: {gameContext.gameStats.playerLives}
              </Typography>
              <Typography color="primary" variant="subtitle1">
                Player Ammo: {gameContext.gameStats.playerAmmo}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <PlayerCamera />
          </Grid>
          <Grid item xs={3}>
            <StartButton />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default PlayerCard;
