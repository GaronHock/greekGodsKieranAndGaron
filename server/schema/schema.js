const graphql = require("graphql");
const { GraphQLSchema } = graphql;
// Remember we create a GraphQL schema instance by handing `GraphQLSchema` a root query
// like the one we just wrote!
const RootQueryType = require("./root_query_type");
const mutations = require("./mutations");

// create and export our schema
module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations
});
// Now we can create a separate file for handling the creation of our schema to be passed 
// to the server.js file for configuring the ExpressGraphQL middleware. 
// Create a new file within schema called schema.js and add the following code:
