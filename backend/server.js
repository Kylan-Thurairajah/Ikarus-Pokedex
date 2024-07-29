const express = require("express")
const { createHandler } = require("graphql-http/lib/use/express")
const cors = require("cors")
const { ruruHTML } = require("ruru/server")
const schema = require("./schema/schema.js")

const app = express()

// Allow cross-origin requests
app.use(cors())

// Handle GraphQL requests at the /graphql endpoint
app.all(
  "/graphql",
  createHandler({
    schema,
  })
)

// Ruru for testing
app.get("/", (req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
})

// Start the server and listen on port 4000
app.listen(4000, () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql")
})
