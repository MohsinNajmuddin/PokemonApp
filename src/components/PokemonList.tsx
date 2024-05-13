// components/PokemonList.tsx

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPokemonList } from '../store/slices/pokemonSlice';
import { Pokemon, ListResponse } from '../interfaces/types';
import { useGetPokemonListQuery } from '../services/pokemonApi';
import PokemonCharacter from './PokemonCharacter';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';


interface Props {
    onPokemonClick: (pokemon: Pokemon) => void;
}


const PokemonList: React.FC<Props> = ({ onPokemonClick }) => {

  const [pokemonList, setPokemonList] = useState<ListResponse>({results: []});

  const { data, error, isLoading } = useGetPokemonListQuery();
  

  useEffect(() => {
    setPokemonList({results: data?.results ?? []});
  }, [data?.results]);

  return (
    <div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {pokemonList.results.map((pokemon: Pokemon) => (
          <>
            <ListItem alignItems="flex-start">
              <PokemonCharacter pokemon={pokemon} />
            </ListItem>
            <Divider variant="fullWidth" component="li" />
          </>
        ))}
      </List>
    </div>
  );
};

export default PokemonList;
