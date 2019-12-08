# Postgraphile Starter

This is the starter I use for almost all my projects using [Postgraphile](https://www.graphile.org/postgraphile/introduction/).

## Features

### Plugins

These are the plugins I use in the starter, which I found the most useful:

- [@graphile-contrib/pg-simplify-inflector](https://github.com/graphile-contrib/pg-simplify-inflector) - simplifies field names by automatically removing `ByFooIdAndBarId`-style suffixes.
- [postgraphile-plugin-connection-filter](https://github.com/graphile-contrib/postgraphile-plugin-connection-filter) - adds a filter: arg to connections that offers a more powerful alternative to the built in filtering operations
- [@graphile-contrib/pg-order-by-related](https://github.com/graphile-contrib/pg-order-by-related) - enables ordering by related table columns.
- [postgraphile-plugin-nested-mutations](https://github.com/mlipscombe/postgraphile-plugin-nested-mutations) - enables a single mutation to create/update many related records
- PgUpsertPlugin: good upsert plugin written by Benjie

### Auth

My Auth flow consists of a frontend which gets a JWT from Auth0 and passes it to all server calls done with Apollo. Postgraphile then decodes the JWT and uses it for its database transactions.

I usually create 3 roles, as proposed in the Postgraphile docs: https://www.graphile.org/postgraphile/postgresql-schema-design/#postgres-roles

All the requests to `/graphql` use a `jwtCheck` from `plugins/auth.js`, which checks the validity of the token and decodes it.

Then I use PgSettings in `plugins/postgraphile.js` to define the role and user_id to be used in Postgres.

## Usage

After cloning this repo, make sure you add the necessary environment variables in `.env`, then:

```
npm i
```

To run it in dev mode with auto-reloading:

```
npm run start:dev
```

For deployment, this is my workflow: https://danroc.dev/deploying-node-apps-dokku/
