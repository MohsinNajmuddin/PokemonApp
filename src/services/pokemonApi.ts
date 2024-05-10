// services/pokemonApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon } from '../interfaces/types';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<Pokemon[], void>({
      query: () => 'pokemon/',
    }),
    getPokemonDetail: builder.query<Pokemon, string>({
      query: (id) => `pokemon/${id}`,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonDetailQuery } = pokemonApi;
