import './App.css';

import React from 'react';
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';
import PlayerCard from './components/PlayerCard';
import TopCard from './components/TopCard';
import BotCard from './components/BotCard';
import GameOverModal from './components/GameOverModal';
import { GameContextProvider } from './context/GameContext';

const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#33eb91',
    },
    secondary: {
      main: '#f73378',
    },
    // Background colors
    info: {
      main: '#121212',
      light: '#191b21',
      dark: '#191b21',
    },
  },
  gameText: {
    fontSize: '2vw',
  },
});

const useStyles = makeStyles(() => ({
  container: {
    alignItems: 'center',
  },
}));

const App = function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={mainTheme}>
      <div className="App">
        <GameContextProvider>
          <TopCard />
          <div className={classes.container}>
            <BotCard />
            <PlayerCard />
            <GameOverModal />
          </div>
        </GameContextProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;
