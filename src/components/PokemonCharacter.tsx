import React, { useEffect, useState }  from 'react';
import { useGetPokemonDetailQuery } from "../services/pokemonApi"
import { Pokemon, PokemonDetail } from '../interfaces/types';
import extractIdFromUrl from '../utils/helper';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';

interface Props {
    pokemon: Pokemon;
}

const PokemonCharacter: React.FC<Props>  = ({pokemon}) => {

    const [pokemonData, setPokemonData] = useState<PokemonDetail>({name: '', imageUrl: '', weight: 0, height: 0, types: []});
    const pokemonID = extractIdFromUrl(pokemon.url);
    const { data, error, isLoading } = useGetPokemonDetailQuery(pokemonID);
    
    useEffect(() => {
        setPokemonData({name: data?.name, imageUrl: data?.sprites.front_default , weight: data?.weight, height: data?.height, types: data?.types});
      }, [!isLoading, !!data]);

    return (
        <ListItemButton>
            <ListItemAvatar>
                <Avatar sx={{ width: 50, height: 50 }} alt={pokemonData.name} src={pokemonData.imageUrl} variant="square"/>
            </ListItemAvatar>
            <ListItemText primary={pokemonData.name} />
        </ListItemButton>
    );
};

export default PokemonCharacter;