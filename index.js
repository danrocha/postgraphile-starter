require("dotenv").config();

const express = require("express");
const cors = require("cors");
const serveStatic = require("serve-static");
const path = require("path");

const { postgraphile } = require("postgraphile");
const { connection, schema, options } = require("./plugins/postgraphile");

// Set up Auth0 configuration
const jwtCheck = require('./plugins/auth');

const app = express();

app.use(cors());

app.use("/graphql", jwtCheck);

app.use(postgraphile(connection, schema, options));

app.use(serveStatic(path.join(__dirname, "/public")));

app.listen(process.env.PORT, () => {
  console.log("Server started on port", process.env.PORT);
  console.log("NODE_ENV=", process.env.NODE_ENV);
  console.log("DATABASE_URL=", process.env.DATABASE_URL);
});
