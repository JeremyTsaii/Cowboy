import React, { useContext } from 'react';
import Webcam from 'react-webcam';
import { GameContext } from '../context/GameContext'
import Typography from '@material-ui/core/Typography'
import reloadIMG from '../images/reload.jpg'
import shootIMG from '../images/shield.png'
import sheildIMG from '../images/shoot.png'
import robotIMG from '../images/robot.jpg'
import { mergeClasses } from '@material-ui/styles';


function BotCard() {
    const gameStats = useContext(GameContext);

    return (
        <div>
            <Typography color="primary" variant="h4">Lives: {gameStats.lives}</Typography>
            <Typography color="primary" variant="h4">Ammo: {gameStats.ammo}</Typography>
            <img alt="bot" className="bot" src={robotIMG} />
        </div>

    );
}

export default BotCard