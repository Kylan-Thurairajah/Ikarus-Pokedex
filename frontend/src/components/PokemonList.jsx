import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { GET_ALL_POKEMON } from "../queries/queries"
import { Link } from "react-router-dom"
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
  }, [data, searchTerm, filter])

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
  }, [sortConfig, filteredData])

  const handleSort = (key) => {
    let direction = "desc"
    if (sortConfig.key === key) {
      direction = sortConfig.direction === "desc" ? "asc" : "desc"
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
      <img src="" alt="" />
      <div className="side-content"></div>
      <div className="main-content">
        <div className="logo-container">
          <div className="title-outline">
            <h1 className="pixelify-sans-title">Pokédex</h1>
          </div>
        </div>

        <div className="search-filter-container">
          <span>
            <label htmlFor="searchFilter" className="filter-label">
              Name:
            </label>
            <input
              type="text"
              placeholder="Search Pokédex"
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
              <th
                className={`header-spacing ${
                  sortConfig.key === "id" ? "active-header" : ""
                }`}
                onClick={() => handleSort("id")}
              >
                <p>#</p>
                <img
                  src={`/img/sortIcons/${
                    sortConfig.key === "id"
                      ? sortConfig.direction === "desc"
                        ? "upArrow.png"
                        : "downArrow.png"
                      : "doubleArrow.png"
                  }`}
                  alt="sort"
                  className="sort-icon"
                />
              </th>
              <th
                className={`header-spacing ${
                  sortConfig.key === "name" ? "active-header" : ""
                }`}
                onClick={() => handleSort("name")}
              >
                <p>Name</p>
                <img
                  src={`/img/sortIcons/${
                    sortConfig.key === "name"
                      ? sortConfig.direction === "desc"
                        ? "upArrow.png"
                        : "downArrow.png"
                      : "doubleArrow.png"
                  }`}
                  alt="sort"
                  className="sort-icon"
                />
              </th>
              <th className="header-spacing">
                <p>Type</p>
              </th>
              <th
                className={`header-spacing ${
                  sortConfig.key === "Total" ? "active-header" : ""
                }`}
                onClick={() => handleSort("Total")}
              >
                <p>Total</p>
                <img
                  src={`/img/sortIcons/${
                    sortConfig.key === "Total"
                      ? sortConfig.direction === "desc"
                        ? "upArrow.png"
                        : "downArrow.png"
                      : "doubleArrow.png"
                  }`}
                  alt="sort"
                  className="sort-icon"
                />
              </th>
              <th
                className={`header-spacing ${
                  sortConfig.key === "HP" ? "active-header" : ""
                }`}
                onClick={() => handleSort("HP")}
              >
                <p>HP</p>
                <img
                  src={`/img/sortIcons/${
                    sortConfig.key === "HP"
                      ? sortConfig.direction === "desc"
                        ? "upArrow.png"
                        : "downArrow.png"
                      : "doubleArrow.png"
                  }`}
                  alt="sort"
                  className="sort-icon"
                />
              </th>
              <th
                className={`header-spacing ${
                  sortConfig.key === "Attack" ? "active-header" : ""
                }`}
                onClick={() => handleSort("Attack")}
              >
                <p>Attack</p>
                <img
                  src={`/img/sortIcons/${
                    sortConfig.key === "Attack"
                      ? sortConfig.direction === "desc"
                        ? "upArrow.png"
                        : "downArrow.png"
                      : "doubleArrow.png"
                  }`}
                  alt="sort"
                  className="sort-icon"
                />
              </th>
              <th
                className={`header-spacing ${
                  sortConfig.key === "Defense" ? "active-header" : ""
                }`}
                onClick={() => handleSort("Defense")}
              >
                <p>Defense</p>
                <img
                  src={`/img/sortIcons/${
                    sortConfig.key === "Defense"
                      ? sortConfig.direction === "desc"
                        ? "upArrow.png"
                        : "downArrow.png"
                      : "doubleArrow.png"
                  }`}
                  alt="sort"
                  className="sort-icon"
                />
              </th>
              <th
                className={`header-spacing ${
                  sortConfig.key === "SpAttack" ? "active-header" : ""
                }`}
                onClick={() => handleSort("SpAttack")}
              >
                <p>Sp. Atk</p>
                <img
                  src={`/img/sortIcons/${
                    sortConfig.key === "SpAttack"
                      ? sortConfig.direction === "desc"
                        ? "upArrow.png"
                        : "downArrow.png"
                      : "doubleArrow.png"
                  }`}
                  alt="sort"
                  className="sort-icon"
                />
              </th>
              <th
                className={`header-spacing ${
                  sortConfig.key === "SpDefense" ? "active-header" : ""
                }`}
                onClick={() => handleSort("SpDefense")}
              >
                <p>Sp. Def</p>
                <img
                  src={`/img/sortIcons/${
                    sortConfig.key === "SpDefense"
                      ? sortConfig.direction === "desc"
                        ? "upArrow.png"
                        : "downArrow.png"
                      : "doubleArrow.png"
                  }`}
                  alt="sort"
                  className="sort-icon"
                />
              </th>
              <th
                className={`header-spacing ${
                  sortConfig.key === "Speed" ? "active-header" : ""
                }`}
                onClick={() => handleSort("Speed")}
              >
                <p>Speed</p>
                <img
                  src={`/img/sortIcons/${
                    sortConfig.key === "Speed"
                      ? sortConfig.direction === "desc"
                        ? "frontend/public/img/upArrow.png"
                        : "downArrow.png"
                      : "frontend/public/img/doubleArrow.png"
                  }`}
                  alt="sort"
                  className="sort-icon"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((pokemon) => (
              <tr key={pokemon.id}>
                <td className="header-spacing pokemon-image id-img">
                  <img
                    src={getPokemonImageUrl(pokemon.id)}
                    alt={pokemon.name.english}
                    className="id-img"
                  />
                  <p>{pokemon.id}</p>
                </td>
                <td className="header-spacing">
                  <Link to={`/pokemon/${pokemon.name.english}`}>
                    <p>{pokemon.name.english}</p>
                  </Link>
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
                <td className="td-spacing td-center td-nums">
                  <p>
                    {pokemon.base.HP +
                      pokemon.base.Attack +
                      pokemon.base.Defense +
                      pokemon.base.SpAttack +
                      pokemon.base.SpDefense +
                      pokemon.base.Speed}
                  </p>
                </td>
                <td className="td-spacing td-center td-nums">
                  <p>{pokemon.base.HP}</p>
                </td>
                <td className="td-spacing td-center td-nums">
                  <p>{pokemon.base.Attack}</p>
                </td>
                <td className="td-spacing td-center td-nums">
                  <p>{pokemon.base.Defense}</p>
                </td>
                <td className="td-spacing td-center td-nums">
                  <p>{pokemon.base.SpAttack}</p>
                </td>
                <td className="td-spacing td-center td-nums">
                  <p>{pokemon.base.SpDefense}</p>
                </td>
                <td className="td-spacing td-center td-nums">
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
