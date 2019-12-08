require("dotenv").config();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const jwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH_JWKS_URI
  }),
  audience: process.env.AUTH_AUDIENCE,
  issuer: process.env.AUTH_ISSUER,
  algorithms: ["RS256"],
  credentialsRequired: false
});

module.exports = jwtCheck;
