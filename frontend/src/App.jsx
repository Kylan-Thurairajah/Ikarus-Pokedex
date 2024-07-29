import "./App.css"
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  useQuery,
} from "@apollo/client"
import React from "react"
import PokemonList from "./components/PokemonList"
import PokemonDetails from "./components/PokemonDetails"

function App() {
  return <PokemonList />
}

export default App
