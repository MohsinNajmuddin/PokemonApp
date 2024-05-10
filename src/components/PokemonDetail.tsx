import React from 'react';
import { Pokemon } from '../interfaces/types';

interface Props {
  pokemon: Pokemon;
}

const PokemonDetail: React.FC<Props> = ({ pokemon }) => {

    return (
        <div>
        <h2>{pokemon.name}</h2>
        </div>
    );
};

export default PokemonDetail;
