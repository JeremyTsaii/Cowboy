import './App.css';

import PlayerCard from './components/PlayerCard';
import TopCard from './components/TopCard';
import BotCard from './components/BotCard';

import {
  createTheme,
  ThemeProvider,
} from '@material-ui/core/styles'
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
})

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <div className="App">
        <GameContextProvider>
          <TopCard/>
          <div className="container">
            <PlayerCard/>
            <BotCard/>
          </div>
        </GameContextProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
