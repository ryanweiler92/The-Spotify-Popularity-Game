import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $id: String!, $image: String!) {
    addUser(username: $username, id: $id, image: $image){
        user{
      username
      id
      image
    }
  }
}
`

export const ADD_SCORE = gql`
mutation addScore($score: String!, $playlistName: String!, $playlistID: String!, 
                  $playlistImage: String!, $username: String!, $userID: String!) {
    addScore(score: $score, playlistName: $playlistName, playlistID: $playlistID, 
             playlistImage: $playlistImage, username: $username, userID: $userID){
    score {
        score
        playlistName
        playlistImage
        username
        userID
        createdAt
        }
    }
}
`