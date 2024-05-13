
export interface Pokemon {
    name: string;
    url: string;
}


export interface ListResponse {
    results: Pokemon[];
}

export interface PokemonDetail {
    name: string;
    imageUrl: string;
    weight: number;
    types: [];
    height: number;

}