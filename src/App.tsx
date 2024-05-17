import './App.css';
import PokemonList from './components/PokemonList';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function App() {

  return (
    <div>
      <div className="container">
        <AppBar>
          <Toolbar>
            <Typography variant="h5" component="div">
              PokeReact
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="pokemon-list">
          <PokemonList />
        </div>
      </div>
    </div>
  );
}

export default App;
