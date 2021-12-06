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
  statText: {
    fontSize: theme.gameText.fontSize,
  },
}));

const PlayerCard = function PlayerCard() {
  const classes = useStyles();
  const { gameStats } = useContext(GameContext);

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Grid container className={classes.container}>
          <Grid item xs={3}>
            <div>
              <Typography
                color="primary"
                variant="h3"
                className={classes.statText}
              >
                Player Lives: {gameStats.playerLives}
              </Typography>
              <Typography
                color="primary"
                variant="h3"
                className={classes.statText}
              >
                Player Ammo: {gameStats.playerAmmo}
              </Typography>
              {gameStats.botMove ? (
                <Typography
                  color="primary"
                  variant="h3"
                  className={classes.statText}
                >
                  Player Last Move: {gameStats.playerMove}
                </Typography>
              ) : null}
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
