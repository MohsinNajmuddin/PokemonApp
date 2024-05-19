import { createSlice } from "@reduxjs/toolkit";
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
    },
  },
});

export default pokemonSlice.reducer;
