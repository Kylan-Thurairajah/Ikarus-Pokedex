const express = require("express")
const { createHandler } = require("graphql-http/lib/use/express")
const cors = require("cors")
const { ruruHTML } = require("ruru/server")
const schema = require("./schema/schema.js")

const app = express()

app.use(cors())

app.all(
  "/graphql",
  createHandler({
    schema,
  })
)

app.get("/", (req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
})

app.listen(4000, () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql")
})
