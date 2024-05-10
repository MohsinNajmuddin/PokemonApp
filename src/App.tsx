import React, { useState } from 'react';
import './App.css';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import { Pokemon } from './interfaces/types';


function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };


  return (
    <div>
    <h1>Pokemon App</h1>
    <div className="container">
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
