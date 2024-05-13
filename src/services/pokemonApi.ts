// services/pokemonApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ListResponse } from '../interfaces/types';



export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<ListResponse, void>({
      query: () => 'pokemon/',
    }),
    getPokemonDetail: builder.query<any, string>({
      query: (id) => `pokemon/${id}`,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonDetailQuery } = pokemonApi;
