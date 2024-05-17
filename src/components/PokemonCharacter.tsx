import React, { useEffect, useState }  from 'react';
import { useGetPokemonDetailQuery } from "../services/pokemonApi"
import { Pokemon, PokemonDetail } from '../interfaces/types';
import extractIdFromUrl from '../utils/helper';

import { ListItemText, ListItemAvatar, ListItemButton, Avatar, Dialog, DialogContent, DialogTitle, Divider, Typography}  from '@mui/material';

import { map } from "lodash";

interface Props {
    pokemon: Pokemon;
}

const PokemonCharacter: React.FC<Props>  = ({pokemon}) => {

    const [pokemonData, setPokemonData] = useState<PokemonDetail>({name: '', imageUrl: '', weight: 0, height: 0, types: []});
    const [openDialog, setOpenDialog] = useState(false);
    const pokemonID = extractIdFromUrl(pokemon.url);
    const { data, error, isLoading } = useGetPokemonDetailQuery(pokemonID);

    const handleClick = () => {
        setOpenDialog(!openDialog);
    };

    useEffect(() => {

        let typeNames = [''];
        if (!!data?.types) {
            typeNames = map(data.types, 'type.name');
        }
        setPokemonData({name: data?.name, imageUrl: data?.sprites.front_default , weight: data?.weight, height: data?.height, types: typeNames});
      }, [!isLoading, !!data]);

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemAvatar>
                    <Avatar sx={{ width: 50, height: 50}} alt={pokemonData.name} src={pokemonData.imageUrl} variant="square"/>
                </ListItemAvatar>
                <ListItemText primary={pokemonData.name} />
            </ListItemButton>
            <Dialog
                open={openDialog}
                onClose={handleClick}
            >
                <DialogTitle id="alert-dialog-title">
                    {pokemonData.name}
                </DialogTitle>
                <DialogContent>
                    <Avatar sx={{ width: 140, height: 140}} alt={pokemonData.name} src={pokemonData.imageUrl} variant="square"/>
                    <Divider variant="fullWidth"/>
                    <Typography align="center"><b>Name: </b>{pokemonData.name}</Typography>
                    <Divider variant="fullWidth"/>
                    <Typography align="center"><b>Height: </b>{pokemonData.height}</Typography>
                    <Divider variant="fullWidth"/>
                    <Typography align="center"><b>Weight: </b>{pokemonData.weight}</Typography>
                    <Divider variant="fullWidth"/>
                    <Typography align="center"><b>Types: </b>{pokemonData.types.toString()}</Typography>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PokemonCharacter;