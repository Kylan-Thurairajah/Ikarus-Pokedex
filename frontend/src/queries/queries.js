import { gql } from "@apollo/client"

export const GET_ALL_POKEMON = gql`
  query GetAllPokemon {
    pokemons {
      id
      name {
        english
        japanese
        chinese
        french
      }
      type
      base {
        HP
        Attack
        Defense
        SpAttack
        SpDefense
        Speed
      }
    }
  }
`
export const GET_POKEMON_BY_ID = gql`
  query GetPokemonById($id: Int!) {
    pokemonId(id: $id) {
      id
      name {
        english
        japanese
        chinese
        french
      }
      type
      base {
        HP
        Attack
        Defense
        SpAttack
        SpDefense
        Speed
      }
    }
  }
`
