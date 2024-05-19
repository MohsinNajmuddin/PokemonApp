import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useGetPokemonDetailQuery } from '../services/pokemonApi';
import PokemonCharacter from '../components/PokemonCharacter';
import { Pokemon } from '../interfaces/types';

// Mock the useGetPokemonDetailQuery hook
jest.mock('../services/pokemonApi');

const mockUseGetPokemonDetailQuery = useGetPokemonDetailQuery as jest.MockedFunction<typeof useGetPokemonDetailQuery>;

const pokemon: Pokemon = {
  name: 'pikachu',
  url: 'https://pokeapi.co/api/v2/pokemon/1/'
};

describe('PokemonCharacter', () => {
  it('renders loading state correctly', () => {
    mockUseGetPokemonDetailQuery.mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
      refetch: jest.fn()
    });

    render(<PokemonCharacter pokemon={pokemon} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    mockUseGetPokemonDetailQuery.mockReturnValue({
      data: undefined,
      error: { message: 'Error fetching data' },
      isLoading: false,
      refetch: jest.fn()
    });

    render(<PokemonCharacter pokemon={pokemon} />);

    expect(screen.getByText(/error loading pokémon details/i)).toBeInTheDocument();
  });

  it('renders Pokemon data correctly', async () => {
    mockUseGetPokemonDetailQuery.mockReturnValue({
      data: {
        name: 'pikachu',
        sprites: { front_default: 'https://example.com/pikachu.png' },
        weight: 60,
        height: 4,
        types: [{ type: { name: 'electric' } }]
      },
      error: null,
      isLoading: false,
      refetch: jest.fn()
    });

    render(<PokemonCharacter pokemon={pokemon} />);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /pikachu/i })).toHaveAttribute('src', 'https://example.com/pikachu.png');
  });

  it('opens and closes the dialog', async () => {
    mockUseGetPokemonDetailQuery.mockReturnValue({
      data: {
        name: 'pikachu',
        sprites: { front_default: 'https://example.com/pikachu.png' },
        weight: 60,
        height: 4,
        types: [{ type: { name: 'electric' } }]
      },
      error: null,
      isLoading: false,
      refetch: jest.fn()
    });

    render(<PokemonCharacter pokemon={pokemon} />);

    const listItemButton = screen.getByRole('button');
    fireEvent.click(listItemButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const dialogTitle = screen.getByText(/pikachu/i);
    expect(dialogTitle).toBeInTheDocument();

    fireEvent.click(screen.getByRole('dialog'));
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
