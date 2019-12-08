require('dotenv').config();
// PLUGINS
const PgSimplifyInflectorPlugin = require('@graphile-contrib/pg-simplify-inflector');
const ConnectionFilterPlugin = require('postgraphile-plugin-connection-filter');
const PgOrderByRelatedPlugin = require('@graphile-contrib/pg-order-by-related');
const PostGraphileNestedMutations = require('postgraphile-plugin-nested-mutations');
const PgUpsertPlugin = require('./PgUpsertPlugin');


// DB DETAILS
const connection = process.env.DATABASE_URL;
const schema = ['public'];

// OPTIONS
const graphiql = process.env.NODE_ENV === "development";
const watch = process.env.NODE_ENV === "development";
const enhanceGraphiql = process.env.NODE_ENV === "development";
const showErrorStack = process.env.NODE_ENV === "development";
let extendedErrors = [];
if (process.env.NODE_ENV === "development") {
  extendedErrors = ['severity', 'code', 'detail', 'hint', 'position', 'internalPosition', 'internalQuery', 'where', 'schema', 'table', 'column', 'dataType', 'constraint', 'file', 'line', 'routine'];
}
const dynamicJson = true;


const appendPlugins = [
  PgUpsertPlugin,
  PgSimplifyInflectorPlugin,
  ConnectionFilterPlugin,
  PgOrderByRelatedPlugin,
  PostGraphileNestedMutations,
];
const connectionFilterRelations = true;
const connectionFilterAllowEmptyObjectInput = true;
const connectionFilterAllowNullInput = true;
const nestedMutationsSimpleFieldNames = true;
const nestedMutationsDeleteOthers = false;
const nestedMutationsOldUniqueFields = true;

// the DB should have all necessary roles (person, anonymous, postgraphile)
// See: https://www.graphile.org/postgraphile/postgresql-schema-design/#postgres-roles
const pgSettings = async req => {
  let role = 'anonymous';
  let user_id = ''
  try {
    if (req.user) {
      //console.log(req.user);
      role = 'person';
      user_id = req.user.sub;
    }
  } catch (e) {
    console.error(e);
  }
  return {
    'jwt.claims.user_id': user_id,
    'role': role,
  };
};

module.exports = {
  connection,
  schema,
  options: {
    dynamicJson,
    graphiql,
    watchPg: watch,
    appendPlugins,
    connectionFilterRelations,
    connectionFilterAllowEmptyObjectInput,
    connectionFilterAllowNullInput,
    nestedMutationsSimpleFieldNames,
    nestedMutationsDeleteOthers,
    nestedMutationsOldUniqueFields,
    enhanceGraphiql,
    extendedErrors,
    showErrorStack,
    pgSettings
  }
};
