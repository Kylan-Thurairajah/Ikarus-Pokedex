import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { GET_ALL_POKEMON } from "../queries/queries"
import "./PokemonList.css"
import PokemonDetails from "./PokemonDetails"
import NoDataMessage from "./NoDataMessage"

function PokemonList() {
  // Fetch all Pokemon data
  const { loading, error, data } = useQuery(GET_ALL_POKEMON)

  // State hooks for search, filter, sorting, pagination, and selected Pokemon
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "desc" })
  const [filter, setFilter] = useState("")
  const [visibleCount, setVisibleCount] = useState(50)
  const maxItems = 50
  const [selectedPokemonId, setSelectedPokemonId] = useState(null)
  const [isSliding, setIsSliding] = useState(false)
  const [isSlidingUp, setIsSlidingUp] = useState(false)

  // Clear the search input
  const handleClearSearch = () => {
    setSearchTerm("")
  }

  // Handle selecting a Pokemon, with animation for sliding content
  const handlePokemonSelected = (id) => {
    setSelectedPokemonId(id)
    setIsSliding(true)
    setTimeout(() => {
      setIsSlidingUp(true)
    }, 230)
  }

  // Close the Pokemon details panel and reset sliding animations
  const handleClose = () => {
    setIsSlidingUp(false)
    setTimeout(() => {
      setIsSliding(false)
      setSelectedPokemonId(null)
    }, 500)
  }

  // Get the URL for the Pokemon image
  const getPokemonImageUrl = (id) => {
    const paddedId = id.toString().padStart(3, "0")
    return `/img/sprites/${paddedId}MS.png`
  }

  // Header for sorting columns in the table
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

  // Filter and sort Pokemon data whenever search term or filter changes
  useEffect(() => {
    if (data?.pokemons) {
      let filtered = data.pokemons.filter((pokemon) =>
        pokemon.name.english.toLowerCase().includes(searchTerm.toLowerCase())
      )

      if (filter) {
        filtered = filtered.filter((pokemon) => pokemon.type.includes(filter))
      }

      setFilteredData(filtered)
    }
  }, [data, searchTerm, filter])

  // Handle sorting logic
  const handleSort = (key) => {
    let direction = "desc"
    if (sortConfig.key === key) {
      direction = sortConfig.direction === "desc" ? "asc" : "desc"
    } else if (key === "name") {
      direction = "asc"
    }
    setSortConfig({ key, direction })
  }

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  // Load more Pokemon data for pagination
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + maxItems)
  }

  // Sort filtered data based on sort request
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
      return sortConfig.direction === "asc" ? totalA - totalB : totalB - totalA
    } else {
      const valA = a.base[sortConfig.key] || a[sortConfig.key]
      const valB = b.base[sortConfig.key] || b[sortConfig.key]
      return sortConfig.direction === "asc" ? valA - valB : valB - valA
    }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <div className="page-container">
        <div className={`main-content ${isSliding ? "slide-left" : ""}`}>
          <div className="logo-container">
            <h1 className="pixelify-sans-title">Pokédex</h1>
          </div>

          <div className="search-filter-container">
            <span>
              <label htmlFor="searchFilter" className="filter-label">
                Name:
              </label>
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder="Search Pokédex"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                {searchTerm && (
                  <img
                    src="/img/closeButton.png"
                    alt="Clear search"
                    className="clear-icon"
                    onClick={handleClearSearch}
                  />
                )}
              </div>
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
          {filteredData.length === 0 ? (
            <NoDataMessage />
          ) : (
            <table className="main-table">
              <thead>
                <tr>
                  <TableHeader
                    label="#"
                    sortKey="id"
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                    extraClass="id-col"
                  />
                  <TableHeader
                    label="Name"
                    sortKey="name"
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                    extraClass="name-col"
                  />
                  <th className="type-col">Type</th>
                  <TableHeader
                    label="Total"
                    sortKey="Total"
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                    extraClass="nums-col"
                  />
                  <TableHeader
                    label="HP"
                    sortKey="HP"
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                    extraClass="nums-col"
                  />
                  <TableHeader
                    label="Attack"
                    sortKey="Attack"
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                    extraClass="nums-col"
                  />
                  <TableHeader
                    label="Defense"
                    sortKey="Defense"
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                    extraClass="nums-col"
                  />
                  <TableHeader
                    label="Sp. Atk"
                    sortKey="SpAttack"
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                    extraClass="nums-col"
                  />
                  <TableHeader
                    label="Sp. Def"
                    sortKey="SpDefense"
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                    extraClass="nums-col"
                  />
                  <TableHeader
                    label="Speed"
                    sortKey="Speed"
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                    extraClass="nums-col"
                  />
                </tr>
              </thead>
              <tbody>
                {sortedData.slice(0, visibleCount).map((pokemon) => (
                  <tr key={pokemon.id}>
                    <td className="table-data">
                      <div className="id-container">
                        <img
                          src={getPokemonImageUrl(pokemon.id)}
                          alt={pokemon.id}
                          className="pokemon-image"
                        />
                        <span className="pokemon-id">{pokemon.id}</span>
                      </div>
                    </td>
                    <td
                      className="td-spacing td-center name-link"
                      onClick={() => handlePokemonSelected(pokemon.id)}
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
                    <td className="td-spacing td-center nums-col">
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
                      <td key={stat} className="td-spacing td-center nums-col">
                        {pokemon.base[stat]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {filteredData.length > visibleCount && (
            <div className="pagination-container">
              <button className="pagination-btn" onClick={handleLoadMore}>
                Load More
              </button>
            </div>
          )}
        </div>

        {selectedPokemonId && (
          <div className={`side-content ${isSlidingUp ? "slide-up" : ""}`}>
            <PokemonDetails
              selectedPokemonId={selectedPokemonId}
              isSlidingUp={isSlidingUp}
              onClose={handleClose}
              filteredData={sortedData}
              setSelectedPokemonId={setSelectedPokemonId}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default PokemonList
