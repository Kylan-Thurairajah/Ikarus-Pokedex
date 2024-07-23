import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { GET_ALL_POKEMON } from "../queries/queries"
import "./PokemonList.css"

function PokemonList() {
  const { loading, error, data } = useQuery(GET_ALL_POKEMON)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "desc" })
  const [filter, setFilter] = useState("")

  const getPokemonImageUrl = (id) => {
    const paddedId = id.toString().padStart(3, "0")
    return `/img/sprites/${paddedId}MS.png`
  }

  const pokemonTypes = [
    "Normal",
    "Fire",
    "Water",
    "Electric",
    "Grass",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dragon",
    "Dark",
    "Steel",
    "Fairy",
  ]

  useEffect(() => {
    if (data && data.pokemons) {
      let filtered = data.pokemons.filter((pokemon) =>
        pokemon.name.english.toLowerCase().includes(searchTerm.toLowerCase())
      )

      if (filter) {
        filtered = filtered.filter((pokemon) => pokemon.type.includes(filter))
      }

      setFilteredData(filtered)
    }
  }, [data, searchTerm, filter]) // Correct dependency array

  useEffect(() => {
    if (filteredData.length) {
      const sortedData = [...filteredData].sort((a, b) => {
        if (sortConfig.key === "name") {
          if (a.name.english < b.name.english)
            return sortConfig.direction === "asc" ? -1 : 1
          if (a.name.english > b.name.english)
            return sortConfig.direction === "asc" ? 1 : -1
          return 0
        } else if (sortConfig.key === "Total") {
          const totalA =
            a.base.HP +
            a.base.Attack +
            a.base.Defense +
            a.base.SpAttack +
            a.base.SpDefense +
            a.base.Speed
          const totalB =
            b.base.HP +
            b.base.Attack +
            b.base.Defense +
            b.base.SpAttack +
            b.base.SpDefense +
            b.base.Speed
          return sortConfig.direction === "asc"
            ? totalA - totalB
            : totalB - totalA
        } else {
          const valA = a.base[sortConfig.key] || a[sortConfig.key]
          const valB = b.base[sortConfig.key] || b[sortConfig.key]
          return sortConfig.direction === "asc" ? valA - valB : valB - valA
        }
      })
      setFilteredData(sortedData)
    }
  }, [sortConfig, filteredData]) // Correct dependency array

  const handleSort = (key) => {
    let direction = "desc"
    if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc"
    }
    setSortConfig({ key, direction })
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="page-container">
      <div className="side-content"></div>
      <div className="main-content">
        <div className="logo-container">
          <h1>Pokédex</h1>
        </div>

        <div className="search-filter-container">
          <span>
            <label htmlFor="searchFilter" className="filter-label">
              Name:
            </label>
            <input
              type="text"
              placeholder="Search Pokémon"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <label htmlFor="typeSelect" className="filter-label">
              Filter by Type:
            </label>
            <select
              id="typeSelect"
              value={filter}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">- All -</option>
              {pokemonTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </span>
        </div>
        <table className="main-table">
          <thead>
            <tr>
              <th className="imgs"></th>
              <th className="header-spacing" onClick={() => handleSort("id")}>
                <p>#</p>
              </th>
              <th className="header-spacing" onClick={() => handleSort("name")}>
                <p>Name</p>
              </th>
              <th className="header-spacing">
                <p>Type</p>
              </th>
              <th
                className="header-spacing"
                onClick={() => handleSort("Total")}
              >
                <p>Total</p>
              </th>
              <th className="header-spacing" onClick={() => handleSort("HP")}>
                <p>HP</p>
              </th>
              <th
                className="header-spacing"
                onClick={() => handleSort("Attack")}
              >
                <p>Attack</p>
              </th>
              <th
                className="header-spacing"
                onClick={() => handleSort("Defense")}
              >
                <p>Defense</p>
              </th>
              <th
                className="header-spacing"
                onClick={() => handleSort("SpAttack")}
              >
                <p>Sp. Atk</p>
              </th>
              <th
                className="header-spacing"
                onClick={() => handleSort("SpDefense")}
              >
                <p>Sp. Def</p>
              </th>
              <th
                className="header-spacing"
                onClick={() => handleSort("Speed")}
              >
                <p>Speed</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((pokemon) => (
              <tr key={pokemon.id}>
                <td className="pokemon-image">
                  <img
                    src={getPokemonImageUrl(pokemon.id)}
                    alt={pokemon.name.english}
                  />
                </td>
                <td className="header-spacing">
                  <p>{pokemon.id}</p>
                </td>
                <td className="header-spacing">
                  <p>{pokemon.name.english}</p>
                </td>
                <td className="header-spacing">
                  {pokemon.type.map((type) => (
                    <div className="tooltip" key={type}>
                      <img
                        src={`/img/type/${type}.png`}
                        alt={type}
                        className="type-icon"
                      />
                      <span className="tooltiptext">
                        <p>{type}</p>
                      </span>
                    </div>
                  ))}
                </td>
                <td className="header-spacing">
                  <p>
                    {pokemon.base.HP +
                      pokemon.base.Attack +
                      pokemon.base.Defense +
                      pokemon.base.SpAttack +
                      pokemon.base.SpDefense +
                      pokemon.base.Speed}
                  </p>
                </td>
                <td className="header-spacing">
                  <p>{pokemon.base.HP}</p>
                </td>
                <td className="header-spacing">
                  <p>{pokemon.base.Attack}</p>
                </td>
                <td className="header-spacing">
                  <p>{pokemon.base.Defense}</p>
                </td>
                <td className="header-spacing">
                  <p>{pokemon.base.SpAttack}</p>
                </td>
                <td className="header-spacing">
                  <p>{pokemon.base.SpDefense}</p>
                </td>
                <td className="header-spacing">
                  <p>{pokemon.base.Speed}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="side-content"></div>
    </div>
  )
}

export default PokemonList
