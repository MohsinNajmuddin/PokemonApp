import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useGetPokemonListQuery } from '../services/pokemonApi';
import PokemonList from '../components/PokemonList';
import { ListResponse } from '../interfaces/types';

// Mock the useGetPokemonListQuery hook
jest.mock('../services/pokemonApi');

const mockUseGetPokemonListQuery = useGetPokemonListQuery as jest.MockedFunction<typeof useGetPokemonListQuery>;

describe('PokemonList', () => {
  it('renders loading state correctly', () => {
    mockUseGetPokemonListQuery.mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
      refetch: jest.fn()
    });

    render(<PokemonList />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    mockUseGetPokemonListQuery.mockReturnValue({
      data: undefined,
      error: { message: 'Error fetching data' },
      isLoading: false,
      refetch: jest.fn()
    });

    render(<PokemonList />);

    expect(screen.getByText(/error loading pokémon details/i)).toBeInTheDocument();
  });

  it('renders Pokemon list correctly', async () => {
    const mockData: ListResponse = {
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
      ]
    };

    mockUseGetPokemonListQuery.mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
      refetch: jest.fn()
    });

    render(<PokemonList />);

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    });
  });
});
