import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from './slices/pokemonSlice';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { pokemonApi } from '../services/pokemonApi'


export const store = configureStore({
    reducer: {
        pokemon: pokemonReducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

