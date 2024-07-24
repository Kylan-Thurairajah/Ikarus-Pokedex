import "./App.css"
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  useQuery,
} from "@apollo/client"
import React from "react"
import { Routes, Route } from "react-router-dom"
import PokemonList from "./components/PokemonList"
import PokemonDetails from "./components/PokemonDetails"

function App() {
  return (
    <Routes>
      <Route path="/" element={<PokemonList />} />
      <Route path="/:name" element={<PokemonDetails />} />
    </Routes>
  )
}

export default App
