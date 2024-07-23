const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql")
const fs = require("fs")
const path = require("path")

// Pull pokemon data from pokedex.json
const data = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../pokemonData/pokedex.json"),
    "utf8"
  )
)

// main Pokemon schema
const PokemonType = new GraphQLObjectType({
  name: "Pokemon",
  fields: {
    id: { type: GraphQLInt },
    name: {
      type: new GraphQLObjectType({
        name: "Name",
        fields: {
          english: { type: GraphQLString },
          japanese: { type: GraphQLString },
          chinese: { type: GraphQLString },
          french: { type: GraphQLString },
        },
      }),
    },
    type: { type: new GraphQLList(GraphQLString) },
    base: {
      type: new GraphQLObjectType({
        name: "Base",
        fields: {
          HP: { type: GraphQLInt },
          Attack: { type: GraphQLInt },
          Defense: { type: GraphQLInt },
          SpAttack: { type: GraphQLInt },
          SpDefense: { type: GraphQLInt },
          Speed: { type: GraphQLInt },
        },
      }),
    },
  },
})

// Root query
const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    pokemonId: {
      type: PokemonType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        const pokemon = data.find((p) => p.id === args.id)
        return pokemon
          ? {
              ...pokemon,
              base: {
                ...pokemon.base,
                SpAttack: pokemon.base["Sp. Attack"],
                SpDefense: pokemon.base["Sp. Defense"],
              },
            }
          : null
      },
    },
    pokemons: {
      type: new GraphQLList(PokemonType),
      resolve: () =>
        data.map((pokemon) => ({
          ...pokemon,
          base: {
            ...pokemon.base,
            SpAttack: pokemon.base["Sp. Attack"],
            SpDefense: pokemon.base["Sp. Defense"],
          },
        })),
    },
  },
})

// Create and export the schema
const schema = new GraphQLSchema({
  query: QueryType,
})

module.exports = schema
