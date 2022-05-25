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

type Scores {
    score: Score
}

type Score {
    score: String
    playlistName: String
    playlistID: String
    playlistImage: String
    username: String
    userID: String
    createdAt: String
}

type Query {
    users: [User]
    user(username: String!): User
    scores: [Score]  
}

type Mutation {
    addUser(username: String!, id: String!, image: String): Auth
    removeUser(username: String!): Auth
    addScore(
        score: String
        playlistName: String
        playlistID: String
        playlistImage: String
        username: String
        userID: String
        createdAt: String
    ): Scores
}

`

module.exports = typeDefs