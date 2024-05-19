// services/pokemonApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ListResponse } from "../interfaces/types";
import { API_BASE_URL } from "../utils/constants";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<ListResponse, void>({
      query: () => "pokemon/",
    }),
    getPokemonDetail: builder.query<any, string>({
      query: (id) => `pokemon/${id}`,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonDetailQuery } = pokemonApi;
