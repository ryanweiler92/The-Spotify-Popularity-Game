import { gql } from '@apollo/client';

export const GET_USERS = gql`
query users{
    users{
        id
        username
        image
    }
  }
`

export const GET_SCORES = gql`
query scores{
    scores{
        score
        playlistName
        playlistID
          playlistImage
          username
          userID
          _id
          createdAt
    }
  }
`