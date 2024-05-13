import React, { useState } from 'react';
import './App.css';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import { Pokemon } from './interfaces/types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };


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
          <PokemonList onPokemonClick={handlePokemonClick} />
        </div>
        <div className="pokemon-detail">
          {selectedPokemon && <PokemonDetail pokemon={selectedPokemon} />}
        </div>
      </div>
    </div>
  );
}

export default App;
