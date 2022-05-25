const { User, Score } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {        
        users: async () => {
            return await User.find({})
        },
        scores: async () => {
            return await Score.find({})
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
      
            return { user };
          },
          removeUser: async (parent, {username}) => {
              const deletedUser = await User
              .findOneAndDelete(
                  {username: username}
              )
              return deletedUser
          },
          addScore: async (parent, args) => {
              const score = await Score.create(args);

              return { score }
          },
    }
}


module.exports = resolvers