import React from "react"
import "./PokemonList.css"

function NoDataMessage() {
  return (
    <>
      <div className="no-data-container">
        <p>No Pokémon match your search criteria.</p>
      </div>
      <img className="no-data-gif" src="/img/pikachuSad.gif" alt="" />
    </>
  )
}

export default NoDataMessage
