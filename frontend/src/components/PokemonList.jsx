import React from "react"
import { useQuery, gql } from "@apollo/client"

// Define the query to get all Pokemon
const GET_ALL_POKEMON = gql`
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

const PokemonList = () => {
  const { loading, error, data } = useQuery(GET_ALL_POKEMON)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    // output all data for now
    <div>
      <h1>Pokémon List</h1>
      <ul>
        {data.pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <h2>{pokemon.name.english}</h2>
            <p>
              <strong>Japanese:</strong> {pokemon.name.japanese}
            </p>
            <p>
              <strong>Chinese:</strong> {pokemon.name.chinese}
            </p>
            <p>
              <strong>French:</strong> {pokemon.name.french}
            </p>
            <p>
              <strong>Type:</strong> {pokemon.type.join(", ")}
            </p>
            <div>
              <strong>HP:</strong> {pokemon.base.HP}
            </div>
            <div>
              <strong>Attack:</strong> {pokemon.base.Attack}
            </div>
            <div>
              <strong>Defense:</strong> {pokemon.base.Defense}
            </div>
            <div>
              <strong>Sp. Attack:</strong> {pokemon.base.SpAttack}
            </div>
            <div>
              <strong>Sp. Defense:</strong> {pokemon.base.SpDefense}
            </div>
            <div>
              <strong>Speed:</strong> {pokemon.base.Speed}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PokemonList
