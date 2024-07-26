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
  const [visibleCount, setVisibleCount] = useState(50)
  const maxItems = 50
  const [isSliding, setIsSliding] = useState(false)

  const handleRowClick = () => {
    setIsSliding((prevState) => !prevState)
  }

  const getPokemonImageUrl = (id) => {
    const paddedId = id.toString().padStart(3, "0")
    return `/img/sprites/${paddedId}MS.png`
  }

  const TableHeader = ({
    label,
    sortKey,
    sortConfig,
    handleSort,
    extraClass,
  }) => (
    <th
      className={`header-spacing ${extraClass} ${
        sortKey === sortConfig.key ? "active-header" : ""
      }`}
      onClick={() => handleSort(sortKey)}
    >
      <p>{label}</p>
      <img
        src={`/img/sortIcons/${
          sortKey === sortConfig.key
            ? sortConfig.direction === "desc"
              ? "upArrow.png"
              : "downArrow.png"
            : "doubleArrow.png"
        }`}
        alt="sort"
        className="sort-icon"
      />
    </th>
  )

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

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + maxItems)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className={`page-container ${isSliding ? "slide-left" : ""}`}>
      <div className="page-container">
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
                <TableHeader
                  label="#"
                  sortKey="id"
                  sortConfig={sortConfig}
                  handleSort={handleSort}
                  extraClass="td-nums"
                />
                <TableHeader
                  label="Name"
                  sortKey="name"
                  sortConfig={sortConfig}
                  handleSort={handleSort}
                  extraClass="pokemon-name"
                />
                <th className="header-spacing">
                  <p>Type</p>
                </th>
                <TableHeader
                  label="Total"
                  sortKey="Total"
                  sortConfig={sortConfig}
                  handleSort={handleSort}
                  extraClass="td-nums"
                />
                <TableHeader
                  label="HP"
                  sortKey="HP"
                  sortConfig={sortConfig}
                  handleSort={handleSort}
                  extraClass="td-nums"
                />
                <TableHeader
                  label="Attack"
                  sortKey="Attack"
                  sortConfig={sortConfig}
                  handleSort={handleSort}
                  extraClass="td-nums"
                />
                <TableHeader
                  label="Defense"
                  sortKey="Defense"
                  sortConfig={sortConfig}
                  handleSort={handleSort}
                  extraClass="td-nums"
                />
                <TableHeader
                  label="Sp. Atk"
                  sortKey="SpAttack"
                  sortConfig={sortConfig}
                  handleSort={handleSort}
                  extraClass="td-nums"
                />
                <TableHeader
                  label="Sp. Def"
                  sortKey="SpDefense"
                  sortConfig={sortConfig}
                  handleSort={handleSort}
                  extraClass="td-nums"
                />
                <TableHeader
                  label="Speed"
                  sortKey="Speed"
                  sortConfig={sortConfig}
                  handleSort={handleSort}
                  extraClass="td-nums"
                />
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(0, visibleCount).map((pokemon) => (
                <tr key={pokemon.id}>
                  <td className="table-data">
                    <img
                      src={getPokemonImageUrl(pokemon.id)}
                      alt={pokemon.name.english}
                      className="pokemon-image id-img"
                    />
                    {pokemon.id}
                  </td>
                  <td
                    className="td-spacing td-center styled-link"
                    onClick={handleRowClick}
                  >
                    <p>{pokemon.name.english}</p>
                  </td>
                  <td>
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
                    {pokemon.base.HP +
                      pokemon.base.Attack +
                      pokemon.base.Defense +
                      pokemon.base.SpAttack +
                      pokemon.base.SpDefense +
                      pokemon.base.Speed}
                  </td>
                  {[
                    "HP",
                    "Attack",
                    "Defense",
                    "SpAttack",
                    "SpDefense",
                    "Speed",
                  ].map((stat) => (
                    <td key={stat} className="td-spacing td-center td-nums">
                      {pokemon.base[stat]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="load-more-container">
            <button className="load-more-button" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonList
