import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Pokemon } from "../../interfaces/types";



interface PokemonState {
    list: Pokemon[];
}


const initialState: PokemonState = {
    list: [],
};

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
      updateList(state, action) {
        state.list = action.payload;
      }
    },
});

export const selectPokemonList = (state: RootState) => state.pokemon.list;
export default pokemonSlice.reducer;
