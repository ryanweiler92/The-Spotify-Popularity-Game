const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    id: String
    username: String
    image: String
}

type Auth {
    user: User
}

type Query {
    users: [User]
    user(username: String!): User  
}

type Mutation {
    addUser(username: String!, id: String!, image: String): Auth
    removeUser(username: String!): Auth
}

`

module.exports = typeDefs