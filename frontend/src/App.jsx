import "./App.css"
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
} from "@apollo/client"
import PokemonList from "./components/PokemonList"

function App() {
  return (
    <>
      <div className="App">
        <PokemonList />
      </div>
    </>
  )
}

export default App
