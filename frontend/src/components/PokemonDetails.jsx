import React from "react"
import { useQuery } from "@apollo/client"
import { GET_POKEMON_BY_ID } from "../queries/queries"
import "./PokemonDetails.css"
import BarChart from "./BarChart"

function PokemonDetails({
  selectedPokemonId, // ID of the currently selected Pokemon
  onClose, // Function to close the details view
  filteredData, // List of filtered Pokemon data
  setSelectedPokemonId, // Function to set the selected Pokemon ID
}) {
  // Fetch data for the selected Pokemon
  const { loading, error, data } = useQuery(GET_POKEMON_BY_ID, {
    variables: { id: selectedPokemonId },
    skip: !selectedPokemonId, // Skip query if no ID is selected
  })

  if (!selectedPokemonId) return null // Return nothing if no Pokemon is selected

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const pokemon = data?.pokemonId // Extract Pokemon data
  if (!pokemon) return <p>No data found</p> // Handle case with no data

  // Stats for the BarChart component
  const stats = [
    pokemon.base.HP,
    pokemon.base.Attack,
    pokemon.base.Defense,
    pokemon.base.SpAttack,
    pokemon.base.SpDefense,
    pokemon.base.Speed,
  ]

  // Function to sanitize Pokemon names for URLs
  const sanitizeName = (name) => {
    return name
      .toLowerCase()
      .replace(/♂/g, "_m")
      .replace(/♀/g, "_f")
      .replace(/[^a-z0-9_.-]/g, "")
  }

  // Handle navigation to previous and next Pokemon
  const currentIndex = filteredData.findIndex((p) => p.id === selectedPokemonId)
  const previousPokemonId =
    currentIndex > 0 ? filteredData[currentIndex - 1].id : null
  const nextPokemonId =
    currentIndex < filteredData.length - 1
      ? filteredData[currentIndex + 1].id
      : null

  const handlePrev = () => {
    if (previousPokemonId) {
      setSelectedPokemonId(previousPokemonId)
    }
  }

  const handleNext = () => {
    if (nextPokemonId) {
      setSelectedPokemonId(nextPokemonId)
    }
  }

  return (
    <>
      <div className="header">
        <div className="close-button" onClick={onClose}>
          <img src="/img/xButton.png" alt="close button" />
        </div>
      </div>
      <div className="top-pokemon-details">
        <div className="pokemon-gif-container">
          <img
            className="switch-arrow left-arrow"
            src="/img/prevArrow.png"
            alt="Switch Left"
            onClick={handlePrev}
          />
          <img
            className="pokemon-gif"
            src={`https://projectpokemon.org/images/normal-sprite/${sanitizeName(
              pokemon.name.english
            )}.gif`}
            alt={`Sprite of ${pokemon.name.english}`}
          />
          <img
            className="switch-arrow right-arrow"
            src="/img/nextArrow.png"
            alt="Switch Right"
            onClick={handleNext}
          />
        </div>
        <hr />
        <div className="top-text-section">
          <h3>{pokemon.name.english}</h3>
          <h4>No. {pokemon.id}</h4>
        </div>

        <div className="badge-container">
          {pokemon.type.map((type) => (
            <div className="badge" key={type}>
              <img
                src={`/img/type/${type}.png`}
                alt={type}
                className="badge-icon"
              />
              <span className="badge-text">{type}</span>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="details-text-info">
        <p>Japanese: {pokemon.name?.japanese || "N/A"}</p>
        <p>Chinese: {pokemon.name?.chinese || "N/A"}</p>
        <p>French: {pokemon.name?.french || "N/A"}</p>
      </div>
      <hr />
      <div className="graph">
        <h4>
          Total:{" "}
          {pokemon.base.HP +
            pokemon.base.Attack +
            pokemon.base.Defense +
            pokemon.base.SpAttack +
            pokemon.base.SpDefense +
            pokemon.base.Speed}
        </h4>
        <BarChart stats={stats} types={pokemon.type} />
      </div>
    </>
  )
}

export default PokemonDetails
