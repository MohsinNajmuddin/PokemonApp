// components/PokemonList.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPokemonList } from '../store/slices/pokemonSlice';
import { Pokemon } from '../interfaces/types';
import { AppDispatch } from '../store/store';



interface Props {
    onPokemonClick: (pokemon: Pokemon) => void; // Define the prop
}


const PokemonList: React.FC<Props> = ({ onPokemonClick }) => {
  const dispatch = useDispatch<AppDispatch>();
  const pokemonList = useSelector(selectPokemonList);


  useEffect(() => {
    //dispatch(fetchPokemonList());
  }, []);

  return (
    <div>
      <h2>Pokemon List</h2>
      <ul>
        {pokemonList.map((pokemon: Pokemon) => (
          <li key={pokemon.name} onClick={() => onPokemonClick(pokemon)}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
