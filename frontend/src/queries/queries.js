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
