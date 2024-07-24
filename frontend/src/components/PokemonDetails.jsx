import React from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_ALL_POKEMON } from "../queries/queries" // Ensure this is the correct path
import "./PokemonDetails.css"

function PokemonDetails() {
  const { name } = useParams() // Ensure you get 'name' from the params
  const { loading, error, data } = useQuery(GET_ALL_POKEMON, {
    variables: { name },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const imageUrl = `https://projectpokemon.org/images/normal-sprite/${name.toLowerCase()}.gif`

  return (
    <div className="page-container">
      <div className="side-content"></div>
      <div className="main-content">
        <div className="semi-circle"></div>
        <img src={imageUrl} alt={`Sprite of ${name}`} className="pokemon-gif" />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="">{PokemonDetails.name}</div>
      <div className="side-content"></div>
    </div>
  )
}

export default PokemonDetails
