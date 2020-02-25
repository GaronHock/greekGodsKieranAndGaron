const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLID } = graphql;
const mongoose = require("mongoose");
const God = mongoose.model("god");
const GodType = require("./god_type");

// this will be the where we will create all of the mutations for our application
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // we are naming our filed - and therefore our mutation `newGod`
    newGod: {
      // we just specify the type we are mutating - in the case of making
      // a new God this will be the GodType
      type: GodType,
      args: {
        // the arguments required for this mutation
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      // here we are just destructing our arguments
      resolve(parentValue, { name, type, description }) {
        return new God({ name, type, description }).save();
      }
    },
    deleteGod: {
      type: GodType,
      // all we need to delete the user is the id
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { _id }) {
        // making a delete type request
        console.log(_id);
        return God.deleteOne({ _id });
      }
    },
    updateGod: {
      type: GodType,
      args: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(parentValue, { _id, name, type, description }) {
        const updateObj = {};
        // we can create our own object here and pass in the variables is they exist
        updateObj._id = _id;
        if (name) updateObj.name = name;
        if (type) updateObj.type = type;
        if (description) updateObj.description = description;

        return God.findOneAndUpdate(
          { _id },
          { $set: updateObj },
          { new: true },
          (err, god) => {
            return god;
          }
          ////we wrote a statics method in models/God.js to handle this
        );
      }
    },
    addGodRelative: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        relativeId: { type: GraphQLID },
        relationship: { type: GraphQLString }
      },
      resolve(parentValue, { godId, relativeId, relationship }) {
        return God.addRelative(godId, relativeId, relationship);
      }
    },
    ////we wrote a statics method in models/God.js to handle this 
  }
});

module.exports = mutation;
