import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { GameContext } from '../context/GameContext';
import robotIMG from '../images/robot.jpg';

const BotCard = function BotCard() {
  const gameContext = useContext(GameContext);

  return (
    <div>
      <Typography color="primary" variant="h4">
        Bot Lives: {gameContext.gameStats.botLives}
      </Typography>
      <Typography color="primary" variant="h4">
        Bot Ammo: {gameContext.gameStats.botAmmo}
      </Typography>
      <img alt="bot" className="bot" src={robotIMG} />
    </div>
  );
};

export default BotCard;
