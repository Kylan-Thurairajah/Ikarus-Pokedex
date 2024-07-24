import React from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_ALL_POKEMON } from "../queries/queries" // Ensure this is the correct path
import "./PokemonDetails.css"

function PokemonDetails() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_ALL_POKEMON, {
    variables: { id: parseInt(id) },
  })

  return (
    <div className="page-container">
      <div className="side-content"></div>
      <div className="main-content">
        <img
          src={"https://projectpokemon.org/images/normal-sprite/accelgor.gif"}
          alt="Description of the GIF"
          style={{ maxWidth: "100%" }}
        />
      </div>
      <div className="side-content"></div>
    </div>
  )
}

export default PokemonDetails
