// components/PokemonList.tsx

import React, { useEffect, useState } from 'react';
import { Pokemon, ListResponse } from '../interfaces/types';
import { useGetPokemonListQuery } from '../services/pokemonApi';
import PokemonCharacter from './PokemonCharacter';
import { List, ListItem, Divider, CircularProgress, Alert } from '@mui/material';


const PokemonList: React.FC<{}> = () => {

  const [pokemonList, setPokemonList] = useState<ListResponse>({results: []});

  const { data, error, isLoading } = useGetPokemonListQuery();
  

  useEffect(() => {
    setPokemonList({results: data?.results ?? []});
  }, [data?.results]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Error loading Pokémon details</Alert>;
  }

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
