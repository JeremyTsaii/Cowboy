import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { GameContext } from '../context/GameContext';
import robotIMG from '../images/robot.jpg';
import reloadIMG from '../images/bullet.png';
import shieldIMG from '../images/Green_Shield.png';
import shootIMG from '../images/green_gun.png';

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: 'center',
  },
  botPic: {
    height: '39vh',
  },
  statText: {
    fontSize: theme.gameText.fontSize,
  },
}));

const getBotImage = function getBotImage() {
  const classes = useStyles();
  const { gameStats } = useContext(GameContext);
  if (!gameStats.botMove)
    return (
      <img alt="bot" className={classes.botPic} src={robotIMG} />
    );

  switch (gameStats.botMove) {
    case 'Reload':
      return (
        <img alt="bot" className={classes.botPic} src={reloadIMG} />
      );
    case 'Shield':
      return (
        <img alt="bot" className={classes.botPic} src={shieldIMG} />
      );
    case 'Shoot':
      return (
        <img alt="bot" className={classes.botPic} src={shootIMG} />
      );
    default:
      return (
        <img alt="bot" className={classes.botPic} src={robotIMG} />
      );
  }
};

const BotCard = function BotCard() {
  const classes = useStyles();
  const { gameStats } = useContext(GameContext);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={3}>
        <Typography
          color="primary"
          variant="h3"
          className={classes.statText}
        >
          Bot Lives: {gameStats.botLives}
        </Typography>
        <Typography
          color="primary"
          variant="h3"
          className={classes.statText}
        >
          Bot Ammo: {gameStats.botAmmo}
        </Typography>
        {gameStats.botMove ? (
          <Typography
            color="primary"
            variant="h3"
            className={classes.statText}
          >
            Bot Last Move: {gameStats.botMove}
          </Typography>
        ) : null}
      </Grid>
      <Grid item xs={6}>
        {getBotImage()}
      </Grid>
      <Grid item xs={3} />
    </Grid>
  );
};

export default BotCard;
